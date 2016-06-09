import React from "react";

import { exploreUp } from '../../actions'

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleBackClick = this.handleBackClick.bind(this);
    }
  
    handleBackClick() {
        this.context.store.dispatch(exploreUp());
    }
    
    render() {     
        return (
            <div className="navigationBar">
                <div class="back" onClick={this.handleBackClick}>Back</div>
                <div class="location"><span>Location: </span>{this.props.path}</div>
            </div>
        );
    }
}


NavigationBar.contextTypes = {
    store: React.PropTypes.object
}

export default NavigationBar;