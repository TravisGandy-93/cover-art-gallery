const endPoint = "http://127.0.0.1:3000/api/v1/covers";
const albumEndPoint = "http://127.0.0.1:3000/api/v1/albums";



document.addEventListener('DOMContentLoaded', () => {
  getCovers()
  populateAlbumDropdown()
  const createAlbumForm = document.querySelector("#create-album-form")
  const createCoverForm = document.querySelector("#create-cover-form")
  const searchBar = document.querySelector('#search')

  searchBar.addEventListener("click", (e) => showAlbumsCovers(e))
  createAlbumForm.addEventListener("submit", (e) => createAlbumFormHandler(e))
  createCoverForm.addEventListener("submit", (e) => createCoverFormHandler(e))
  createAlbumForm.addEventListener("submit", function(){createAlbumForm.reset()})
  createCoverForm.addEventListener("submit", function(){createCoverForm.reset()})
});


function getCovers() {
    fetch(endPoint)
      .then(res => res.json())
      .then(covers => {
        covers.data.forEach(cover => {
            // double check how your data is nested in the console so you can successfully access the attributes of each individual object
         //  debugger
            let newCover = new Cover(cover, cover.attributes)
           document.querySelector('#cover-container').innerHTML += newCover.renderCover()
           
            })
           // .catch(err => console.log(err))
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

  function showAlbumsCovers(e){
    e.preventDefault()
    const starInput = document.querySelector('#search_field').value
    getAlbumCovers(starInput)
  }

  function getAlbumCovers(nameInput){
    fetch(endPoint)
    .then(res => res.json())
    .then(covers => {
      let specificCover = covers.data.filter((cover) => cover.attributes.stars == nameInput)
      console.log(specificCover);
      document.querySelector('#cover-container').innerHTML = "";
     
        for (i = 0; i < specificCover.length; i++){
          let newCover = new Cover(specificCover[i].id, specificCover[i].attributes)
          document.querySelector('#cover-container').innerHTML += newCover.renderCover()
        }  
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
      .then(cover => {
        const newCover = new Cover(cover.data.id, cover.data.attributes)

        document.querySelector('#cover-container').innerHTML += newCover.renderCover();
       // location.reload()
      })
    
}