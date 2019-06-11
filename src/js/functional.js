import "../css/main.css";
import HelloReact from "../components/HelloReact.jsx";

document.addEventListener("DOMContentLoaded", () => {
    let request = new XMLHttpRequest();
    const twLogo = require("../img/twitter-logo.png");
    const btn = this.getElementById("apiButton");
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

        const statusArray = JSON.parse(this.response);
        
        apiDataContainer.innerHTML = "";
        for(let i = 0; i < statusArray.length; i++) {

            const newMessageNode = this.createTextNode(statusArray[i].message);
            const dateOjbect = new Date(statusArray[i].createdAt);
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
            const user = statusArray[i].user;
            
            if(user) {
                newImage.src = statusArray[i].user.profileImageUrl;
                anchor.href = statusArray[i].postUrl;
                nameText.textContent = user.name;
                handleText.textContent = user.twHandle;
                handleText.className = "handle";
                userDiv.append(handleText);
            } else {
                newImage.src = twLogo;
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

    ReactDOM.render(<HelloReact />, reactContainer);
});