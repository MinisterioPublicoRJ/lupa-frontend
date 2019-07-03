import axios from 'axios'

// const API_URL = `http://localhost:5000`
const API_URL = 'http://apimpmapas-devmpmapas.devcloud.mprj.mp.br'

const Api = (() => {
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
    login,
  }
})()

export default Api
