const fetchUserTimeline = () => {

    let emptyPromise = new Promise((resolve) => resolve(""));
    
    return fetch("http://localhost:8080/api/1.0/twitter/user-timeline")
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

export default fetchUserTimeline;