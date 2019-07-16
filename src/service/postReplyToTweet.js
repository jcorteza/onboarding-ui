const postReplyToTweet = (replyText, statusID) => {

    return new Promise((resolve, reject) => {
        let headers = new Headers();

        headers.append("Content-Type", "application/x-www-form-urlencoded");

        fetch("http://localhost:8080/api/1.0/twitter/reply", {
            method: "POST",
            headers: headers,
            body: `message=${replyText}&inReplyTo=${statusID}`
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

};

export default postReplyToTweet;