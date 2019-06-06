document.addEventListener("DOMContentLoaded", () => {
    let request = new XMLHttpRequest();
    const btn = document.getElementById("apiButton");
    const apiDataContainer = document.getElementById("apiDataContainer");
    const appendParagraph = (textNode, container) => {
        let pargraph = document.createElement("p").appendChild(textNode);
        container.append(pargraph);
    }
    const sendTimelineRequest = () => {
        request.open("GET", "http://localhost:8080/api/1.0/twitter/timeline");
        request.send();
    }
    /*const getFormattedDate = (dateOjbect) => {
        const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const month = dateOjbect.getMonth();
        const day = dateOjbect.getDate();
        const year = dateOjbect.getFullYear();
        return `${monthsArray[month]} ${day}, ${year}`;
    }*/
    
    request.addEventListener("load", function() {

        const statusArray = JSON.parse(this.response);

        for(i = 0; i < statusArray.length; i++) {

            const newMessageNode = document.createTextNode(statusArray[i].message);
            const dateOjbect = new Date(statusArray[i].createdAt);
            const dateString = dateOjbect.toUTCString();
            const newDateNode = document.createTextNode(dateString);
            const newImage = document.createElement("img");
            const newPargraph = document.createElement("p");
            const newSpan = document.createElement("span");
            const newDiv = document.createElement("div");
            const anchor = document.createElement("a");
            
            if(statusArray[i].user) {
                newImage.src = statusArray[i].user.profileImageUrl;
                anchor.href = statusArray[i].postUrl;
            } else {
                newImage.src = "./img/twitter-logo.png";
                anchor.href = "";
            }
            newImage.alt = "User profile image.";
            newPargraph.appendChild(newMessageNode);
            newSpan.appendChild(newDateNode)
            newDiv.append(newImage, newSpan, newPargraph);
            newDiv.className = "tweetContainer";
            anchor.target = "_blank";
            anchor.append(newDiv);
            apiDataContainer.appendChild(anchor);
        }
    });

    request.addEventListener("error", () => {
        let textNode = document.createTextNode("This content is not currently available. Please try again later.");
        appendParagraph(textNode, apiDataContainer);
    });

    sendTimelineRequest();

    btn.addEventListener("click", (e) => {

        e.preventDefault();
        apiDataContainer.innerHTML = "";
        sendTimelineRequest();
    
    });
});