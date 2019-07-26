import React from 'react'
import bbox from '@turf/bbox'
import PropTypes from 'prop-types'
import { Map, GeoJSON, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import marker from 'leaflet/dist/images/marker-icon.png'
import marker2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// stupid hack so that leaflet's images work after going through webpack
// https://github.com/PaulLeCam/react-leaflet/issues/255#issuecomment-388492108
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: marker2x,
  iconUrl: marker,
  shadowUrl: markerShadow,
})
// /hack

const clickToFeature = (e, callback) => {
  const layer = e.target
  callback(layer.feature.properties.entity_link_type, layer.feature.properties.entity_link_id)
}

const propTypes = {
  geojson: PropTypes.arrayOf(
    PropTypes.shape({
      coordinates: PropTypes.arrayOf(
        PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))),
      ),
      properties: PropTypes.shape({
        entity_link_id: PropTypes.number,
        entity_link_type: PropTypes.string,
        name: PropTypes.string,
      }),
      type: PropTypes.string,
    }),
  ),
  navigateToEntity: PropTypes.func,
}

// colors from VictoryJS material.js https://github.com/FormidableLabs/victory/blob/master/packages/victory-core/src/victory-theme/material.js
const yellow200 = '#FFF59D'
const deepOrange600 = '#F4511E'
const lime300 = '#DCE775'
const lightGreen500 = '#8BC34A'
const teal700 = '#00796B'
const cyan900 = '#006064'
const colors = [deepOrange600, yellow200, lime300, lightGreen500, teal700, cyan900]

const styleGeojson = feature => ({ color: colors[feature.properties.index % colors.length] })

/**
 *
 * @param {Object} props Map props passed on by React
 * @param {Object} props.geojson A GeoJSON object with geographical features to be displayed on the map
 */
const map = (props) => {
  const geojsonWithAll = {
    type: 'FeatureCollection',
    features: props.geojsonArray.map((eachGeojson, index) => ({
      ...eachGeojson,
      properties: {
        ...eachGeojson.properties,
        index,
      },
    })),
  }

  // bounding box
  const bboxArray = bbox(geojsonWithAll)
  const corner1 = [bboxArray[1], bboxArray[0]]
  const corner2 = [bboxArray[3], bboxArray[2]]

  return (
    <Map bounds={[corner1, corner2]} style={{ height: '100%' }} zoomControl={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; Contribuidores do <a href="http://osm.org/copyright">OpenStreetMap</a>'
      />
      <GeoJSON
        data={geojsonWithAll}
        onEachFeature={(feature, layer) => {
          layer.on({
            click: event => clickToFeature(event, props.navigateToEntity),
          })
        }}
        style={styleGeojson}
      />
    </Map>
  )
}

map.propTypes = propTypes
export default map
