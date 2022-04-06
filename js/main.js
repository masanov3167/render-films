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
document.body.appendChild(alert);

let video = document.createElement("iframe");
video.classList.add("display-none","video");

let videoCloser = document.createElement("div");
videoCloser.classList.add("video-closer");
modal.appendChild(videoCloser);

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

      wiewFilm.dataset.wiewFilmId = a.id;
    })
  }

  if(evt.target.matches(".deleted-films-rememorate-btn")){
    const deleteBtnId = evt.target.dataset.deletedFilmsRememorateBtnId;

    const findIndexArr = deletedFilmArr.findIndex(todo => todo.id == deleteBtnId);
    const findFilm = deletedFilmArr.find(todo => todo.id == deleteBtnId);

    let deletedFilm = deletedFilmArr.splice(findIndexArr, 1);
    deletedFilm.forEach(g =>{

      alert.classList.remove("display-none");
      alert.innerHTML = `film <span>${g.title.substr(0,20) + "..."}</span> succesfully rememorated!`;
      main.style.opacity = 0.2;
      setTime();
      films.push(findFilm);
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

      wiewFilm.dataset.wiewFilmId = a.id;
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
      setTime();
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
    const findFilm = films.find(todo => todo.id == deleteBtnId);

    let deletedFilm = films.splice(findIndexArr, 1);
    deletedFilm.forEach(g =>{
      alert.classList.remove("display-none");
      alert.innerHTML = `film <span>${g.title.substr(0,20) + "..."}</span> succesfully deleted!`;
      main.style.opacity = 0.2;
      setTime();

      wiewFilm.dataset.wiewFilmId = g.id;

      deletedFilmArr.push(findFilm);
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
            setTime();
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
});


header.addEventListener("click", evt =>{
  if(evt.target.matches(".deleted-films-container")){
    filterDeletedFilms(deletedFilmArr, moviesList);
    window.localStorage.setItem("deletedFilm" , JSON.stringify(deletedFilmArr));
    selectFunc(deletedFilmArr, filterDeletedFilms);
    sortFilm(deletedFilmArr, filterDeletedFilms);
    searchFunc(deletedFilmArr, filterDeletedFilms);
    
  };

  if(evt.target.matches(".bookmark-films-container")){
    filterBookmarks(bookmarks, moviesList);
    selectFunc(bookmarks, filterBookmarks);
    sortFilm(bookmarks, filterBookmarks);
    searchFunc(bookmarks, filterBookmarks);
    
  };
});

filterGenres(films, select);  
filterFilms(films, moviesList);

searchFunc(films, filterFilms);
selectFunc(films, filterFilms);
sortFilm(films, filterFilms);