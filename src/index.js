document.addEventListener("DOMContentLoaded", () => {
    import "./style/css/main.css";
    import TimelineContainer from "./components/TimelineContainer.jsx";
    document.getElementById("root");
    
    ReactDOM.render(<TimelineContainer />, document.getElementById("root"));
});