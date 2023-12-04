import React from "react";

export default function TestPostServer() {
    const images = ["assets/EyedLadyBug1.jpeg", "assets/EyedLadyBug2.jpeg"];

    const title = "title";
    const description = "description";

    const date = new Date();

    const location = {
        latitude: 0,
        longitude: 0,
    };

    const campaignID = 0;
    const category = "Insects";

    const pseudo = "Srall";

    const uploadImages = (id) => {
        images.forEach(image => {
            const putOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    image: image
                })
            };

            fetch('http://localhost:8080/observation/' + id + '/upload', putOptions)
                .catch((error) => {
                    console.error("failed to upload images")
                    console.error(error);
                })
        });
    }

    const postObservation = () => {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");

        var formdata = new FormData();
        formdata.append("observationDTO",
            "{\n    \"author_pseudo\": \"" + pseudo + "\",\n    \"campaign_id\": " + campaignID + ",\n    \"taxonomyGroup\": \"" + category + "\",\n    \"title\": \"" + title + "\",\n    \"location\": {\n        \"longitude\": " + location.longitude + ",\n        \"latitude\": " + location.latitude + "\n    },\n    \"description\": \"" + description + "\"\n\n}");
        formdata.append("image", "EyedLadyBug1.jpeg", images[0]);

        let postOptions = {
            method: 'POST',
            headers: headers,
            body: formdata,
            redirect: 'follow'
        };

        fetch('http://localhost:8080/observation/create', postOptions)
            .then(response => response.json())
            .then(json => {
                uploadImages(json.id);
                console.log("Observation Added");
            })
            .catch((error) => {
                console.error(error);
            })
    }

    React.useEffect(() => {
        postObservation();
    }, [])
}