
const getPokemones = ()=> {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=893&offset=0").then((consulta)=>{
        consulta.json().then((data)=>{
            listarPokemones(data);
        });
    });
};
getPokemones();

const listarPokemones = (data)=> {
    let datos = [...data.results];
    let divFake = new DocumentFragment();
    document.getElementById("pokeLista").innerHTML = "";

    datos.forEach((dato)=>{
        let row = document.createElement("div");
        let card = document.createElement("div");
        let figure = document.createElement("figure");
        let img = document.createElement("img");
        let cuerpo = document.createElement("div");
        let texto = document.createElement("p");

        row.setAttribute("url", `${dato.url}`);

        row.id = `${dato.url}`;
        img.id = `PF${dato.url}`;
        texto.id = `PN${dato.url}`;

        row.classList.add("col-xl-2", "col-lg-3", "col-md-4", "col-sm-5", "col-10", "my-3", "mx-1", "pokecard");
        card.classList.add("card", "shadow-sm", "bg-white", "rounded", "border-0");
        img.classList.add("card-img-top");
        cuerpo.classList.add("card-body");
        texto.classList.add("card-text", "text-center", "font-weight-bold", "text-primary", "h4");
        
        texto.innerText = "Cargando...";
        img.src = "http://placehold.it/290x290?text=Cargando...";
    
        figure.appendChild(img);
        cuerpo.appendChild(texto);
        card.appendChild(figure);
        card.appendChild(cuerpo);
        row.appendChild(card);
    
        io.observe(row);
        divFake.appendChild(row);
    });

    document.getElementById("pokeLista").appendChild(divFake);
};

let io = new IntersectionObserver((entries)=>{
    entries.forEach(({target, intersectionRatio})=>{
        if(intersectionRatio > 0){
            let url = target.getAttribute("url");
            traerPokemon(target, url);
        }
    })
}, {});

const traerPokemon = async (elemento, url)=> {
    const peticion = await fetch(url);
    const data = await peticion.json();

    const row = document.getElementById(`${url}`);
    const pokeFoto = document.getElementById(`PF${url}`);
    const pokeNombre = document.getElementById(`PN${url}`);

    pokeNombre.innerText = data.name;

    data.sprites.other["official-artwork"].front_default ?
    pokeFoto.src = data.sprites.other["official-artwork"].front_default :
    pokeFoto.src = "./img/pokegiro.gif";

    io.unobserve(row);
};
