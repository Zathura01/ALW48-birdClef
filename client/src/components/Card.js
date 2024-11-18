import React, { useEffect, useState } from 'react'
//import AvesNu from './AvesNu'
//import { Link } from 'react-router-dom';

function Card() {


 const AvesNu = [
    {
      Name: "Indian Peafowl",
      Url: "https://cdn.pixabay.com/photo/2017/08/27/16/10/peacock-2686600_640.jpg",
    },
    {
      Name: "White-Crowned Sparrow",
      Url: "https://cdn.pixabay.com/photo/2021/08/03/12/34/sparrow-6519384_1280.jpg",
    },
    {
      Name: "Common Wood Pigeon",
      Url: "https://cdn.pixabay.com/photo/2022/07/08/17/01/common-wood-pigeon-7309622_640.jpg",
    },
    {
      Name: "Winter Robin",
      Url: "https://cdn.pixabay.com/photo/2019/11/19/21/44/robin-4638598_640.jpg",
    },
    {
      Name: "Downy Woodpecker",
      Url: "https://cdn.pixabay.com/photo/2020/06/05/02/56/great-spotted-woodpecker-5261220_640.jpg",
    },
    {
      Name: "Andean Flamingo",
      Url: "https://cdn.pixabay.com/photo/2022/03/23/08/13/flamingo-7086655_640.jpg",
    },
    {
      Name: "Bald Eagle",
      Url: "https://cdn.pixabay.com/photo/2017/09/22/15/57/adler-2776081_640.jpg",
    },
    {
      Name: "Barn Owl",
      Url: "https://cdn.pixabay.com/photo/2017/11/30/11/57/barn-owl-2988291_640.jpg",
    },
    {
      Name: "Bee Hummingbird",
      Url: "https://cdn.pixabay.com/photo/2021/05/21/11/57/bee-hummingbird-6270971_640.jpg",
    },
    {
      Name: "Peregrine Falcon",
      Url: "https://cdn.pixabay.com/photo/2017/12/17/08/16/peregrine-falcon-3023839_640.jpg",
    },
  ];






const [arrayData,setArrayData] = useState([])
let i =0;

useEffect(() => {
    const setIntFunc = setInterval(() => {
      let array = [];

      array.push(AvesNu[i], AvesNu[i + 1], AvesNu[i + 2], AvesNu[i + 3]);

      setArrayData(array);

      array = [];
      if (i === 6) {
        i = 0;
      } else {
        i++;
      }
    }, 4000);

    return () => {
      clearInterval(setIntFunc); 
    };
  }, []);

  return (
  <>
<div style={{display:'flex',flexDirection:'row',maxHeight:'240px'}}>
{arrayData.map((item, key) => {
        
        return(
        <div className="card" style={{ display:'flex',flexDirection:'column', width: '25%', height: '200px', margin:'20px' }} key={key}>
          <img src={item.Url} style={{height:'200px'}} className="card-img-top" alt={item.altText} />
          <div className="card-body">
            <h5 className="card-title" style={{color:'white'}}><a style={{color:'aliceblue',marginBottom:"50px"}} href={`https://en.wikipedia.org/wiki/${item.Name}`}>{item.Name}</a></h5>
          </div>
          </div>
        )
        }
        )}

</div>
  </>
  )
}

export default Card