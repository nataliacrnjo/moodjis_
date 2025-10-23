// -------- Upload Screen --------
function showUploadScreen() {
  document.getElementById("uploadScreen").style.display = "block";
}

// Preview uploaded image
function previewImage(event) {
  const preview = document.getElementById("preview");
  preview.src = URL.createObjectURL(event.target.files[0]);
  preview.style.display = "block";
}

// Open camera
function openCamera() {
  const video = document.getElementById("camera");
  video.style.display = "block";
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
    })
    .catch(err => alert("Camera not available: " + err));
}
// Capture photo from camera
function capturePhoto() {
  const video = document.getElementById("camera");}
  function addSticker(src) {
  const layer = document.getElementById('stickerLayer');

  const sticker = document.createElement('div');
  sticker.className = 'draggable-sticker';
  sticker.style.left = '50px';
  sticker.style.top = '50px';

  // Sticker image
  const img = document.createElement('img');
  img.src = src;
  sticker.appendChild(img);

  // Four corner resize handles
  ['tl','tr','bl','br'].forEach(corner => {
    const handle = document.createElement('div');
    handle.className = `resize-handle ${corner}`;
    handle.dataset.corner = corner;
    sticker.appendChild(handle);
  });

  layer.appendChild(sticker);

 function addSticker(src) {
  const layer = document.getElementById('stickerLayer');

  const sticker = document.createElement('div');
  sticker.className = 'draggable-sticker';
  sticker.style.left = '50px';
  sticker.style.top = '50px';

  // Sticker image
  const img = document.createElement('img');
  img.src = src;
  sticker.appendChild(img);


  // --- Drag logic ---
  let offsetX, offsetY, isDragging = false;
  sticker.addEventListener('mousedown', e => {
    if (e.target.classList.contains('resize-handle')) return; // skip if resizing
    isDragging = true;
    offsetX = e.clientX - sticker.offsetLeft;
    offsetY = e.clientY - sticker.offsetTop;
  });
  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    sticker.style.left = `${e.clientX - offsetX}px`;
    sticker.style.top = `${e.clientY - offsetY}px`;
  });
  document.addEventListener('mouseup', () => isDragging = false);

  // --- Resize logic for 4 corners ---
  const handles = sticker.querySelectorAll('.resize-handle');
  handles.forEach(handle => {
    let isResizing = false;
    let startX, startY, startW, startH, startLeft, startTop;
    const corner = handle.dataset.corner;

    handle.addEventListener('mousedown', e => {
      e.stopPropagation();
      e.preventDefault();
      isResizing = true;
      startX = e.clientX;
      startY = e.clientY;
      startW = sticker.offsetWidth;
      startH = sticker.offsetHeight;
      startLeft = sticker.offsetLeft;
      startTop = sticker.offsetTop;
    });

    document.addEventListener('mousemove', e => {
      if (!isResizing) return;
      let dx = e.clientX - startX;
      let dy = e.clientY - startY;
      let newW = startW;
      let newH = startH;
      let newLeft = startLeft;
      let newTop = startTop;

      switch(corner) {
        case 'tl':
          newW = Math.max(40, startW - dx);
          newH = Math.max(40, startH - dy);
          newLeft = startLeft + dx;
          newTop = startTop + dy;
          break;
        case 'tr':
          newW = Math.max(40, startW + dx);
          newH = Math.max(40, startH - dy);
          newTop = startTop + dy;
          break;
        case 'bl':
          newW = Math.max(40, startW - dx);
          newH = Math.max(40, startH + dy);
          newLeft = startLeft + dx;
          break;
        case 'br':
          newW = Math.max(40, startW + dx);
          newH = Math.max(40, startH + dy);
          break;
      }

      sticker.style.width = newW + 'px';
      sticker.style.height = newH + 'px';
      sticker.style.left = newLeft + 'px';
      sticker.style.top = newTop + 'px';
    });

    document.addEventListener('mouseup', () => isResizing = false);
  });
}
document.body.style.touchAction = 'none'; // during resize
document.body.style.touchAction = '';     // after resize

}