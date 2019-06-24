import fetchTimeline from "../js/fetchTimeline.js";
import React, { Component } from "react";
import TweetContainer from "./TweetContainer.jsx";

class TimelineContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            errorOccurred: false,
            filtered: false,
            keyword: ""
        }
        
        this.errorMessage = "This content is not currently available. Please try again later.";
        this.fillerMessage = "Loading your Twitter timeline...";

        this.fetchData = () => {

            let type = this.props.timelineType;

            if(this.state.filtered) {
                type = "filtered";
            }

            fetchTimeline(type, this.state.keyword)
            .then((data) => {
                this.updateStatus(data);
            })
            .catch((error) => {
                console.log(`Error occurred during fetchData: ${error}`);
                this.updateStatus([]);
            });
        }

        this.updateStatus = (responseData) => {
            if(responseData.length === 0) {
                this.setState({
                    data: responseData,
                    errorOccurred: true
                });
            } else {
                this.setState({
                    data: responseData,
                    errorOccurred: false
                });
            }
        }

        this.handleClick = (e) => {
            e.preventDefault();
            this.setState({
                data: [],
                errorOccurred: false
            });
            this.fetchData();
        }
    }

    handleChange() {
        this.setState({keyword: event.target.value});
    }

    handleFilter() {
        this.setState({filtered: !this.state.filtered});
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        let timelineContainer;
        if(this.state.errorOccurred === true) {
            timelineContainer = (
                <div id="timelineContainer">
                    <p>{this.errorMessage}</p>
                </div>
            );
        } else if(this.state.errorOccurred === false && this.state.data.length > 0) {
            timelineContainer = (
                <div id="timelineContainer">
                    {this.state.data.map(status => 
                        <TweetContainer key={status.postUrl} user={status.user} postUrl={status.postUrl} message={status.message} createdAt={status.createdAt}/>
                    )}
                </div> 
            );
        } else if (this.state.errorOccurred === false) {
            timelineContainer = (
                <div id="timelineContainer">
                    <p>{this.fillerMessage}</p>
                </div>
            );
        }

        return (
            <div id="apiContainer">
                <button id="apiButton" type="button" onClick={this.handleClick}>Get Twitter Timeline</button>
                {(this.props.type === "home")?
                    <div>
                        <label for="filterInput">Filter By Keyword</label>
                        <input type="text" name="filterInput" value="" placeholder="filter keyword" onChange={this.handleChange}></input> 
                        <button type="button" onClick={this.handleFilter}>Filter</button>
                    </div>:
                    null}
                {timelineContainer}
            </div>
        );
    }
}

export default TimelineContainer;