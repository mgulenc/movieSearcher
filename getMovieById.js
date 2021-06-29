import sendRequestToAPI from './sendRequestToAPI.js'

export default async function getMovieById(id){
  let div=document.getElementById(id)
  //check if the div has already children:
  if(div.hasChildNodes()){
    return}
  const result=await sendRequestToAPI(`https://data-imdb1.p.rapidapi.com/movie/id/${id}/`,"GET")
  //response sample=  {"Scarface":{imdb_id,title,year,discription,plot(short),img_url,movie_length,rating,}=>}
  const movie=Object.values(result)[0]

  //title:
  let title=document.createElement("h4")
  title.id="movie-title"
  title.innerHTML=movie.title
  //img:
  let img=document.createElement("img")
  img.id="movie-img"
  img.src=movie.image_url ? movie.image_url :  "./image-not-found.png"//!!!
  img.style.width="100px"
  //year:
  let year=document.createElement("p")
  year.id="movie-year"
  year.innerHTML="/"+movie.year
  //plot:
  let plot=document.createElement("p")
  plot.id="movie-plot"
  plot.innerHTML=movie.plot
  //length:
  let length=document.createElement("p")
  length.id="movie-length"
  length.innerHTML=movie.movie_length+"s"
  //rating:
  let rating=document.createElement("p")
  rating.id="movie-rating"
  rating.innerHTML=movie.rating
  //button:
  let link=document.createElement("a")
  link.href=`https://www.imdb.com/title/${id}`
  link.target="_blank"
  let button=document.createElement("button")
  button.innerHTML="more"
  button.className="btn"
  button.id="moreDetailsBtn"
  link.appendChild(button)
  //title-line:
  let titleLine=document.createElement("div")
  titleLine.id="movie-titleLine"
  titleLine.append(title,year)
  //left article:
  let article1=document.createElement("article")
  article1.className="left card-article"
  article1.append(rating,img,link)

  //right article:
  let article2=document.createElement("article")
  article2.className="right card-article"
  article2.append(titleLine,plot,length)
  //append infos to the card!
  div.append(article1,article2)
}