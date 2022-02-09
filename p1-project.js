document.addEventListener('DOMContentLoaded', function () {
   //Use indexes to preload random numbers, then use functions to check, find new, and overwrite back to the array

   //Blog about non-E6 notation for loops or the fetch scheme for bad data
   
    const artIndexes = [];
    artIndexes.length = 4;
    console.log(artIndexes);
    
    function randomNum () {
            return parseInt(Math.random() * (63450 - 0) + 1);
    }
    
    function fetchData () {
            for (let i=0; i < artIndexes.length; i++) {
            getFetch(i);
            }
    }  

    async function getFetch (i) {
        let randNum = randomNum();
        await fetch (`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randNum}`)
        .then((res) => res.json())
        .then((workObj) => {
            if (workObj.message === 'Not a valid object' || workObj === 'ObjectID not found' || workObj.primaryImageSmall === '' || workObj === undefined) {
                getFetch(i);
            }
            else {
                artIndexes[i] = randNum;
                console.log(artIndexes[i]);
                rndrWork(workObj, i);
            }
        })
    }
    
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
        comment.innerText = 'Comments to come!';
        document.getElementById(`content${i}`).appendChild(img);
        document.getElementById(`title${i}`).appendChild(title);
        document.getElementById(`artist${i}`).appendChild(artist);
        document.getElementById(`artist${i}`).appendChild(comment);
        // console.log(i);
    };

    // addEventListener('click', )
    
    fetchData();

    
});