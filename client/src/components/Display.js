import React, { useState, useEffect } from 'react'
import BirdCard from './BirdCard';



function Display({predictedClass}) {
  const [colorA,setColorA] = useState(0);
  const [colorB,setColorB] = useState(0);
  const [width, setWidth] = useState(10);

var x = 75;
const styleA ={
  width:'100%',
  height:'100%',
  backgroundColor: 'rgba(0, 0, 139, 0.5)',
    margin:'5px',
  transition: 'background-color 0.5s ease-in',
  padding:'5px'
  }
 const styleB ={
  width:'100%',
  height:'100%',
  margin:'5px'
 }
 const styleD = {
  height: '100%',
  backgroundColor: `rgba(${colorA}, ${colorB}, 0, ${width / 100})`,
  margin: 'auto'
};
  

useEffect(() => {
  const interval = setInterval(() => {
    // Increase width by 10% every 1 second (adjust as needed)
    setWidth(prevWidth => (prevWidth >= 90 ? 0 : prevWidth + 10));
  }, 50);

  return () => clearInterval(interval); // Cleanup the interval on component unmount
}, []); // Run this effect once on component mount

const dynamicStyle = {
  ...styleD,
  backgroundColor: `rgba(${colorA}, ${colorB}, 0, ${width / 100})`
};




  return (
    <>
    <div className='container' style={predictedClass===''?styleB:predictedClass==='nothing'? dynamicStyle :  styleA} >
      <p>{predictedClass==='nothing'?'':<BirdCard predictedClass={predictedClass}/>}</p>
    </div>
    </>
  )
}

export default Display