fetch("bibliotheque-sources.json")
.then(res => res.json())
  .then(data => {
    const params = new URLSearchParams(window.location.search);
    const famille = params.get("famille");
    const espece = params.get("nom");

    const animal = data[famille][espece];

    document.getElementById("image-espece-animale").src = animal["image-espece-animale"];
    document.getElementById("nom-espece-animale").textContent = animal["nom-espece-animale"];
    document.getElementById("description-espece-animale").textContent = animal["description-espece-animale"];
  });