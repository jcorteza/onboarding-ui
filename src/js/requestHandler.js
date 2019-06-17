const requestHandler = {

    request: new XMLHttpRequest(),
    initRequest: (request, callback) => {
        request.onreadystatechange = () => {
            callback();
        };
    },
    sendRequest: (request)=> {
        request.open("GET", "http://localhost:8080/api/1.0/twitter/timeline");
        request.send();
    }
}

export default requestHandler;