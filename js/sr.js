window.addEventListener("load", init);

var audio = document.getElementById("audio");

function init(){
    var sr = new webkitSpeechRecognition();
    sr.continuous = true;
    sr.interimResults = true;
    sr.lang = "es";
    sr.start();
    sr.onresult = function(e){
        for(var i=e.resultIndex; i<e.results.length; ++i){
                if(e.results[i].isFinal){
                var valor = e.results[i][0].transcript.replace(/\s/g,"");
                if(valor == "reproducir"){audio.play();}
                if(valor == "pausar"){audio.pause();}
                if(valor == "detener"){audio.pause();audio.currentTime = 0;}
                if(valor == "silenciar"){audio.volume = 0;}
                if(valor == "escuchar"){audio.volume = 0.5;}
            }
        }
    }
}
