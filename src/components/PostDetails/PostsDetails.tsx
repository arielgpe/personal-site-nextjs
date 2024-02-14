import './postdetails.css';
import { getStrapiClient } from '@/utils/getStrapiClient';
import { useEffect, useState } from 'react';
import Datetime from '@/components/Datetime/Datetime';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Tag } from '@/components/Tag/Tag';
import { LinkRenderer } from '@/components/LinkRenderer';
import { ContentType } from '@/interfaces/Strapi';
import { Post } from '@/interfaces/Posts';
import { useRouter } from 'next/navigation';

export const PostsDetails = ({params}: { params: { slug: string } }) => {
  const strapi = getStrapiClient();
  const router = useRouter();
  const [currentPost, setCurrentPost] = useState<ContentType<Post>>();

  useEffect(() => {
    const getData = async () => {
      const slug = params.slug[0];

      const posts = await strapi.find<any>('posts', {
        filters: {
          slug: {
            $eq: slug
          }
        },
        populate: '*',
        pagination: {
          page: 1,
          pageSize: 1
        }
      });

      setCurrentPost(posts.data[0] ?? null);
    };

    if ('slug' in params) {
      getData();
    }

    console.log('history,', history);

  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    currentPost ?
      <span className="post-detail">
        <div className="mx-auto flex w-full max-w-6xl justify-start px-2">
          <button
            className="focus-outline mb-2 mt-8 flex hover:opacity-75"
            onClick={() => (history.length === 1) ? router.replace('/') : router.back()}
          >
            <svg xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"
              ></path>
            </svg>
            <span>Go back</span>
          </button>
        </div>
        <main id="main-content">
          <h1 className="post-title">{currentPost.attributes.title}</h1>
          <Datetime
            pubDatetime={currentPost.attributes.createdAt}
            modDatetime={currentPost.attributes.updatedAt}
            size="lg"
            className="my-2"
          />
          <article id="article" role="article" className="prose mx-auto mt-8 max-w-6xl">
            <Markdown skipHtml={false} components={{a: LinkRenderer}}
                      // @ts-expect-error array is not assignable to string, but react-markdown can handle it
                      remarkPlugins={[remarkGfm]}>{currentPost.attributes.body}</Markdown>
          </article>

          <ul className="my-8">
            {currentPost.attributes.tags.data.map(tag => <Tag key={tag.id} tag={tag.attributes.name}/>)}
          </ul>

          <div
            className="flex flex-col-reverse items-center justify-between gap-6 sm:flex-row-reverse sm:items-end sm:gap-4"
          >
            <button
              id="back-to-top"
              className="focus-outline whitespace-nowrap py-1 hover:opacity-75"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="rotate-90">
                <path
                  d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"
                ></path>
              </svg>
              <span>Back to Top</span>
            </button>

            {/*<ShareLinks/>*/}
            links
          </div>
        </main>
      </span> : null
  );
};

