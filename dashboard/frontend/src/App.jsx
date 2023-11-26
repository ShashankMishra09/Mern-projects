// src/App.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://localhost:3001/dashboard/data')
      .then(response => {
        setData(response.data);
        // Call your D3 visualization function here
        visualizeData(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const visualizeData = (data) => {
    // Create a simple bar chart using D3.js

    const svg = d3.select('.App').append('svg')
      .attr('width', 500)
      .attr('height', 300);

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;

    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    const y = d3.scaleLinear().rangeRound([height, 0]);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    x.domain(data.map(d => d.topic));
    y.domain([0, d3.max(data, d => d.intensity)]);

    g.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis axis-y')
      .call(d3.axisLeft(y))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Intensity');

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.topic))
      .attr('y', d => y(d.intensity))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.intensity));
  };

  return (
    <div className="App">
      <h1>Data Visualization Dashboard</h1>
    </div>
  );
}

export default App;
