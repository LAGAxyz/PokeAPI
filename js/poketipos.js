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
    let pokemonesArray = [];

    for(let i=0; i<pokemones.length; i++){
        const peticion = await fetch(pokemones[i].pokemon.url);
        const dataPokemon = await peticion.json();

        dataPokemon.sprites.other["official-artwork"].front_default ?
        fotoPokemon = dataPokemon.sprites.other["official-artwork"].front_default :
        fotoPokemon = "./img/pokegiro.gif";

        pokemonesArray.push({
            foto: fotoPokemon,
            nombre: dataPokemon.name,
        });
    }
    dibujarPokemones(pokemonesArray);
};

const dibujarPokemones = (pokemones)=> {
    contenedor.innerHTML = "";

    pokemones.forEach((objPokemon, pos)=>{
        let div = document.createElement("div");
        let img = document.createElement("img");
        let p = document.createElement("p");

        div.classList.add("carousel-item");
        img.classList.add("w-50");
        p.classList.add("h1");

        if(pos===0){div.classList.add("active");}

        img.src = objPokemon.foto;
        p.innerText = objPokemon.nombre;

        div.appendChild(img);
        div.appendChild(p);

        contenedor.appendChild(div);
    });
};
