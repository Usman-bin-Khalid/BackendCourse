const express = require("express");
const multer = require("multer");
const noteModel = require("./models/note.model");
const uploadFile = require("./services/storage.service");
const app = express();
app.use(express.json());


const upload = multer({
  storage : multer.memoryStorage(),
}) 

app.post('/notes' , async (req , res) => {
   const data = req.body;
  await noteModel.create({
     title : data.title,
     description : data.description,
   });
  
   res.status((201).json({
     message : 'Note created successfully',
   }));
})

app.get('/notes', async (req , res) => {
  const notes = await noteModel.find();
  res.status(200).json({
    notes : notes, 
    message : 'Notes fetched successfully'
  })
})

app.delete('/notes/:id' , async (req , res) => {
  const id = req.params.id;
  await noteModel.findOneAndDelete({_id : id});
  res.status(200).json({
    message : 'Notes deleted successfully',
  })
});


app.patch('/notes/:id' , async (req , res) => {
   const id = req.params.id;
   const data = req.body;
   await noteModel.findOneAndUpdate({_id : id});
   res.status(200).json({
    message : 'Notes updated successfully',
   })
})

app.post('/create-post', upload.single('image'), async (req , res) => {
  console.log(req.body);
  cosole.log(req.file);
  const result = await uploadFile(req.file.buffer);
});


module.exports = app;
