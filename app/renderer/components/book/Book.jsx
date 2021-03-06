import React from "react";

import { viewBook } from 'renderer/actions'

class Book extends React.Component {
  constructor(props) {
      super(props);

      this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.context.store.dispatch(viewBook(this.props.book));
  }

  render() {
    return (
      <div className="book" onClick={this.handleClick}>
        <div className="title">{this.props.book.title}</div>
        <div className="author">{this.props.book.author}</div>
      </div>
    );
  }
}


Book.contextTypes = {
    store: React.PropTypes.object
}

export default Book;