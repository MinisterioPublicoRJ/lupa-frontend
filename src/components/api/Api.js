import axios from 'axios'

const API_URL = 'http://10.1.248.57:8000'
// const API_URL = 'http://apimpmapas-devmpmapas.devcloud.mprj.mp.br'

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

  function getEntityData(callback, type, id) {
    axios.get(`${API_URL}/api/${type}/${id}`)
      .then(response => callback(response.data))
      .catch(error => callback(error))
  }

  function getBoxData(callback, entityType, entityId, boxId) {
    axios.get(`${API_URL}/api/data/${entityType}/${entityId}/${boxId}`)
      .then(response => callback(response.data))
      .catch(error => callback(error))
  }

  return {
    buildings,
    login,
    getEntityData,
  }
})()

export default Api
