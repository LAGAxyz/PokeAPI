
const camara = document.getElementById("camara");
const canvas = document.getElementById("canvas");
const video = document.getElementById("video");

const download = document.getElementById("download");
const sticker = document.getElementById("sticker");
const cancel = document.getElementById("cancel");

const actions = document.getElementById("actions");
const stickers = document.getElementById("stickers");

const snap = document.getElementById("snap");
const link = document.getElementById("download-link");

let imgSticker = null;

const constraints = {
  audio: false,
  video: true,
};

async function iniciarWebCam() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    mostrarVideo(stream);
  } catch (error) {alert("Ocurrió un error insesperado");}
};

const mostrarVideo = (stream)=> {
  window.stream = stream;
  video.srcObject = stream;

  let context = canvas.getContext('2d');
  setInterval(function(){
    if(imgSticker !== null){
      context.drawImage(imgSticker, 20, 20, 100, 100);
      imgSticker = null;
    }
    if(video.paused || video.ended){return;}
    context.drawImage(video, 0, 0);
  }, 1000 / 30)
};

iniciarWebCam();

snap.onclick = ()=> {
  video.pause();
  actions.style.display = "block";
};

download.onclick = ()=> {
  let imagenURL = canvas.toDataURL("imagen/png");
  link.href = imagenURL;
  link.download = "foto.png";
  link.click();
  cancel.click();
};

sticker.onclick = ()=> {
  stickers.style.display = "block";
};

cancel.onclick = ()=> {
  video.play();
  actions.style.display = "none";
};

document.querySelectorAll(".sticker").forEach((img)=>{
  img.onclick = ()=> {
    imgSticker = img;
    stickers.style.display = "none";
  };
});
