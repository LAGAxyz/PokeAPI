const URL_BACKEND = "https://pokeapi.co/api/v2";

const tipos = document.getElementById("tipos");
const filas = document.getElementById("filas");

const getTypes = async ()=> {
    const peticion = await fetch(`${URL_BACKEND}/type`);
    const data = await peticion.json();
    dibujarTipos(data);
};
getTypes();

const dibujarTipos = ({results})=> {
    results.forEach((objTipo)=>{
        let div = document.createElement("div");
        div.classList.add("tipos__tipo", "text-center", "mb-2", "px-3", "py-3");
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
        const peticion2 = await fetch(pokemones[i].pokemon.url);
        const dataPokemon = await peticion2.json();
        pokemonesArray.push({
            nombre: dataPokemon.name,
            foto: dataPokemon.sprites.other["official-artwork"].front_default,
            peso: (dataPokemon.weight/10).toFixed(1),
            altura: (dataPokemon.height/10).toFixed(1),
            hp: dataPokemon.stats[0].base_stat,
            ataque: dataPokemon.stats[1].base_stat,
            defensa: dataPokemon.stats[2].base_stat,
            velocidad: dataPokemon.stats[5].base_stat,
        });
    }
    dibujarPokemones(pokemonesArray);
};

const dibujarPokemones = (pokemones)=> {
    filas.innerHTML = "";
    pokemones.forEach((objPokemon)=>{
        let row = document.createElement("div");
        row.classList.add("row");
        row.innerHTML = `<div class="col-md-6 p-5">
        <div class="card border-0 shadow">
            <div class="shadow altura">${objPokemon.altura}m</div>
            <div class="shadow peso">${objPokemon.peso}kg</div>
            <div class="card-body text-center">
                <figure>
                    <img src="${objPokemon.foto}" alt="PokeFoto">
                </figure>
                <h3 class="card-title my-0">${objPokemon.nombre}</h3>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="row align-items-center" style="height: 100%">
            <div class="col-12">
                <div class="progress">
                    <div class="progress-bar bg-success" role="progressbar" style="width: ${objPokemon.hp}%">
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="progress">
                    <div class="progress-bar bg-warning" role="progressbar" style="width: ${objPokemon.ataque}%">
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="progress">
                    <div class="progress-bar bg-primary" role="progressbar" style="width: ${objPokemon.defensa}%">
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="progress">
                    <div class="progress-bar bg-dark" role="progressbar" style="width: ${objPokemon.velocidad}%">
                    </div>
                </div>
            </div>
        </div>
    </div>`;
        filas.appendChild(row);
    });
};
