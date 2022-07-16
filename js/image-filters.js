import { imageUploadElement } from './image-scale.js';

const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');

const effectNoneElement = document.querySelector('#effect-none');
const effectChromeElement = document.querySelector('#effect-chrome');
const effectSepiaElement = document.querySelector('#effect-sepia');
const effectMarvinElement = document.querySelector('#effect-marvin');
const effectPhobosElement = document.querySelector('#effect-phobos');
const effectHeatElement = document.querySelector('#effect-heat');

const EffectsValues = {
  default: { startValue: 1, minValue: 0, maxValue: 1, stepValue: 0.1 },
  chrome: { startValue: 1, minValue: 0, maxValue: 1, stepValue: 0.1 },
  sepia: { startValue: 1, minValue: 0, maxValue: 1, stepValue: 0.1 },
  marvin: { startValue: 100, minValue: 0, maxValue: 100, stepValue: 1 },
  phobos: { startValue: 3, minValue: 0, maxValue: 3, stepValue: 0.1 },
  heat: { startValue: 3, minValue: 1, maxValue: 3, stepValue: 0.1 },
};

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
      min: EffectsValues.default.minValue,
      max: EffectsValues.default.maxValue,
    },
    start: EffectsValues.default.startValue,
    step: EffectsValues.default.stepValue,
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

const setSliderSettings = (effectId, minValue, maxValue, stepValue, startValue, effectClass, filterName, unitOfMeasurement) => {
  if (effectId.checked) {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: minValue,
        max: maxValue
      },
      step: stepValue,
    });

    sliderElement.noUiSlider.set(startValue);
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
  imageUploadElement.style.filter = 'none';
};

const effectChromeElementClickHandler = () => setSliderSettings(
  effectChromeElement,
  EffectsValues.chrome.minValue,
  EffectsValues.chrome.maxValue,
  EffectsValues.chrome.stepValue,
  EffectsValues.chrome.startValue,
  'effects__preview--chrome',
  'grayscale',
  ''
);

const effectSepiaElementClickHandler = () => setSliderSettings(
  effectSepiaElement,
  EffectsValues.sepia.minValue,
  EffectsValues.sepia.maxValue,
  EffectsValues.sepia.stepValue,
  EffectsValues.sepia.startValue,
  'effects__preview--sepia',
  'sepia',
  ''
);

const effectMarvinElementClickHandler = () => setSliderSettings(
  effectMarvinElement,
  EffectsValues.marvin.minValue,
  EffectsValues.marvin.maxValue,
  EffectsValues.marvin.stepValue,
  EffectsValues.marvin.startValue,
  'effects__preview--marvin',
  'invert',
  '%'
);

const effectPhobosElementClickHandler = () => setSliderSettings(
  effectPhobosElement,
  EffectsValues.phobos.minValue,
  EffectsValues.phobos.maxValue,
  EffectsValues.phobos.stepValue,
  EffectsValues.phobos.startValue,
  'effects__preview--phobos',
  'blur',
  'px'
);

const effectHeatElementClickHandler = () => setSliderSettings(
  effectHeatElement,
  EffectsValues.heat.minValue,
  EffectsValues.heat.maxValue,
  EffectsValues.heat.stepValue,
  EffectsValues.heat.startValue,
  'effects__preview--heat',
  'brightness',
  ''
);

effectNoneElement.addEventListener('change', effectNoneElementClickHandler);
effectChromeElement.addEventListener('change', effectChromeElementClickHandler);
effectSepiaElement.addEventListener('change', effectSepiaElementClickHandler);
effectMarvinElement.addEventListener('change', effectMarvinElementClickHandler);
effectPhobosElement.addEventListener('change', effectPhobosElementClickHandler);
effectHeatElement.addEventListener('change', effectHeatElementClickHandler);

export { createSlider, destroySlider };

