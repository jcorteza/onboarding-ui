document.addEventListener("DOMContentLoaded", () => {
    let request = new XMLHttpRequest();
    const btn = document.getElementById("apiButton");
    
    btn.addEventListener("click", (e) => {
        
        e.preventDefault();
        request.addEventListener("load", function() {
            const apiDataContainer = document.getElementById("apiDataContainer");
            let textNode = document.createTextNode(this.responseText);
            let pargraph = document.createElement("p").appendChild(textNode);
            apiDataContainer.appendChild(pargraph);
        });
        request.open("GET", "http://localhost:8080/api/1.0/twitter/timeline");
        request.send();
        
    });
});