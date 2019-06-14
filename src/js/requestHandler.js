const requestHandler = {
    
    initRequest: (request) => {

        request.addEventListener("load", function() {
            return this.setState({
                ajaxResponse: JSON.parse(request.response),
                errorOccured: false
            });
        });

        request.addEventListener("error", function() {
            return this.setState({
                ajaxResponse: [],
                errorOccured: true
            });
        });

        request.addEventListener("readystatechange", function() {
            if(request.readyState <= 1) {
                return this.setState({processFinished: false})
            } else if (request.readyState === 4) {
                return this.setState({processFinished : true});
            }
        });
    },
    sendRequest: (request) => {
        request.open("GET", "http://localhost:8080/api/1.0/twitter/timeline");
        request.send();
    }
}

export default requestHandler;