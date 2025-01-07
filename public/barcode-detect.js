try {
  window["BarcodeDetector"].getSupportedFormats();
} catch {
  window["BarcodeDetector"] = barcodeDetectorPolyfill.BarcodeDetectorPolyfill;
}
