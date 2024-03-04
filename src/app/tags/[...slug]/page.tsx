'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/Card/Card';
import { IPagination } from '@/interfaces/Pagination';
import { Main } from '@/components/Main/Main';
import { Pagination } from '@/components/Pagination/Pagination';
import { ContentType } from '@/interfaces/Strapi';
import { Post } from '@/interfaces/Posts';
import { FrozenRouter } from '@/components/FrozenRouter';
import { getStrapiData } from '@/utils/getFetchClient';

const Tags = ({params}: { params: { slug: string[] } }) => {

  const [pagination, setPagination] = useState<IPagination<ContentType<Post>>>({
    totalPages: 1,
    currentPage: 1,
    paginatedPosts: []
  });

  useEffect(() => {
    const getData = async () => {
      const slug = params.slug[0];
      const page = Number(params.slug[1]) || 1;

      const query = `{
        posts(sort: ["publishedAt:desc"], filters: {tags: {name: {in: ["${slug}"]}}}, pagination: {page: ${page}, pageSize: 3}) {
          data {
            id
            attributes {
              slug
              title
              description
              publishedAt
              updatedAt
              tags {
                data {
                  attributes {
                    name
                  }
                }
              }
            }
          }
          meta {
            pagination {
              pageCount
            }
          }
        }
      }`;

      const data = await getStrapiData(query);
      setPagination({
        currentPage: page,
        totalPages: data.posts.meta.pagination.pageCount,
        paginatedPosts: data.posts.data
      });
    };

    if ('slug' in params) {
      getData();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <FrozenRouter>
      <Main pageTitle="Posts" pageDesc={`All the articles with the tag "${params.slug[0]}"`}>
        <ul>
          {
            pagination.paginatedPosts.map((post) => (
              <Card key={post.id} href={`/posts/${post.attributes.slug}/`} frontmatter={post.attributes}/>
            ))
          }
        </ul>
      </Main>
      <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages}
                  prevUrl={`/tags/${params.slug[0]}/${pagination.currentPage - 1 !== 1 ? '/' + (pagination.currentPage - 1) : ''}/`}
                  nextUrl={`/tags/${params.slug[0]}/${pagination.currentPage + 1}`}/>
    </FrozenRouter>
  );
};

export default Tags;
