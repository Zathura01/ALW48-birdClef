import React from 'react'
import Display from './Display'
import Mic from './Mic'

function Main({style}) {

    const micStyle ={
        width:'10%',
        height:'100%',
        marginLeft:'5px',
        backgroundColor:'white',
     display:'flex',
     flexDirection:'column',
       flexWrap:'nowrap',
       justifyContent: 'space-around'
      }
      
      const displayStyle = {
          width:'100%',
          height:'100%',
          marginRight:'5px',
          backgroundColor:'white'
      }

  return (



    <>
    <div className='container' style={style}>
    <Mic style={displayStyle}/>
    </div>
   
    
    </>
  )
}

export default Main