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
      [lastX, lastY] = [e.offsetX, e.offsetY];
    }
  
    function draw(e) {
      if (!isDrawing) return;
      ctx.strokeStyle = colorInput.value;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
  
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
  
      [lastX, lastY] = [e.offsetX, e.offsetY];
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
    clearBtn.addEventListener('click', clearCanvas);
    downloadBtn.addEventListener('click', downloadSignature);
  });
  