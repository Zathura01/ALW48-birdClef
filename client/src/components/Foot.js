import React from 'react'
import Card from './Card'

function Foot({style}) {
  return (
  <>
  <div className='text-center' style={style}>
    <div style={{zIndex:"22"}}>
       <Card />
    </div>
  </div>
  </>
  )
}

export default Foot