import React from "react";

var Form = React.createClass({
  getInitialState: function() {
    return {value: this.props.value};
  },
  handleChange: function(event) {
    // Longer is the value bigger is the font
    this.setState({value: event.target.value});
  },
  render: function() {
    var style = {
      fontSize: this.state.value.length*2 + "px"
    };
    
    return (
      <div>
      <span>Taille: {this.state.value.length}</span>
      <br />
      <input
        type="text"
        style={style}
        value={this.state.value}
        onChange={this.handleChange}
      />
      </div>
    );
  }
});