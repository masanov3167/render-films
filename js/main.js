const localFilms = JSON.parse(window.localStorage.getItem("film"));
const films = localFilms || filmes;

const localDeletedFilms = JSON.parse(window.localStorage.getItem("deletedFilm"));
const deletedFilmArr = localDeletedFilms || [];

const localBookmarkedFilms = JSON.parse(window.localStorage.getItem("bookmarkedFilm"));
const bookmarks = localBookmarkedFilms || [];

let header = document.createElement("header");
header.classList.add("header");
document.body.appendChild(header);

let searchForm = document.createElement("form");
searchForm.classList.add("form");
searchForm.setAttribute("autocomplete", "off");
searchForm.setAttribute("method", "POST");
header.appendChild(searchForm);

let searchInput = document.createElement("input");
searchInput.classList.add("form-input");
searchInput.setAttribute("type", "text");
searchInput.setAttribute("placeholder", "write the cinema name...");
searchInput.setAttribute("required", "true");
searchForm.appendChild(searchInput);

let searchBtn = document.createElement("button");
searchBtn.classList.add("search-btn");
searchBtn.setAttribute("type", "submit");
searchBtn.textContent = "Search";
searchForm.appendChild(searchBtn);

let select = document.createElement("select");
select.classList.add("select");
select.setAttribute("name", "Genres of films");
header.appendChild(select);

let optionAllGenres = document.createElement("option");
optionAllGenres.setAttribute("value","All genres");
optionAllGenres.textContent = "All genres";
select.appendChild(optionAllGenres);

let sort = document.createElement("select");
sort.classList.add("sort");
sort.setAttribute("name", "sort");
header.appendChild(sort);

let sortSelected = document.createElement("option");
sortSelected.textContent = "Sort elements";
sortSelected.setAttribute("selected", "true");
sortSelected.setAttribute("disabled", "true");
sort.appendChild(sortSelected);

let sortById = document.createElement("option");
sortById.setAttribute("value","id");
sortById.textContent = "Sort by id";
sort.appendChild(sortById);

let sortByName = document.createElement("option");
sortByName.setAttribute("value","name");
sortByName.textContent = "Sort by name";
sort.appendChild(sortByName);

let main = document.createElement("main");
main.classList.add("main");
document.body.appendChild(main);

let moviesList = document.createElement("ol");
moviesList.classList.add("list");
main.appendChild(moviesList);

let modalArr = [];

let modal = document.createElement("div");
modal.classList.add("modal");
document.body.appendChild(modal);

let modalImg = document.createElement("img");
modalImg.classList.add("modal-img");
modal.appendChild(modalImg);

let modalBody = document.createElement("ol");
modalBody.classList.add("modal-body");
modal.appendChild(modalBody);

let modalCloser = document.createElement("div");
modalCloser.classList.add("modal-closer");
modalBody.appendChild(modalCloser);

let modalDate = document.createElement("time");
modalDate.classList.add("modal-date");
modalBody.appendChild(modalDate);

let modalTitle = document.createElement("h3");
modalBody.appendChild(modalTitle);

let modalInfo = document.createElement("p");
modalBody.appendChild(modalInfo);

let modalGenres = document.createElement("p");
modalGenres.classList.add("modal-body-genres");
modalBody.appendChild(modalGenres);

let modalBtnContainer = document.createElement("ol");
modalBtnContainer.classList.add("modal-btn-container");
modalBody.appendChild(modalBtnContainer);

let wiewFilm = document.createElement("li");
wiewFilm.textContent = "Wiew film";
wiewFilm.classList.add("movies-wiew");
modalBtnContainer.appendChild(wiewFilm);

let closeMenu = document.createElement("li");
closeMenu.textContent = "Close menu";
closeMenu.classList.add("modal-closer");
modalBtnContainer.appendChild(closeMenu);

let deletedFilmsBtn = document.createElement("button");
deletedFilmsBtn.classList.add("deleted-films-container","display-none");
deletedFilmsBtn.textContent = "Deleted films";
header.appendChild(deletedFilmsBtn);

let deletedFilmsCount = document.createElement("strong");
deletedFilmsBtn.appendChild(deletedFilmsCount);

let bookmarkFilmsBtn = document.createElement("button");
bookmarkFilmsBtn.classList.add("bookmark-films-container","display-none");
bookmarkFilmsBtn.textContent = "Bookmark";
header.appendChild(bookmarkFilmsBtn);

