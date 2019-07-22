import React from 'react'
import bbox from '@turf/bbox'
// import PropTypes from 'prop-types';
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

const propTypes = {}

/**
 *
 * @param {Object} props Map props passed on by React
 * @param {Object} props.geojson A GeoJSON object with geographical features to be displayed on the map
 */
const map = props => {
  const bboxArray = bbox(props.geojson)
  const corner1 = [bboxArray[1], bboxArray[0]]
  const corner2 = [bboxArray[3], bboxArray[2]]
  return (
    <Map bounds={[corner1, corner2]} style={{ height: '100%' }} zoomControl={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; Contribuidores do <a href="http://osm.org/copyright">OpenStreetMap</a>'
      />
      <GeoJSON data={props.geojson} onEachFeature={onEachFeature} />
    </Map>
  )
}

map.propTypes = propTypes
export default map
