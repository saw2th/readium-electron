require("renderer/stylesheets/sass/reader.scss");

//import FontAwesome from "react-fontawesome";
import path from "path";

import React from "react";
import Readium from "readium-js";

import { explore } from 'renderer/actions'

/**
 * Properties:
 * - book object (path, title, author)
 */
class Reader extends React.Component {
    constructor(props) {
        super(props);
        this.readium = null;
        this.state = {
            hasPreviousPage: true,
            hasNextPage: true
        };

        // Handlers
        this.handlePreviousPage = this.handlePreviousPage.bind(this);
        this.handleNextPage = this.handleNextPage.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    buildState() {
        this.setState({
            hasPreviousPage: this.hasPreviousPage(),
            hasNextPage: this.hasNextPage()
        });
    }

    componentDidMount() {
        var obj = this;
        var readiumOptions = { useSimpleLoader: true };
        var readerOptions = {el: "#reader .view"};
        this.readium = new Readium(readiumOptions, readerOptions);
        this.readium.openPackageDocument("epub://" + this.props.book.path, (packageDocument, options) => {
            // Package loaded
        }, null);

        this.readium.reader.on("PaginationChanged", function (iframe, spineItem) {
            // Pagination changed
            obj.buildState();
        });
    }

    /**
     * Returns true if previous page is available
     */
    hasPreviousPage() {
        var spine = this.readium.reader.spine();
        var paginationInfo = this.readium.reader.getPaginationInfo();

        if (paginationInfo.openPages.length == 0) {
            return false;
        }

        var firstOpenPage = paginationInfo.openPages[0];

        if (firstOpenPage.spineItemPageIndex > 0) {
            return true;
        }

        var currentSpineItem = spine.getItemById(firstOpenPage.idref);
        var prevSpineItem = spine.prevItem(currentSpineItem);

        if (!prevSpineItem) {
            return false;
        }

        return true;
    }

    /**
     * Returns true if next page is available
     */
    hasNextPage() {
        var spine = this.readium.reader.spine();
        var paginationInfo = this.readium.reader.getPaginationInfo();

        if (paginationInfo.openPages.length == 0) {
            return false;
        }

        var lastOpenPage = paginationInfo.openPages[paginationInfo.openPages.length - 1];

        if (lastOpenPage.spineItemPageIndex < lastOpenPage.spineItemPageCount - 1) {
            return true;
        }

        var currentSpineItem = spine.getItemById(lastOpenPage.idref);
        var nextSpineItem = spine.nextItem(currentSpineItem);

        if (!nextSpineItem) {
            return false;
        }

        return true;
    }

    handlePreviousPage() {
        this.readium.reader.openPagePrev();
    }

    handleNextPage() {
        this.readium.reader.openPageNext();
    }

    handleClose() {
        this.readium.closePackageDocument();
        this.context.store.dispatch(explore(path.dirname(this.props.book.path)));
    }

    render() {
        return (
          <div id="reader">
              <div className="header">{this.props.book.title}</div>
              <div className="view" id="reader-view"></div>
              <div className="navigation">
                <div className="previous" data-enabled={this.state.hasPreviousPage} onClick={this.handlePreviousPage}><div><span>Previous</span></div></div>
                <div className="next" data-enabled={this.state.hasNextPage} onClick={this.handleNextPage}><div><span>Next</span></div></div>
                <div className="close" onClick={this.handleClose}><span>Close</span></div>
              </div>
          </div>
      );
    }
}

Reader.contextTypes = {
    store: React.PropTypes.object
}

export default Reader;