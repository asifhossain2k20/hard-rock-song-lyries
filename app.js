const searchSongs=()=>{
    const searchText=document.getElementById('search-field').value;
   // console.log(searchText);
    const url=`https://api.lyrics.ovh/suggest/${searchText}`;
   // console.log(url);
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        displaySong(data.data);
    })
    .catch(error=>{
        displayError('I cannot Load it !!! Sorry!!!');
    })

}

// const searchSongs=async()=>{
//     const searchText=document.getElementById('search-field').value;
//    // console.log(searchText);
//     const url=`https://api.lyrics.ovh/suggest/${searchText}`;
//    // console.log(url);
//     const res= await fetch(url)
//     const data =await res.json()
//      displaySong(data.data);

// }

const displaySong=songs=>{
   // console.log(songs);
    const songContainer=document.getElementById('songContainer');
    songContainer.innerHTML='';
    songs.forEach(song => {
        const div=document.createElement('div');
        div.className="single-result row align-items-center my-3 p-3";
        div.innerHTML=`
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls src="${song.preview}">
            </audio>
         </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `;
        songContainer.appendChild(div);
    });
}


// const getLyric=(artist,title)=>{
//    // console.log(artist,title);
//    const url=`https://api.lyrics.ovh/v1/${artist}/${title}`;
//    //console.log(url);
//    fetch(url)
//    .then(res=>res.json())
//    .then(data=>{
//       displayLyric(data.lyrics);
//    })
  
// }


const getLyric=async(artist,title)=>{
    // console.log(artist,title);
    const url=`https://api.lyrics.ovh/v1/${artist}/${title}`;
    //console.log(url);
    try{
        const res = await fetch(url)
        const data=await res.json();
        displayLyric(data.lyrics);
    }
    catch{
        displayError('I cannot Load it !!! Sorry!!!');
    }
   
 }

const displayLyric=(lyric)=>{
    const divDisplay=document.getElementById('displayLyric');
    divDisplay.innerText=lyric;
}

const displayError=(error)=>{
    const errorMsg=document.getElementById('errorMsg');
    errorMsg.innerText=error;
}