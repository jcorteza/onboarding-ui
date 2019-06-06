document.addEventListener("DOMContentLoaded", () => {
    let request = new XMLHttpRequest();
    const btn = document.getElementById("apiButton");
    const apiDataContainer = document.getElementById("apiDataContainer");
    const appendParagraph = (textNode, container) => {
        let pargraph = document.createElement("p").appendChild(textNode);
        container.append(pargraph);
    }
    
    request.addEventListener("load", function() {
        let textNode = document.createTextNode(this.responseText);
        appendParagraph(textNode, apiDataContainer);
    });

    request.addEventListener("error", () => {
        let textNode = document.createTextNode("This content is not currently available. Please try again later.");
        appendParagraph(textNode, apiDataContainer);
    });

    btn.addEventListener("click", (e) => {
        
        e.preventDefault();

        apiDataContainer.innerHTML = "";
        request.open("GET", "http://localhost:8080/api/1.0/twitter/timeline");
        request.send();
        
    });
});