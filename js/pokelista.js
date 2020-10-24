
const getPokemones = ()=> {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=893&offset=0").then((consulta)=>{
        consulta.json().then((datos)=>{
            listarPokemones(datos);
        });
    });
};
getPokemones();

const listarPokemones = (data)=> {
    let datos = [...data.results];
    let divFake = new DocumentFragment();
    document.getElementById("pokeLista").innerHTML = "";

    for (let item=0; item<datos.length; item++){
        let columna = document.createElement("div");
        let card = document.createElement("div");
        let figure = document.createElement("figure");
        let img = document.createElement("img");
        let cuerpo = document.createElement("div");
        let texto = document.createElement("p");
    
        columna.classList.add("col-xl-2", "col-lg-3", "col-md-4", "col-sm-5", "col-10", "my-3", "mx-1", "pokecard");
        card.classList.add("card", "shadow-sm", "bg-white", "rounded", "border-0");
        img.classList.add("card-img-top");
        cuerpo.classList.add("card-body");
        texto.classList.add("card-text", "text-center", "font-weight-bold", "text-primary", "h4");
        
        texto.innerText = datos[item].name;

        fetch(`https://pokeapi.co/api/v2/pokemon/${item+1}`).then((consulta)=>{
            consulta.json().then((data)=>{
                if(data.sprites.other["official-artwork"].front_default){
                    img.src = data.sprites.other["official-artwork"].front_default;
                } else {img.src = "./img/pokegiro.gif";}
            });
        });

        figure.appendChild(img);
        cuerpo.appendChild(texto);
        card.appendChild(figure);
        card.appendChild(cuerpo);
        columna.appendChild(card);
    
        divFake.appendChild(columna);
    }
    document.getElementById("pokeLista").appendChild(divFake);
};
