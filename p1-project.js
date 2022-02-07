document.addEventListener('DOMContentLoaded', function () {
   
    function randomWorks () {
        for (let i=0; i < 4; i++) {
        let num = randomNum();
        fetchData(num, i);
        }
    }
    
    function randomNum () {
        return parseInt(Math.random() * (50000 - 0) + 1);
    }
    
    function fetchData (num, i) {
        for (let x=0; x < 1; x++) {
        fetch (`https://collectionapi.metmuseum.org/public/collection/v1/objects/${num}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            console.log(data.message);
            console.log(data.additionalImages.length);
            console.log(data.primaryImageSmall);
            if (data.message !== 'ObjectID not found' || data.primaryImageSmall !== null) {
                rndrWork(data, i);
            }
            else {
                i--;
                return i;
            }
        })    
    }}
    
    function rndrWork(data, i) {
        let img = document.createElement('img');
        let title = document.createElement('p');
        let artist = document.createElement('p');
        let info = document.createElement('p');
        img.src = data.primaryImageSmall;
        title.innerText = data.title;
        if (title.innerText === '') {
            title.innerText = 'Untitled';
        }
        artist.innerText = data.artistDisplayName;
        if (artist.innerText === '') {
            artist.innerText = 'Artist Unknown';
        }
        // info.innerText = data.
        document.getElementById(`content${i}`).appendChild(img);
        document.getElementById(`title${i}`).appendChild(title);
        document.getElementById(`artist${i}`).appendChild(artist);
    };
    
    randomWorks();

});