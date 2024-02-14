import './tag.css';
import { LinkButton } from '@/components/LinkButton/LinkButton';

interface Props {
  tag: string;
  size?: 'sm' | 'lg';
}

export const Tag = ({tag, size = 'sm'}: Props) => {
  return (
    <li
      className={`tag-list inline-block ${
        size === 'sm' ? 'my-1 underline-offset-4' : 'my-3 mx-1 underline-offset-8'
      }`}
    >
      <LinkButton
        href={`/tags/${tag}/`}
        className={`tag ${size === 'sm' ? 'text-sm' : 'text-lg'} pr-2 group font-sans`}
      >
        {/*<svg*/}
        {/*  xmlns="http://www.w3.org/2000/svg"*/}
        {/*  className={`tag-svg ${size === 'sm' ? ' scale-75' : 'scale-110'}`}*/}
        {/*>*/}
        {/*  <path*/}
        {/*    d="M16.018 3.815 15.232 8h-4.966l.716-3.815-1.964-.37L8.232 8H4v2h3.857l-.751 4H3v2h3.731l-.714 3.805 1.965.369L8.766 16h4.966l-.714 3.805 1.965.369.783-4.174H20v-2h-3.859l.751-4H21V8h-3.733l.716-3.815-1.965-.37zM14.106 14H9.141l.751-4h4.966l-.752 4z"*/}
        {/*  ></path>*/}
        {/*</svg>*/}
        #<span>{tag}</span>
      </LinkButton>
    </li>
  );
};
