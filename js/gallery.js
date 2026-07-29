/* ==========================================================
   CFDI Verifier
   gallery.js
   CIIS
========================================================== */

"use strict";

/* ==========================================================
ELEMENTOS
========================================================== */

const galleryItems = document.querySelectorAll(".galleryItem img");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const closeLightbox = document.getElementById("closeLightbox");

let currentIndex = 0;

/* ==========================================================
ABRIR LIGHTBOX
========================================================== */

function openLightbox(index){

    currentIndex = index;

    lightboxImage.src = galleryItems[index].src;

    lightboxImage.alt = galleryItems[index].alt;

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

}

/* ==========================================================
CERRAR
========================================================== */

function closeGallery(){

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}

/* ==========================================================
EVENTOS
========================================================== */

galleryItems.forEach((image,index)=>{

    image.addEventListener("click",()=>{

        openLightbox(index);

    });

});

closeLightbox.addEventListener("click",closeGallery);

lightbox.addEventListener("click",(event)=>{

    if(event.target===lightbox){

        closeGallery();

    }

});

/* ==========================================================
SIGUIENTE
========================================================== */

function nextImage(){

    currentIndex++;

    if(currentIndex>=galleryItems.length){

        currentIndex=0;

    }

    lightboxImage.src=galleryItems[currentIndex].src;

    lightboxImage.alt=galleryItems[currentIndex].alt;

}

/* ==========================================================
ANTERIOR
========================================================== */

function previousImage(){

    currentIndex--;

    if(currentIndex<0){

        currentIndex=galleryItems.length-1;

    }

    lightboxImage.src=galleryItems[currentIndex].src;

    lightboxImage.alt=galleryItems[currentIndex].alt;

}

/* ==========================================================
BOTONES
========================================================== */

const nextButton=document.createElement("button");

nextButton.className="galleryNext";

nextButton.innerHTML="❯";

const previousButton=document.createElement("button");

previousButton.className="galleryPrevious";

previousButton.innerHTML="❮";

lightbox.appendChild(nextButton);

lightbox.appendChild(previousButton);

nextButton.addEventListener(

"click",

(event)=>{

    event.stopPropagation();

    nextImage();

}

);

previousButton.addEventListener(

"click",

(event)=>{

    event.stopPropagation();

    previousImage();

}

);

/* ==========================================================
TECLADO
========================================================== */

document.addEventListener("keydown",(event)=>{

    if(!lightbox.classList.contains("active")){

        return;

    }

    switch(event.key){

        case "ArrowRight":

            nextImage();

            break;

        case "ArrowLeft":

            previousImage();

            break;

        case "Escape":

            closeGallery();

            break;

    }

});

/* ==========================================================
GESTOS TÁCTILES
========================================================== */

let startX=0;

let endX=0;

lightbox.addEventListener(

"touchstart",

(event)=>{

    startX=event.changedTouches[0].clientX;

},

false

);

lightbox.addEventListener(

"touchend",

(event)=>{

    endX=event.changedTouches[0].clientX;

    handleSwipe();

},

false

);

function handleSwipe(){

    const distance=endX-startX;

    if(Math.abs(distance)<60){

        return;

    }

    if(distance>0){

        previousImage();

    }else{

        nextImage();

    }

}

/* ==========================================================
PRELOAD
========================================================== */

galleryItems.forEach(image=>{

    const preload=new Image();

    preload.src=image.src;

});

/* ==========================================================
DOBLE CLICK PARA ZOOM
========================================================== */

let zoom=false;

lightboxImage.addEventListener("dblclick",()=>{

    zoom=!zoom;

    if(zoom){

        lightboxImage.style.transform="scale(2)";

        lightboxImage.style.cursor="zoom-out";

    }else{

        lightboxImage.style.transform="scale(1)";

        lightboxImage.style.cursor="zoom-in";

    }

});

/* ==========================================================
CLICK SIMPLE RESTAURA
========================================================== */

lightboxImage.addEventListener("click",()=>{

    if(zoom){

        zoom=false;

        lightboxImage.style.transform="scale(1)";

        lightboxImage.style.cursor="zoom-in";

    }

});

/* ==========================================================
INDICADOR
========================================================== */

const counter=document.createElement("div");

counter.className="galleryCounter";

lightbox.appendChild(counter);

function updateCounter(){

    counter.innerHTML=

        (currentIndex+1)

        +" / "

        +galleryItems.length;

}

const oldOpen=openLightbox;

openLightbox=function(index){

    oldOpen(index);

    updateCounter();

};

const oldNext=nextImage;

nextImage=function(){

    oldNext();

    updateCounter();

};

const oldPrevious=previousImage;

previousImage=function(){

    oldPrevious();

    updateCounter();

};

/* ==========================================================
FIN
========================================================== */
