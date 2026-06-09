// Chargement des informations de l'espèce depuis le fichier JSON
fetch("bibliotheque-sources.json")
.then(res => res.json())
.then(data => {

    // Récupère la famille et l'espèce depuis l'URL
    const params = new URLSearchParams(window.location.search);
    const famille = params.get("famille");
    const espece = params.get("nom");

    // Sélectionne les données de l'animal demandé
    const animal = data[famille][espece];

    // Remplit les informations de la fiche espèce
    document.getElementById("image-espece-animale").src = animal["image-espece-animale"];
    document.getElementById("nom-espece-animale").textContent = animal["nom-espece-animale"];
    document.getElementById("liste-rouge").textContent = animal["liste-rouge"];
    document.getElementById("liste-rouge-couleur").style.backgroundColor = animal["liste-rouge-couleur"];
    document.getElementById("esperance-vie").textContent = animal["esperance-vie"];
    document.getElementById("regime-alimentaire").textContent = animal["regime-alimentaire"];
    document.getElementById("description-espece-animale").textContent = animal["description-espece-animale"];

    /* CAROUSEL */

    const track = document.getElementById("galleryTrack");

    // Position actuelle dans le carrousel
    let currentIndex = 0;

    // Vide le carrousel avant de le générer
    track.innerHTML = "";

    // Création dynamique des images du carrousel
    animal["carousel"].forEach(src => {

        const img = document.createElement("img");

        img.src = src;
        img.alt = animal["nom-espece-animale"];

        // Ouvre l'image en grand lors d'un clic
        img.addEventListener("click", () => {
            openLightbox(src);
        });

        track.appendChild(img);
    });

    // Déplace le carrousel vers l'image sélectionnée
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Bouton image suivante
    document.querySelector(".next").addEventListener("click", () => {

        currentIndex++;

        // Revient à la première image après la dernière
        if (currentIndex >= animal["carousel"].length) {
            currentIndex = 0;
        }

        updateCarousel();
    });

    // Bouton image précédente
    document.querySelector(".prev").addEventListener("click", () => {

        currentIndex--;

        // Revient à la dernière image avant la première
        if (currentIndex < 0) {
            currentIndex = animal["carousel"].length - 1;
        }

        updateCarousel();
    });

});


/* LIGHTBOX */

// Éléments de la fenêtre d'affichage agrandie
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

// Affiche l'image sélectionnée en grand format
function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.style.display = "flex";
}

// Ferme la lightbox et réinitialise l'image
function closeLightbox() {
    lightbox.style.display = "none";
    lightboxImg.src = "";
}

// Fermeture au clic sur la lightbox
lightbox.addEventListener("click", closeLightbox);

// Fermeture avec la touche Échap
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeLightbox();
    }
});