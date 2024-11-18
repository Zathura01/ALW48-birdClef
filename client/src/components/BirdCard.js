import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Pcok from './Images/pcok.jpg'
import Dino from './Images/dino.jpg'
import Crow from './Images/crow.jpg'
import Rooster from './Images/rooster.jpg'
import BD  from './BirdData/Bdata'


function BirdCard({predictedClass}) {
const [pic, setPic] = useState(null)
const [link,setLink]= useState('')
const [pageContent, setPageContent] = useState('');
const [red,setRed] = useState('')
  
    useEffect(() => {
       setRed(`https://en.wikipedia.org/wiki/${predictedClass}`)
        if(predictedClass==='peacock'){
        setPic(Pcok)
        setLink('PEACOCK')
        //setPageContent(BD[1].info)
      }
      if(predictedClass==='crow'){
        setPic(Crow)
        setLink('CROW')
        //setPageContent(BD[2].info)

      }
      if(predictedClass==='not_bird'){
        setPic(Dino)
        setLink('NOT_BIRD')
        //setPageContent(BD[0].info)

      }
      if(predictedClass==='hen'){
        setPic(Rooster)
        setLink('ROOSTER')
        //setPageContent(BD[3].info)

      }

     console.log(pageContent)

     const fetchWikipediaContent = async () => {
        try {
          const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${predictedClass}`);
          const data = await response.json();
          setPageContent(data.extract);
        } catch (error) {
          console.error('Error fetching Wikipedia content:', error);
        }
      };
  
      fetchWikipediaContent();


    }, [])
    



    const styleA = {
        width: '90%',
        height: '330px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
      };
    
      const imageStyle = {
        maxWidth: '350px',
        maxHeight: '330px',
        width: '100%',
        height: 'auto',
      };
    
      const contentStyle = {
        fontFamily: 'cursive',
        color: 'white',
        paddingLeft: '20px',  
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      };
    
      return (
        <>
          <div className="container" style={{ maxWidth: '1050px', maxHeight: '330px' }}>
            <div style={styleA}>
              <img src={pic} className="card-img-top" alt="" style={imageStyle} />
              <div className="card-body" style={contentStyle}>
                <h5 className="card-text">{pageContent}</h5>
                <a href={red} target="_blank" style={{color:'white'}} className="card-text">{link}</a>
              </div>
            </div>
          </div>
        </>
      );
    }


export default BirdCard