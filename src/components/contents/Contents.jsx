import React from 'react'
import Box from './Box'
import './Contents.scss'

const data = [
  {
    title: 'Servidores na promotoria',
    source: 'MGP',
    description: 'Dados da promotoria',
    value: '35',
    type: 'long-box',
  },
  {
    title: 'Servidores na promotoria - o retorno Servidores na promotoria - o retorno Servidores na promotoria - o retorno',
    source: 'MGP',
    value: 'R$1.000.000,00',
    type: 'long-box',
  },
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
  // {
  //   title: 'Gráfico de barras',
  //   source: 'MGP',
  //   graph: {
  //     type: 'bar',
  //     data: [
  //       { x: new Date(1986, 1, 1), y: 2 },
  //       { x: new Date(1996, 1, 1), y: 3 },
  //       { x: new Date(2006, 1, 1), y: 5 },
  //       { x: new Date(2016, 1, 1), y: 4 },
  //     ],
  //   },
  //   type: 'graph',
  // },
  {
    title: 'Gráfico de barras',
    source: 'MGP',
    graph: {
      type: 'stackedBar',
      highlight: true,
      data: [
        [{ x: 'a', y: 2 }, { x: 'b', y: 3 }, { x: 'c', y: 5 }],
        [{ x: 'a', y: 1 }, { x: 'b', y: 4 }, { x: 'c', y: 5 }],
        [{ x: 'a', y: 3 }, { x: 'b', y: 2 }, { x: 'c', y: 6 }],
      ],
      categories: ['legenda1', 'legenda2', 'legenda 3'],
    },
    type: 'graph',
  },
  {
    title: 'Servidores na promotoria promotoria',
    source: 'MGP',
    description: 'description goes here! description goes here! description goes here! description goes here!',
    graph: {
      type: 'pie',
      data: [
        {
          x: 1,
          y: 120,
        },
        {
          x: 2,
          y: 150,
        },
        {
          x: 3,
          y: 75,
        },
      ],
    },
    type: 'graph',
  },
]

const Contents = () => (
  <div className="contents">
    {data.map((d, key) => (
      <Box key={key} content={d} />
    ))}
  </div>
)

export default Contents
