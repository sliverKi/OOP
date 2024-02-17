const movies = [];

const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
};
const deleteMovie = (movieID) => {
    let identifiedIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieID) {
            break;
        }
        identifiedIndex++;
    }
    movies.splice(identifiedIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[identifiedIndex].remove();
};

const cancelMovieDelection = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
};

const deleteMovieHandler = (movieID) => {
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();
    const cancelDelectionBtn = document.querySelector('.btn--passive');
    cancelDelectionBtn.addEventListener('click', cancelMovieDelection);
    const confirm = document.querySelector('.btn--danger')
    confirm.addEventListener('click',deleteMovie.bind(null, movieID))
   
};

const renderNewMovieElement = (id, title, img, rate) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
    <div class = "movie-element__image">
        <img src="${img}" alt="${title}">
    </div>
    <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rate}/5 starts</p>
    </div>
    `;
    newMovieElement.addEventListener(
        'click',
        deleteMovieHandler.bind(null, id),
    );
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);
};

const clearInputs = () => {
    for (const userInput of userInputs) {
        userInput.value = '';
    }
};

const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imgUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if (
        titleValue.trim() === '' ||
        imgUrlValue.trim() === '' ||
        ratingValue.trim() === '' ||
        +ratingValue < 1 ||
        +ratingValue > 5
    ) {
        alert('Please Enter valid value');
        return;
    }
    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        img: imgUrlValue,
        rate: ratingValue,
    };
    movies.push(newMovie);
    console.log(movies);
    closeMovieModal();
    toggleBackdrop();
    clearInputs();
    renderNewMovieElement(
        newMovie.id,
        newMovie.title,
        newMovie.img,
        newMovie.rate,
    );
    updateUI();
};

const cancelAddMovieHandler = () => {
    clearInputs();
    closeMovieModal();
};

const backdropClickHandler = () => {
    closeMovieModal();
    cancelMovieDelection();
};

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
};

const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
};

const showMovieModal = () => {
    // if (addMovieModal.className === 'modal card') {
    //     addMovieModal.className === 'modal card visible'
    // } else (
    //     addMovieModal.className === 'modal card'
    // )
    addMovieModal.classList.add('visible');
    toggleBackdrop();
};
startAddBtn.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieBtn.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieBtn.addEventListener('click', addMovieHandler);
