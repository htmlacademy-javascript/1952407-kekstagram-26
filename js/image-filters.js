import { imageUploadElement } from './image-scale.js';

const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');

const effectNoneElement = document.querySelector('#effect-none');
const effectChromeElement = document.querySelector('#effect-chrome');
const effectSepiaElement = document.querySelector('#effect-sepia');
const effectMarvinElement = document.querySelector('#effect-marvin');
const effectPhobosElement = document.querySelector('#effect-phobos');
const effectHeatElement = document.querySelector('#effect-heat');

const startValue = 1;
const minValue = 0;
const maxValue = 1;
const stepValue = 0.1;

const resetSlider = () => {
  sliderElement.classList.add('hidden');
  effectLevelValueElement.value = '';
  effectNoneElement.checked = 'true';
  imageUploadElement.removeAttribute('style');
  imageUploadElement.removeAttribute('class');
};

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: minValue,
      max: maxValue,
    },
    start: startValue,
    step: stepValue,
    connect: 'lower',
    format: {
      to: (value) => { // значение из слайдера в форму
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: (value) => parseFloat(value) // значение для слайдера
    },
  });

  resetSlider();
};

const destroySlider = () => {
  resetSlider();
  sliderElement.noUiSlider.destroy();
};

const setSliderSettings = (effectId, min, max, step, start, effectClass, filterName, unitOfMeasurement) => {
  if (effectId.checked) {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: min,
        max: max
      },
      step: step,
    });

    sliderElement.noUiSlider.set(start);
    sliderElement.classList.remove('hidden');
    imageUploadElement.className = '';
    imageUploadElement.classList.add(effectClass);

    sliderElement.noUiSlider.on('update', () => {
      effectLevelValueElement.value = sliderElement.noUiSlider.get();
      imageUploadElement.style.filter = `${filterName}(${sliderElement.noUiSlider.get()}${unitOfMeasurement})`;
    });
  }
};

const effectNoneElementClickHandler = () => {
  sliderElement.classList.add('hidden');
  effectLevelValueElement.value = '';
  imageUploadElement.className = '';
  imageUploadElement.removeAttribute('style');
};

const effectChromeElementClickHandler = () => setSliderSettings(
  effectChromeElement, minValue, maxValue, stepValue, startValue, 'effects__preview--chrome', 'grayscale', ''
);

const effectSepiaElementClickHandler = () => setSliderSettings(
  effectSepiaElement, minValue, maxValue, stepValue, startValue, 'effects__preview--sepia', 'sepia', ''
);


// const effectChromeElementClickHandler = () => {
//   if (effectChromeElement.checked) {
//     sliderElement.noUiSlider.updateOptions({
//       range: {
//         min: minValue,
//         max: maxValue
//       },
//       step: stepValue,
//     });

//     sliderElement.noUiSlider.set(startValue);
//     sliderElement.classList.remove('hidden');
//     imageUploadElement.className = '';
//     imageUploadElement.classList.add('effects__preview--chrome');

//     sliderElement.noUiSlider.on('update', () => {
//       effectLevelValueElement.value = sliderElement.noUiSlider.get();
//       imageUploadElement.style.filter = `grayscale(${sliderElement.noUiSlider.get()})`;
//     });
//   }
// };


effectNoneElement.addEventListener('change', effectNoneElementClickHandler);
effectChromeElement.addEventListener('change', effectChromeElementClickHandler);
effectSepiaElement.addEventListener('change', effectSepiaElementClickHandler);
// effectMarvinElement.addEventListener('change');
// effectPhobosElement.addEventListener('change');
// effectHeatElement.addEventListener('change');

export { createSlider, destroySlider };

