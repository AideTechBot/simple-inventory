let imageCapture;

navigator.mediaDevices
  .getUserMedia({ video: { facingMode: "environment" } })
  .then((mediaStream) => {
    document.getElementById("scan-canvas").srcObject = mediaStream;

    const track = mediaStream.getVideoTracks()[0];
    const { height } = track.getSettings();
    document
      .getElementById("scan-canvas")
      .setAttribute("style", `height:${height};`);
    document.getElementById("scan-canvas").style.height = `${height}px`;

    document.getElementById("scan-canvas").height = height;
    imageCapture = new ImageCapture(track);
  })
  .catch((error) => console.error(error));

// called when button to scan is pressed
function onScan() {
  // find upc and set it
  imageCapture
    .grabFrame()
    .then((imageBitmap) => {
      const barcodeDetector = new BarcodeDetector({
        formats: ["upc_a", "upc_e", "qr_code"],
      });

      barcodeDetector
        .detect(imageBitmap)
        .then((barcodes) => {
          if (barcodes.length === 0) {
            // quit if there are no barcodes
            alert("There are no codes");
            return;
          }

          barcodes.forEach((barcode) => {
            console.log(barcode.rawValue);
            document.getElementById("scan-upc").value = barcode.rawValue;

            // show text showing upc
            document.getElementById("scan-upc").type = "text";
            document.getElementById("scan-upc").readonly = true;

            // hide and show stuff
            document
              .getElementById("scan-form")
              .setAttribute("style", `display:flex;`);
            document.getElementById("scan-form").style.display = `flex`;

            document
              .getElementById("scan-canvas")
              .setAttribute("style", `display:none;`);
            document.getElementById("scan-canvas").style.display = `none`;
            document
              .getElementById("scan-product")
              .setAttribute("style", `display:none;`);
            document.getElementById("scan-product").style.display = `none`;
          });

          var audio = new Audio("beep.mp3");
          audio.play();
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((error) => ChromeSamples.log(error));
}

// called when button to submit is pressed
function onSubmit() {
  if (document.getElementById("scan-form").valid()) {
    document.getElementById("scan-form").submit();
  }
}
