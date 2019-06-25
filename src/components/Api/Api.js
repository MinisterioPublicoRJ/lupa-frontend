import axios from 'axios'

const API_URL = `http://localhost:5000`
const LOGIN_MOCK = true

const Api = (() => {
    /**
     * 
     */
    function login(callback, username, password) {
        let formData = new FormData()

        formData.set("username", username)
        formData.set("password", password)

        axios
            .post(`${API_URL}/login`,formData)
            .then(response => {
                if (LOGIN_MOCK) {
                    callback('JWT_MOCK')
                } else {
                    callback(response)
                }
            })
    }

    return {
        login
    }
})()

export default Api