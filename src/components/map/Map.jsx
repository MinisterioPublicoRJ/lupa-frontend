import React from 'react'
import bbox from '@turf/bbox'
import PropTypes from 'prop-types'
import {
  GeoJSON, Map, Marker, Popup, TileLayer,
} from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import 'leaflet/dist/leaflet.css'
import 'react-leaflet-markercluster/dist/styles.min.css'
import './Map.scss'
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

const clickToFeature = (e, callback, markerProperties) => {
  const objectProperties = markerProperties || e.target.feature.properties
  callback(objectProperties.entity_link_type, objectProperties.entity_link_id)
}

const propTypes = {
  geojsonArray: PropTypes.arrayOf(
    PropTypes.shape({
      coordinates: PropTypes.arrayOf(
        PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))),
      ),
      properties: PropTypes.shape({
        entity_link_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        entity_link_type: PropTypes.string,
        name: PropTypes.string,
      }),
      type: PropTypes.string,
    }),
  ).isRequired,
  navigateToEntity: PropTypes.func.isRequired,
}

/**
 *
 * @param {Object} props Map props passed on by React
 * @param {Object} props.geojsonArray A GeoJSON object with geographical features to
 *  be displayed on the map
 */
const map = props => {
  const { geojsonArray } = props
  const geojsonWithAll = {
    type: 'FeatureCollection',
    features: geojsonArray,
  }
  const geojsonWithAllAreas = {
    type: 'FeatureCollection',
    features: geojsonArray.filter(feature => feature.geometry.type === 'MultiPolygon'),
  }
  const geojsonWithAllPoints = {
    type: 'FeatureCollection',
    features: geojsonArray.filter(feature => feature.geometry.type === 'Point'),
  }

  // bounding box
  const bboxArray = bbox(geojsonWithAll)
  const corner1 = [bboxArray[1], bboxArray[0]]
  const corner2 = [bboxArray[3], bboxArray[2]]
  const bounds = [corner1, corner2]
  const brazilBoundingBox = [[5.2842873, -33.8689056], [-28.6341164, -73.9830625]]

  return (
    <Map
      bounds={bounds}
      maxBounds={brazilBoundingBox}
      maxZoom={18}
      style={{ height: '50%' }}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; Contribuidores do <a href="http://osm.org/copyright">OpenStreetMap</a>'
        detectRetina={true}
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
            position={[marker.geometry.coordinates[1], marker.geometry.coordinates[0]]}
          >
            <Popup>{marker.properties.name}<br/><a href={`#/${marker.properties.entity_link_type}/${marker.properties.entity_link_id}`}>Ir</a></Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </Map>
  )
}

map.propTypes = propTypes
export default map
