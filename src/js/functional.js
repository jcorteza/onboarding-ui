import "../css/main.css";
import Header from "./Header.jsx";
import TimelineContainer from "./TimelineContainer.jsx";

document.addEventListener("DOMContentLoaded", function() {
    const request = new XMLHttpRequest();
    const btn = this.getElementById("apiButton");
    const rootContainer = this.getElementById("root");
    const reactContainer = this.getElementById("reactContainer");
    const apiDataContainer = this.getElementById("apiDataContainer");
    const sendTimelineRequest = () => {
        request.open("GET", "http://localhost:8080/api/1.0/twitter/timeline");
        request.send();
    }
    const getFormattedDate = (dateOjbect) => {
        const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const month = dateOjbect.getMonth();
        const day = dateOjbect.getDate();
        const year = dateOjbect.getFullYear();
        return `${monthsArray[month]} ${day}`;
    }
    
    request.addEventListener("load", () => {
        
        apiDataContainer.innerHTML = "";
        for(let status of JSON.parse(request.response)) {

            const newMessageNode = this.createTextNode(status.message);
            const dateOjbect = new Date(status.createdAt);
            const dateString = getFormattedDate(dateOjbect);
            const newDateNode = this.createTextNode(dateString);
            const newImage = this.createElement("img");
            const newPargraph = this.createElement("p");
            const newSpan = this.createElement("span");
            const nameText = this.createElement("p");
            const handleText = this.createElement("p");
            const userDiv = this.createElement("div");
            const tweetContainer = this.createElement("div");
            const textDiv = this.createElement("div");
            const anchor = this.createElement("a");
            const user = status.user;
            
            if(user) {
                newImage.src = status.user.profileImageUrl;
                anchor.href = status.postUrl;
                nameText.textContent = user.name;
                handleText.textContent = user.twHandle;
                handleText.className = "handle";
                userDiv.append(handleText);
            } else {
                newImage.src = require("../img/twitter-logo.png");
                anchor.href = "";
                nameText.textContent = "Unknown User";
            }
            anchor.target = "_blank";
            newImage.alt = "User profile image.";
            nameText.className = "name";
            userDiv.className = "userDiv";
            textDiv.className = "textDiv";
            tweetContainer.className = "tweetContainer";
            userDiv.prepend(nameText);
            userDiv.prepend(newImage);
            newPargraph.appendChild(newMessageNode);
            newSpan.appendChild(newDateNode);
            anchor.append(newPargraph);
            textDiv.append(newSpan, anchor);
            tweetContainer.append(userDiv, textDiv);
            apiDataContainer.appendChild(tweetContainer);
        }
    });

    request.addEventListener("error", () => {
        apiDataContainer.innerHTML = "<p>This content is not currently available. Please try again later.</p>";
    });

    sendTimelineRequest();

    btn.addEventListener("click", (e) => {

        e.preventDefault();
        apiDataContainer.innerHTML = "<p>Loading your Twitter timeline...</p>"
        sendTimelineRequest();
    
    });

    ReactDOM.render(<TimelineContainer />, rootContainer);
});