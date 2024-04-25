document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('signatureCanvas');
  const ctx = canvas.getContext('2d');
  const colorInput = document.getElementById('color');
  const clearBtn = document.getElementById('clearBtn');
  const downloadBtn = document.getElementById('downloadBtn');

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;

  function startDrawing(e) {
      isDrawing = true;
      [lastX, lastY] = [e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop];
  }

  function draw(e) {
      if (!isDrawing) return;
      ctx.strokeStyle = colorInput.value;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';

      const newX = e.pageX - canvas.offsetLeft;
      const newY = e.pageY - canvas.offsetTop;

      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(newX, newY);
      ctx.stroke();

      lastX = newX;
      lastY = newY;
  }

  function endDrawing() {
      isDrawing = false;
  }

  function clearCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function downloadSignature() {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = 'signature.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  }

  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', endDrawing);
  canvas.addEventListener('mouseout', endDrawing);

  // Touch Events for Mobile Devices
  canvas.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent('mousedown', {
          clientX: touch.clientX,
          clientY: touch.clientY
      });
      canvas.dispatchEvent(mouseEvent);
  });

  canvas.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent('mousemove', {
          clientX: touch.clientX,
          clientY: touch.clientY
      });
      canvas.dispatchEvent(mouseEvent);
  });

  canvas.addEventListener('touchend', () => {
      const mouseEvent = new MouseEvent('mouseup', {});
      canvas.dispatchEvent(mouseEvent);
  });

  clearBtn.addEventListener('click', clearCanvas);
  downloadBtn.addEventListener('click', downloadSignature);
});
