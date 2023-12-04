import React from "react";

export default function TestPostServer() {
    const images = [{
        uri: "assets/EyedLadyBug1.jpeg",
        name: "EyedLadyBug1.jpeg",
        type: "image/jpeg"
    },
    {
        uri: "assets/EyedLadyBug2.jpeg",
        name: "EyedLadyBug2.jpeg",
        type: "image/jpeg"
    }
    ];

    const title = "title";
    const description = "description";

    const date = new Date();

    const location = {
        latitude: 0,
        longitude: 0,
    };

    const campaignID = 355;
    const category = "Insects";

    const pseudo = "Srall";

    const uploadImages = (id) => {
        images.slice(1).forEach(image => {
            var headers = new Headers();

            var formdata = new FormData();
            formdata.append("image", { uri: image.uri, name: image.name, type: image.type })

            let putOptions = {
                method: 'PUT',
                body: formdata
            };

            fetch('http://localhost:8080/observation/' + id + '/upload', putOptions)
                .catch((error) => {
                    console.error("failed to upload images")
                    console.error(error);
                })
        });
    }

    const postObservation = () => {

        var formdata = new FormData();
        formdata.append("observationDTO", JSON.stringify({
            "author": pseudo,
            "campaign_id": campaignID,
            "taxonomyGroup": category,
            "title": title,
            "coordinates": {
                "longitude": location.longitude,
                "latitude": location.latitude
            },
            "description": description,
            "creationDate": "2023-07-08 12:04:54"
        }));

        formdata.append("image", { uri: images[0].uri, name: images[0].name, type: images[0].type })

        let postOptions = {
            method: 'POST',
            body: formdata,
        };

        fetch('http://localhost:8080/observation/create', postOptions)
            .then(response => response.json())
            .then(json => {
                console.log("Observation Added");
                // uploadImages(json.id);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    React.useEffect(() => {
        postObservation();
    }, [])
}