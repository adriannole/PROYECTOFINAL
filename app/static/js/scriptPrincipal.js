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

// Función para iniciar la cámara web
function startWebcam() {
  const constraints = {
      video: {
          width: { exact: 200 }, // Establece el ancho exacto de la cámara
          height: { exact: 200 } // Establece la altura exacta de la cámara
      }
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
  video.setAttribute('width', '200'); // Ajusta el ancho del video
  video.setAttribute('height', '200'); // Ajusta la altura del video
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

//Botones de Voz a Texto 
  const btnStartRecord = document.getElementById('btnStartRecord');
  const btnStopRecord = document.getElementById('btnStopRecord');
  const texto = document.getElementById('texto');
  let currentIndex = 0;
  let firstChange = true;
  
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
  
});

//Dynamica del contenido de la imagen
window.onload = function() {
  var img = document.getElementById('dynamicImage');
  var container = img.parentElement;

  img.onload = function() {
    var width = img.offsetWidth;
    container.style.width = width + 'px'; // Ajusta el ancho del contenedor al de la imagen
    container.style.margin = '0 auto'; // Centra el contenedor
  };
};

//Funcion para leer el texto 
document.addEventListener("DOMContentLoaded", function() {
  const texts = document.querySelectorAll('.text');
  let currentIndex = 0;
  let firstChange = true;
  
  // Define tus URLs de imágenes aquí
  var images = [
    '/app/static/img/imgtest1-09.png',
    '/app/static/img/imgtest2-09.png',
    '/app/static/img/imgtest3-09.png',
    '/app/static/img/imgtest4-09.png',
    '/app/static/img/imgtest5-09.png',
    '/app/static/img/imgtest6-09.png',
    '/app/static/img/imgtest7-09.png',
    '/app/static/img/imgtest8-09.png',
    '/app/static/img/imgtest9-09.png',
    '/app/static/img/imgtest10-09.png'
  ];
  var currentImageIndex = 0; // Índice de la imagen inicial

// Configura la imagen inicial
var imageContainer = document.querySelector('.image-container img');
if(imageContainer) {
  imageContainer.src = images[currentImageIndex]; // Establece la primera imagen
}

function showText(index) {
  texts.forEach((text, i) => {
    if (i === index) {
      text.classList.add('active');
      speakText(text.innerText); // Llama a la función para leer el texto en voz alta
    } else {
      text.classList.remove('active');
    }
  });
}
  
  function toggleText() {
    window.speechSynthesis.cancel(); // Detiene cualquier síntesis de voz actual antes de cambiar de texto
    
    if (firstChange) {
      currentIndex++;
      currentImageIndex++;
      firstChange = false;
    } else {
      currentIndex = (currentIndex + 1) % texts.length;
      currentImageIndex = (currentImageIndex + 1) % images.length; // Asegura un ciclo continuo de imágenes
    }

    showText(currentIndex);
    changeImage();
  }

  function changeImage() {
    if (imageContainer) {
      imageContainer.src = images[currentImageIndex];
    } else {
      console.error('Image container not found.');
    }
  }
  
  // Función para leer el texto en voz alta
  function speakText(text) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = 'es-ES'; // Establece el idioma del texto a español
      window.speechSynthesis.speak(speech);
  }
  
  // Mostrar el primer texto (y la imagen inicial) al cargar la página
  showText(currentIndex);
  
  // Añadir event listener al botón para cambiar el texto y la imagen al hacer clic
  const changeTextButton = document.getElementById('changeTextButton');
  changeTextButton.addEventListener('click', toggleText);
});
