class Cover {
    constructor(cover, coverAttributes){
        this.id = cover.id;
        this.image_url = coverAttributes.image_url;
        this.stars = coverAttributes.stars;
        this.album_id = coverAttributes.album.id;
        this.album_title = coverAttributes.album.title;
        this.album_tracks = coverAttributes.album.tracks;
        this.album_origin = coverAttributes.album.origin;
        Cover.all.push(this);
    }

    renderCover() {
        return `    
        
        <div class="col-sm-6;" id="${this.id}">
        <div class="card mb-4 box-shadow">
        <img class="card-img-top" src="${this.image_url}" alt="Card image cap">
          <div class="card-body">
          <h5 class="card-title">${this.album_title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${this.stars} stars</h6>
            <p class="card-text">${this.album_origin}</p>
            <div class="d-flex justify-content-between align-items-center">
              <small class="text-muted">${this.album_tracks} tracks in this album</small>
            </div>
          </div>
        </div>
      </div>
        `
      //  return     `<div data-id=${this.id}>
      //              <img src=${this.image_url} height="250" width="250">
      //              <h3>CoverArt has ${this.stars} star rating</h3>
      //              <h2>${this.album_title}</h2>
      //              <h3>${this.album_origin}</h3>
      //              <h4>tracks: ${this.album_tracks}</h4>
      //              <button data-id=${this.id}>edit</button>
      //            </div>
      //            <br><br>`;
    }
}

Cover.all = [];