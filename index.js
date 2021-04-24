const endPoint = "http://127.0.0.1:3000/api/v1/covers";
const albumEndPoint = "http://127.0.0.1:3000/api/v1/albums";

document.addEventListener('DOMContentLoaded', () => {
  getCovers()
  populateAlbumDropdown()
  const createAlbumForm = document.querySelector("#create-album-form")
  const createCoverForm = document.querySelector("#create-cover-form")
  createAlbumForm.addEventListener("submit", (e) => createAlbumFormHandler(e))
  createCoverForm.addEventListener("submit", (e) => createCoverFormHandler(e))
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
                <h4>tracks: ${cover.attributes.album.tracks}</h4>
                <button data-id=${cover.id}>edit</button>
              </div>
              <br><br>`;
    
              document.querySelector('#cover-container').innerHTML += coverMarkup
          })
      })
  }

function populateAlbumDropdown(){
      fetch(albumEndPoint)
      .then(res => res.json())
      .then(albums => {
      albums.data.forEach(album => { 
        const optionObj = document.createElement("option");
        optionObj.innerText += album.attributes.title;
        document.getElementById("mySelect").appendChild(optionObj);
        })
    })
}

function createAlbumFormHandler(e){
    e.preventDefault()
    const titleInput = document.querySelector("#input-title").value
    const tracksInput = document.querySelector("#input-tracks").value
    const artistInput = document.querySelector('#input-artist').value
    const originInput = document.querySelector('#input-origin').value
    postFetchAlbum(titleInput, tracksInput, artistInput, originInput)
}

function createCoverFormHandler(e) {
    e.preventDefault()
    const starsInput = document.querySelector('#input-stars').value
    const urlInput = document.querySelector('#input-url').value
    const albumIdInput = (document.querySelector('#mySelect').selectedIndex + 1)
    postFetchCover(starsInput, urlInput, albumIdInput)
}

function postFetchAlbum(title, tracks, artist, origin) {
    const albumData = {title, tracks, artist, origin};
    fetch(albumEndPoint, {
        // POST request
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(albumData)
      })
      .then(res => res.json())
      .then(albums => {
        populateAlbumDropdown();
    })
}

function postFetchCover(stars, image_url, album_id) {
    const starData = {stars, image_url, album_id}
    fetch(endPoint, { 
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(starData)
         })
      .then(res => res.json())
      .then(covers => {
          getCovers();
      })
    
}