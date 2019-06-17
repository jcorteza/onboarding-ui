function requestHandler(callback) {
    const request = new XMLHttpRequest();
    request.addEventListener("error", () => {
        callback(request.status, request.response);
    });
    request.addEventListener("load", () => {
        callback(request.status, request.response);
    });
    request.open("GET", "http://localhost:8080/api/1.0/twitter/timeline");
    request.send();
}

export default requestHandler;