const MAX_VALUE = 100;
const MIN_VALUE = 25;
const SCALE_STEP = 25;
const DEFAULT_VALUE = 100;
const PERCENTAGE_COEFFICIENT = 0.01;
const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
const scaleControlInputElement = document.querySelector('.scale__control--value');
const imageUploadElement = document.querySelector('.img-upload__preview img');

const scaleControlBiggerElementClickHandler = () => {
  let currentValue = parseInt(scaleControlInputElement['value'], 10);
  if (currentValue < MAX_VALUE) {
    currentValue += SCALE_STEP;
    scaleControlInputElement['value'] = `${currentValue}%`;
    imageUploadElement.style.transform = `scale(${PERCENTAGE_COEFFICIENT * currentValue})`;
  }
};

const scaleControlSmallerElementClickHandler = () => {
  let currentValue = parseInt(scaleControlInputElement['value'], 10);
  if (currentValue > MIN_VALUE) {
    currentValue -= SCALE_STEP;
    scaleControlInputElement['value'] = `${currentValue}%`;
    imageUploadElement.style.transform = `scale(${PERCENTAGE_COEFFICIENT * currentValue})`;
  }
};

const setDefaultScale = () => {
  scaleControlInputElement['value'] = `${DEFAULT_VALUE}%`;
  imageUploadElement.style.transform = `scale(${PERCENTAGE_COEFFICIENT * DEFAULT_VALUE})`;
  scaleControlSmallerElement.addEventListener('click', scaleControlSmallerElementClickHandler);
  scaleControlBiggerElement.addEventListener('click', scaleControlBiggerElementClickHandler);
};

const resetScale = () => {
  scaleControlInputElement['value'] = `${DEFAULT_VALUE}%`;
  imageUploadElement.removeAttribute('style');
  scaleControlSmallerElement.removeEventListener('click', scaleControlSmallerElementClickHandler);
  scaleControlBiggerElement.removeEventListener('click', scaleControlBiggerElementClickHandler);
};


export { resetScale, setDefaultScale, imageUploadElement };
