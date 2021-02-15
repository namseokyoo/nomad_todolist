const query = document.querySelector(".js-status");
const image = document.querySelector(".js-bg");

const API_KEY = "udHqyv-jojPX9ikWO4XpWCS1xOQ2npg9Ja596UePRD4";
const IMG_NUMBER = 30;

function getBackground(statusmsg) {
    const randomNumber = genRandom();
    const randomPage = genRandom();
    const IMAGE_URL = `https://api.unsplash.com/search/photos?query=${statusmsg}&page=${randomPage}&per_page=30&query=landscape&orientation=landscape&client_id=${API_KEY}`;
    console.log(IMAGE_URL);
    fetch(IMAGE_URL)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            imageUrl = json.results[randomNumber].urls.regular;
            paintImage(imageUrl);
        });
}

function paintImage(imageUrl) {
    image.src = `${imageUrl}`;
}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init() {}

init();