let bookmarkFilmsCount = document.createElement("strong");
bookmarkFilmsBtn.appendChild(bookmarkFilmsCount);

let alert = document.createElement("div");
alert.classList.add("display-none","alert");
// alert.innerHTML = `film <span id="kino">kino nomi</span> sucsesfully deleted!`;
document.body.appendChild(alert);

let video = document.createElement("iframe");
video.classList.add("display-none","video");

let videoCloser = document.createElement("div");
videoCloser.classList.add("video-closer");
modal.appendChild(videoCloser);

let deleted = [];
let bookmarked = [];

function getTime(obj){
  var date = new Date(obj.release_date);
  var day = date.getDate();
  var month = String(date.getMonth() +1).padStart(2,0);
  var year = date.getFullYear();
  return `${day}.${month}.${year}`;
}
moviesList.addEventListener("click", evt =>{
  if(evt.target.matches(".deleted-films-more-btn")){
    const moreBtnId = evt.target.dataset.deletedFilmsMoreBtnId;
    main.style.opacity = 0.2;

    const findIndexArr = deletedFilmArr.find(todo => todo.id == moreBtnId);

    modal.classList.add("show");
    modalBody.classList.remove("display-none");
    modalImg.classList.remove("display-none");
    video.classList.add("display-none")
    videoCloser.classList.add("display-none");
    deleted.push(findIndexArr);

    deleted.forEach(a =>{
      modalImg.setAttribute("src", a.poster);
      modalDate.textContent = getTime(a);
      modalTitle.textContent = a.title;
      modalInfo.textContent = a.overview.substr(0,322) + "...";
      modalGenres.textContent = a.genres.join(", ");
    })
  }

  if(evt.target.matches(".deleted-films-rememorate-btn")){
    const deleteBtnId = evt.target.dataset.deletedFilmsRememorateBtnId;

    const findIndexArr = deletedFilmArr.findIndex(todo => todo.id == deleteBtnId);
    console.log(findIndexArr);

    let deletedFilm = deletedFilmArr.splice(findIndexArr, 1);
    deletedFilm.forEach(g =>{
      let s = {id: g.id, poster: g.poster, title: g.title, overview: g.overview, release_date: g.release_date, genres: g.genres,}

      alert.classList.remove("display-none");
      alert.innerHTML = `film <span>${g.title.substr(0,20) + "..."}</span> sucsesfully rememorated!`;
      main.style.opacity = 0.2;
      setTimeout(function(){
        alert.classList.add("display-none");
        main.style.opacity = 1;
      }, 2500);
      films.push(s);
      deletedFilmsCount.textContent = deletedFilmArr.length;
    })

    deletedFilmsBtn.classList.remove("display-none");
    deletedFilmsBtn.classList.add("display-block");

    filterDeletedFilms(deletedFilmArr, moviesList);
    window.localStorage.setItem("deletedFilm" , JSON.stringify(deletedFilmArr))
    window.localStorage.setItem("film" , JSON.stringify(films))
    if(deletedFilmArr.length == 0){
      filterFilms(films,moviesList);
      deletedFilmsBtn.classList.remove("display-block");
      deletedFilmsBtn.classList.add("display-none");
    }
  }

  if(evt.target.matches(".bookmarks-more-btn")){
    const moreBtnId = evt.target.dataset.bookmarksMoreBtnId;
    main.style.opacity = 0.2;

    const findIndexArr = bookmarks.find(todo => todo.id == moreBtnId);
    modal.classList.add("show");
    modalBody.classList.remove("display-none");
    modalImg.classList.remove("display-none");
    video.classList.add("display-none")
    videoCloser.classList.add("display-none");

    bookmarked.push(findIndexArr);

    bookmarked.forEach(a =>{
      modalImg.setAttribute("src", a.poster);
      modalDate.textContent = getTime(a);
      modalTitle.textContent = a.title;
      modalInfo.textContent = a.overview.substr(0,322) + "...";
      modalGenres.textContent = a.genres.join(", ");
    })
  }

  if(evt.target.matches(".bookmarks-delete-btn")){
    const deleteBtnId = evt.target.dataset.bookmarksDeleteBtnId;

    const findIndexArr = bookmarks.findIndex(todo => todo.id == deleteBtnId);

   const bookmarksDeletedFilm = bookmarks.splice(findIndexArr, 1);

  bookmarksDeletedFilm.forEach(b =>{
      alert.classList.remove("display-none");
      alert.innerHTML = `film <span>${b.title.substr(0,20) + "..."}</span> removed on bookmark list`;
      main.style.opacity = 0.2;
      setTimeout(function(){
        alert.classList.add("display-none");
        main.style.opacity = 1;
      }, 2500);
    })
    filterBookmarks(bookmarks, moviesList);
    window.localStorage.setItem("bookmarkedFilm" , JSON.stringify(bookmarks))
    bookmarkFilmsCount.textContent = bookmarks.length;

    if(bookmarks.length == 0){
      filterFilms(films,moviesList);
      bookmarkFilmsBtn.classList.remove("display-block");
      bookmarkFilmsBtn.classList.add("display-none");
    }
  }

  if(evt.target.matches(".movies-more-btn")){
    const moreBtnId = evt.target.dataset.moviesMoreBtnId;
    main.style.opacity = 0.2;

    const findIndexArr = films.find(todo => todo.id == moreBtnId);
    modalArr.push(findIndexArr);

    
    modalArr.forEach(a =>{
      modalImg.setAttribute("src", a.poster);
      
      modalDate.textContent = getTime(a);
      modalTitle.textContent = a.title;
      modalInfo.textContent = a.overview.substr(0,322) + "...";
      modalGenres.textContent = a.genres.join(", ");

      wiewFilm.dataset.wiewFilmId = a.id;
    })

    modal.classList.add("show");
    modalBody.classList.remove("display-none");
    modalImg.classList.remove("display-none");
    video.classList.add("display-none")
    videoCloser.classList.add("display-none")
  }


  if(evt.target.matches(".movies-delete-btn")){
    const deleteBtnId = evt.target.dataset.moviesDeleteBtnId;

    const findIndexArr = films.findIndex(todo => todo.id == deleteBtnId);

    let deletedFilm = films.splice(findIndexArr, 1);
    deletedFilm.forEach(g =>{
      let s = {id: g.id, poster: g.poster, title: g.title, overview: g.overview, release_date: g.release_date, genres: g.genres,}

      alert.classList.remove("display-none");
      alert.innerHTML = `film <span>${g.title.substr(0,20) + "..."}</span> sucsesfully deleted!`;
      main.style.opacity = 0.2;
      setTimeout(function(){
        alert.classList.add("display-none");
        main.style.opacity = 1;
      }, 2500);

      deletedFilmArr.push(s);
      deletedFilmsCount.textContent = deletedFilmArr.length;
    })

    deletedFilmsBtn.classList.remove("display-none");
    deletedFilmsBtn.classList.add("display-block");
    filterFilms(films, moviesList);
    window.localStorage.setItem("film" , JSON.stringify(films))
    window.localStorage.setItem("deletedFilm" , JSON.stringify(deletedFilmArr))
  }

  if(evt.target.matches(".movies-top-btn")){
    const bookmarkBtnId = evt.target.dataset.moviesTopBtnId;

    const findIndexArr = films.find(todo => todo.id == bookmarkBtnId);

      if(!bookmarks.includes(findIndexArr)){
          bookmarks.push(findIndexArr);

          let a = [];
          a.push(findIndexArr);
          a.forEach(b =>{
            alert.classList.remove("display-none");
            alert.innerHTML = `film <span>${b.title.substr(0,20) + "..."}</span> added to bookmark list`;
            main.style.opacity = 0.2;
            setTimeout(function(){
              alert.classList.add("display-none");
              main.style.opacity = 1;
            }, 2500);
          })
        }

    bookmarkFilmsCount.textContent = bookmarks.length;

    bookmarkFilmsBtn.classList.remove("display-none");
    bookmarkFilmsBtn.classList.add("display-block");

    filterFilms(films, moviesList);
    window.localStorage.setItem("bookmarkedFilm" , JSON.stringify(bookmarks))
  }
})

