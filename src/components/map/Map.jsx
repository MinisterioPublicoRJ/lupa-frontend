import React from 'react'
import bbox from '@turf/bbox'
import PropTypes from 'prop-types';
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

const clickToFeature = e => {
  const layer = e.target
  console.log('I clicked on ', layer.feature.properties)
}

const onEachFeature = (feature, layer) => {
  layer.on({
    click: clickToFeature.bind(this),
  })
}

const propTypes = {
  props: PropTypes.shape({
    geojson: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        coordinates: PropTypes.arrayOf(
          PropTypes.arrayOf(
            PropTypes.arrayOf(
              PropTypes.arrayOf(
                PropTypes.number
              )
            )
          )
        ),
      })
    ),
  })
}

// colors from VictoryJS material.js https://github.com/FormidableLabs/victory/blob/master/packages/victory-core/src/victory-theme/material.js
const yellow200 = "#FFF59D";
const deepOrange600 = "#F4511E";
const lime300 = "#DCE775";
const lightGreen500 = "#8BC34A";
const teal700 = "#00796B";
const cyan900 = "#006064";
const colors = [deepOrange600, yellow200, lime300, lightGreen500, teal700, cyan900];

const styleGeojson = feature => {
  return { color: colors[feature.properties.index % colors.length] }
}

/**
 *
 * @param {Object} props Map props passed on by React
 * @param {Object} props.geojson A GeoJSON object with geographical features to be displayed on the map
 */
const map = props => {
  const geojsonWithAll = {
    type: "FeatureCollection",
    features: props.geojsonArray.map((eachGeojson, index) => {
      return {
        type: "Feature",
        geometry: eachGeojson,
        properties: {
          index
        }
      }
    })
  }

  // debug
  // MOCK adds another fake feature
  geojsonWithAll.features.push({
    "type": "Feature",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -43.49,
            -23.24
          ],
          [
            -43.18,
            -23.24
          ],
          [
            -43.18,
            -23.11
          ],
          [
            -43.49,
            -23.11
          ],
          [
            -43.494873046875,
            -23.24134610238612
          ]
        ]
      ]
    },
    "properties": {index: geojsonWithAll.features.length},
  })
  // /debug

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
        onEachFeature={onEachFeature}
        style={styleGeojson}
      />
    </Map>
  )
}

map.propTypes = propTypes
export default map
