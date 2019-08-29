import axios from 'axios'

const API_URL = 'http://10.1.248.59:8080'
// const API_URL = 'https://apimpmapas.mprj.mp.br'

const Api = (() => {
  function buildings(callback) {
    axios.get(`${API_URL}/buildings`).then((response) => {
      callback(response)
    })
  }

  /**
   * Fetches user token from API
   * @param  {Function} callback
   * @param  {string}   username
   * @param  {string}   password
   * @return {void}
   */
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

  /**
   * Loads an entity from the database
   * @param  {Function} callback
   * @param  {string}   type     Entity code in the database
   * @param  {string}   id       Desired entity ID
   * @return {void}
   */
  function getEntityData(callback, type, id) {
    // axios.get(`${API_URL}/api/${type}/${id}?format=json`)
    axios.get(`${API_URL}/lupa/${type}/${id}?format=json`) // ESTEVAN
      .then(response => callback(response.data))
      .catch(error => callback(error))
  }

  /**
   * Loads the box content from the database
   * @param  {Function} callback
   * @param  {string}   entityType Entity code in the database
   * @param  {string}   entityId   Desired entity ID
   * @param  {string}   boxId      Desired box ID
   * @return {void}
   */
  function getBoxData(callback, entityType, entityId, boxId) {
    // axios.get(`${API_URL}/api/${entityType}/${entityId}/${boxId}`)
    axios.get(`${API_URL}/lupa/${entityType}/${entityId}/${boxId}`) // ESTEVAN
      .then(response => callback(response.data))
      .catch(error => callback(error, boxId))
  }

  return {
    buildings,
    login,
    getEntityData,
    getBoxData,
  }
})()

export default Api