if(deletedFilmArr.length >= 1){
    deletedFilmsBtn.classList.remove("display-none");
    deletedFilmsCount.textContent = deletedFilmArr.length;
}

if(bookmarks.length >= 1){
  bookmarkFilmsBtn.classList.remove("display-none");
  bookmarkFilmsCount.textContent = bookmarks.length;
}
modal.addEventListener("click", evt =>{
  if(evt.target.matches(".modal-closer")){
    modal.classList.remove("show");
    main.style.opacity = 1;
  }
  if(evt.target.matches(".video-closer")){
    modal.classList.remove("show");
    modal.removeChild(video);
    main.style.opacity = 1;
  }

  if(evt.target.matches(".movies-wiew")){
    const wiewId = evt.target.dataset.wiewFilmId;
    main.style.opacity = 0.2;

    const findIndexArr = films.find(todo => todo.id == wiewId);
    modalArr.push(findIndexArr);

    modalArr.forEach(a =>{
      let iframeUrl = a.url.substr(17);
      video.setAttribute("src", "https://www.youtube-nocookie.com/embed/" + iframeUrl);
    });

    modalImg.classList.add("display-none");
    modalBody.classList.add("display-none");
    main.style.opacity = 0.1;
    video.classList.remove("display-none");
    videoCloser.classList.remove("display-none");
    modal.appendChild(video);
  }

})


