import axios from 'axios'

// const API_URL = `http://localhost:5000`
const API_URL = 'http://apimpmapas-devmpmapas.devcloud.mprj.mp.br'
const LOGIN_MOCK = false

const Api = (() => {
  function login(callback, username, password) {
    const formData = new FormData()

    formData.set('username', username)
    formData.set('password', password)

    axios.post(`${API_URL}/login/`, formData)
    .then((response) => {
      console.log(response)
    })
    .catch((err) => console.log('failed!'))
  }

  return {
    login,
  }
})()

export default Api
