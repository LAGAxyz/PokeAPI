const URL_BACKEND = "https://pokeapi.co/api/v2";

const tipos = document.getElementById("tipos");
const contenedor = document.getElementById("contenedor");

const getTypes = async ()=> {
    const peticion = await fetch(`${URL_BACKEND}/type`);
    const data = await peticion.json();
    dibujarTipos(data);
};
getTypes();

const dibujarTipos = ({results})=> {
    results.forEach((objTipo)=>{
        let div = document.createElement("div");
        div.classList.add("tipos__tipo", "text-center", "my-2", "p-2");
        div.innerText = objTipo.name;

        div.onclick = ()=> {
            getPokemones(objTipo.url);
        };

        tipos.appendChild(div);
    });
};

const getPokemones = async (urlType)=> {
    const peticion = await fetch(urlType);
    const data = await peticion.json();

    let pokemones = [...data.pokemon];

    contenedor.innerHTML = "";

    for(let i=0; i<pokemones.length; i++){
        let div = document.createElement("div");
        let img = document.createElement("img");
        let p = document.createElement("p");
        
        div.setAttribute("url", `${pokemones[i].pokemon.url}`);

        div.classList.add("carousel-item");
        img.classList.add("ancho-img");
        p.classList.add("h1");
        
        if(i===0){div.classList.add("active");}

        div.id = `${pokemones[i].pokemon.url}`;
        img.id = `PF${pokemones[i].pokemon.url}`;
        p.id = `PN${pokemones[i].pokemon.url}`;

        img.src = "http://placehold.it/290x290?text=Cargando...";
        p.innerText = "Cargando...";

        div.appendChild(img);
        div.appendChild(p);

        io.observe(div);
        contenedor.appendChild(div);
    }
};

let io = new IntersectionObserver((entries)=>{
    entries.forEach(({target, isIntersecting})=>{
        if(isIntersecting === true){
            let url = target.getAttribute("url");
            actualizarPokemon(target, url);
        }
    })
}, {});

const actualizarPokemon = async (elemento, url)=> {
    const peticion = await fetch(url);
    const data = await peticion.json();

    const pokeDiv = document.getElementById(`${url}`);
    const pokeFoto = document.getElementById(`PF${url}`);
    const pokeNombre = document.getElementById(`PN${url}`);

    pokeNombre.innerText = data.name;

    data.sprites.other["official-artwork"].front_default ?
    pokeFoto.src = data.sprites.other["official-artwork"].front_default :
    pokeFoto.src = "./img/pokegiro.gif";

    io.unobserve(pokeDiv);
};
