const postTweetToTimeline = (tweetText) => {
    let data = {message: tweetText};

    return new Promise((resolve, reject) => {
        fetch("http://localhost:8080/api/1.0/twitter/tweet", {
            method: "POST",
            body: JSON.stringify(data)
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