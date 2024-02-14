const slider = document.getElementById('slider');
const sliderValue = document.getElementById('slider-value');

slider.addEventListener('input', () => {
  sliderValue.innerText = slider.value;
});