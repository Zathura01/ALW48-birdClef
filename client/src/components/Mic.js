import React, { useState } from "react";
import Micro from "../Mic.jpg";
import Camera from "../Camera.jpg";
import "../App.css";
import Display from "./Display";







function Mic({ style }) {
  const [micBack, setMicBack] = useState(false);
  const [camBack, setCamBack] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const [predictedClass, setPredictedClass] = useState('');
  const [audioChunks, setAudioChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");



const styleB ={
width:'10%',
height:'100%',
backgroundColor:'White',
margin:'5px',
display:'flex',
flexDirection:'column'
}

const styleC ={
width:'10%',
height:'100%',
backgroundColor:'DarkBlue',
color:'white',
margin:'5px',
display:'flex',
flexDirection:'column',
justifyContent: 'space-around'

}


/*

const uploadAudio = async (audioBlob) => {
  const formData = new FormData();
  formData.append('files', file);

  try {
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      body: formData,
    });

    if (response.status === 200) {
      const result = await response.json();
      console.log('Prediction result:', result);
    } else {
      console.error('Error predicting:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

*/




const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];
  if (selectedFile.type.startsWith('audio/')) {
    setFile(selectedFile);
    console.log('audio given')
  } else if (selectedFile.type.startsWith('image/')) {
    setImageFile(selectedFile);
    console.log('image given', imageFile)
  }
};


  const handleUpload = async () => {
    setPredictedClass('nothing')
    setTimeout(() => {
      audioChunks.length = 0;
    }, 1000);
    if( !file && !imageFile){
      setMessage("Select an image/audio file.")
      return;
    }
   

   const formData = new FormData();
  if (file) {
    formData.append("audio", file); // Assuming your backend expects an "audio" key for audio files
    try {
      const response = await fetch("http://localhost:4000/convert", {
        method: "POST",
        body: formData,
      });

      if (response.status === 200) {
        const responseData = await response.json();
        const convertedFileNamepath = responseData.path;
        //convertedFileNamepath = 'public\pcok.wav'
        console.log(convertedFileNamepath)
        console.log('C:\web projects\al48-birdclef\al48-birdclef\express\\'+ convertedFileNamepath)
        
        try {
          const flaskResponse = await fetch('http://localhost:5000/flask', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ convertedFileNamepath }) 
          });
      
          if (flaskResponse.status === 200) {
            const result = await flaskResponse.json();
           setTimeout(() => {
            setPredictedClass(result.predicted_class);
           }, 3000);

           //This is class is coming in


            console.log(result.predicted_class);
            setFile(null)
          } else {
            console.error('Error from Flask:', flaskResponse.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
        }
          
        setMessage("Audio converted");
        setTimeout(() => {
          setMessage("");
         }, 2000);
      }
      else {
        setMessage("Error");
      }
    } catch (error) {
      console.error("Error uploading audio:", error);
      setMessage("Error uploading audio.");
    }
  }
  if (imageFile) {
    formData.append("image", imageFile); // Assuming your backend expects an "image" key for image files
    console.log('image')
    

    try {
      const response = await fetch('http://localhost:4000/giveImage', {
        method: 'POST',
        body: formData,
      });
  
      if (response.status === 200) {
        const responseData = await response.json();
        const convertedFileNamepath = responseData.path;
        console.log(convertedFileNamepath);
  
        // Assuming convertedFileNamepath is a URL or a path that Flask can access
        try {
          const flaskResponse = await fetch('http://localhost:5000/flaskImage', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ path: convertedFileNamepath }) // Consider renaming to be more clear it's a path
          });
  
          if (flaskResponse.status === 200) {
            const result = await flaskResponse.json();
            setPredictedClass(result.predicted_class); // Directly set without setTimeout
            setImageFile(null);
          } else {
            console.error('Error from Flask:', flaskResponse.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        console.error('Error uploading image:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }


  }

  };

  const startRecording = () => {
    setIsRecording(true);
    setAudioChunks([]);
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            setAudioChunks((chunks) => [...chunks, event.data]);
          }
        };
        mediaRecorder.onstop = () => {
          setIsRecording(false);

          const formData = new FormData();
          const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
          formData.append("audio", audioBlob, "audio.wav");
          
          console.log(formData);
        };

        

        mediaRecorder.start();
        setTimeout(() => {
          mediaRecorder.stop();
          setMicBack(false);

        }, 7000); // Recording for 7 seconds
      })
      .catch((error) => console.error("Error accessing microphone:", error));
  };

  const playRecording = () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    console.log("play", "  ", isRecording);
    audio.play();
  };

  const downloadAudio = () => {
    const currentDate = new Date(Date.now());

    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); 
    const day = currentDate.getDate().toString().padStart(2, "0"); 
    const hours = currentDate.getHours().toString().padStart(2, "0"); 
    const minutes = currentDate.getMinutes().toString().padStart(2, "0"); 

    const formattedDateTime = `${month}-${day} ${hours}:${minutes}`;
    const fileName = `${formattedDateTime}_audio.wav`;
    const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
    const audioUrl = URL.createObjectURL(audioBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = audioUrl;
    downloadLink.download = fileName;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const microphone = async () => {
    //micBack === false ? setMicBack(true) && startRecording() : setMicBack(false) && playRecording();
    if (micBack === false) {
      setMicBack(true);
      startRecording();
    }
    if (micBack === true) {
      setMicBack(false);
      playRecording();
    }
  };

  const camera = () => {
    camBack === false ? setCamBack(true) : setCamBack(false);
  };

  return (
    <>
      <div className="container">
        <Display predictedClass={predictedClass}/>
      </div>
      <div className="container" style={styleB}>
        <br />
        <button
          className="mic-button"
          onClick={microphone}
          style={{ marginTop: "10px" }}
        >
          <img
            className="icons"
            src={Micro}
            style={{
              width: "50%",
              height: "70px",
              transform: `scale(${
                micBack === false ? 1 : Math.cos(Date.now() / 100 + 1) * 1.2
              })`,
            }}
          />
        </button>
        <br />
        <br />
        <button className="camera-button" onClick={camera}>
          <img
            className="icons"
            src={Camera}
            style={{
              width: "50%",
              height: "70px",
              transform: `scale(${
                camBack === false ? 1 : Math.cos(Date.now() / 100 + 1) * 1.2
              })`,
            }}
          />
        </button>
        <br></br>
        <br></br>
        </div>
        <div className="container" style={styleC}>
        <div style={{marginTop:'20px'}}>
          {" "}
          {(audioChunks.length > 0 && (
            <button onClick={downloadAudio}>Download</button>
          )) || <h4>Waiting..</h4>}
        </div>

        <div className="App">
          <h6>File Upload</h6>
          <input
            style={{ width: "90%" }}
            type="file"
            name="files"
            accept=".wav, .jpg, .jpeg, .png"
            onChange={handleFileChange}
          />
          <br></br>
          <button style={{ width: "90%" }} onClick={handleUpload}>
            Upload
          </button>
          {message && <p>{message}</p>}
        </div>
      </div>
    </>
  );
}

export default Mic;
