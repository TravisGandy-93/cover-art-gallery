const endPoint = "http://127.0.0.1:3000/api/v1/covers";

document.addEventListener('DOMContentLoaded', () => {
  getCovers()
  populateAlbumDropdown()
  const createAlbumForm = document.querySelector("#create-album-form")
  const createCoverForm = document.querySelector("#create-cover-form")
  createAlbumForm.addEventListener("submit", (e) => createFormHandler(e))
  createCoverForm.addEventListener("submit", (e) => createFormHandler(e))
});

function getCovers() {
    fetch(endPoint)
      .then(res => res.json())
      .then(covers => {
        covers.data.forEach(cover => {
            // double check how your data is nested in the console so you can successfully access the attributes of each individual object
            const coverMarkup = `
              <div data-id=${cover.id}>
                <img src=${cover.attributes.image_url} height="250" width="250">
                <h3>CoverArt has ${cover.attributes.stars} star rating</h3>
                <h2>${cover.attributes.album.title}</h2>
                <button data-id=${cover.id}>edit</button>
              </div>
              <br><br>`;
    
              document.querySelector('#cover-container').innerHTML += coverMarkup
          })
      })
  }

function populateAlbumDropdown(){
      fetch("http://127.0.0.1:3000/api/v1/albums")
      .then(res => res.json())
      .then(albums => {
      albums.data.forEach(album => { 
        const optionObj = document.createElement("option");
        optionObj.innerText += album.attributes.title;
        document.getElementById("mySelect").appendChild(optionObj);
        })
    })
}

function createFormHandler(e){
    e.preventDefault()
    debugger;
}