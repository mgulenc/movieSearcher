export default async function sendRequestToAPI (url,method){
  const toReturn= await fetch(url, {
	"method": method,
	"headers": {
		"x-rapidapi-key": "5e1f44c4b4msh761a4c1be1f37b4p193dabjsn6c63f1bb3043",
		"x-rapidapi-host": "data-imdb1.p.rapidapi.com"
	}
  })
 .then(response=>response.json())
 .then(result=> {
   return result})
 .catch(err => {
 console.error(err);
 return err
 })
 return toReturn
}


