document.addEventListener('DOMContentLoaded', function () {
   

    async function randomWorks () {
        for (let i=0; i < 4; i++) {
        await fetchData(i);
        }
    }
    
    function randomNum () {
        return parseInt(Math.random() * (63450 - 0) + 1);
    }
    
    async function fetchData (i) {
        for (let x=0; x < 1; x++) {
        let num = randomNum();
        let workObj = await fetch (`https://collectionapi.metmuseum.org/public/collection/v1/objects/${num}`)
        .then((res) => res.json())
        .then((data) => data);
        if (workObj.message === 'ObjectID not found' || workObj.primaryImageSmall === '') {
            x--;
            fetchData();
        }
        else {
            rndrWork(workObj, i);
        }   
    }}
    
    function rndrWork(workObj, i) {
        let img = document.createElement('img');
        let title = document.createElement('p');
        let artist = document.createElement('p');
        let comment = document.createElement('p');
        img.src = workObj.primaryImageSmall;
        title.innerText = workObj.title;
        if (title.innerText === '') {
            title.innerText = 'Untitled';
        }
        artist.innerText = workObj.artistDisplayName;
        if (artist.innerText === '') {
            artist.innerText = 'Artist Unknown';
        }
        comment.innerText = 'Comments to come!'
        document.getElementById(`content${i}`).appendChild(img);
        document.getElementById(`title${i}`).appendChild(title);
        document.getElementById(`artist${i}`).appendChild(artist);
        document.getElementById(`artist${i}`).appendChild(comment);
    };

    // addEventListener('click', )
    
    randomWorks();

});