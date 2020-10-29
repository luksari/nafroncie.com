import styled from 'styled-components';
import { Link } from 'gatsby';
import { darken } from 'polished';
import React, { FC } from 'react';
import { media } from '@utils/media';

export const PaginationContainer = styled.div`
  width: 100%;
  text-align: center;
`;

export const PaginationContent = styled.div`
  display: inline-block;
  border-radius: 35px;
  width: 100%;
  height: 100%;

  @media ${media.phone} {
    padding: 0 1rem;
  }

  .page-numbers {
    display: block;
    float: left;
    transition: 400ms ease;
    color: ${({ theme }) => theme.colors.grey.light};
    letter-spacing: 0.1em;
    padding: 1rem;

    &:hover,
    &.current {
      background: ${({ theme }) => theme.colors.secondary};
      color: ${({ theme }) => theme.colors.lightText};
    }
    &.prev {
      margin-left: -1.5rem;
    }
    &.next {
      margin-right: -1.5rem;
    }
    &.prev:hover,
    &.next:hover {
      background-color: transparent;
      color: ${({ theme }) => darken(0.2, theme.colors.primary)};
    }

    @media ${media.tablet} {
      padding: 0 1.4rem;
      display: none;

      &:nth-of-type(2) {
        position: relative;
        padding-right: 5rem;

        &::after {
          content: '...';
          position: absolute;
          top: 0;
          left: 4.5rem;
        }
      }

      &:nth-child(-n + 3),
      &:nth-last-child(-n + 3) {
        display: block;
      }

      &:nth-last-child(-n + 4) {
        padding-right: 1.4rem;

        &::after {
          content: none;
        }
      }
    }
  }
`;
interface IProps {
  readonly currentPage: number;
  readonly totalPages: number;
  readonly url: string;
}

export const Pagination: FC<IProps> = ({ currentPage, totalPages, url }) => {
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;
  const prevPage =
    currentPage - 1 === 1
      ? `/${url}/`
      : `/${url}/${(currentPage - 1).toString()}`;
  const nextPage = `/${url}/${(currentPage + 1).toString()}`;

  return (
    <>
      {totalPages > 1 && (
        <PaginationContainer>
          <PaginationContent>
            {!isFirst && (
              <Link className="prev page-numbers" to={prevPage} rel="prev">
                ← Poprzednia
              </Link>
            )}
            {Array.from({ length: totalPages }, (_, i) => (
              <Link
                className={
                  currentPage === i + 1
                    ? 'page-numbers current'
                    : 'page-numbers'
                }
                key={`pagination-number${i + 1}`}
                to={`/${url}/${i === 0 ? '' : i + 1}`}
              >
                {i + 1}
              </Link>
            ))}
            {!isLast && (
              <Link className="next page-numbers" to={nextPage} rel="next">
                Następna →
              </Link>
            )}
          </PaginationContent>
        </PaginationContainer>
      )}
    </>
  );
};
export default Pagination;
