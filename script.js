document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('signatureCanvas');
    const ctx = canvas.getContext('2d');
    const colorInput = document.getElementById('color');
    const clearBtn = document.getElementById('clearBtn');
    const downloadBtn = document.getElementById('downloadBtn');

    let isDrawing = false;
    let points = []; // Store points for drawing smooth lines
    let lastPoint = null; // Store the last point to connect lines

    function startDrawing(e) {
        isDrawing = true;
        points = []; // Reset points array
        lastPoint = { x: e.clientX, y: e.clientY };
        draw(e.clientX, e.clientY); // Draw a single point to start the path immediately
    }

    function draw(x, y) {
        if (!isDrawing) return;
        const currentPoint = { x, y };
        points.push(currentPoint);

        ctx.strokeStyle = colorInput.value;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (points.length > 1) {
            ctx.beginPath();
            ctx.moveTo(lastPoint.x, lastPoint.y);
            ctx.lineTo(currentPoint.x, currentPoint.y);
            ctx.stroke();
        }

        lastPoint = currentPoint;
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
    canvas.addEventListener('mousemove', (e) => {
        if (isDrawing) {
            draw(e.clientX, e.clientY);
        }
    });
    canvas.addEventListener('mouseup', endDrawing);
    canvas.addEventListener('mouseout', endDrawing);

    // Touch Events for Mobile Devices
    canvas.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        startDrawing(touch);
        e.preventDefault(); // Prevent default behavior to avoid interference with mouse events
    });

    canvas.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        if (isDrawing) {
            draw(touch.clientX, touch.clientY);
        }
        e.preventDefault(); // Prevent default behavior to avoid interference with mouse events
    });

    canvas.addEventListener('touchend', endDrawing);

    clearBtn.addEventListener('click', clearCanvas);
    downloadBtn.addEventListener('click', downloadSignature);
});
