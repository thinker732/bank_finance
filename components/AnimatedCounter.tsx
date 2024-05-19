"use client"
import React from 'react'
import CountUp from 'react-countup'

const AnimatedCounter = ({amount,currency }: {amount:number,currency:string}) => {

  return (
    <div className='w-full'><CountUp decimal=',' prefix={` ${currency} `}  separator=' ' duration={2} decimals={2} end={amount}/></div>
  )
}

export default AnimatedCounter