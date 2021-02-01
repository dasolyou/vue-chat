import axios from 'axios';

// const config = {
//   baseUrl: 'https://api.giphy.com/v1/gifs/',
//   apiKey: '9I2w1yetELumjpBXn2nKp4fbKLyIkETU'
// }

function fetchGiphy() {
  // return axios.get(`${config.baseUrl}gifs`);
  // return axios.get(`${config.baseUrl}gifs/search`);
  // return axios.get(`http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=${config.apiKey}&limit=5`);
  return axios.get(`http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=9I2w1yetELumjpBXn2nKp4fbKLyIkETU&limit=5`);
  // return axios.get(`https://media1.giphy.com/media/l0MYFKSkOwGsoS30A/giphy-downsized.gif?cid=66c9ffe70mmjnphdwlnedtuv3wcikfmhndm7u2dv7wmoi1nd&rid=giphy-downsized.gif`);
  // https://api.giphy.com/v1/gifs/birthday?api_key=9I2w1yetELumjpBXn2nKp4fbKLyIkETU

}

// function fetchNewsList() {
//   // return axios.get(config.baseUrl + '/news/1.json');
//   try {
//     var response = await axios.get(`${baseUrl}gifs.json`);
//     return response; 
//   } catch(error) {
//     console.log(error);
//   }
// }

export { fetchGiphy }