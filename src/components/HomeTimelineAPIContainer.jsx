import React, { Component } from "react";
import TimelineContainer from "./TimelineContainer.jsx";
import fetchHomeTimeline from "../js/fetchHomeTimeline.js";

class HomeTimelineAPIContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            fetchComplete: false,
            errorOccurred: false
        }

        this.fetchData = () => {
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

        this.handleClick = (e) => {
            e.preventDefault();
            this.setState({
                fetchComplete: false,
                errorOccurred: false
            });
            this.fetchData();
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <div className="apiContainer" id="homeTimelineAPIContainer">
                <h2>Home Timeline</h2>
                <button className="apiButton" type="button" onClick={this.handleClick}>View Twitter Timeline</button>
                <TimelineContainer data={this.state.data} fetchComplete={this.state.fetchComplete} errorOccurred={this.state.errorOccurred} fillerMessage={this.fillerMessage}/>
            </div>
        );
    }
}

HomeTimelineAPIContainer.prototype.fillerMessage = "No tweets are available. Follow someone on Twitter.";

export default HomeTimelineAPIContainer;