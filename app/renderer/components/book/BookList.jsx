require('../../stylesheets/sass/book.scss');

import React from "react";

import Book from "./Book";

export default class BookList extends React.Component {
  render() {
    var bookNodes = this.props.books.map(function(book, index) {
      return (
        <Book key={index} title={book.title} author={book.author} path={book.path} />
      );
    });
    
    return (
      <div className="bookList">
        {bookNodes}
      </div>
    );
  }
}
