import { LinkButton } from '@/components/LinkButton/LinkButton';
import './pagination.css';

interface Props {
  currentPage: number;
  totalPages: number;
  prevUrl: string;
  nextUrl: string;
}

export const Pagination = ({currentPage, totalPages, prevUrl, nextUrl}: Props) => {
  const prev = currentPage > 1 ? '' : 'disabled';
  const next = currentPage < totalPages ? '' : 'disabled';

  return (
    totalPages > 1 && (
      <nav className="pagination-wrapper" aria-label="Pagination">
        <LinkButton
          disabled={prev === 'disabled'}
          href={prevUrl}
          className={`mr-4 select-none ${prev}`}
          ariaLabel="Previous"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={`${prev}-svg`}>
            <path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z"/>
          </svg>
          Prev
        </LinkButton>
        {currentPage} / {totalPages}
        <LinkButton
          disabled={next === 'disabled'}
          href={nextUrl}
          className={`ml-4 select-none ${next}`}
          ariaLabel="Next"
        >
          Next
          <svg xmlns="http://www.w3.org/2000/svg" className={`${next}-svg`}>
            <path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"/>
          </svg>
        </LinkButton>
      </nav>
    )
  );
};
