
const pokeCarga = document.getElementById("pokeCarga");
const pokePrevious = document.getElementById("pokePrevious");
const pokeCantidad = document.getElementById("pokeCantidad");
const pokeNext = document.getElementById("pokeNext");
const pokeLista = document.getElementById("pokeLista");

const URL = "https://pokeapi.co/api/v2/pokemon";
let limit = 20;
let offset = 0;
let dataP = null;
let dataN = null;

pokeCantidad.onchange = ()=> {
    limit = pokeCantidad.options[pokeCantidad.selectedIndex].value;
    setPaginacion(limit, offset);
};

const setPaginacion = (limit, offset)=> {
    fetch(`${URL}?limit=${limit}&offset=${offset}`).then((consulta)=>{
        consulta.json().then((datos)=>{
            dibujarPokemones(datos);
        });
    });
};
setPaginacion();

const dibujarPokemones = (data)=> {
    let datos = [...data.results];
    dataP = data.previous;
    dataN = data.next;
    pokeLista.innerHTML = "";
    let divFake = new DocumentFragment();

    for (let item=0; item<datos.length; item++){
        let columna = document.createElement("div");
        let card = document.createElement("div");
        let figure = document.createElement("figure");
        let img = document.createElement("img");
        let cuerpo = document.createElement("div");
        let texto = document.createElement("p");
    
        columna.classList.add("col-lg-3", "col-md-4", "col-sm-6", "col-10", "my-3", "mx-1");
        card.classList.add("card", "shadow-sm", "bg-white", "rounded", "border-0");
        img.classList.add("card-img-top");
        cuerpo.classList.add("card-body");
        texto.classList.add("card-text", "text-center", "font-weight-bold", "text-primary", "h3");
        
        texto.innerText = datos[item].name;

        fetch(`${URL}/${item+1}`).then((consulta)=>{
            consulta.json().then((data)=>{
                img.src = data.sprites.other["official-artwork"].front_default;
            });
        });

        figure.appendChild(img);
        cuerpo.appendChild(texto);
        card.appendChild(figure);
        card.appendChild(cuerpo);
        columna.appendChild(card);
    
        divFake.appendChild(columna);
    }
    pokeLista.appendChild(divFake);
};

pokePrevious.onclick = ()=>{
    if(dataP === null){return;}
    fetch(dataP).then((consulta)=>{
        consulta.json().then((datos)=>{
            dibujarPokemones(datos);
        });
    });
};

pokeNext.onclick = ()=> {
    if(dataN === null){return;}
    fetch(`${dataN}`).then((consulta)=>{
        consulta.json().then((datos)=>{
            dibujarPokemones(datos);
        });
    });
};
