fetch("point-interet.json")
.then(res => res.json())
.then(data => {

    const params = new URLSearchParams(window.location.search);
    const nomPoint = params.get("nom");

    const nom = data[nomPoint];

    document.getElementById("nom-interet").textContent = nom["nom"];
    document.getElementById("image-interet").src = nom["image"];
    document.getElementById("description-interet").textContent = nom["description-1"];
    document.getElementById("description-interet").textContent += nom["description-2"];
    document.getElementById("description-interet").textContent += nom["description-3"];
    document.getElementById("prochain-point").textContent = nom["prochain"];
    document.getElementById("lien-video").href = nom["video"];
    document.getElementById("lien-point").href = nom["retour"];

    /*Cacher le bouton vidéo si src = "#"*/
    const lienVideo = document.getElementById("plus");
    const video = nom["video"];

    if (video === "#") {
        lienVideo.style.display = "none";
    } else {
        lienVideo.href = video;
        lienVideo.style.display = "";
    }
});
