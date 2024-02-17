const startAddBtn = document.getElementById('movie-add-btn'); //=document.querySelector('header button')
// const cancelMovieModal = document.getElementById('cancelMovieModal')
const addMovieModal = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop')
const cancelAddMovieBtn = addMovieModal.querySelector('.btn--passive')
const confirmAddMovieBtn = cancelAddMovieBtn.nextElementSibling
const userInputs = addMovieModal.querySelectorAll('input')
const entryTextSection =  document.getElementById('entry-text')
const deleteMovieModal = document.getElementById('delete-modal')


console.log(userInputs)