function filterBookmarks(array, obj){
  obj.innerHTML = "";
 
   array.forEach(movies =>{
     let moviesItem = document.createElement("li");
     moviesItem.classList.add("list-item");
     obj.appendChild(moviesItem);

     let moviesItemBodyId = document.createElement("time");
     moviesItemBodyId.classList.add("list-item-id");
     moviesItemBodyId.textContent = movies.id;
     moviesItem.appendChild(moviesItemBodyId);

     let moviesItemImg = document.createElement("img");
     moviesItemImg.classList.add("list-item-img");
     moviesItemImg.setAttribute("src", movies.poster);
     moviesItem.appendChild(moviesItemImg);

     let moviesItemBody = document.createElement("div");
     moviesItemBody.classList.add("list-item-body");
     moviesItem.appendChild(moviesItemBody);

     let moviesItemBodyTitle = document.createElement("h3");
     moviesItemBodyTitle.textContent = movies.title;
     moviesItemBodyTitle.classList.add("list-item-body-title");
     moviesItemBody.appendChild(moviesItemBodyTitle);

     let moviesBtnContainer = document.createElement("ol");
     moviesBtnContainer.classList.add("movies-btn-container");
     moviesItemBody.appendChild(moviesBtnContainer);

     let moviesMoreBtn = document.createElement("li");
     moviesMoreBtn.classList.add("bookmarks-more-btn");
     moviesMoreBtn.dataset.bookmarksMoreBtnId = movies.id;
     moviesMoreBtn.textContent = "More";
     moviesBtnContainer.appendChild(moviesMoreBtn);

     let moviesDeleteBtn = document.createElement("li");
     moviesDeleteBtn.classList.add("bookmarks-delete-btn");
     moviesDeleteBtn.dataset.bookmarksDeleteBtnId = movies.id;
     moviesDeleteBtn.textContent = "Delete";
     moviesBtnContainer.appendChild(moviesDeleteBtn);
   });
 }

 function filterDeletedFilms(array, obj){
  obj.innerHTML = "";
 
   array.forEach(movies =>{
     let moviesItem = document.createElement("li");
     moviesItem.classList.add("list-item");
     obj.appendChild(moviesItem);

     let moviesItemBodyId = document.createElement("time");
     moviesItemBodyId.classList.add("list-item-id");
     moviesItemBodyId.textContent = movies.id;
     moviesItem.appendChild(moviesItemBodyId);

     let moviesItemImg = document.createElement("img");
     moviesItemImg.classList.add("list-item-img");
     moviesItemImg.setAttribute("src", movies.poster);
     moviesItem.appendChild(moviesItemImg);

     let moviesItemBody = document.createElement("div");
     moviesItemBody.classList.add("list-item-body");
     moviesItem.appendChild(moviesItemBody);

     let moviesItemBodyTitle = document.createElement("h3");
     moviesItemBodyTitle.textContent = movies.title;
     moviesItemBodyTitle.classList.add("list-item-body-title");
     moviesItemBody.appendChild(moviesItemBodyTitle);

     let moviesBtnContainer = document.createElement("ol");
     moviesBtnContainer.classList.add("movies-btn-container");
     moviesItemBody.appendChild(moviesBtnContainer);

     let moviesMoreBtn = document.createElement("li");
     moviesMoreBtn.classList.add("deleted-films-more-btn");
     moviesMoreBtn.dataset.deletedFilmsMoreBtnId = movies.id;
     moviesMoreBtn.textContent = "More";
     moviesBtnContainer.appendChild(moviesMoreBtn);

     let moviesDeleteBtn = document.createElement("li");
     moviesDeleteBtn.classList.add("deleted-films-rememorate-btn");
     moviesDeleteBtn.dataset.deletedFilmsRememorateBtnId = movies.id;
     moviesDeleteBtn.textContent = "Rememorate";
     moviesBtnContainer.appendChild(moviesDeleteBtn);
   });
 }

 function filterGenres(array , obj){
    let filteredGenres = [];
    array.forEach((film) => {
      film.genres.forEach(genreArr => {
        if(!filteredGenres.includes(genreArr)){
          filteredGenres.push(genreArr);
        }
      });
    });

    filteredGenres.forEach(genres => {
      let selectOption = document.createElement("option");
      selectOption.setAttribute("value", genres);
      selectOption.textContent = genres;
      obj.appendChild(selectOption);
    });
  }
