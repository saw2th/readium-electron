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
        <h2 className="directory">
          {this.props.name}
        </h2>
      </div>
    );
  }
}

Directory.contextTypes = {
    store: React.PropTypes.object
}

export default Directory;