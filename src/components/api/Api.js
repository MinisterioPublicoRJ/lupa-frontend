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
    axios.get(`${API_URL}/lupa/entidade/${type}/${id}?format=json`)
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
    axios.get(`${API_URL}/lupa/dado/${entityType}/${entityId}/${boxId}`)
      .then(response => callback(response.data))
      .catch(error => callback(error, boxId))
  }

  /**
   * Search for a list of contents on OSM
   * @param  {Function} callback
   * @param  {string}   inputValue The value typed by the user
   * @return {void}
   */
  function getSearchData(callback, inputValue) {
    axios.get(`${API_URL}/lupa/search/mapsearch/${inputValue}`)
      .then(response => callback(response.data))
      .catch(error => callback(error, inputValue))
  }

  /**
   * Search for a list of contents on OSM
   * @param  {Function} callback
   * @param  {number}   lat   Place latitude
   * @param  {number}   lng   Place longitude
   * @param  {string}   value OSM result value tag
   * @return {void}
   */
  function getGeospacialData(callback, lat, lng, value) {
    axios.get(`${API_URL}/lupa/geospatial/entity/${lat}/${lng}/${value}`)
      .then(response => callback(response.data))
      .catch(error => callback(error, value))
  }

  return {
    buildings,
    login,
    getEntityData,
    getBoxData,
    getSearchData,
    getGeospacialData,
  }
})()

export default Api
