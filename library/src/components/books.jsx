import React, { useState } from "react";
import styled from "styled-components";

const Books = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState(0);
  const [isRead, setIsRead] = useState(false);
  const [isBookForm, setIsBookForm] = useState(false);
  const [myLib, setMyLib] = useState([]);

  class BookObj {
    constructor(title, author, pages, isRead) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.isRead = isRead;
    }

    info() {
      let readStatus = this.isRead ? "read" : "not read yet";
      return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
    }
  }

  const handleBooks = (event) => {
    event.preventDefault();
    addBookToLib(title, author, pages, isRead);
    setIsBookForm(false);
  };

  const handlePlus = (event) => {
    event.preventDefault();
    setTitle("");
    setAuthor("");
    setPages(0);
    setIsRead(false);
    // setIsBookForm(true);
  };

  const addBookToLib = (title, author, pages, isRead) => {
    let book = new BookObj(title, author, pages, isRead);
    setMyLib([...myLib, book]);
  };

  const booksInfo = () => {
    return myLib.map((book, index) => (
      <div key={index}>
        <p>{book.info()}</p>
      </div>
    ));
  };

  return (
    <>
      <Content>
        <button onClick={() => setIsBookForm(true)}>Add</button>
        {isBookForm && (
          <Form onSubmit={handleBooks}>
            <label>Title:</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="title"
            />
            <label>Author:</label>
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="author"
            />
            <label>Pages:</label>
            <input
              type="number"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              placeholder="pages"
            />
            <label>Read or Not:</label>
            <select
              value={isRead}
              onChange={(e) => setIsRead(e.target.value === "true")}
            >
              <option value="" disabled>
                Select
              </option>
              <option value="true">Read</option>
              <option value="false">Not Read</option>
            </select>
            <button type="submit">Add Book</button>
          </Form>
        )}

        <div>
          <button onClick={handlePlus}>+</button>
        </div>
        <button onClick={booksInfo}>Show Books</button>
        <div>{booksInfo()}</div>
      </Content>
    </>
  );
};

export default Books;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;
