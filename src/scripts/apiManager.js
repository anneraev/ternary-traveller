const apiURL = "http://localhost:8088"
export default {

    getAll: (key) => {
        return fetch(`${apiURL}/${key}`)
            .then(response => response.json())
    },

    getOne: (key, objectId) => {
        return fetch(`${apiURL}/${key}/${objectId}`)
            .then(response => response.json())
    },

    post: (key, objectId) => {

        return fetch(`${apiURL}/${key}`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(objectId)
        })
    },

    delete: (key, itemId) => {
        return fetch(`${apiURL}/${key}/${itemId}`, {
            method: "DELETE",
        })
    },

    patch: (key, itemId, objectId) => {
        return fetch(`${apiURL}/${key}/${itemId}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(objectId)
        })
    }
}