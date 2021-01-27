// DOM
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true


// UNSPLASH API
let count = 5;
const apiKey = 'KVkiy_Xv9blJMBqfB9Q7UWhCuHKMZFJp-LUExy2zyXE';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;



function updateAPIURLWithNewCount (picCount) {
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
  }


// CHECKER SI LES IMAGES SONT CHARGEES
function imageLoaded() {

    imagesLoaded++;
    console.log(imagesLoaded);

    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready = ', ready)
    }
}




// Getphotos() A PARTIR DE L'API UNSPLASH
async function getPhotos() {

    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos()
        console.log(apiUrl)

        
        // AMELIORER PERFORMANCE AU CHARGEMENT
        if (isInitialLoad) { 
            updateAPIURLWithNewCount(30)
            isInitialLoad = false
            console.log(apiUrl)
        } 

    }
    catch(error) {
        console.log(error)
    }
}



// HELPER FUNCTION POUR SET ATTRIBUTE
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}



// CREER ELEMENT LINK & PHOTOS
function displayPhotos() {

    imagesLoaded = 0;

    totalImages = photosArray.length;
    console.log("Total images :", totalImages)

    photosArray.forEach((photo) => {
        
        // CREATION <a> 
        const a = document.createElement('a');
        setAttributes(a, {
            href: photo.links.html,
            target: '_blank'
        })
        

        // CREATION <img> 
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
   

        // EVENT LISTENER QUI CHECK SI LE CHARGEMENT EST TERMINÉ
        img.addEventListener('load', imageLoaded);


        // METTRE <img> DANS <a> PUIS LE TOUT DANS image-container
        a.appendChild(img);
        imageContainer.appendChild(a);

    });
}


// CHECKER SI PRES DU BOTTOM, SI OUI CHARGER PLUS DE PHOTOS
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

// MAIN
getPhotos();















// Autre méthode, privilégier DRY


// // CREER ELEMENT LINK & PHOTOS
// function displayPhotos() {

//     // Pour chaque objet dans photosArray
//     photosArray.forEach((photo) => {
        
//         // CREATION <a> 
//         const a = document.createElement('a');
//         a.setAttribute('href', photo.links.html);
//         a.setAttribute('target', '_blank');


//         // CREATION <img> 
//         const img = document.createElement('img');
//         img.setAttribute('src', photo.urls.regular);
//         img.setAttribute('alt', photo.alt_description);
//         img.setAttribute('title', photo.alt_description)


//         // METTRE <img> DANS <a> PUIS LE TOUT DANS image-container
//         a.appendChild(img);
//         imageContainer.appendChild(a);

//     });
// }