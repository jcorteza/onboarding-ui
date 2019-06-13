const fetchUrl = require("fetch").fetchUrl;

const fetchTimeline = () => {
    
    return fetchUrl("http://localhost:8080/api/1.0/twitter/timeline", (error, meta, body) => {

        if(error) {
            throw error;
        }

        return body;
    });

}

export default fetchTimeline;
