

// Input Animate
const searchInput = document.querySelector('.searchPokemon input');




// Input Animate
searchInput.addEventListener('input', function(e) { //des qu'on va écrire dans l'input on va déclancher un evenement
    if(e.target.value !== "") { //si on écrit/click dans l'input avec la la partie css on anime le text de base de l'input il monte au dessus
        e.target.parentNode.classList.add('active-input'); 
    } else if (e.target.value === "") { //si l'input est vide le text de base est présent
        e.target.parentNode.calssList.remove('active-input')
    }
})