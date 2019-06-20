const fetchTimeline = (timelineType) => {

    const timelinePaths = {
        home: "http://localhost:8080/api/1.0/twitter/timeline",
        user: "http://localhost:8080/api/1.0/twitter/user-timeline"
    }

    let emptyPromise = new Promise((resolve) => resolve(""));
    
    return fetch(timelinePaths[timelineType])
        .then((promiseResponse) => {
            return (promiseResponse.status === 200)?
                promiseResponse.json() :
                emptyPromise;
        })
        .catch((error) => {
            console.log(`Error occurred during fetch: ${error}`);
            return emptyPromise;
        });

}

export default fetchTimeline;