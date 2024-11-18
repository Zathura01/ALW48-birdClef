/*
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 4000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); 
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now(); 
    const fileName = file.originalname;
    const fileExt = path.extname(fileName);
    const uniqueFileName = `${fileName}--${timestamp}${fileExt}`;
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage });

app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/express",(req,res)=>{
  res.json("Express connected");
})
app.get("/",(req,res)=>{
    res.send("Hello")
})
app.post("/api/upload-audio", upload.single("audio"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const filePath = req.file.path;

    res.status(200).json({ message: "Audio  file uploaded successfully." });
  } catch (error) {
    console.error("Error handling audio upload:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}); 

app.listen(port, () => {
  console.log(`Server is running on port  4000`);
});
*/