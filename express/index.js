const express = require("express");
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const { stdout } = require('process')
const cors = require("cors");
const util = require("util");
const app = express();
const port = 4000;
app.use(cors());
app.use(express.static('public'))
const axios = require('axios');
const { default: data } = require("../client/src/components/AvesNu");
var audioFile = '';
var dir = 'public';
var subDirectory = 'public/uploads'
if(!fs.existsSync(dir)){
  fs.mkdirSync(dir);
  fs.mkdirSync(subDirectory)
}



var storage = multer.diskStorage({
  destination:function(req,file,cb){
      cb(null,'public/uploads')
  }
  , filename:function(req,file,cb){
      cb(null,file.fieldname + '-' + Date.now()+path.extname(file.originalname))
  }
})

const audioFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(mp3|ogg|wav|aac|flac)$/)) {
    req.fileValidationError = 'Only audio files allowed (mp3, ogg, wav, aac, flac)';
    return cb(new Error('Only audio files are allowed (mp3, ogg, wav, aac, flac)'));
  }
  cb(null, true);
};

var upload = multer({storage:storage,fileFilter:audioFilter})
 
const convertToWAV = (req, res, next) => {
  if (!req.file) {
    return res.status(400).send('No audio file uploaded.');
  }

  const audioFilePath = req.file.path;
  const wavFilePath = path.join('public/', `${Date.now()}_converted.wav`);

  const ffmpegCommand = `C:\\Users\\91766\\Downloads\\ffmpeg-6.0-essentials_build\\ffmpeg-6.0-essentials_build\\bin\\ffmpeg -i ${audioFilePath} -acodec pcm_s16le -ac 1 -ar 44100 ${wavFilePath}`;

  console.log(audioFilePath+ '  ' + wavFilePath)
  exec(ffmpegCommand, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send('Error converting audio to WAV.');
    }

    req.file.path = wavFilePath;
    req.file.filename = `${Date.now()}_converted.wav`;
   
    next();
  });
};

app.get("/",(req,res)=>{
  res.send("Hello")})
app.get("/express",(req,res)=>{
  res.json("Express connected");})
app.post('/convert',upload.single('audio'),convertToWAV,(req,res)=>{
  

  const audioFile = req.file;
const audioBlob = new Blob([audioFile.buffer]);  // Convert buffer to Blob
const form = new FormData();
form.append('audio', audioBlob, { filename: audioFile.originalname });




try {
  
  const convertedWavFile = audioBlob.originalname

  res.send({
    message: 'Audio converted successfully',
    convertedWavFileName: audioFile.filename,
    path: audioFile.path 
  });
} catch (error) {
  console.error('Error converting audio:', error);
  res.status(500).send('Internal Server Error');
}


})






const storageT = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/pictures'); // Make sure this directory exists
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload variable
const uploadT = multer({ storage: storageT });

// Route to handle image upload
app.post('/giveImage', uploadT.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded.' });
  }

  // Assuming your server is running on localhost:4000 and public is accessible as static
  const imageUrl = `public\pictures\ ${req.file.filename}`;

  res.status(200).json({
    message: 'File uploaded successfully',
    path: imageUrl
  });
});



/*
app.post("/api/upload-audio", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const inputFile = req.file.path;
    const outputFileName = `output-${Date.now()}.wav`;
    const outputFilePath = path.join(__dirname, "uploads", outputFileName);

    // Run FFmpeg command to convert the input audio file to WAV
    const command = `ffmpeg -y -i ${inputFile} -ar 44100 -ac 2 ${outputFilePath}`;

    // Execute the FFmpeg command
    await exec(command);

    res.status(200).json({
      message: "Audio file converted to WAV and saved successfully.",
      convertedAudioPath: `/uploads/${outputFileName}`,
    });
  } catch (error) {
    console.error("Error handling audio upload:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});
*/



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
