const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlbiggerElement = document.querySelector('.scale__control--bigger');
const scaleControlInputElement = document.querySelector('.scale__control--value');
const imageUploadElement = document.querySelector('.img-upload__preview img');
const maxValue = 100;
const minValue = 25;
const scaleStep = 25;
const defaultValue = 100;
const percentageCoefficient = 0.01;

const scaleControlBiggerElementClickHandler = () => {
  let currentValue = parseInt(scaleControlInputElement['value'], 10);
  if (currentValue < maxValue) {
    currentValue += scaleStep;
    scaleControlInputElement['value'] = `${currentValue}%`;
    imageUploadElement.style.transform = `scale(${percentageCoefficient * currentValue})`;
  }
};

const scaleControlSmallerElementClickHandler = () => {
  let currentValue = parseInt(scaleControlInputElement['value'], 10);
  if (currentValue > minValue) {
    currentValue -= scaleStep;
    scaleControlInputElement['value'] = `${currentValue}%`;
    imageUploadElement.style.transform = `scale(${percentageCoefficient * currentValue})`;
  }
};

const setDefaultScale = () => {
  scaleControlInputElement['value'] = `${defaultValue}%`;
  imageUploadElement.style.transform = `scale(${percentageCoefficient * defaultValue})`;
  scaleControlSmallerElement.addEventListener('click', scaleControlSmallerElementClickHandler);
  scaleControlbiggerElement.addEventListener('click', scaleControlBiggerElementClickHandler);
};

const resetScale = () => {
  scaleControlInputElement['value'] = `${defaultValue}%`;
  imageUploadElement.removeAttribute('style');
  scaleControlSmallerElement.removeEventListener('click', scaleControlSmallerElementClickHandler);
  scaleControlbiggerElement.removeEventListener('click', scaleControlBiggerElementClickHandler);
};


export { resetScale, setDefaultScale, imageUploadElement };
