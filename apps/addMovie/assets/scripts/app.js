
const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');
const movies = [];

const toggleBackdrop = () =>{
    backdrop.classList.toggle('visible');
};

const updateUI = () =>{
    if(movies.length === 0 ){
        entryTextSection.style.display = 'block';
    }else{
        entryTextSection.style.display = 'none';
    }
};

const closeMovieDeletionModal = ()=>{
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
};


const deleteMovieHandeler = (moveId)=>{
    let movieIndex = 0;
    for(const movie of movies){
        if(movie.id == moveId){
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    closeMovieDeletionModal();
    updateUI();
};


const startDeleteMovieHandeler = (moveId) =>{
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();

    const cancelDeletionBotton = deleteMovieModal.querySelector('.btn--passive');
    let confirmDeletionBotton = deleteMovieModal.querySelector('.btn--danger');

    confirmDeletionBotton.replaceWith(confirmDeletionBotton.cloneNode(true));
    
    confirmDeletionBotton = deleteMovieModal.querySelector('.btn--danger');
    
    cancelDeletionBotton.removeEventListener('click', closeMovieDeletionModal);

    cancelDeletionBotton.addEventListener('click', closeMovieDeletionModal);
    confirmDeletionBotton.addEventListener('click', deleteMovieHandeler.bind(null, moveId));

    //deleteMovie(moiveId);

};

const renderNewMovieElement = (id, title, imageUrl, rating)=>{
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
    <div class = 'movie-element__image'>
        <img src = '${imageUrl}' alt = '${title}'>
    </div>
    <div class = 'movie-element__info'>
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
    </div>
    `;
    newMovieElement.addEventListener('click', startDeleteMovieHandeler.bind(null, id));
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);
};

const closeMovieModal = ()=>{
    addMovieModal.classList.remove('visible');
};

const showMovieModal = () =>{
    addMovieModal.classList.add('visible');
    toggleBackdrop();
};

const clearMovieInput = () =>{
    for(userInput of userInputs){
        userInput.value = '';
    }
};
const cancelAddMovieHandeler = () =>{
    closeMovieModal();
    toggleBackdrop();
    clearMovieInput();
    
};

const addMovieHandeler = () =>{
    const titleValue  = userInputs[0].value;
    const imageValue  = userInputs[1].value;
    const ratingValue = userInputs[2].value;
    // + before string in js ==> cast a string to a number
    if(titleValue.trim() === '' || imageValue.trim() === ''  || ratingValue.trim() === '' ||
    +ratingValue < 1 || +ratingValue > 5){
            alert('Please Enter Valid Inputs!');
            return;
        }
    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageValue,
        rating: ratingValue
    }
    movies.push(newMovie);
    console.log(movies);
    closeMovieModal();
    toggleBackdrop();
    clearMovieInput();
    renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating); 
    updateUI();

};

const backdropClickHadeler = ()=>{
    closeMovieModal();
    closeMovieDeletionModal();
    clearMovieInput();
};


startAddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHadeler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandeler);
confirmAddMovieButton.addEventListener('click', addMovieHandeler);