document.addEventListener("DOMContentLoaded", function() {
  const texts = document.querySelectorAll('.text');
  let currentIndex = 0;
  let firstChange = true;

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
      if (firstChange) {
          currentIndex++;
          firstChange = false;
      } else {
          currentIndex = (currentIndex + 1) % texts.length;
      }
      showText(currentIndex);
  }

  // Función para leer el texto en voz alta
  function speakText(text) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = 'es-ES'; // Establece el idioma del texto a español
      window.speechSynthesis.speak(speech);
  }

  // Mostrar el primer texto al cargar la página
  showText(currentIndex);

  // Cambiar automáticamente el texto cada 5 segundos después del primer cambio
  setInterval(() => {
      toggleText();
  }, 5000);
});