document.addEventListener('DOMContentLoaded', (event) => {
  let timerElement = document.getElementById('timer');
  let time = 1; // time in seconds

  function updateTimer() {
    let minutes = Math.floor(time / 60).toString().padStart(2, '0');
    let seconds = (time % 60).toString().padStart(2, '0');
    timerElement.textContent = `${minutes}:${seconds}`;
    time++;
  }

  setInterval(updateTimer, 1000);

  var images = [
    'https://placehold.co/688x461',
    'https://placehold.co/600x400',
    'https://placehold.co/500x300'
  ];
  var currentImageIndex = 0;

  function changeImage() {
    currentImageIndex++;
    if (currentImageIndex >= images.length) {
      currentImageIndex = 0;
    }
    var imageContainer = document.querySelector('.image-container img');
    if (imageContainer) {
      imageContainer.src = images[currentImageIndex];
    } else {
      console.error('Image container not found.');
    }
  }

  let voiceButton = document.querySelector('.voice-button');
  if (voiceButton) {
    voiceButton.addEventListener('click', changeImage);
  } else {
    console.error('Voice button not found.');
  }
});
