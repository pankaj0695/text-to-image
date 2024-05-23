const axios = require('axios');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

async function generateImage(text) {
  let data = JSON.stringify({
    inputs: text,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
    },
    responseType: 'arraybuffer',
    data: data,
  };

  try {
    const response = await axios.request(config);
    const imagePath = path.join(__dirname, 'public', 'generated-image.png');
    fs.writeFileSync(imagePath, response.data, 'binary');
    return './generated-image.png';
  } catch (err) {
    console.log('Error generating image: ', err);
  }
}

module.exports = generateImage;
