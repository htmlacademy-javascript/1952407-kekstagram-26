import { imageUploadElement } from './image-scale.js';

const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');
const sliderWrapperElement = document.querySelector('.img-upload__effect-level');

const effectNoneElement = document.querySelector('#effect-none');
const effectChromeElement = document.querySelector('#effect-chrome');
const effectSepiaElement = document.querySelector('#effect-sepia');
const effectMarvinElement = document.querySelector('#effect-marvin');
const effectPhobosElement = document.querySelector('#effect-phobos');
const effectHeatElement = document.querySelector('#effect-heat');

const EffectsValues = {
  DEFAULT: { startValue: 1, minValue: 0, maxValue: 1, stepValue: 0.1 },
  CHROME: { startValue: 1, minValue: 0, maxValue: 1, stepValue: 0.1 },
  SEPIA: { startValue: 1, minValue: 0, maxValue: 1, stepValue: 0.1 },
  MARVIN: { startValue: 100, minValue: 0, maxValue: 100, stepValue: 1 },
  PHOBOS: { startValue: 3, minValue: 0, maxValue: 3, stepValue: 0.1 },
  HEAT: { startValue: 3, minValue: 1, maxValue: 3, stepValue: 0.1 },
};

const resetSlider = () => {
  sliderWrapperElement.classList.add('hidden');
  effectLevelValueElement.value = '';
  effectNoneElement.checked = 'true';
  imageUploadElement.removeAttribute('style');
  imageUploadElement.removeAttribute('class');
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
    sliderWrapperElement.classList.remove('hidden');
    imageUploadElement.className = '';
    imageUploadElement.classList.add(effectClass);

    sliderElement.noUiSlider.on('update', () => {
      effectLevelValueElement.value = sliderElement.noUiSlider.get();
      imageUploadElement.style.filter = `${filterName}(${sliderElement.noUiSlider.get()}${unitOfMeasurement})`;
    });
  }
};

const effectNoneElementClickHandler = () => {
  sliderWrapperElement.classList.add('hidden');
  effectLevelValueElement.value = '';
  imageUploadElement.className = '';
  imageUploadElement.style.filter = 'none';
};

const effectChromeElementClickHandler = () => setSliderSettings(
  effectChromeElement,
  EffectsValues.CHROME.minValue,
  EffectsValues.CHROME.maxValue,
  EffectsValues.CHROME.stepValue,
  EffectsValues.CHROME.startValue,
  'effects__preview--chrome',
  'grayscale',
  ''
);

const effectSepiaElementClickHandler = () => setSliderSettings(
  effectSepiaElement,
  EffectsValues.SEPIA.minValue,
  EffectsValues.SEPIA.maxValue,
  EffectsValues.SEPIA.stepValue,
  EffectsValues.SEPIA.startValue,
  'effects__preview--sepia',
  'sepia',
  ''
);

const effectMarvinElementClickHandler = () => setSliderSettings(
  effectMarvinElement,
  EffectsValues.MARVIN.minValue,
  EffectsValues.MARVIN.maxValue,
  EffectsValues.MARVIN.stepValue,
  EffectsValues.MARVIN.startValue,
  'effects__preview--marvin',
  'invert',
  '%'
);

const effectPhobosElementClickHandler = () => setSliderSettings(
  effectPhobosElement,
  EffectsValues.PHOBOS.minValue,
  EffectsValues.PHOBOS.maxValue,
  EffectsValues.PHOBOS.stepValue,
  EffectsValues.PHOBOS.startValue,
  'effects__preview--phobos',
  'blur',
  'px'
);

const effectHeatElementClickHandler = () => setSliderSettings(
  effectHeatElement,
  EffectsValues.HEAT.minValue,
  EffectsValues.HEAT.maxValue,
  EffectsValues.HEAT.stepValue,
  EffectsValues.HEAT.startValue,
  'effects__preview--heat',
  'brightness',
  ''
);

const addListenersToFilters = () => {
  effectNoneElement.addEventListener('change', effectNoneElementClickHandler);
  effectChromeElement.addEventListener('change', effectChromeElementClickHandler);
  effectSepiaElement.addEventListener('change', effectSepiaElementClickHandler);
  effectMarvinElement.addEventListener('change', effectMarvinElementClickHandler);
  effectPhobosElement.addEventListener('change', effectPhobosElementClickHandler);
  effectHeatElement.addEventListener('change', effectHeatElementClickHandler);
};

const removeListenersFromFilters = () => {
  effectNoneElement.removeEventListener('change', effectNoneElementClickHandler);
  effectChromeElement.removeEventListener('change', effectChromeElementClickHandler);
  effectSepiaElement.removeEventListener('change', effectSepiaElementClickHandler);
  effectMarvinElement.removeEventListener('change', effectMarvinElementClickHandler);
  effectPhobosElement.removeEventListener('change', effectPhobosElementClickHandler);
  effectHeatElement.removeEventListener('change', effectHeatElementClickHandler);
};

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: EffectsValues.DEFAULT.minValue,
      max: EffectsValues.DEFAULT.maxValue,
    },
    start: EffectsValues.DEFAULT.startValue,
    step: EffectsValues.DEFAULT.stepValue,
    connect: 'lower',
    format: {
      to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1), // значение из слайдера в форму
      from: (value) => parseFloat(value) // значение для слайдера
    },
  });

  resetSlider();
  addListenersToFilters();
};

const destroySlider = () => {
  resetSlider();
  removeListenersFromFilters();
  sliderElement.noUiSlider.destroy();
};

export { createSlider, destroySlider };

