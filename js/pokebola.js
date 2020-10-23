
const pokebola = document.getElementById("pokebola");
const cboAnimaciones = document.getElementById("cboAnimaciones");

const animaciones = [
    "bounce", "flash", "pulse", "rubberBand", "shakeX", "shakeY",
    "swing", "tada", "wobble", "jello", "heartBeat",
    "rollIn", "backInLeft"
]

const listarAnimaciones = ()=> {
    for(let item=0; item<animaciones.length; item++){
        const a = document.createElement("a");
        a.classList.add("dropdown-item", "cboAnimacion");
        a.innerText = animaciones[item];

        a.onclick = ()=> {
            pokebola.style.animation = `${animaciones[item]} 3s infinite`;
        };

        cboAnimaciones.appendChild(a);
    }
};
listarAnimaciones();
