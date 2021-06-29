import sendRequestToAPI from './sendRequestToAPI.js'
import getMovieById from './getMovieById.js'
import deleteExistingCards from './deleteExistingCards.js'

const moviesContainer=document.getElementById("listOfMovies")

async function getMoviesByGenre(genre){
  deleteExistingCards()
  const result=await sendRequestToAPI(`https://data-imdb1.p.rapidapi.com/movie/byGen/${genre}/`,"GET")
  //response sample=  {"Movies Drama":[{imdb_id,.title}]}
  const moviesCollection=Object.values(result)[0]
  let counter=1;
  //create card for the first movies:
  await createCards(moviesCollection,counter)
  counter++;
  //check if movies there:
  if(moviesContainer.hasChildNodes()){
    //more button:
    let button=document.createElement("button")
    button.innerHTML="more"
    button.className="btn"
    button.id="moreBtn"
    button.onclick=()=>{
      createCards(moviesCollection,counter)
      counter++;
    }
    moviesContainer.appendChild(button)
  }else{
    console.log("here is no film attached to the title "+genre)
  }
}

function createCards(moviesCollection,counter){
  let limit;
  if(moviesCollection.length>=20){
    limit=20
  }else{moviesCollection.length}
  let howmanylimit=Math.floor((moviesCollection.length)/limit);
  let rest=(moviesCollection.length)%limit;
  if(counter<=howmanylimit){
    for(let i=limit*(counter-1);i<limit*counter;i++){
      createSingleCard(moviesCollection,i,counter)
    }
  }else{
    //returns rest movies:
    if(counter-howmanylimit==1){
      for(let k=limit*(counter-1);k<(limit*(counter-1)+rest);k++){
        createSingleCard(moviesCollection,k,counter)
      }
    //returns since there is no movie rest:
    }else{return}
  }
}

export default function createSingleCard(moviesCollection,i,counter){
  let movie=moviesCollection[i]
  let div=document.createElement("div");
  div.className="movie-card"
  div.id=movie.imdb_id
  //add new cards before 'more' botton:
  if(counter!==1){
    let button=document.getElementById("moreBtn")
    moviesContainer.insertBefore(div,button)
  }else{
    moviesContainer.appendChild(div)
  }
  //get infos and attach them to div according to the id:
  getMovieById(movie.imdb_id)
}

async function getGenres(){
  const result=await sendRequestToAPI("https://data-imdb1.p.rapidapi.com/genres/","GET")
  console.log(result)
  //response sample=  {"Genres":[{"genre":"Adventure"},{}]}
  let ul=document.getElementById("listOfGenres")
  result.Genres.map((obj,i)=>{
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