filterGenres(films, select);  

function filterFilms(array, obj){
   obj.innerHTML = "";
  
    array.forEach(movies =>{
      let moviesItem = document.createElement("li");
      moviesItem.classList.add("list-item");
      obj.appendChild(moviesItem);

      let moviesItemBodyId = document.createElement("time");
      moviesItemBodyId.classList.add("list-item-id");
      moviesItemBodyId.textContent = movies.id;
      moviesItem.appendChild(moviesItemBodyId);

      let moviesItemImg = document.createElement("img");
      moviesItemImg.classList.add("list-item-img");
      moviesItemImg.setAttribute("src", movies.poster);
      moviesItem.appendChild(moviesItemImg);

      let moviesItemBody = document.createElement("div");
      moviesItemBody.classList.add("list-item-body");
      moviesItem.appendChild(moviesItemBody);

      let moviesItemBodyTitle = document.createElement("h3");
      moviesItemBodyTitle.textContent = movies.title;
      moviesItemBodyTitle.classList.add("list-item-body-title");
      moviesItemBody.appendChild(moviesItemBodyTitle);

      let moviesBtnContainer = document.createElement("ol");
      moviesBtnContainer.classList.add("movies-btn-container");
      moviesItemBody.appendChild(moviesBtnContainer);

      let moviesMoreBtn = document.createElement("li");
      moviesMoreBtn.classList.add("movies-more-btn");
      moviesMoreBtn.dataset.moviesMoreBtnId = movies.id;
      moviesMoreBtn.textContent = "More";
      moviesBtnContainer.appendChild(moviesMoreBtn);

      let moviesTopBtn = document.createElement("li");
      moviesTopBtn.classList.add("movies-top-btn");
      moviesTopBtn.dataset.moviesTopBtnId = movies.id;
      moviesTopBtn.textContent = "Bookmark";
      moviesBtnContainer.appendChild(moviesTopBtn);

      let moviesDeleteBtn = document.createElement("li");
      moviesDeleteBtn.classList.add("movies-delete-btn");
      moviesDeleteBtn.dataset.moviesDeleteBtnId = movies.id;
      moviesDeleteBtn.textContent = "Delete";
      moviesBtnContainer.appendChild(moviesDeleteBtn);
    });
  }
  filterFilms(films, moviesList);

searchForm.addEventListener("submit", function(evt){
      evt.preventDefault();
      let inputval = searchInput.value;
      searchInput.value = "";

      let filterMovies = films.filter(object => object.title.includes(inputval));
      filterFilms(filterMovies, moviesList);
});

select.addEventListener("change", function(evt){
   let selectVal = select.value;
   
    let filteredGenres =  films.filter(object => object.genres.includes(selectVal));
    filterFilms(filteredGenres, moviesList);

    if(selectVal == "All genres"){
        filterFilms(films, moviesList);
    }
})

sort.addEventListener("change", evt => {
  let sortVal = sort.value;
   
  if(sortVal == "id"){
    const byId = films.sort((a,b) => {
     return a.id - b.id;
  }
  );
  
  filterFilms(byId, moviesList);
  }

  if(sortVal == "name"){
    const byName = films.sort((a,b) => {
      if(b.title > a.title){
          return -1
      }
  }
  );
  
  filterFilms(byName, moviesList);
  }
});

header.addEventListener("click", evt =>{
  if(evt.target.matches(".deleted-films-container")){
    filterDeletedFilms(deletedFilmArr, moviesList);
    window.localStorage.setItem("deletedFilm" , JSON.stringify(deletedFilmArr));
  };

  if(evt.target.matches(".bookmark-films-container")){
    filterBookmarks(bookmarks, moviesList);
  };
})