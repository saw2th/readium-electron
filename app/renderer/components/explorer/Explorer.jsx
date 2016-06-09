import React from "react";

import NavigationBar from "./NavigationBar";
import Directory from "./Directory";


/**
 * Properties:
 * - directories: {path, name}
 * - path
 */
class Explorer extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        var obj = this; 
        
        var directoryNodes = this.props.directories.map(function(directory, index) {
            return (
                <Directory key={index} path={directory.path} name={directory.name} />
            );
        }); 
             
        return (
            <div className="explorer">
                <NavigationBar path={this.props.currentDirectory.path} name={this.props.currentDirectory.name} />
                <div class="directoryList">
                    {directoryNodes}
                </div>
            </div>
        );
    }
}

export default Explorer;