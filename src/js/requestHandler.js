const requestHandler = {
    
    initRequest(request, component){

        request.addEventListener("load", () => {
            return component.setState({
                ajaxResponse: JSON.parse(request.response),
                errorOccured: false
            });
        });

        request.addEventListener("error", () => {
            return component.setState({
                ajaxResponse: [],
                errorOccured: true
            });
        });

        request.addEventListener("readystatechange", () => {
            if(request.readyState <= 1) {
                return component.setState({processFinished: false})
            } else if (request.readyState === 4) {
                return component.setState({processFinished : true});
            }
        });
    },
    sendRequest(request){
        request.open("GET", "http://localhost:8080/api/1.0/twitter/timeline");
        request.send();
    }
}

export default requestHandler;