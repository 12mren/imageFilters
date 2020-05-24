var img = new Image();
img.src = 'timon-klauser-3MAmj1ZKSZA-unsplash.jpg';
img.onload = function() {
  draw(this);
};

function draw(img) {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  img.style.display = 'none';
  var imageData = ctx.getImageData(0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
  var data = imageData.data;
    
  var invert = function() {
    for (var i = 0; i < data.length; i += 4) {
      data[i]     = 255 - data[i];     // red
      data[i + 1] = 255 - data[i + 1]; // green
      data[i + 2] = 255 - data[i + 2]; // blue
    }
    ctx.putImageData(imageData, 0, 0);
  };

  var blackAndWhite = function() {
    for (var i = 0; i < data.length; i += 4) {
      var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i]     = avg; // red
      data[i + 1] = avg; // green
      data[i + 2] = avg; // blue
    }
    ctx.putImageData(imageData, 0, 0);
  };

  var sepia = function() {
    for (var i = 0; i < data.length; i += 4) {
      var r = data[i];
      var g = data[i + 1];
      var b = data[i + 2];
      data[i]     = 0.393*r + 0.769*g + 0.189*g; // red
      data[i + 1] = 0.349*r + 0.686*g + 0.168*b; // green
      data[i + 2] = 0.272*r + 0.534*g + 0.131*b; // blue
    }
    ctx.putImageData(imageData, 0, 0);
  }

  var threshold = function() {
    for (var i = 0; i < data.length; i += 4) {
      var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i]     = avg > 100 ? 255 : 0; // red
      data[i + 1] = avg > 100 ? 255 : 0; // green
      data[i + 2] = avg > 100 ? 255 : 0; // blue
    }
    ctx.putImageData(imageData, 0, 0);
  }

   var red = function() {
    for (var i = 0; i < data.length; i += 4) {
      data[i + 1] = 0; // green
      data[i + 2] = 0; // blue
    }
    ctx.putImageData(imageData, 0, 0);
  }

  var green = function() {
    for (var i = 0; i < data.length; i += 4) {
      data[i] = 0; // red
      data[i + 2] = 0; // blue
    }
    ctx.putImageData(imageData, 0, 0);
  }

  var blue = function() {
    for (var i = 0; i < data.length; i += 4) {
      data[i] = 0; // red
      data[i + 1] = 0; // green
    }
    ctx.putImageData(imageData, 0, 0);
  }

  var colorSwatch = function() {
    var violet = [202, 158, 230];
    var skyBlue = [149, 210, 245];
    var aqua = [113, 235, 204];
    for (var i = 0; i < data.length; i += 4) {
      var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      if (avg < 85) {
        data[i] = violet[0]; // red
        data[i+1] = violet[1]; // green
        data[i+2] = violet[2]; // blue
      } else if (avg < 170) {
        data[i] = skyBlue[0]; //red
        data[i + 1] = skyBlue[1]; // green
        data[i + 2] = skyBlue[2]; // blue
      } else {
        data[i] = aqua[0]; // red
        data[i + 1] = aqua[1]; // green
        data[i + 2] = aqua[2]; // blue
      }

    }
    ctx.putImageData(imageData, 0, 0);
  }

  var reset = function() {
    ctx.drawImage(img, 0, 0);
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    data = imageData.data;
  }

  var invertBtn = document.getElementById('invert');
  invertBtn.addEventListener('click', invert);
  var blackAndWhiteBtn = document.getElementById('blackAndWhite');
  blackAndWhiteBtn.addEventListener('click', blackAndWhite);
  var sepiaBtn = document.getElementById('sepia');
  sepiaBtn.addEventListener('click', sepia);
  var thresholdBtn = document.getElementById('threshold');
  thresholdBtn.addEventListener('click', threshold);
  var redBtn = document.getElementById('red');
  redBtn.addEventListener('click', red);
  var greenBtn = document.getElementById('green');
  greenBtn.addEventListener('click', green);
  var blueBtn = document.getElementById('blue');
  blueBtn.addEventListener('click', blue);
  var colorSwatchBtn = document.getElementById('colorSwatch');
  colorSwatchBtn.addEventListener('click', colorSwatch);
  var resetBtn = document.getElementById('reset');
  resetBtn.addEventListener('click', reset);

  var fullQuality = canvas.toDataURL('image/jpeg', 1.0);
  console.log(fullQuality);
}
