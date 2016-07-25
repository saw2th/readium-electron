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
            <div className="navigation-bar">
                <div className="back" onClick={this.handleBackClick}><label>Back</label></div>
                <div className="location"><label>Location: </label>{this.props.path}</div>
            </div>
        );
    }
}


NavigationBar.contextTypes = {
    store: React.PropTypes.object
}

export default NavigationBar;