const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch("bibliotheque-sources.json")
.then(res => res.json())
  .then(data => {

    const params = new URLSearchParams(window.location.search);
    const famille = params.get("id");

    const section = document.getElementById("section-especes");
    const template = document.getElementById("template-espece");

    const animaux = data[famille];

    for (let espece in animaux) {
      const animal = animaux[espece];

      const clone = template.cloneNode(true);
      clone.style.display = "block";
      clone.removeAttribute("id");

      clone.querySelector(".image-espece-animale").src = animal["image-espece-animale"];
      clone.querySelector(".nom-espece-animale").textContent = animal["nom-espece-animale"];
      clone.querySelector(".lien-espece-animale").href = `bibliotheque-animal.html?famille=${famille}&nom=${espece}`;

      section.appendChild(clone);
    }
    document.getElementById("nom-famille").textContent = famille;
  });