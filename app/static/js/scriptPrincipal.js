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
      // Aquí podrías llamar a una función de detección de emociones, pasándole la imagen actual como argumento
      detectEmotion(images[currentImageIndex]);
    } else {
      console.error('Image container not found.');
    }
  }

  // Función para iniciar la cámara web
  function startWebcam() {
    const constraints = {
      video: true
    };
    const profileContainer = document.querySelector('.profile-container');
    if (!profileContainer) {
      console.error('Profile container not found.');
      return;
    }
    const existingImage = profileContainer.querySelector('img');
    if (existingImage) {
      existingImage.remove();
    }
    const video = document.createElement('video');
    video.setAttribute('autoplay', '');
    video.setAttribute('playsinline', '');
    profileContainer.appendChild(video);
    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        video.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error accessing the webcam', error);
      });
  }

  startWebcam();

  // Esquema básico para la función de detección de emociones
  // Deberás reemplazar esto con la integración de una biblioteca de reconocimiento de emociones real
  function detectEmotion(imageUrl) {
    // Imagina que esta función analiza la imagen y detecta emociones
    console.log(`Detecting emotion for image: ${imageUrl}`);
    // Aquí iría el código para invocar una API de reconocimiento de emociones o usar una biblioteca JS
    // Por ejemplo, podría actualizar algún elemento en la página con la emoción detectada.
  }

  const btnStartRecord = document.getElementById('btnStartRecord');
  const btnStopRecord = document.getElementById('btnStopRecord');
  const btnPlayText = document.getElementById('btnPlayText'); // Corregido el ID del botón
  const texto = document.getElementById('texto');
  
  let recognition = new webkitSpeechRecognition();
  recognition.lang = 'es-MX'; // Cambiado el idioma a español latinoamericano
  recognition.continuous = true;
  recognition.interimResults = false;
  
  recognition.onresult = (event) => {
    const results = event.results;
    const frase = results[results.length - 1][0].transcript;
    texto.value += frase;
  }
  recognition.onend = (event) => {
    console.log('El micro deja de escuchar');
  }
  
  recognition.onerror = (event) => {
    console.log(event.error);
  }
  
  btnStartRecord.addEventListener('click', () => {
    recognition.start();
  });
  btnStopRecord.addEventListener('click', () => {
    recognition.abort();
  });
  btnplayText.addEventListener('click', () => { // Corregido el nombre del botón
    LeerTexto(texto.value);
  });
  
  function LeerTexto(texto) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = texto;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
  
    window.speechSynthesis.speak(speech);
  }
  
});
