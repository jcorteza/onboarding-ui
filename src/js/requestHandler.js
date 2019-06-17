const requestHandler = {

    request: new XMLHttpRequest(),
    
    initRequest(callback) {

        this.request.onreadystatechange(() => {
            callback();
        });

        // this.request.addEventListener("load", () => {
        //     callback();
        // });

        // this.request.addEventListener("error", () => {
        //     callback();
        // });
    },
    sendRequest() {
        this.request.open("GET", "http://localhost:8080/api/1.0/twitter/timeline");
        this.request.send();
    }
}

export default requestHandler;