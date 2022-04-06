function getTime(obj){
    var date = new Date(obj.release_date);
    var day = date.getDate();
    var month = String(date.getMonth() +1).padStart(2,0);
    var year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

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

     wiewFunc(bookmarks);
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
     wiewFunc(deletedFilmArr);
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

     wiewFunc(films);
   }

  function searchFunc (arr, func){
    searchForm.addEventListener("submit", function(evt){
        evt.preventDefault();
        let inputval = searchInput.value;
        searchInput.value = "";
  
        let filterMovies = arr.filter(object => object.title.includes(inputval));
        func(filterMovies, moviesList);
  });
  }

  function selectFunc (arr, func){
    select.addEventListener("change", function(evt){
        let selectVal = select.value;
        
         let filteredGenres =  arr.filter(object => object.genres.includes(selectVal));
         func(filteredGenres, moviesList);
     
         if(selectVal == "All genres"){
             func(arr, moviesList);
         }
     });
  }

  function sortFilm (arr, func){
    sort.addEventListener("change", evt => {
        let sortVal = sort.value;
         
        if(sortVal == "id"){
          const byId = arr.sort((a,b) => {
           return a.id - b.id;
        }
        );
        
        func(byId, moviesList);
        }
      
        if(sortVal == "name"){
          const byName = arr.sort((a,b) => {
            if(b.title > a.title){
                return -1
            }
        }
        );
        
        func(byName, moviesList);
        }
      });
  }

  function wiewFunc (arr){
    wiewFilm.addEventListener("click", evt => {
        const wiewId = evt.target.dataset.wiewFilmId;
        main.style.opacity = 0.2;

        const findIndexArr = arr.find(todo => todo.id == wiewId);
        modalArr.splice(0, -1)
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
    })
}

function setTime() {
  setTimeout(setTimeFunc, 2500);
}

function setTimeFunc (){
    alert.classList.add("display-none");
    main.style.opacity = 1;
}  