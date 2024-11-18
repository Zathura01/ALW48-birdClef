import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

import Wall from './components/Wall';
import { useEffect } from 'react';

function App() {


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/server");
        const data = await response.json();
        console.log("Flask- ",data); 
      } catch (error) {
        console.log("Error connecting to flask:", error);
      }
      try {
        const response = await fetch("http://localhost:4000/express");
        const data = await response.json();
        console.log("Express- ",data); 
      } catch (error) {
        console.log("Error connecting to express:", error);
      }
    };
  
    fetchData(); 
  }, []);
  


  

  return (
    <>
    <div className='container' style={{fontFamily:'Tahoma',display:'flex',flexDirection:'row',margin:'auto',backgroundColor:'black'}}>
    <Wall/>
    </div>
    </>
  );
}

export default App;
