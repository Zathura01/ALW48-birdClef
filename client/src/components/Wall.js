import React, { useEffect, useState } from 'react'
import Head from './Head'
import Foot from './Foot'
import forest from '../forest.png';
import Main from './Main';



function Wall() {

    const [colorA,setColorA] = useState(0);
    const [colorB,setColorB] = useState(0);
    const [textColor,setTextColor] = useState(0);

    useEffect(() => {
        const colors = ['white', 'black', 'darkblue']; 
        let currentIndex = 0; 
    
        const intervalId = setInterval(() => {
          setTextColor(colors[currentIndex]);
    
          currentIndex = (currentIndex + 1) % colors.length;
    
          setColorA((Math.sin(Date.now() / 1000) + 1) * 127.5);
          setColorB((Math.cos(Date.now() / 1000) + 1) * 127.5);
        }, 400);
    
        return () => {
          clearInterval(intervalId); 
        };
      }, []);


      const backgroundStyle = {
        background: 'rgba(5, 100, 20, 0.2)',  
        backgroundImage: `url(${forest})`,
        backgroundSize: 'cover',
        height: '100vh',
        width: '100vw',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        position: 'relative',
      };
    
      const headStyle = {
        zIndex: '22',
        position: 'absolute',
        top: '30px', 
        left: '50%', 
        transform: 'translateX(-50%)',
        width:'100%',
        backgroundColor: `rgba(${colorA},${colorB} , 0, 0.5)`,
        padding:'5px',
        color:`${textColor}`
      };

      const footStyle = {
        zIndex: '22',
        position: 'absolute',
        top: '65vh', 
        left: '50%', 
        bottom: '50px',
        transform: 'translateX(-50%)',
        width:'100%',
        height:'270px',
        backgroundColor: `rgba(${colorB},${colorA} , 0, 0.5)`,
        padding:'5px',
      };


      const mainStyle = {
        zIndex: '22',
        position: 'absolute',
        top:'100px' ,
        right:'auto',
        left:'5px',
        bottom: '5px',
        transform: 'translateX(-0.5%)',
        width:'100%',
        height:'50vh',
        //backgroundColor: `rgba(${colorB},${colorA} , 0, 0.5)`,
        padding:'5px',
        display:'flex',
        flexDirection:'row',

      };
    
      return (
        <>
          <div className='container' style={backgroundStyle}>
            <Head style={headStyle} />  
            <Main style={mainStyle}/>
            <Foot style={footStyle}/>
    </div>
    </>
  )
}

export default Wall