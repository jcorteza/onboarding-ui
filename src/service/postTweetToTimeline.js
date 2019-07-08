const postTweetToTimeline = (tweetText) => {
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    return new Promise((resolve, reject) => {
        fetch("http://localhost:8080/api/1.0/twitter/tweet", {
            method: "POST",
            headers: headers,
            body: `message=${tweetText}`
        }).then((fetchResponse) => {

            if(fetchResponse.ok) {

                resolve({successful: true});

            } else {

                resolve({successful: false});

            }

        }).catch((error) => {
            reject(error);
        });
    });
}

export default postTweetToTimeline;