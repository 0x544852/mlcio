let net;

async function app() {
  console.log('Loading mobilenet..');
  document.getElementById('text').innerHTML=`prediction process started...`;
  // Load the model.
  net = await mobilenet.load();
  console.log('Sucessfully loaded model');
  // Make a prediction through the model on our image.
  const imgEl = document.getElementById('img');
  const result = await net.classify(imgEl);
  // insert top result into the HTML output
  document.getElementById('text').innerHTML=`prediction: ${result[0].className}<br>probability: ${result[0].probability}`;
  // raw data goes to console
  console.log(result);
}

// jQuery eventlistner function
// calls app() after image is loaded.
$("input").change(function(e) {
  console.log('Loading image..');
  for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {
    var file = e.originalEvent.srcElement.files[i];
    var img = document.getElementById('img');
    var reader = new FileReader();
    reader.onloadend = function()
    {
       img.src = reader.result;
    }
    reader.readAsDataURL(file);
    $("input").after(img);
    // image is now available, start prediction process
    app();
 }
});
