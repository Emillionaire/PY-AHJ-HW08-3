export default class UserApi {
    constructor (apiUrl) {
        this.apiUrl = `${apiUrl}/users`
    }

    async get () {
        const request = await fetch(this.apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await request.json()
        const response = {
            status: request.status,
            data: json.status
        }

        return response
    }

    async post (username) {
        const request = await fetch(this.apiUrl, {
            method: 'POST',
            body: JSON.stringify({ username }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await request.json()
        const response = {
            status: request.status,
            data: json.status
        }

        return response
    }

    async delete (username) {
        const request = await fetch(`${this.apiUrl}/${username}`, {
            method: 'DELETE',
            body: JSON.stringify({ username }),
            headers: {
                'Content-Type': 'application/json'
            },
            keepalive: true
        })

        const json = await request.json()
        const response = {
            status: request.status,
            data: json.status
        }

        return response
    }
}
