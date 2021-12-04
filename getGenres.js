import sendRequestToAPI from './sendRequestToAPI.js'
import getMovieById from './getMovieById.js'
import deleteExistingCards from './deleteExistingCards.js'

const moviesContainer=document.getElementById("listOfMovies")

async function getMoviesByGenre(genre){
  deleteExistingCards()
  const result=await sendRequestToAPI(`https://data-imdb1.p.rapidapi.com/movie/byGen/${genre}/`,"GET")
  //response sample=  {count: 443, next: 'http://47.254.174.28/movie/byGen/History/?page=2', previous: null, results: Array(50)}
  const moviesCollection=result.results
  let counter=1;
  //create card for the first movies:
  await createCards(moviesCollection,counter)
  counter++;
  if(moviesContainer.hasChildNodes()){
    //display more button:
    let moreBtn= document.getElementById('moreBtn')
    moreBtn.style.display="block"
    moreBtn.onclick=()=>{
      createCards(moviesCollection,counter)
      counter++;
    }
  }else{
    console.log("here is no film attached to the title "+genre)
  }
}

function createCards(moviesCollection,counter){
  let limit;
  if(moviesCollection.length>=20){
    limit=20
  }else{limit=moviesCollection.length}
  let howmanylimit=Math.floor((moviesCollection.length)/limit);
  let rest=(moviesCollection.length)%limit;
  if(counter<=howmanylimit){
    for(let i=limit*(counter-1);i<limit*counter;i++){
      createSingleCard(moviesCollection,i)
    }
  }else{
    //returns rest movies:
    if(counter-howmanylimit==1){
      for(let k=limit*(counter-1);k<(limit*(counter-1)+rest);k++){
        createSingleCard(moviesCollection,k)
      }
    //returns since there is no movie rest:
    }
    moreBtn.style.display="none"
    return
  }
}

export default function createSingleCard(moviesCollection,i){
  let movie=moviesCollection[i]
  let div=document.createElement("div");
  div.className="movie-card"
  div.id=movie.imdb_id
  //add new card:
    moviesContainer.appendChild(div)
  //get infos and attach them to div according to the id:
  getMovieById(movie.imdb_id)
}

async function getGenres(){
  const result=await sendRequestToAPI("https://data-imdb1.p.rapidapi.com/genres/","GET")
  //response sample=  {"results":[{"genre":"Adventure"},{}]}
  let ul=document.getElementById("listOfGenres")
  result.results.map((obj,i)=>{
    //picks up only the genres that the api provides movies about them:
    if(i<21){
      let li=document.createElement("li");
      li.className="genre"
      li.addEventListener("click",function(event){
        getMoviesByGenre(event.target.innerHTML)
      })
      li.innerHTML=obj.genre;
      ul.appendChild(li)
    }
  })
}
getGenres()



