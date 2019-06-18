const fetchTimeline = () => {
    
    return fetch("http://localhost:8080/api/1.0/twitter/timeline");

}

export default fetchTimeline;