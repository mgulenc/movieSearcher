export default function deleteExistingCards(){
  const moviesContainer=document.getElementById("listOfMovies")  
    while (moviesContainer.hasChildNodes()) {
      moviesContainer.removeChild(moviesContainer.lastChild);
    }
}