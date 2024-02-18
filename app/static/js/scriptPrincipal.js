document.addEventListener('DOMContentLoaded', (event) => {
  // Start the timer
  let timerElement = document.getElementById('timer');
  let time = 1; // time in seconds

  function updateTimer() {
    let minutes = Math.floor(time / 60).toString().padStart(2, '0');
    let seconds = (time % 60).toString().padStart(2, '0');
    timerElement.textContent = `${minutes}:${seconds}`;
    time++;
  }

  setInterval(updateTimer, 1000);

  // Handle the "Cancelar" button click
  document.querySelector('.cancel').addEventListener('click', function() {
    window.alert('Cancel button clicked!');
  });

  // Handle the "Finalizar" button click
  document.querySelector('.finish').addEventListener('click', function() {
    window.alert('Finish button clicked!');
  });

  // Handle the "Voice" button click (assuming it would trigger some voice interaction)
  document.querySelector('.voice-button').addEventListener('click', function() {
    window.alert('Voice interaction initiated!');
  });
});
