document.addEventListener('DOMContentLoaded', () => {

    fetchData();

});
   
    const artLiked = [];
    
    function randomNum() {return parseInt(Math.random() * (63450 - 0) + 1)}
    
    function fetchData() {
            for (let i=0; i < 4; i++) {
            getFetch();
            }
    }  

    function getFetch() {
        let num = randomNum();
        fetch (`https://collectionapi.metmuseum.org/public/collection/v1/objects/${num}`)
        .then((res) => res.json())
        .then((workObj) => {
            if (workObj.message === 'Not a valid object' || workObj === 'ObjectID not found' || workObj.primaryImageSmall === '' || workObj.title === undefined) {
                getFetch();
            }
            else {
                rndrWork(workObj);
            }
        })
    }
    
    function rndrWork(workObj) {

        const container = document.getElementById('container');
        const artPiece = document.createElement('div');
        const title = document.createElement('p');
        const img = document.createElement('img');
        const artist = document.createElement('p');
        const commentText = document.createElement('input');
        const button = document.createElement('button');
        container.appendChild(artPiece);
        title.innerText = workObj.title;
        if (title.innerText === '') {
            title.innerText = 'Untitled';
        }
        img.src = workObj.primaryImageSmall;
        artist.innerText = workObj.artistDisplayName;
        if (artist.innerText === '') {
            artist.innerText = 'Artist Unknown';
        }
        commentText.placeholder = 'Thoughts/comments';
        commentText.type = 'text';
        button.innerText = 'Submit';
        artPiece.appendChild(title);
        artPiece.appendChild(img);
        artPiece.appendChild(artist);
        artPiece.appendChild(commentText);
        artPiece.appendChild(button);
        button.addEventListener('click', () => {
            let text = document.createTextNode(commentText.value);
            let li = document.createElement('li');
            li.appendChild(text);
            artPiece.appendChild(li);
            commentText.placeholder = 'Thoughts/comments on piece';
        });
        img.addEventListener('click', () => {
            alert(`You liked ${title.innerText} by ${artist.innerText} the most! Object #: ${workObj.objectID} at The Metropolitan Museum of Art.`);
            artLiked.push(workObj.objectID);   
            window.location.reload();
        })
 
    };