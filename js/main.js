/* ==========================================================
   CFDI Verifier
   main.js
   CIIS
========================================================== */

"use strict";

/* ==========================================================
ELEMENTOS
========================================================== */

const header =
    document.querySelector(".topbar");

const menuButton =
    document.getElementById("menuButton");

const navigation =
    document.querySelector("nav");

const navLinks =
    document.querySelectorAll("nav a");

/* ==========================================================
MENU MOVIL
========================================================== */

if(menuButton){

    menuButton.addEventListener("click",()=>{

        navigation.classList.toggle("showMenu");

        menuButton.classList.toggle("active");

    });

}

navLinks.forEach(link=>{

    link.addEventListener("click",()=>{

        navigation.classList.remove("showMenu");

        menuButton.classList.remove("active");

    });

});

/* ==========================================================
HEADER SCROLL
========================================================== */

window.addEventListener("scroll",()=>{

    if(window.scrollY>30){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");

    }

});

/* ==========================================================
SCROLL REVEAL
========================================================== */

const revealElements=document.querySelectorAll(

    ".featureCard,"+
    ".securityCard,"+
    ".step,"+
    ".galleryItem,"+
    ".faq details"

);

const revealObserver=new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("visible");

        }

    });

},

{

    threshold:.20

}

);

revealElements.forEach(item=>{

    item.classList.add("hiddenReveal");

    revealObserver.observe(item);

});

/* ==========================================================
SMOOTH SCROLL
========================================================== */

document

.querySelectorAll('a[href^="#"]')

.forEach(anchor=>{

    anchor.addEventListener(

        "click",

        function(e){

            const target=document.querySelector(

                this.getAttribute("href")

            );

            if(target){

                e.preventDefault();

                target.scrollIntoView({

                    behavior:"smooth",

                    block:"start"

                });

            }

        }

    );

});

/* ==========================================================
BOTON VOLVER ARRIBA
========================================================== */

const topButton=document.createElement("button");

topButton.innerHTML="↑";

topButton.id="backTop";

document.body.appendChild(topButton);

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        topButton.classList.add("show");

    }else{

        topButton.classList.remove("show");

    }

});

topButton.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/* ==========================================================
AÑO FOOTER
========================================================== */

const yearElement=document.getElementById("year");

if(yearElement){

    yearElement.textContent=

        new Date().getFullYear();

}

/* ==========================================================
EFECTO HERO
========================================================== */

const hero=document.querySelector(".heroImage img");

if(hero){

    window.addEventListener("mousemove",(e)=>{

        const x=

            (window.innerWidth/2-e.clientX)/80;

        const y=

            (window.innerHeight/2-e.clientY)/80;

        hero.style.transform=

            `rotateY(${x}deg) rotateX(${-y}deg)`;

    });

}

/* ==========================================================
LAZY LOAD
========================================================== */

const lazyImages=

document.querySelectorAll("img");

const lazyObserver=

new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            const img=entry.target;

            img.classList.add("loaded");

            lazyObserver.unobserve(img);

        }

    });

}

);

lazyImages.forEach(img=>{

    lazyObserver.observe(img);

});

/* ==========================================================
RIPPLE BUTTON
========================================================== */

document

.querySelectorAll(

".primaryButton,.secondaryButton"

)

.forEach(button=>{

    button.addEventListener(

        "click",

        function(e){

            const circle=

                document.createElement("span");

            const d=Math.max(

                this.clientWidth,

                this.clientHeight

            );

            circle.style.width=d+"px";

            circle.style.height=d+"px";

            circle.classList.add("ripple");

            circle.style.left=

                e.offsetX-d/2+"px";

            circle.style.top=

                e.offsetY-d/2+"px";

            this.appendChild(circle);

            setTimeout(()=>{

                circle.remove();

            },600);

        }

    );

});

/* ==========================================================
TOOLTIPS
========================================================== */

document

.querySelectorAll("[data-tooltip]")

.forEach(element=>{

    element.addEventListener("mouseenter",()=>{

        const tooltip=

            document.createElement("div");

        tooltip.className="tooltip";

        tooltip.innerHTML=

            element.dataset.tooltip;

        document.body.appendChild(tooltip);

        const rect=

            element.getBoundingClientRect();

        tooltip.style.left=

            rect.left+

            rect.width/2-

            tooltip.offsetWidth/2+"px";

        tooltip.style.top=

            rect.top-40+"px";

        element.tooltip=tooltip;

    });

    element.addEventListener("mouseleave",()=>{

        if(element.tooltip){

            element.tooltip.remove();

        }

    });

});

/* ==========================================================
INICIALIZACION
========================================================== */

window.addEventListener(

"load",

()=>{

    document.body.classList.add("loaded");

}

);

/* ==========================================================
FIN
========================================================== */
