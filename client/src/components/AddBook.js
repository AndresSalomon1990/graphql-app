import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_AUTHORS, GET_BOOKS, ADD_BOOK_MUTATION } from '../queries/queries';

export default function AddBook() {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');
  const { loading: authorsLoading, error: authorsError, data: authorsData } = useQuery(GET_AUTHORS);
  const [addBook, { loading: bookLoading, error: bookError }] = useMutation(ADD_BOOK_MUTATION);

  const handleSubmit = (e) => {
    e.preventDefault();

    addBook({
      variables: {
        name,
        genre,
        authorId,
      },
      refetchQueries: [GET_BOOKS],
    });

    setName('');
    setGenre('');
    setAuthorId('');
  }

  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={(e) => setGenre(e.target.value)} value={genre} />
      </div>

      <div className="field">
        <label>Author:</label>
        <select onChange={(e) => setAuthorId(e.target.value)} value={authorId}>
          <option>Select Author</option>
          { authorsLoading && <option>Loading authors...</option> }
          { authorsError && <option>Error... :(</option> }
          { authorsData && authorsData.authors.map(author => (
              <option key={author.id} value={author.id}>{author.name}</option>
          )) }
        </select>
      </div>

      <button>+</button>
      { bookLoading && <p>Submitting...</p> }
      { bookError && <p>Submission error! {bookError.message}</p> }
    </form>
  )
}
