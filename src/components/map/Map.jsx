import React from 'react'
import bbox from '@turf/bbox'
// import PropTypes from 'prop-types';
import {
  Map, GeoJSON, TileLayer,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import marker from 'leaflet/dist/images/marker-icon.png'
import marker2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
// stupid hack so that leaflet's images work after going through webpack
// https://github.com/PaulLeCam/react-leaflet/issues/255#issuecomment-388492108
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: marker2x,
  iconUrl: marker,
  shadowUrl: markerShadow,
})
// /hack

const buildingsMock = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "id": 1,
        "name": "Edifício Canavarro",
        "address": "Avenida Marechal Câmara, 350"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -43.16969007253647,
          -22.90777133234943
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 2,
        "address": "Avenida Marechal Câmara, 370",
        "name": "Sede Administrativa"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -43.169765174388885,
          -22.9074995583537
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 3,
        "name": "Edifício Sede",
        "address": "Praça Procurador-Geral de Justiça Hermano Odilon dos Anjos, S/N"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -43.169260919094086,
          -22.907637916092323
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 4,
        "name": "Edifício Jockey Club Brasileiro",
        "address": "Avenida Almirante Barroso, 139"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -43.17395,
          -22.90670
        ]
      }
    }
  ]
}

const mapData = buildingsMock

const propTypes = {}

const onEachFeature = (feature, layer) => {
  layer.on({
    click: clickToFeature.bind(this)
  })
}

const clickToFeature = e => {
  var layer = e.target
  console.log("I clicked on " ,layer.feature.properties)
}

const map = props => {
  const bboxArray = bbox(mapData)
  const corner1 = [bboxArray[1], bboxArray[0]]
  const corner2 = [bboxArray[3], bboxArray[2]]
  return (
    <Map bounds={[corner1, corner2]} style={{ height: '400px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON
        data={mapData}
        onEachFeature={onEachFeature}
      />
    </Map>
  )
}

map.propTypes = propTypes
export default map
