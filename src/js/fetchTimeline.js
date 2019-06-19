const fetchTimeline = () => {
    
    return fetch("http://localhost:8080/api/1.0/twitter/timeline")
        .then((promiseResponse) => {
            return (promiseResponse.status === 200)?
                promiseResponse.json() :
                [];
        })
        .catch((error) => {
            console.log(`Error occurred during fetch: ${error}`);
            return [];
        });

}

export default fetchTimeline;