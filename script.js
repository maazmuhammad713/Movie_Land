const movieNameRef = document.getElementById("movie-name");
const movieYearRef = document.getElementById("movie-year");
const searchBtn = document.getElementById("search-btn");
const result = document.getElementById("result");
const key = "67b7aac6";

const getMovie = () => {
  const movieYear = movieYearRef.value;
  const movieName = movieNameRef.value;
  const url = `http://www.omdbapi.com/?s=${movieName}&y=${movieYear}&apikey=${key}`;

  movieName.length === 0
    ? (result.innerHTML = `<h3 class="msg">Please Enter a valid Movie name</h3>`)
    : fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          const results = data.Search || [];

          results.length > 0
            ? (result.innerHTML = results
                .map((detail) => {
                  return `<div class="info">
            <img src="${detail.Poster}" class="poster">
            <div>
              <h2>${detail.Title}</h2>
              <div class="rating">
                <h4>${detail.Type}</h4>
              </div>
              <div class="details">
                <span>${detail.Year}</span>
              </div>
            </div>
          </div>`;
                })
                .join(""))
            : (result.innerHTML = `<h3 class="msg">No results found</h3>`);
        })
        .catch(() => {
          result.innerHTML = `<h3 class="msg">Error Occurred</h3>`;
        });
};

searchBtn.addEventListener("click", getMovie);

window.addEventListener("load", getMovie);
