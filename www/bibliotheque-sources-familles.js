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

    section.innerHTML += `
    <div class="nbShadow libraryBtnSpecie">
        <a class="lien-espece-animale"
           href="bibliotheque-animal.html?famille=${famille}&nom=${espece}">

            <img class="image-espece-animale"
                 src="${animal["image-espece-animale"]}">

            <p class="nom-espece-animale">
                ${animal["nom-espece-animale"]}
            </p>

        </a>
    </div>
    `;
}
    document.getElementById("nom-famille").textContent = famille;
  });