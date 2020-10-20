
const pokeCarga = document.getElementById("pokeCarga");
const pokePrevious = document.getElementById("pokePrevious");
const pokeCantidad = document.getElementById("pokeCantidad");
const pokeNext = document.getElementById("pokeNext");
const pokeLista = document.getElementById("pokeLista");

const URL = "https://pokeapi.co/api/v2/pokemon";
let limit = 10;

pokeCantidad.onchange = ()=> {
    let option = pokeCantidad.options[pokeCantidad.selectedIndex].value;
    setPaginacion(option);
};

const setPaginacion = (limit)=> {
    fetch(`${URL}?limit=${limit}&offset=0`).then((consulta)=>{
        consulta.json().then((data)=>{
            dibujarPokemones(data);
        })
    })
};
setPaginacion();

const dibujarPokemones = (data)=> {
    pokeLista.innerHTML = "";

    pokePrevious.onclick = ()=>{
        if(data.previous === null){return;}
    };

    pokeNext.onclick = ()=> {
        if(data.next === null){return;}
    };

    datos = [...data.results];

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
        
        img.src="https://via.placeholder.com/300x300";
        texto.innerText = datos[item].name;
    
        figure.appendChild(img);
        cuerpo.appendChild(texto);
        card.appendChild(figure);
        card.appendChild(cuerpo);
        columna.appendChild(card);
    
        divFake.appendChild(columna);
    }
    pokeLista.appendChild(divFake);
};


/*
  
//   const dibujarListadoPokemon = (arreglo) => {
//     pokePrevious.onclick = () => {
//       getListadoPokemon(arreglo.previous).then((resultado) => {
//         dibujarListadoPokemon(resultado);
//       });
//     };
  
//     pokeNext.onclick = () => {
//       getListadoPokemon(arreglo.next).then((resultado) => {
//         dibujarListadoPokemon(resultado);
//       });
//     };
  
//     let fetchs = [];
//     let jsons = [];
  
//     let miPromesa = new Promise((resolve, reject) => {
//       arreglo.results.forEach((element) => {
//         let peticion = fetch(element.url);
//         fetchs.push(peticion);
//       });
  
//       Promise.all(fetchs).then((peticiones) => {
//         peticiones.forEach((pet) => {
//           jsons.push(pet.json());
//         });
//         Promise.all(jsons).then((rptas) => {
//           resolve(rptas);
//         });
//       });
//     });
  
//     miPromesa.then((rpta) => {
//       // EN ESTE PUNTO YA TENEMOS LA DATA QUE DEBEMOS DE MOSTRAR EN LA PAGINA
  
//       rpta.forEach((data) => {
  
//         if (data.sprites.other.dream_world.front_default === null) {
//           if (data.sprites.other["official-artwork"].front_default === null) {
//             if (data.sprites.front_default === null) {
//               listadoCardImagen.src = "../img/Pokeball girando.gif";
//             } else {
//               listadoCardImagen.src = data.sprites.front_default;
//             }
//           } else {
//             listadoCardImagen.src =
//               data.sprites.other["official-artwork"].front_default;
//           }
//         } else {
//           listadoCardImagen.src = data.sprites.other.dream_world.front_default;
//         }
  
//       });
//       cargando.setAttribute("hidden", true);
//     });
//   };
  
//   // GET LISTADO POKEMON
//   const getListadoPokemon = (enlace) => {
//     cargando.removeAttribute("hidden");
  
//     return new Promise((resolve, reject) => {
//       fetch(enlace).then((peticion) => {
//         peticion.json().then((data) => {
//           resolve(data);
//         });
//       });
//     });
//   };
  
//   getListadoPokemon(`${URL_BACKEND}${URL_RESOURCE}?offset=0&limit=${limit}`).then(
//     (resultado) => {
//       console.log(resultado.results);
//       console.log(resultado);
//       dibujarListadoPokemon(resultado);
      
//     }
//   );


*/