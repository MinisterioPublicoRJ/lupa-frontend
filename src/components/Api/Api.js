import axios from 'axios'

// const API_URL = `http://localhost:5000`
const API_URL = 'http://apimpmapas-devmpmapas.devcloud.mprj.mp.br'

const Api = (() => {
  function buildings(callback) {
    axios.get(`${API_URL}/buildings`).then((response) => {
      callback(response)
    })
  }

  function login(callback, username, password) {
    const formData = new FormData()

    formData.set('username', username)
    formData.set('password', password)

    axios
      .post(`${API_URL}/login/`, formData)
      .then((response) => {
        callback(response)
      })
      .catch((error) => {
        callback(error)
      })
  }

  return {
    buildings,
    login,
  }
})()

export default Api
