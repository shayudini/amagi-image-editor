import { qs, eventOn, capitalizeFirstLetterSecondWord } from './utils.js';

const brightnessInput = qs('#brightness');
const saturationInput = qs('#saturation');
const blurInput = qs('#blur');
const inversionInput = qs('#inversion');
const contrastInput = qs('#contrast');
const grayscaleInput = qs('#grayscale');
const hueRotateInput = qs('#hue-rotate');
const sepiaInput = qs('#sepia');

const fileInput = qs('#image-file-input');
const imageWrapper = qs('.image-wrapper');
const imageSelector = qs('.image-selector');
const loadImageButton = qs('#load-image');
const downloadLink = qs('#download-link');
const resetButton = qs('#reset');
const discardButton = qs('#discard');
const canvas = qs('#canvas');
const canvasCtx = canvas.getContext('2d');

const darkMode = qs('#dark-mode');
const themeIcon = qs('#theme-icon');

const settingsMap = [
  brightnessInput,
  saturationInput,
  blurInput,
  inversionInput,
  contrastInput,
  grayscaleInput,
  hueRotateInput,
  sepiaInput,
];

const settings = {};
let image = null;

function resetSettings() {
  settings.brightness = '100';
  settings.saturation = '100';
  settings.blur = '0';
  settings.inversion = '0';
  settings.contrast = '100';
  settings.grayscale = '0';
  settings.hueRotate = '0';
  settings.sepia = '0';

  brightnessInput.value = settings.brightness;
  saturationInput.value = settings.saturation;
  blurInput.value = settings.blur;
  inversionInput.value = settings.inversion;
  contrastInput.value = settings.contrast;
  grayscaleInput.value = settings.grayscale;
  hueRotateInput.value = settings.hueRotate;
  sepiaInput.value = settings.sepia;
}

function updateSetting(key, value) {
  if (!image) return;

  settings[key] = value;
  renderImage();
}

function generateFilter() {
  const {
    brightness,
    saturation,
    blur,
    inversion,
    contrast,
    grayscale,
    sepia,
    hueRotate,
  } = settings;

  return `brightness(${brightness}%) saturate(${saturation}%) blur(${blur}px) invert(${inversion}%) contrast(${contrast}%) grayscale(${grayscale}%) hue-rotate(${hueRotate}deg) sepia(${sepia}%)`;
}
function renderImage() {
  canvas.width = image.width;
  canvas.height = image.height;

  canvasCtx.filter = generateFilter();
  canvasCtx.drawImage(image, 0, 0);
}

function downloadCanvas() {
  const image = canvas
    .toDataURL('image/png')
    .replace('image/png', 'image/octet-stream');

  downloadLink.download = 'image.png';
  downloadLink.href = image;
}

function clearCanvas() {
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
}

settingsMap.forEach((input) => {
  eventOn(input, 'change', () => {
    updateSetting(
      input.id.includes('-')
        ? capitalizeFirstLetterSecondWord(input.id)
        : input.id,
      input.value
    );
  });
});

// File selector
eventOn(fileInput, 'change', () => {
  image = new Image();

  eventOn(image, 'load', () => {
    imageSelector.classList.add('hidden');
    resetSettings();
    renderImage();
  });

  image.src = URL.createObjectURL(fileInput.files[0]);
});

eventOn(downloadLink, 'click', downloadCanvas);

// Reset settings
eventOn(resetButton, 'click', () => {
  if (!image) return;

  resetSettings();
  renderImage();
});

// Discard image
eventOn(discardButton, 'click', () => {
  image = null;
  imageSelector.classList.remove('hidden');
  clearCanvas();
});

// Load new image
eventOn(loadImageButton, 'click', () => {
  fileInput.click();
});

// Drag and drop
['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
  eventOn(imageWrapper, eventName, (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
});

['dragenter', 'dragover'].forEach((eventName) => {
  eventOn(imageWrapper, eventName, () => {
    imageWrapper.classList.add('drag-over');
  });
});

['dragleave', 'drop'].forEach((eventName) => {
  eventOn(imageWrapper, eventName, () => {
    imageWrapper.classList.remove('drag-over');
  });
});

imageWrapper.addEventListener('drop', (e) => {
  e.preventDefault();

  image = new Image();

  eventOn(image, 'load', () => {
    imageSelector.classList.add('hidden');
    resetSettings();
    renderImage();
  });

  image.src = URL.createObjectURL(e.dataTransfer.files[0]);
});

eventOn(darkMode, 'click', () => {
  if (localStorage.theme === 'dark') {
    localStorage.theme = 'light';
    document.documentElement.classList.remove('dark');
  } else {
    localStorage.theme = 'dark';
    document.documentElement.classList.add('dark');
  }
});
