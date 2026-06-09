// Intégration du contenu (texte et image) selon le point d'intérêt sélectionné
fetch("point-interet.json")
.then(res => res.json())
.then(data => {

    // Récupère le nom du point d'intérêt passé dans l'URL
    const params = new URLSearchParams(window.location.search);
    const nomPoint = params.get("nom");

    // Actions possibles pour le bouton de retour
    const actions = {
        home: () => window.location.href = "accueil.html",
        back: () => history.back()
    };

    // Récupère les données correspondant au point d'intérêt demandé
    const nom = data[nomPoint];

    // Remplit les différents éléments de la page
    document.getElementById("nom-interet").textContent = nom["nom"];
    document.getElementById("image-interet").src = nom["image"];

    document.getElementById("description-interet").textContent = nom["description-1"];
    document.getElementById("description-interet").textContent += nom["description-2"];
    document.getElementById("description-interet").textContent += nom["description-3"];

    document.getElementById("prochain-point").textContent = nom["prochain"];
    document.getElementById("lien-video").href = nom["video"];

    // Définit le comportement du bouton retour
    document.getElementById("lien-point").onclick = actions[nom.retour];

    // Cache le bouton vidéo si aucune vidéo n'est disponible
    const lienVideo = document.getElementById("lien-video");
    const video = nom["video"];

    if (video === "#") {
        lienVideo.style.display = "none";
    } else {
        lienVideo.href = video;
        lienVideo.style.display = "";
    }
});