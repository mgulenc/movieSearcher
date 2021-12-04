import sendRequestToAPI from './sendRequestToAPI.js'
import createSingleCard from './getGenres.js'
import deleteExistingCards from './deleteExistingCards.js'

async function getMovieIDsByTitle(title){
  const result=await sendRequestToAPI(`https://data-imdb1.p.rapidapi.com/movie/imdb_id/byTitle/${title}/`,"GET")
  return result.results
}

async function getInput(){
  let searchButton=document.getElementById("searchBtn")
  searchButton.addEventListener("click",async function(){
    deleteExistingCards()
    const userInput=document.getElementById("searchInput").value;
    const moviesCollection=await getMovieIDsByTitle(userInput)
    //create cards for each movie:
    for (let i=0;i<moviesCollection.length;i++){
      await createSingleCard(moviesCollection,i)
    }
  })
}
getInput()

