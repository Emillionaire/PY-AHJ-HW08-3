export default class MessagesApi {
    constructor (apiUrl) {
        this.apiUrl = `${apiUrl}/messages`
    }

    async get (username) {
        const request = await fetch(`${this.apiUrl}/${username}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await request.json()
        const response = {
            status: request.status,
            data: json
        }

        return response
    }

    async post (username, recipient, text) {
        const request = await fetch(`${this.apiUrl}/${username}/`, {
            method: 'POST',
            body: JSON.stringify({
                recipient,
                text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await request.json()
        const response = {
            status: request.status,
            data: json.data
        }

        return response
    }
}
