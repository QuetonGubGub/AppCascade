fetch("bibliotheque-sources.json")
.then(res => res.json())
.then(data => {

    const params = new URLSearchParams(window.location.search);
    const famille = params.get("famille");
    const espece = params.get("nom");

    const animal = data[famille][espece];

    document.getElementById("image-espece-animale").src = animal["image-espece-animale"];
    document.getElementById("nom-espece-animale").textContent = animal["nom-espece-animale"];
    document.getElementById("liste-rouge").textContent = animal["liste-rouge"];
    document.getElementById("liste-rouge-couleur").style.backgroundColor = animal["liste-rouge-couleur"];
    document.getElementById("esperance-vie").textContent = animal["esperance-vie"];
    document.getElementById("regime-alimentaire").textContent = animal["regime-alimentaire"];
    document.getElementById("description-espece-animale").textContent = animal["description-espece-animale"];

    /* CAROUSEL */

    const track = document.getElementById("galleryTrack");

    let currentIndex = 0;

    track.innerHTML = "";

    animal["carousel"].forEach(src => {

        const img = document.createElement("img");

        img.src = src;
        img.alt = animal["nom-espece-animale"];

        img.addEventListener("click", () => {
            openLightbox(src);
        });

        track.appendChild(img);
    });

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    document.querySelector(".next").addEventListener("click", () => {

        currentIndex++;

        if (currentIndex >= animal["carousel"].length) {
            currentIndex = 0;
        }

        updateCarousel();
    });

    document.querySelector(".prev").addEventListener("click", () => {

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = animal["carousel"].length - 1;
        }

        updateCarousel();
    });

});


/* LIGHTBOX */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.style.display = "flex";
}

function closeLightbox() {
    lightbox.style.display = "none";
    lightboxImg.src = "";
}

lightbox.addEventListener("click", closeLightbox);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeLightbox();
    }
});