import React, { useState, useEffect } from 'react'

export default function BookReviews() {
  const [books, setBooks] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const url = 'https://raw.githubusercontent.com/moonvd/hw/master/books.txt';
    fetch(url)
      .then(response => response.text())
      .then(data => {
        const booksStrArr = data.split('\n\n');
        const books = [];
        for (let str of booksStrArr) {
          const bookArr = str.split('\n');
          const book = {
            title: bookArr[0],
            author: bookArr[1],
            description: bookArr[2],
            image: bookArr[3],
          }
          books.push(book);
        }
        setBooks(books)
      });

  }, []);

  const onSubmit = (index) => {
    const newBooks = [...books];
    if (newBooks[index].comments) {
      newBooks[index].comments.push(comment);
    } else {
      newBooks[index].comments = [comment];
    }
    setBooks(newBooks);
    setComment('');
  }

  return (
    <div>
      <h1>Books</h1>
      {books.map((book, index) => (
        <div className="book" key={index}>
          <h2>{book.title}</h2>
          <p className="author">{book.author}</p>
          <p>{book.description}</p>
          <img src={book.image} />
          {book.comments ?
            <>
              <h3>User comments</h3>
              {book.comments.map((comment, ind) => (
                <p key={ind}>{comment}</p>
              ))}
            </> : null
          }
          <textarea onChange={(e) => setComment(e.target.value)} value={comment} placeholder="Comment here..." />
          <button type="submit" onClick={() => onSubmit(index)} disabled={comment ? false : true} >Submit</button>
        </div>
      ))}
    </div>
  )
}
