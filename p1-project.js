document.addEventListener('DOMContentLoaded', function () {
   //Use indexes to preload random numbers, then use functions to check, find new, and overwrite back to the array

   //Blog about non-E6 notation for loops or the fetch scheme for bad data
   
    const artIndexes = [];
    console.log(artIndexes);
    
    function randomNum () {
            return parseInt(Math.random() * (63450 - 0) + 1);
    }
    
    function fetchData () {
            for (let i=0; i < 4; i++) {
            getFetch(i);
            }
    }  

    async function getFetch (i) {
        let num = randomNum();
        await fetch (`https://collectionapi.metmuseum.org/public/collection/v1/objects/${num}`)
        .then((res) => res.json())
        .then((workObj) => {
            if (workObj.message === 'Not a valid object' || workObj === 'ObjectID not found' || workObj.primaryImageSmall === '' || workObj.title === undefined) {
                getFetch(i);
            }
            else {
                artIndexes[i] = num;
                console.log(artIndexes[i]);
                rndrWork(workObj, i);
            }
        })
    }
    
    function rndrWork(workObj, i) {
        let img = document.createElement('img');
        let title = document.createElement('p');
        let artist = document.createElement('p');
        img.src = workObj.primaryImageSmall;
        title.innerText = workObj.title;
        if (title.innerText === '') {
            title.innerText = 'Untitled';
        }
        artist.innerText = workObj.artistDisplayName;
        if (artist.innerText === '') {
            artist.innerText = 'Artist Unknown';
        }
        document.getElementById(`content${i}`).appendChild(img);
        document.getElementById(`title${i}`).appendChild(title);
        document.getElementById(`artist${i}`).appendChild(artist);
        let comment = document.getElementById(`post${i}`);
        comment.addEventListener('click', function () {
            let commentBox = document.getElementById(`comment-box${i}`).value;  
            let li = document.createElement('li');
            let text = document.createTextNode(commentBox);
            li.appendChild(text);
            document.getElementById(`unordered${i}`).appendChild(li);
        })

        //Event listener for image liked most here
    };

    fetchData();
    
});