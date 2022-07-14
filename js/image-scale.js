const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlbiggerElement = document.querySelector('.scale__control--bigger');
const scaleControlInputElement = document.querySelector('.scale__control--value');
const imageUpload = document.querySelector('.img-upload__preview img');
const maxValue = 100;
const minValue = 25;
const scaleStep = 25;
const defaultValue = 100;
const percentageCoefficient = 0.01;

const scaleControlbiggerElementClickHandler = () => {
  let currentValue = parseInt(scaleControlInputElement['value'], 10);
  if (currentValue < maxValue) {
    currentValue += scaleStep;
    scaleControlInputElement['value'] = `${currentValue}%`;
    imageUpload.style.transform = `scale(${percentageCoefficient * currentValue})`;
  }
};

const scaleControlSmallerElementClickHandler = () => {
  let currentValue = parseInt(scaleControlInputElement['value'], 10);
  if (currentValue > minValue) {
    currentValue -= scaleStep;
    scaleControlInputElement['value'] = `${currentValue}%`;
    imageUpload.style.transform = `scale(${percentageCoefficient * currentValue})`;
  }
};

const setDefaultScale = () => {
  scaleControlInputElement['value'] = `${defaultValue}%`;
  imageUpload.style.transform = `scale(${percentageCoefficient * defaultValue})`;
  scaleControlSmallerElement.addEventListener('click', scaleControlSmallerElementClickHandler);
  scaleControlbiggerElement.addEventListener('click', scaleControlbiggerElementClickHandler);
};

const resetScale = () => {
  scaleControlInputElement['value'] = `${defaultValue}%`;
  imageUpload.style.transform = `scale(${percentageCoefficient * defaultValue})`;
  scaleControlSmallerElement.removeEventListener('click', scaleControlSmallerElementClickHandler);
  scaleControlbiggerElement.removeEventListener('click', scaleControlbiggerElementClickHandler);
};


export {resetScale, setDefaultScale};
