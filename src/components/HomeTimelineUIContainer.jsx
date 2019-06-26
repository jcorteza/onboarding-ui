import React, { Component } from "react";
import TimelineContainer from "./TimelineContainer";
import fetchHomeTimeline from "../js/fetchHomeTimeline";
import fetchFilteredHomeTimeline from "../js/fetchFilteredHomeTimeline";

class HomeTimelineUIContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            keyword: "",
            filtered: false,
            fetchComplete: false,
            errorOccurred: false
        }

    }

    fetchData(isFiltered) {

        if(isFiltered) {

            fetchFilteredHomeTimeline(this.state.keyword)
                .then((responseData) => {

                    this.setState({
                        data: responseData,
                        fetchComplete: true,
                        errorOccurred: false
                    });

                })
                .catch((error) => {

                    console.log(`Error occurred during fetchHomeTimeline: ${error}`);
                    this.setState({
                        fetchComplete: true,
                        errorOccurred: true
                    });

                });
        } else {

            fetchHomeTimeline()
                .then((responseData) => {

                    this.setState({
                        data: responseData,
                        fetchComplete: true,
                        errorOccurred: false
                    });

                })
                .catch((error) => {

                    console.log(`Error occurred during fetchHomeTimeline: ${error}`);
                    this.setState({
                        fetchComplete: true,
                        errorOccurred: true
                    });

                });
                
        }
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({
            data: [],
            fetchComplete: false,
            errorOccurred: false
        });
        this.fetchData(this.state.filtered);
    }

    toggleFilter(e) {
        let isFiltered = !this.state.filtered;

        e.preventDefault();
        this.setState({ filtered: isFiltered });
        this.fetchData(isFiltered);
    }

    handleTextChange(e) {
        this.setState({ keyword: e.target.value});
    }

    componentDidMount() {
        this.fetchData(this.state.filtered);
    }

    render() {
        return (
            <div className="uiContainer" id="homeTimelineUIContainer">
                <h2 className="timelineHeaderText">Home Timeline</h2>
                <button className="uiButton" type="button" onClick={this.handleClick}>View Twitter Timeline</button>
                <input id="filterInput" type="text" placeholder="filter text" value={this.state.keyword} onChange={this.handleTextChange}></input>
                <button id="filterButton" type="button" onClick={this.toggleFilter}>Filter</button>
                <TimelineContainer data={this.state.data} fetchComplete={this.state.fetchComplete} errorOccurred={this.state.errorOccurred} fillerMessage={this.fillerMessage}/>
            </div>
        );
    }
}

HomeTimelineUIContainer.prototype.fillerMessage = "No tweets are available. Follow someone on Twitter.";

export default HomeTimelineUIContainer;