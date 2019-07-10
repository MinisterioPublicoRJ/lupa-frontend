import React from 'react'
import Box from './Box'
import './Contents.scss'

const data = [
  // {
  //   title: 'Servidores na promotoria',
  //   source: 'MGP',
  //   text: 'Dados da promotoria',
  //   number: 35,
  //   type: 'number',
  // },
  // {
  //   title: 'Servidores na promotoria',
  //   source: 'MGP',
  //   list: [
  //     'Now that there is the Tec-9',
  //     'a crappy spray gun from South Miami',
  //     'This gun is advertised as the most popular gun in American crime.',
  //   ],
  //   image: 'https://slipsum.com/wp-content/themes/15zine/img/sam.png',
  //   type: 'ordered list',
  // },
  // {
  //   title: 'Servidores na promotoria',
  //   source: 'MGP',
  //   list: [
  //     'Now that there is the Tec-9',
  //     'a crappy spray gun from South Miami',
  //     'This gun is advertised as the most popular gun in American crime.',
  //   ],
  //   image: 'https://slipsum.com/wp-content/themes/15zine/img/sam.png',
  //   type: 'unordered list',
  // },
  {
    title: 'Gráfico de barras',
    source: 'MGP',
    graph: {
      type: 'bar',
      data: [
        { x: new Date(1986, 1, 1), y: 2 },
        { x: new Date(1996, 1, 1), y: 3 },
        { x: new Date(2006, 1, 1), y: 5 },
        { x: new Date(2016, 1, 1), y: 4 },
      ],
    },
    type: 'graph',
  },
  // {
  //   title: 'Servidores na promotoria promotoria',
  //   source: 'MGP',
  //   description: 'description goes here! description goes here! description goes here! description goes here!',
  //   graph: {
  //     type: 'pie',
  //     data: [
  //       {
  //         x: 1,
  //         y: 120,
  //       },
  //       {
  //         x: 2,
  //         y: 150,
  //       },
  //       {
  //         x: 3,
  //         y: 75,
  //       },
  //     ],
  //   },
  //   type: 'graph',
  // },
]

const Contents = () => (
  <div className="contents">
    {data.map((d, key) => (
      <Box key={key} content={d} />
    ))}
  </div>
)

export default Contents
