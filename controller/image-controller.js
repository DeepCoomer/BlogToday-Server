import grid from "gridfs-stream";
import mongoose from "mongoose";
import cloudinary from 'cloudinary';

const url = "http://localhost:8000";

let gfs;
const conn = mongoose.connection;
conn.once("open", () => {
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});

export const uploadImage = async (req, res) => {
//   if (!req.file) return res.status(404).json("File not found");

//   console.log(req.body);

  // const imageUrl = `${req.protocol}://${req.get(
  //     "host"
  //   )}/api/file/${req.file.filename}`;
  let public_id = "";
  let url = "";
  const myCloud = await cloudinary.v2.uploader
    .upload(req.body.file, {
      folder: "blogposts",
      width: 150,
      crop: "scale",
    })
    .then((result) => {
      public_id = result.public_id;
      url = result.secure_url;
    })
    .catch((err) => {
        console.log(err);
    })

  res.status(200).json(url);
};

export const getImage = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    res.status(500).json(error);
  }
};
