const textArea = document.getElementById('text-to-image');
const submitButton = document.getElementById('generate-button');
const generatedImage = document.getElementById('generated-image');

submitButton.disabled = true;

textArea.addEventListener('input', verifyTextLength);
submitButton.addEventListener('click', submitData);

function verifyTextLength(e) {
  const text = e.target.value;
  if (text.length > 10 && text.length < 100) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

async function submitData(e) {
  submitButton.classList.add('submit-button--loading');
  const text_to_image = textArea.value;
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify({
    text: text_to_image,
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  try {
    const response = await fetch(
      'http://localhost:3000/generate',
      requestOptions
    );
    const imagePath = await response.text();
    console.log('Received image path:', imagePath);
    generatedImage.src = imagePath;
    generatedImage.style.display = 'block';
    submitButton.classList.remove('submit-button--loading');
  } catch (err) {
    console.log('Error: ', err);
    submitButton.classList.remove('submit-button--loading');
  }
}
