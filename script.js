let allPokemon = [];
let arrayEnd = [];
const searchInput = document.querySelector('.searchPokemon input');
const pokemonList = document.querySelector('.listPokemon');
const chargement = document.querySelector('.loader');

const types = {
    grass: '#78c850',
	ground: '#E2BF65',
	dragon: '#6F35FC',
	fire: '#F58271',
	electric: '#F7D02C',
	fairy: '#D685AD',
	poison: '#966DA3',
	bug: '#B3F594',
	water: '#6390F0',
	normal: '#D9D5D8',
	psychic: '#F95587',
	flying: '#A98FF3',
	fighting: '#C25956',
    rock: '#B6A136',
    ghost: '#735797',
    ice: '#96D9D6'
};


function fetchPokemonBase(){

    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then(reponse => reponse.json())
        .then((allPokemon) => {
            // console.log(allPokemon);
            allPokemon.results.forEach((pokemon) => {
                fetchPokemonComplet(pokemon);
            })
        })
}
fetchPokemonBase();

function fetchPokemonComplet(pokemon) {

    let objPokemonFull = {}; // pokemon complet (descriptif)
    let url = pokemon.url;
    let nameP = pokemon.name; // nom en anglais

    fetch(url)
    .then(reponse => reponse.json())
    .then((pokeData) => {
        // console.log(pokeData);

        objPokemonFull.pic = pokeData.sprites.front_default; // pour pouvoir afficher les caractéristiques du pokemon
        objPokemonFull.type = pokeData.types[0].type.name;
        objPokemonFull.id = pokeData.id;

        fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameP}`) // pour passer les nom d'anglais en français
        .then(reponse => reponse.json())
        .then((pokeData) => {
            // console.log(pokeData);

            objPokemonFull.name = pokeData.names[4].name; // ici selection de la langue français
            allPokemon.push(objPokemonFull);

            if(allPokemon.length === 151) { // nombre de pokemon qui vont remplir le tableau
                // console.log(allPokemon);

                arrayEnd = allPokemon.sort((a,b) => { 
                    return a.id - b.id;
                }).slice(0,21); // nbr de pokemon afficher au départ la suite avec scroll
                // console.log(arrayEnd);

                createCard(arrayEnd);
                chargement.style.display = "none";
            }
        })
    })
}

// Création des cartes

function createCard(arr){

    for(let i = 0; i < arr.length; i++) {

        const carte = document.createElement('li');
        let couleur = types[arr[i].type];
        carte.style.background = couleur;
        const txtCarte = document.createElement('h5');
        txtCarte.innerText = arr[i].name;
        const idCarte = document.createElement('p');
        idCarte.innerText = `ID# ${arr[i].id}`;
        const imgCarte = document.createElement('img');
        imgCarte.src = arr[i].pic;

        carte.appendChild(imgCarte);
        carte.appendChild(txtCarte);
        carte.appendChild(idCarte);

        pokemonList.appendChild(carte);

    }

}

// Scroll Infini

window.addEventListener('scroll', () => {

    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    // scrollTop = scroll depuis le top
    // scrollHeight = scroll total
    // clientHeight = hauteur de la fenêtre, partie visible.

    if(clientHeight + scrollTop >= scrollHeight - 20) {
        addPoke(6);
    }
})

let index = 21;

function addPoke(nb) {
    if(index > 151) {
        return;
    }
    const arrToAdd = allPokemon.slice(index, index + nb);
    console.log(index, index + nb);
    createCard(arrToAdd);
    index += nb;
}

// Recherche 

// const formSearch = document.querySelector('form');
// formSearch.addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     search();
    // })
    
searchInput.addEventListener('keyup', search);

function search(){

    if(index < 151) {
        addPoke(130);
    }

    let filter, allLi, titleValue, allTitles;
    filter = searchInput.value.toUpperCase();
    allLi = document.querySelectorAll('li');
    allTitles = document.querySelectorAll('li > h5');
    
    for(i = 0; i < allLi.length; i++) {

        titleValue = allTitles[i].innerText;

        if(titleValue.toUpperCase().indexOf(filter) > -1) {
            allLi[i].style.display = "flex";
        } else {
            allLi[i].style.display = "none";
        }
    }
}

// Input Animate
searchInput.addEventListener('input', function(e) { //des qu'on va écrire dans l'input on va déclancher un evenement
    if(e.target.value !== "") { //si on écrit/click dans l'input avec la la partie css on anime le text de base de l'input il monte au dessus
        e.target.parentNode.classList.add('active-input'); 
    } else if (e.target.value === "") { //si l'input est vide le text de base est présent
        e.target.parentNode.calssList.remove('active-input')
    }
})