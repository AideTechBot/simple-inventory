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
  document.getElementById("scan-upc").value = 324234;
  document.getElementById("scan-upc").type = "text";
  document.getElementById("scan-upc").readonly = true;

  document.getElementById("scan-form").setAttribute("style", `display:flex;`);
  document.getElementById("scan-form").style.display = `flex`;

  document.getElementById("scan-canvas").setAttribute("style", `display:none;`);
  document.getElementById("scan-canvas").style.display = `none`;
  document
    .getElementById("scan-product")
    .setAttribute("style", `display:none;`);
  document.getElementById("scan-product").style.display = `none`;
}

// called when button to submit is pressed
function onSubmit() {
  document.getElementById("scan-upc").value = 324234;
  if (document.getElementById("scan-form").valid()) {
    document.getElementById("scan-form").submit();
  }
}
