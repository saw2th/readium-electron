require('../../stylesheets/sass/explorer.scss');

import React from "react";

import { explore } from '../../actions'

class Directory extends React.Component {
  constructor(props) {
      super(props);
      
      this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.context.store.dispatch(explore(this.props.path));
  }
   
  render() {
    return (
      <div className="directory" onClick={this.handleClick}>
        <span>
          {this.props.name}
        </span>
      </div>
    );
  }
}

Directory.contextTypes = {
    store: React.PropTypes.object
}

export default Directory;