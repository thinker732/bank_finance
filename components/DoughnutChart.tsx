"use client"
import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({accounts}:DoughnutChartProps) => {


  const data={
    datasets:[
      {
        label:'Banks',
        data:[500000,800000,900000],
        backgroundColor:['#0747b6','#2265d8','#2f91f8']
      }
    ],
    labels:['Bank 1','Bank 2','Bank 3']
  }


  return <Doughnut data={data}  options={{
    cutout:'60%',
    plugins:{
      legend:{
        display:false
      }
    }
  }}/>
  
}

export default DoughnutChart