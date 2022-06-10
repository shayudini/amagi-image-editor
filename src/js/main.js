function qs(selector, scope) {
  return (scope || document).querySelector(selector);
}

function eventOn(target, type, callback, capture) {
  target.addEventListener(type, callback, !!capture);
}

const fileInput = qs('#image-file-input');
const canvas = qs('#canvas');
const canvasCtx = canvas.getContext('2d');
const brightnessInput = qs('#brightness');
const saturationInput = qs('#saturation');
const blurInput = qs('#blur');
const inversionInput = qs('#inversion');
const contrastInput = qs('#contrast');
const grayscaleInput = qs('#grayscale');
const sepiaInput = qs('#sepia');
const hueRotateInput = qs('#hue-rotate');
const imageWrapper = qs('.image-wrapper');
const imageSelector = qs('.image-selector');
const downloadLink = qs('#download-link');
const resetButton = qs('#reset');

const settings = {};
let image = null;

function resetSettings() {
  settings.brightness = '100';
  settings.saturation = '100';
  settings.blur = '0';
  settings.inversion = '0';
  settings.contrast = '100';
  settings.grayscale = '0';
  settings.sepia = '0';
  settings.hueRotate = '0';

  brightnessInput.value = settings.brightness;
  saturationInput.value = settings.saturation;
  blurInput.value = settings.blur;
  inversionInput.value = settings.inversion;
  contrastInput.value = settings.contrast;
  grayscaleInput.value = settings.grayscale;
  sepiaInput.value = settings.sepia;
  hueRotateInput.value = settings.hueRotate;
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

  return `brightness(${brightness}%) saturate(${saturation}%) blur(${blur}px) invert(${inversion}%) contrast(${contrast}%) grayscale(${grayscale}%) sepia(${sepia}%) hue-rotate(${hueRotate}deg)`;
}

function renderImage() {
  canvas.width = image.width;
  canvas.height = image.height;

  canvasCtx.filter = generateFilter();
  canvasCtx.drawImage(image, 0, 0);
}

eventOn(brightnessInput, 'change', () =>
  updateSetting('brightness', brightnessInput.value)
);
eventOn(saturationInput, 'change', () =>
  updateSetting('saturation', saturationInput.value)
);
eventOn(blurInput, 'change', () => updateSetting('blur', blurInput.value));
eventOn(inversionInput, 'change', () =>
  updateSetting('inversion', inversionInput.value)
);
eventOn(inversionInput, 'change', () =>
  updateSetting('contrast', contrastInput.value)
);
eventOn(grayscaleInput, 'change', () =>
  updateSetting('grayscale', grayscaleInput.value)
);
eventOn(sepiaInput, 'change', () => updateSetting('sepia', sepiaInput.value));
eventOn(hueRotateInput, 'change', () =>
  updateSetting('hueRotate', hueRotateInput.value)
);

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

function downloadCanvas() {
  const image = canvas
    .toDataURL('image/png')
    .replace('image/png', 'image/octet-stream');

  downloadLink.download = 'image.png';
  downloadLink.href = image;
}

eventOn(resetButton, 'click', () => {
  resetSettings();
  renderImage();
});
