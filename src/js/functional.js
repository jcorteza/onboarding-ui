document.addEventListener("DOMContentLoaded", () => {
    let request = new XMLHttpRequest();
    const btn = document.getElementById("apiButton");
    const apiDataContainer = document.getElementById("apiDataContainer");
    const fillerTextPTag = document.getElementById("fillerText");
    const fillerTextPTagValue = fillerTextPTag.outerHTML;
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
    
    request.addEventListener("load", function() {

        const statusArray = JSON.parse(this.response);
        
        apiDataContainer.innerHTML = "";
        for(i = 0; i < statusArray.length; i++) {

            const newMessageNode = document.createTextNode(statusArray[i].message);
            const dateOjbect = new Date(statusArray[i].createdAt);
            const dateString = getFormattedDate(dateOjbect);
            const newDateNode = document.createTextNode(dateString);
            const newImage = document.createElement("img");
            const newPargraph = document.createElement("p");
            const newSpan = document.createElement("span");
            const nameText = document.createElement("p");
            const handleText = document.createElement("p");
            const userDiv = document.createElement("div");
            const tweetContainer = document.createElement("div");
            const textDiv = document.createElement("div");
            const anchor = document.createElement("a");
            const user = statusArray[i].user;
            
            if(user) {
                newImage.src = statusArray[i].user.profileImageUrl;
                anchor.href = statusArray[i].postUrl;
                nameText.textContent = user.name;
                handleText.textContent = user.twHandle;
                userDiv.append(handleText);
            } else {
                newImage.src = "./img/twitter-logo.png";
                anchor.href = "";
                nameText.textContent = "Unknown User";
            }
            nameText.className = "name";
            handleText.className = "handle";
            userDiv.prepend(nameText);
            userDiv.prepend(newImage)
            userDiv.className = "userDiv";
            newImage.alt = "User profile image.";
            newPargraph.appendChild(newMessageNode);
            newSpan.appendChild(newDateNode)
            textDiv.append(newSpan, newPargraph);
            textDiv.className = "textDiv";
            tweetContainer.append(userDiv, textDiv);
            tweetContainer.className = "tweetContainer";
            anchor.target = "_blank";
            anchor.append(tweetContainer);
            apiDataContainer.appendChild(anchor);
        }
    });

    request.addEventListener("error", () => {
        fillerTextPTag.innerText = "This content is not currently available. Please try again later.";
    });

    sendTimelineRequest();

    btn.addEventListener("click", (e) => {

        e.preventDefault();
        apiDataContainer.innerHTML = "";
        apiDataContainer.innerHTML = fillerTextPTagValue;
        sendTimelineRequest();
    
    });
});