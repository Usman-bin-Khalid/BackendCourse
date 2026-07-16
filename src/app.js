const express = require("express");
const multer = require("multer");
const noteModel = require("./models/note.model");
const postModel = require("./models/post.model");
const authRoutes = require("./routes/auth.routes");
const postRoutes = require('./routes/post.routes');
const uploadFile = require("./services/storage.service");
const cookieParser = require('cookie-parser')
const app = express();
app.use(express.json());
app.use(cookieParser);


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
  const post = await postModel.create({
    image : result.url,
    caption : req.body.caption,
  });
   return res.status(201).json({
    message : 'Post created successfully',
    post : post
   })
});



app.get('/posts', async (req , res) => {
     const posts = await postModel.find();
     return res.status(200).json({
      message : 'Post fetched successfully',
      posts : posts,
     })
});


app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);


module.exports = app;
