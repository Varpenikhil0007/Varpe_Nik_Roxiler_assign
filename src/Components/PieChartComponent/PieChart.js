
import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import './PieChart.css';

const PieChart = ({ data, month }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const filteredData = data.filter(item => new Date(item.dateOfSale).toLocaleString('default', { month: 'long' }) === month);
    const categories = [...new Set(filteredData.map(item => item.category))];
    const counts = categories.map(category => filteredData.filter(item => item.category === category).length);

    const backgroundColors = [
      getComputedStyle(document.documentElement).getPropertyValue('--color1').trim(),
      getComputedStyle(document.documentElement).getPropertyValue('--color2').trim(),
      getComputedStyle(document.documentElement).getPropertyValue('--color3').trim(),
      getComputedStyle(document.documentElement).getPropertyValue('--color4').trim(),
      getComputedStyle(document.documentElement).getPropertyValue('--color5').trim(),
      getComputedStyle(document.documentElement).getPropertyValue('--color6').trim(),
    ];
    
    const chart = new Chart(chartRef.current, {
      type: 'pie',
      data: {
        labels: categories,
        datasets: [{
          label: 'Number of Items',
          data: counts,
          backgroundColor: backgroundColors, // Use dynamic colors
        }],
      },
    });
    

    return () => {
      chart.destroy();
    };
  }, [data, month]);

  return <div className="pie-chart"><canvas ref={chartRef}></canvas></div>;
};

export default PieChart;
