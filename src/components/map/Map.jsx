import React from 'react'
import bbox from '@turf/bbox'
import PropTypes from 'prop-types'
import { GeoJSON, Map, Marker, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import 'leaflet/dist/leaflet.css'
import 'react-leaflet-markercluster/dist/styles.min.css'
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

const maxBounds = [
  [-20,-40],
  [-24,-46]
]
const minZoom = 7

const clickToFeature = (e, callback, markerProperties) => {
  let objectProperties = markerProperties ? markerProperties : e.target.feature.properties
  callback(objectProperties.entity_link_type, objectProperties.entity_link_id)
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

/**
 *
 * @param {Object} props Map props passed on by React
 * @param {Object} props.geojson A GeoJSON object with geographical features to be displayed on the map
 */
const map = props => {
  const geojsonWithAllAreas = {
    type: 'FeatureCollection',
    features: props.geojsonArray.filter(feature => feature.geometry.type === 'MultiPolygon')
  }
  const geojsonWithAllPoints = {
    type: 'FeatureCollection',
    features: props.geojsonArray.filter(feature => feature.geometry.type === 'Point')
  }

  // bounding box
  const bboxArray = bbox(geojsonWithAllAreas)
  const corner1 = [bboxArray[1], bboxArray[0]]
  const corner2 = [bboxArray[3], bboxArray[2]]

  return (
    <Map
      bounds={[corner1, corner2]}
      maxBounds={maxBounds}
      minZoom={minZoom}
      maxZoom={19}
      style={{ height: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; Contribuidores do <a href="http://osm.org/copyright">OpenStreetMap</a>'
      />
      <GeoJSON
        data={geojsonWithAllAreas}
        onEachFeature={(feature, layer) => {
          layer.on({
            click: event => clickToFeature(event, props.navigateToEntity),
          })
        }}
      />
      <MarkerClusterGroup>
        {geojsonWithAllPoints.features.map((marker, index) => (
          <Marker
            key={index}
            position={[marker.geometry.coordinates[1],marker.geometry.coordinates[0]]}
            onClick={event => clickToFeature(event, props.navigateToEntity, marker.properties)}
          />
        ))}
      </MarkerClusterGroup>
    </Map>
  )
}

map.propTypes = propTypes
export default map
