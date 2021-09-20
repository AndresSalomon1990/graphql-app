import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOK } from '../queries/queries';

export default function BookDetails({ bookId }) {
  const { loading, error, data } = useQuery(GET_BOOK, { variables: { id: bookId }});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>No book selected...</p>;

  return (
    <div id="book-details">
      <h2>{data.book.name}</h2>
      <p>{data.book.genre}</p>
      <p>{data.book.author.name}</p>
      <p>All books from this author:</p>
      <ul className='other-books'>
        { data.book.author.books.map(book => (
            <li key={book.id}>{book.name}</li>
        )) }
      </ul>
    </div>
  )
}
