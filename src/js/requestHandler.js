const requestHandler = (this) => {
    const request = new XMLHttpRequest();

    request.addEventListener("load", () => {
        this.setState({
            ajaxResponse: JSON.parse(request.response),
            errorOccured: false
        });
    });

    request.addEventListener("error", () => {
        this.setState({
            ajaxResponse: [],
            errorOccured: true
        });
    });

    request.addEventListener("readystatechange", () => {
        if(request.readyState <= 1) {
            this.setState({processFinished: false})
        } else if (request.readyState === 4) {
            this.setState({processFinished : true});
        }
    });
    request.open("GET", "http://localhost:8080/api/1.0/twitter/timeline");
    request.send();
}

export default requestHandler;