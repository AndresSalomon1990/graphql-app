import React, { useState } from 'react';
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from '../queries/queries';
import BookDetails from './BookDetails';

export default function BookList() {
  const [selected, setSelected] = useState(null);
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <ul id="book-list">
        {data.books.map(book => (
          <li key={book.id} onClick={(e) => setSelected(book.id)}>{book.name}</li>
        ))}
      </ul>
      <BookDetails bookId={selected} />
    </div>
  )
}
