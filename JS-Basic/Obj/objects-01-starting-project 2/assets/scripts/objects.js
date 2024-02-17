/* const movieList = document.getElementById('movie-list')

// movieList.style.backgroundColor = 'red';//==동일하게 작동 movieList.style['background-color'], movieList.style['backgroundColor'] 

// movieList.style.display = 'block'
// const userInput='level'
// let person = {
//    'first name': 'Max',
//     age: 30,
//     [userInput]: 'test',
//     hobbies: ['Cooking', 'Playing'],
//     greet: function () {
//         alert('Hi There');
//     },
//     1.5: 'hello'
// };
// //console.log(person.isAdmin)//객체에 대해 정의되지 않은 프퍼티에 접근 하려는 경우 오류가 아닌, undefined가 발생한다.

// person.isAdmin = true;

// delete person.age;
// console.log(person["first name"]);
// console.log(person[1.5])//==person['1.5']

// //person.greet();
// /* []표기법을 사용하면 객체의 프로퍼티에 동적으로 접근할 수 있다. 

// const keyName = 'first name'
// console.log(person[keyName])

//console.log(person[userInput]);*/

const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

const movies = [];

const renderMovies = (filter = '') => {
    const movieList = document.getElementById('movie-list');

    if (movies.length === 0) {
        movieList.classList.remove('visible');
        return;
    } else {
        movieList.classList.add('visible');
    }
    movieList.innerHTML = '';

    const filteredMovies = !filter
        ? movies
        : movies.filter((movie) => movie.info.title.includes(filter));

    filteredMovies.forEach((movie) => {
        const movieLi = document.createElement('li');
        if ('info' in movie) {
            console.log('movie obj has info.');
        }
        const { info, ...other } = movie; //객체 구조 분해
        let { getformatTitleUpper } = movie;
        //const { title: movieTitle } = info;

        getformatTitleUpper = getformatTitleUpper.bind(movie); //this 객체는 window를 참조하고 있어, bind()를 통해 주체를 미리 인자로 설정함
        let text = getformatTitleUpper() + ' - ';
        //let text = movie.getformatTitleUpper() + ' - ';//this에게 참조 주체를 알림 movie.getformatTitleUpper()
        for (const key in info) {
            console.log("key", key)
            if (key !== 'title' && key !== '_title') {
                text = text + `${key} : ${info[key]}`;
            }
        }
        movieLi.textContent = text;
        movieList.append(movieLi);
    });
};

const addMovieHandler = () => {
    const title = document.getElementById('title').value;
    const extraName = document.getElementById('extra-name').value;
    const extraValue = document.getElementById('extra-value').value;

    if (
        title.trim() === '' ||
        extraName.trim() === '' ||
        extraValue.trim() === ''
    ) {
        return;
    }

    const newMovie = {
        info: {
            set title(val) {
                if (val.trim() === '') { 
                    this._title = 'DEFAULT'
                    return
                }
                this._title = val;
            },
            get title() {
                return this._title
            },

            [extraName]: extraValue,
        },
        id: Math.random().toString(),
        getformatTitleUpper: function () {
            console.log('arrow this', this);
            return this.info.title.toUpperCase();
        },
    };

    newMovie.info.title = title
    console.log("1", newMovie.info.title)
    movies.push(newMovie);
    console.log(movies);
    renderMovies();
};

const searchMovieHandler = () => {
    //console.log('event: ', this); //"화살표 함수가 아닌", 함수 내부의 this는 사실 객체를 의미한다. 즉 함수를 발생시키는 이벤트를 요소를 가리킨다
    const filterTitle = document.getElementById('filter-title').value;
    renderMovies(filterTitle);
};
addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);
