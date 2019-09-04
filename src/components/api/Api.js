import axios from 'axios'

const Api = (() => {
  const API_URL = process.env.REACT_APP_API_URL
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
    axios.get(`${API_URL}/lupa/${type}/${id}?format=json`)
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
    axios.get(`${API_URL}/lupa/${entityType}/${entityId}/${boxId}`)
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
