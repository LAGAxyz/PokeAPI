
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

Swal.fire({
    position: "bottom-end",
    icon: "info",
    title: "REALIZAR UNA DONACIÓN",
    text: "Siempre haré código sin esperar algún beneficio, sin embargo las donaciones me ayudan enormemente a seguir compartiendo de forma gratuita. Si te gusta mi contenido o deseas apoyarme, puedes hacer una donación",
    showCloseButton: true,
    focusConfirm: true,
    confirmButtonText: "Donar",
}).then((result=>{
    if(result.isConfirmed){
        location.href = "https://www.paypal.com/donate?hosted_button_id=W7QQPM9ZS68MC";
    }
}));
