(() => {
  // src/js/utils.js
  function qs(selector, scope) {
    return (scope || document).querySelector(selector);
  }
  function eventOn(target, type, callback, capture) {
    target.addEventListener(type, callback, !!capture);
  }
  function capitalizeFirstLetterSecondWord(string) {
    const secondWord = string.split("-")[1].charAt(0).toUpperCase() + string.split("-")[1].slice(1);
    return string.split("-")[0] + secondWord;
  }

  // src/js/main.js
  var brightnessInput = qs("#brightness");
  var saturationInput = qs("#saturation");
  var blurInput = qs("#blur");
  var inversionInput = qs("#inversion");
  var contrastInput = qs("#contrast");
  var grayscaleInput = qs("#grayscale");
  var hueRotateInput = qs("#hue-rotate");
  var sepiaInput = qs("#sepia");
  var fileInput = qs("#image-file-input");
  var imageWrapper = qs(".image-wrapper");
  var imageSelector = qs(".image-selector");
  var loadImageButton = qs("#load-image");
  var downloadLink = qs("#download-link");
  var resetButton = qs("#reset");
  var discardButton = qs("#discard");
  var canvas = qs("#canvas");
  var canvasCtx = canvas.getContext("2d");
  var darkMode = qs("#dark-mode");
  var themeIcon = qs("#theme-icon");
  var settingsMap = [
    brightnessInput,
    saturationInput,
    blurInput,
    inversionInput,
    contrastInput,
    grayscaleInput,
    hueRotateInput,
    sepiaInput
  ];
  var settings = {};
  var image = null;
  function resetSettings() {
    settings.brightness = "100";
    settings.saturation = "100";
    settings.blur = "0";
    settings.inversion = "0";
    settings.contrast = "100";
    settings.grayscale = "0";
    settings.hueRotate = "0";
    settings.sepia = "0";
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
    if (!image)
      return;
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
      hueRotate
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
    const image2 = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    downloadLink.download = "image.png";
    downloadLink.href = image2;
  }
  function clearCanvas() {
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  }
  settingsMap.forEach((input) => {
    eventOn(input, "change", () => {
      updateSetting(input.id.includes("-") ? capitalizeFirstLetterSecondWord(input.id) : input.id, input.value);
    });
  });
  eventOn(fileInput, "change", () => {
    image = new Image();
    eventOn(image, "load", () => {
      imageSelector.classList.add("hidden");
      resetSettings();
      renderImage();
    });
    image.src = URL.createObjectURL(fileInput.files[0]);
  });
  eventOn(downloadLink, "click", downloadCanvas);
  eventOn(resetButton, "click", () => {
    if (!image)
      return;
    resetSettings();
    renderImage();
  });
  eventOn(discardButton, "click", () => {
    image = null;
    imageSelector.classList.remove("hidden");
    clearCanvas();
  });
  eventOn(loadImageButton, "click", () => {
    fileInput.click();
  });
  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    eventOn(imageWrapper, eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  });
  ["dragenter", "dragover"].forEach((eventName) => {
    eventOn(imageWrapper, eventName, () => {
      imageWrapper.classList.add("drag-over");
    });
  });
  ["dragleave", "drop"].forEach((eventName) => {
    eventOn(imageWrapper, eventName, () => {
      imageWrapper.classList.remove("drag-over");
    });
  });
  imageWrapper.addEventListener("drop", (e) => {
    e.preventDefault();
    image = new Image();
    eventOn(image, "load", () => {
      imageSelector.classList.add("hidden");
      resetSettings();
      renderImage();
    });
    image.src = URL.createObjectURL(e.dataTransfer.files[0]);
  });
  eventOn(darkMode, "click", () => {
    if (localStorage.theme === "dark") {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
    } else {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    }
  });
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL2pzL3V0aWxzLmpzIiwgIi4uLy4uL3NyYy9qcy9tYWluLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgZnVuY3Rpb24gcXMoc2VsZWN0b3IsIHNjb3BlKSB7XHJcbiAgcmV0dXJuIChzY29wZSB8fCBkb2N1bWVudCkucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBldmVudE9uKHRhcmdldCwgdHlwZSwgY2FsbGJhY2ssIGNhcHR1cmUpIHtcclxuICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjaywgISFjYXB0dXJlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNhcGl0YWxpemVGaXJzdExldHRlclNlY29uZFdvcmQoc3RyaW5nKSB7XHJcbiAgY29uc3Qgc2Vjb25kV29yZCA9XHJcbiAgICBzdHJpbmcuc3BsaXQoJy0nKVsxXS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArXHJcbiAgICBzdHJpbmcuc3BsaXQoJy0nKVsxXS5zbGljZSgxKTtcclxuICByZXR1cm4gc3RyaW5nLnNwbGl0KCctJylbMF0gKyBzZWNvbmRXb3JkO1xyXG59XHJcbiIsICJpbXBvcnQgeyBxcywgZXZlbnRPbiwgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyU2Vjb25kV29yZCB9IGZyb20gJy4vdXRpbHMuanMnO1xyXG5cclxuY29uc3QgYnJpZ2h0bmVzc0lucHV0ID0gcXMoJyNicmlnaHRuZXNzJyk7XHJcbmNvbnN0IHNhdHVyYXRpb25JbnB1dCA9IHFzKCcjc2F0dXJhdGlvbicpO1xyXG5jb25zdCBibHVySW5wdXQgPSBxcygnI2JsdXInKTtcclxuY29uc3QgaW52ZXJzaW9uSW5wdXQgPSBxcygnI2ludmVyc2lvbicpO1xyXG5jb25zdCBjb250cmFzdElucHV0ID0gcXMoJyNjb250cmFzdCcpO1xyXG5jb25zdCBncmF5c2NhbGVJbnB1dCA9IHFzKCcjZ3JheXNjYWxlJyk7XHJcbmNvbnN0IGh1ZVJvdGF0ZUlucHV0ID0gcXMoJyNodWUtcm90YXRlJyk7XHJcbmNvbnN0IHNlcGlhSW5wdXQgPSBxcygnI3NlcGlhJyk7XHJcblxyXG5jb25zdCBmaWxlSW5wdXQgPSBxcygnI2ltYWdlLWZpbGUtaW5wdXQnKTtcclxuY29uc3QgaW1hZ2VXcmFwcGVyID0gcXMoJy5pbWFnZS13cmFwcGVyJyk7XHJcbmNvbnN0IGltYWdlU2VsZWN0b3IgPSBxcygnLmltYWdlLXNlbGVjdG9yJyk7XHJcbmNvbnN0IGxvYWRJbWFnZUJ1dHRvbiA9IHFzKCcjbG9hZC1pbWFnZScpO1xyXG5jb25zdCBkb3dubG9hZExpbmsgPSBxcygnI2Rvd25sb2FkLWxpbmsnKTtcclxuY29uc3QgcmVzZXRCdXR0b24gPSBxcygnI3Jlc2V0Jyk7XHJcbmNvbnN0IGRpc2NhcmRCdXR0b24gPSBxcygnI2Rpc2NhcmQnKTtcclxuY29uc3QgY2FudmFzID0gcXMoJyNjYW52YXMnKTtcclxuY29uc3QgY2FudmFzQ3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblxyXG5jb25zdCBkYXJrTW9kZSA9IHFzKCcjZGFyay1tb2RlJyk7XHJcbmNvbnN0IHRoZW1lSWNvbiA9IHFzKCcjdGhlbWUtaWNvbicpO1xyXG5cclxuY29uc3Qgc2V0dGluZ3NNYXAgPSBbXHJcbiAgYnJpZ2h0bmVzc0lucHV0LFxyXG4gIHNhdHVyYXRpb25JbnB1dCxcclxuICBibHVySW5wdXQsXHJcbiAgaW52ZXJzaW9uSW5wdXQsXHJcbiAgY29udHJhc3RJbnB1dCxcclxuICBncmF5c2NhbGVJbnB1dCxcclxuICBodWVSb3RhdGVJbnB1dCxcclxuICBzZXBpYUlucHV0LFxyXG5dO1xyXG5cclxuY29uc3Qgc2V0dGluZ3MgPSB7fTtcclxubGV0IGltYWdlID0gbnVsbDtcclxuXHJcbmZ1bmN0aW9uIHJlc2V0U2V0dGluZ3MoKSB7XHJcbiAgc2V0dGluZ3MuYnJpZ2h0bmVzcyA9ICcxMDAnO1xyXG4gIHNldHRpbmdzLnNhdHVyYXRpb24gPSAnMTAwJztcclxuICBzZXR0aW5ncy5ibHVyID0gJzAnO1xyXG4gIHNldHRpbmdzLmludmVyc2lvbiA9ICcwJztcclxuICBzZXR0aW5ncy5jb250cmFzdCA9ICcxMDAnO1xyXG4gIHNldHRpbmdzLmdyYXlzY2FsZSA9ICcwJztcclxuICBzZXR0aW5ncy5odWVSb3RhdGUgPSAnMCc7XHJcbiAgc2V0dGluZ3Muc2VwaWEgPSAnMCc7XHJcblxyXG4gIGJyaWdodG5lc3NJbnB1dC52YWx1ZSA9IHNldHRpbmdzLmJyaWdodG5lc3M7XHJcbiAgc2F0dXJhdGlvbklucHV0LnZhbHVlID0gc2V0dGluZ3Muc2F0dXJhdGlvbjtcclxuICBibHVySW5wdXQudmFsdWUgPSBzZXR0aW5ncy5ibHVyO1xyXG4gIGludmVyc2lvbklucHV0LnZhbHVlID0gc2V0dGluZ3MuaW52ZXJzaW9uO1xyXG4gIGNvbnRyYXN0SW5wdXQudmFsdWUgPSBzZXR0aW5ncy5jb250cmFzdDtcclxuICBncmF5c2NhbGVJbnB1dC52YWx1ZSA9IHNldHRpbmdzLmdyYXlzY2FsZTtcclxuICBodWVSb3RhdGVJbnB1dC52YWx1ZSA9IHNldHRpbmdzLmh1ZVJvdGF0ZTtcclxuICBzZXBpYUlucHV0LnZhbHVlID0gc2V0dGluZ3Muc2VwaWE7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVNldHRpbmcoa2V5LCB2YWx1ZSkge1xyXG4gIGlmICghaW1hZ2UpIHJldHVybjtcclxuXHJcbiAgc2V0dGluZ3Nba2V5XSA9IHZhbHVlO1xyXG4gIHJlbmRlckltYWdlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlRmlsdGVyKCkge1xyXG4gIGNvbnN0IHtcclxuICAgIGJyaWdodG5lc3MsXHJcbiAgICBzYXR1cmF0aW9uLFxyXG4gICAgYmx1cixcclxuICAgIGludmVyc2lvbixcclxuICAgIGNvbnRyYXN0LFxyXG4gICAgZ3JheXNjYWxlLFxyXG4gICAgc2VwaWEsXHJcbiAgICBodWVSb3RhdGUsXHJcbiAgfSA9IHNldHRpbmdzO1xyXG5cclxuICByZXR1cm4gYGJyaWdodG5lc3MoJHticmlnaHRuZXNzfSUpIHNhdHVyYXRlKCR7c2F0dXJhdGlvbn0lKSBibHVyKCR7Ymx1cn1weCkgaW52ZXJ0KCR7aW52ZXJzaW9ufSUpIGNvbnRyYXN0KCR7Y29udHJhc3R9JSkgZ3JheXNjYWxlKCR7Z3JheXNjYWxlfSUpIGh1ZS1yb3RhdGUoJHtodWVSb3RhdGV9ZGVnKSBzZXBpYSgke3NlcGlhfSUpYDtcclxufVxyXG5mdW5jdGlvbiByZW5kZXJJbWFnZSgpIHtcclxuICBjYW52YXMud2lkdGggPSBpbWFnZS53aWR0aDtcclxuICBjYW52YXMuaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xyXG5cclxuICBjYW52YXNDdHguZmlsdGVyID0gZ2VuZXJhdGVGaWx0ZXIoKTtcclxuICBjYW52YXNDdHguZHJhd0ltYWdlKGltYWdlLCAwLCAwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZG93bmxvYWRDYW52YXMoKSB7XHJcbiAgY29uc3QgaW1hZ2UgPSBjYW52YXNcclxuICAgIC50b0RhdGFVUkwoJ2ltYWdlL3BuZycpXHJcbiAgICAucmVwbGFjZSgnaW1hZ2UvcG5nJywgJ2ltYWdlL29jdGV0LXN0cmVhbScpO1xyXG5cclxuICBkb3dubG9hZExpbmsuZG93bmxvYWQgPSAnaW1hZ2UucG5nJztcclxuICBkb3dubG9hZExpbmsuaHJlZiA9IGltYWdlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhckNhbnZhcygpIHtcclxuICBjYW52YXNDdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcbn1cclxuXHJcbnNldHRpbmdzTWFwLmZvckVhY2goKGlucHV0KSA9PiB7XHJcbiAgZXZlbnRPbihpbnB1dCwgJ2NoYW5nZScsICgpID0+IHtcclxuICAgIHVwZGF0ZVNldHRpbmcoXHJcbiAgICAgIGlucHV0LmlkLmluY2x1ZGVzKCctJylcclxuICAgICAgICA/IGNhcGl0YWxpemVGaXJzdExldHRlclNlY29uZFdvcmQoaW5wdXQuaWQpXHJcbiAgICAgICAgOiBpbnB1dC5pZCxcclxuICAgICAgaW5wdXQudmFsdWVcclxuICAgICk7XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuLy8gRmlsZSBzZWxlY3RvclxyXG5ldmVudE9uKGZpbGVJbnB1dCwgJ2NoYW5nZScsICgpID0+IHtcclxuICBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG5cclxuICBldmVudE9uKGltYWdlLCAnbG9hZCcsICgpID0+IHtcclxuICAgIGltYWdlU2VsZWN0b3IuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbiAgICByZXNldFNldHRpbmdzKCk7XHJcbiAgICByZW5kZXJJbWFnZSgpO1xyXG4gIH0pO1xyXG5cclxuICBpbWFnZS5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGVJbnB1dC5maWxlc1swXSk7XHJcbn0pO1xyXG5cclxuZXZlbnRPbihkb3dubG9hZExpbmssICdjbGljaycsIGRvd25sb2FkQ2FudmFzKTtcclxuXHJcbi8vIFJlc2V0IHNldHRpbmdzXHJcbmV2ZW50T24ocmVzZXRCdXR0b24sICdjbGljaycsICgpID0+IHtcclxuICBpZiAoIWltYWdlKSByZXR1cm47XHJcblxyXG4gIHJlc2V0U2V0dGluZ3MoKTtcclxuICByZW5kZXJJbWFnZSgpO1xyXG59KTtcclxuXHJcbi8vIERpc2NhcmQgaW1hZ2VcclxuZXZlbnRPbihkaXNjYXJkQnV0dG9uLCAnY2xpY2snLCAoKSA9PiB7XHJcbiAgaW1hZ2UgPSBudWxsO1xyXG4gIGltYWdlU2VsZWN0b3IuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgY2xlYXJDYW52YXMoKTtcclxufSk7XHJcblxyXG4vLyBMb2FkIG5ldyBpbWFnZVxyXG5ldmVudE9uKGxvYWRJbWFnZUJ1dHRvbiwgJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGZpbGVJbnB1dC5jbGljaygpO1xyXG59KTtcclxuXHJcbi8vIERyYWcgYW5kIGRyb3BcclxuWydkcmFnZW50ZXInLCAnZHJhZ292ZXInLCAnZHJhZ2xlYXZlJywgJ2Ryb3AnXS5mb3JFYWNoKChldmVudE5hbWUpID0+IHtcclxuICBldmVudE9uKGltYWdlV3JhcHBlciwgZXZlbnROYW1lLCAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICB9KTtcclxufSk7XHJcblxyXG5bJ2RyYWdlbnRlcicsICdkcmFnb3ZlciddLmZvckVhY2goKGV2ZW50TmFtZSkgPT4ge1xyXG4gIGV2ZW50T24oaW1hZ2VXcmFwcGVyLCBldmVudE5hbWUsICgpID0+IHtcclxuICAgIGltYWdlV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdkcmFnLW92ZXInKTtcclxuICB9KTtcclxufSk7XHJcblxyXG5bJ2RyYWdsZWF2ZScsICdkcm9wJ10uZm9yRWFjaCgoZXZlbnROYW1lKSA9PiB7XHJcbiAgZXZlbnRPbihpbWFnZVdyYXBwZXIsIGV2ZW50TmFtZSwgKCkgPT4ge1xyXG4gICAgaW1hZ2VXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWctb3ZlcicpO1xyXG4gIH0pO1xyXG59KTtcclxuXHJcbmltYWdlV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgKGUpID0+IHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gIGltYWdlID0gbmV3IEltYWdlKCk7XHJcblxyXG4gIGV2ZW50T24oaW1hZ2UsICdsb2FkJywgKCkgPT4ge1xyXG4gICAgaW1hZ2VTZWxlY3Rvci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgIHJlc2V0U2V0dGluZ3MoKTtcclxuICAgIHJlbmRlckltYWdlKCk7XHJcbiAgfSk7XHJcblxyXG4gIGltYWdlLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoZS5kYXRhVHJhbnNmZXIuZmlsZXNbMF0pO1xyXG59KTtcclxuXHJcbmV2ZW50T24oZGFya01vZGUsICdjbGljaycsICgpID0+IHtcclxuICBpZiAobG9jYWxTdG9yYWdlLnRoZW1lID09PSAnZGFyaycpIHtcclxuICAgIGxvY2FsU3RvcmFnZS50aGVtZSA9ICdsaWdodCc7XHJcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZGFyaycpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBsb2NhbFN0b3JhZ2UudGhlbWUgPSAnZGFyayc7XHJcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZGFyaycpO1xyXG4gIH1cclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7O0FBQU8sY0FBWSxVQUFVLE9BQU87QUFDbEMsV0FBUSxVQUFTLFVBQVUsY0FBYyxRQUFRO0FBQUEsRUFDbkQ7QUFFTyxtQkFBaUIsUUFBUSxNQUFNLFVBQVUsU0FBUztBQUN2RCxXQUFPLGlCQUFpQixNQUFNLFVBQVUsQ0FBQyxDQUFDLE9BQU87QUFBQSxFQUNuRDtBQUVPLDJDQUF5QyxRQUFRO0FBQ3RELFVBQU0sYUFDSixPQUFPLE1BQU0sR0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFDLEVBQUUsWUFBWSxJQUMzQyxPQUFPLE1BQU0sR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDO0FBQzlCLFdBQU8sT0FBTyxNQUFNLEdBQUcsRUFBRSxLQUFLO0FBQUEsRUFDaEM7OztBQ1hBLE1BQU0sa0JBQWtCLEdBQUcsYUFBYTtBQUN4QyxNQUFNLGtCQUFrQixHQUFHLGFBQWE7QUFDeEMsTUFBTSxZQUFZLEdBQUcsT0FBTztBQUM1QixNQUFNLGlCQUFpQixHQUFHLFlBQVk7QUFDdEMsTUFBTSxnQkFBZ0IsR0FBRyxXQUFXO0FBQ3BDLE1BQU0saUJBQWlCLEdBQUcsWUFBWTtBQUN0QyxNQUFNLGlCQUFpQixHQUFHLGFBQWE7QUFDdkMsTUFBTSxhQUFhLEdBQUcsUUFBUTtBQUU5QixNQUFNLFlBQVksR0FBRyxtQkFBbUI7QUFDeEMsTUFBTSxlQUFlLEdBQUcsZ0JBQWdCO0FBQ3hDLE1BQU0sZ0JBQWdCLEdBQUcsaUJBQWlCO0FBQzFDLE1BQU0sa0JBQWtCLEdBQUcsYUFBYTtBQUN4QyxNQUFNLGVBQWUsR0FBRyxnQkFB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
