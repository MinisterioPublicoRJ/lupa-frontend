import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './App.scss';

// stupid hack so that leaflet's images work after going through webpack
// https://github.com/PaulLeCam/react-leaflet/issues/255#issuecomment-388492108
import L from 'leaflet';
import marker from 'leaflet/dist/images/marker-icon.png';
import marker2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import MainNavigator from '../../navigators/MainNavigator';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: marker2x,
    iconUrl: marker,
    shadowUrl: markerShadow
});
// until here

const position = [-22.90762, -43.16927]
const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

function App() {
  return (<MainNavigator />);
  // return (
  //   <div className="App">
  //     <Map center={position} zoom={13} style={{height: '400px'}}>
  //       <TileLayer
  //         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  //         attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
  //       />
  //       <Marker position={position}>
  //         <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
  //       </Marker>
  //     </Map>
  //     <VictoryChart
  //       // domainPadding will add space to each side of VictoryBar to
  //       // prevent it from overlapping the axis
  //       domainPadding={20}
  //     >
  //       <VictoryAxis
  //         // tickValues specifies both the number of ticks and where
  //         // they are placed on the axis
  //         tickValues={[1, 2, 3, 4]}
  //         tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
  //       />
  //       <VictoryAxis
  //         dependentAxis
  //         // tickFormat specifies how ticks should be displayed
  //         tickFormat={(x) => (`$${x / 1000}k`)}
  //       />
  //       <VictoryBar
  //         data={data}
  //         x="quarter"
  //         y="earnings"
  //       />
  //     </VictoryChart>
  //   </div>
  // );
}

export default App;
