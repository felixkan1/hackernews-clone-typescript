const fetch = require("node-fetch");

async function getMovie(movie){

  const obj =  await (await(fetch("http://www.omdbapi.com/?i=tt3896198&apikey=4a184c3c&r=json&type=movie&s=ram"))).json()

  return obj
}

getMovie("boogie")
  .then(console.log)
  .catch(error => console.log(error))

