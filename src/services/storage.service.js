const {imageKit} = require("@imagekit/nodejs");

const imagekit = new imageKit({
  privateKey : "private_rMClqksr5ajvLujRLZ0+Zo1Afl8="
});


async function uploadFile(buffer) {
   const result = await imagekit.files.upload({
          file : buffer.toString('base64'),
          fileName : "image.jpg",
   });
   return result;
}

module.exports = uploadFile;