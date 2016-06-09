import React from "react";

import { viewBook } from '../../actions'

class Book extends React.Component {
  constructor(props) {
      super(props);
      
      this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.context.store.dispatch(viewBook(this.props.path));
  }
  
  render() {
    return (
      <div className="book" onClick={this.handleClick}>
        <div className="title">{this.props.title}</div>
        <div className="author">{this.props.author}</div>
      </div>
    );
  }
}


Book.contextTypes = {
    store: React.PropTypes.object
}

export default Book;