//retorna um objeto elemento com o id estabelicido 
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = []; //array com as fotos 
//Unsplash API
const count = 30;
const apiKey = 'YBgty2Boif2zOSyNEW5vJnyYF6xA9sIX6nUSGz3wXic'; //chave da api 
const apiUrl = ` https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;  //{*} é um tipo de concatenação 

//check se todas imagens foram carregadas

// function imageLoaded() {
//     imagesLoaded++;
//     if (imagesLoaded === totalImages) {
//         ready = true;
//         console.log('ready=', ready)
//     }
// }


//Função pra chamada do setAttributes
function setAttributes(element, attributes) { //adiciona um novo atributo, ou altera um atributo existente num elemento especifico 
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}



//Criando Elementos pelos links e fotos, e add na dom 
function displayPhotos() {
    totalImages = photoArray.lenght;
    // console.log('total images', totalImages);
    //run função for each object no photosArray
    photosArray.forEach((photo) => { //para cada foto 
        //Criar <a> para redirecionar para o site da Unsplash
        const item = document.createElement('a');
        setAttributes(item, { //caractericas do link 
            href: photo.links.html,
            target: '-blank',
        });
        //Criar <img> por foto
        const img = document.createElement('img');
        setAttributes(img, { //setando os atributos de cada elemento 
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //Event Listener, check quando cada each for carregado 
        // img.addEventListener('load,imageLoaded');


        //Colocar <a> dentro de <a>, então coloca-los no image container element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


//Pegando as fotos da Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl); // retorna uma promessa
        photosArray = await response.json(); // transformando em json
        console.log(photosArray);
        displayPhotos(); //chamando a função que mostra as fotos 
    } catch (error) {
        //pegando o erro aqui 
    }
}
//se o scrolling tiver perto do fim da pagina, carregar mais fotos 
// window.addEventListener('scroll', () => {

//     if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
//         //window.innerHeight é a altura total da browser window
//         //window.scrollY é e a distancia do topo ate onde o usuiario scrolled
//         //offsetHeight returna a altura do elemento 
//         getPhotos();
//     }
// });
//chamando função 
getPhotos();

