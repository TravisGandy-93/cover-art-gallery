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
        return     `<div data-id=${this.id}>
                    <img src=${this.image_url} height="250" width="250">
                    <h3>CoverArt has ${this.stars} star rating</h3>
                    <h2>${this.album_title}</h2>
                    <h3>${this.album_origin}</h3>
                    <h4>tracks: ${this.album_tracks}</h4>
                    <button data-id=${this.id}>edit</button>
                  </div>
                  <br><br>`;
    }
}

Cover.all = [];