const fetchHomeTimeline = () => {

    return new Promise((resolve, reject) => {
        fetch("http://localhost:8080/api/1.0/twitter/timeline")
            .then((promiseResponse) => {

                if(promiseResponse.status === 200) {

                    return promiseResponse.json();

                } else {

                    reject(new Error(`Something went wrong during the API call. Status: ${promiseResponse.status}`));

                }

            })
            .then(data => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export default fetchHomeTimeline;