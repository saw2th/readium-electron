require('../../stylesheets/sass/book.scss');

import React from "react";

import Book from "./Book";

export default class BookList extends React.Component {
  render() {
    var bookNodes = this.props.books.map(function(book, index) {
      return (
        <Book key={index} book={book} />
      );
    });
    
    return (
      <div className="bookList">
        {bookNodes}
      </div>
    );
  }
}
