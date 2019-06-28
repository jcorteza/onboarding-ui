import React, { Component } from "react";
import TimelineContainer from "./TimelineContainer";
import fetchHomeTimeline from "../../service/fetchHomeTimeline";
import fetchFilteredHomeTimeline from "../../service/fetchFilteredHomeTimeline";

class HomeTimelineUIContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            keyword: "",
            fetchComplete: false,
            errorOccurred: false
        }

        this.fetchData = this.fetchData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.fetchFilteredData = this.fetchFilteredData.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);

    }

    fetchData() {
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

    handleClick(e) {
        e.preventDefault();
        this.setState({
            data: [],
            fetchComplete: false,
            errorOccurred: false
        });
        this.fetchData();
    }

    fetchFilteredData(e) {

        if(e) {
            e.preventDefault();
        }

        this.setState({
            data: [], 
            fetchComplete: false,
            errorOccurred: false 
        });
        fetchFilteredHomeTimeline(this.state.keyword.toLowerCase())
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

    handleTextChange(e) {
        this.setState({ keyword: e.target.value});
    }

    handleKeyPress(e) {
        if (e.key === "Enter" && this.state.keyword.valueOf()) {
            this.fetchFilteredData();
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <div className="uiContainer" id="homeTimelineUIContainer">
                <h2 className="timelineHeaderText">Home Timeline</h2>
                <button className="uiButton" type="button" onClick={this.handleClick}>View Twitter Timeline</button>
                <div id="filterDiv">
                    <input id="filterInput" type="text" placeholder="filter text" value={this.state.keyword} onChange={this.handleTextChange} onKeyPress={this.handleKeyPress}></input>
                    <button id="filterButton" type="button" onClick={this.fetchFilteredData} disabled={(this.state.keyword)? false : true}>Filter</button>
                </div>
                <TimelineContainer data={this.state.data} fetchComplete={this.state.fetchComplete} errorOccurred={this.state.errorOccurred} fillerMessage={this.fillerMessage}/>
            </div>
        );
    }
}

HomeTimelineUIContainer.prototype.fillerMessage = "No tweets are available. Follow someone on Twitter.";

export default HomeTimelineUIContainer;