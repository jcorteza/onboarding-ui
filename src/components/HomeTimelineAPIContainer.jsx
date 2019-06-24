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
        
        this.fillerMessage = "No tweets are available. Follow someone on Twitter."

        this.fetchData = () => {
            fetchHomeTimeline()
            .then((data) => {
                this.updateStatus(data);
            })
            .catch((error) => {
                console.log(`Error occurred during HomeTimelineContainer fetchData: ${error}`);
                this.updateStatus("");
            });
        }

        this.updateStatus = (responseData) => {
            if(responseData === "") {
                this.setState({
                    fetchComplete: true,
                    errorOccurred: true
                });
            } else {
                this.setState({
                    data: responseData,
                    fetchComplete: true,
                    errorOccurred: false
                });
            }
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
            <div className="apiContainer" id="HomeTimelineAPIContainer">
                <h2>Home Timeline</h2>
                <button className="apiButton" type="button" onClick={this.handleClick}>View Twitter Timeline</button>
                <TimelineContainer data={this.state.data} fetchComplete={this.state.data} errorOccurred={this.errorOccurred} fillerMessage={this.fillerMessage}/>
            </div>
        );
    }
}

export default HomeTimelineAPIContainer;