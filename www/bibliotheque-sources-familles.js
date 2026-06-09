// Récupération des paramètres présents dans l'URL
const params = new URLSearchParams(window.location.search);

// Correspondance entre les identifiants des familles et leur nom affiché
const nomsFamilles = {
    mammifere: "Les mammifères",
    oiseau: "Les oiseaux"
};

// Chargement des données de la bibliothèque
fetch("bibliotheque-sources.json")
.then(res => res.json())
.then(data => {

    // Récupère la famille sélectionnée depuis l'URL
    const params = new URLSearchParams(window.location.search);
    const famille = params.get("id");

    // Éléments de la page qui accueilleront les espèces
    const section = document.getElementById("section-especes");

    // Liste des animaux appartenant à la famille choisie
    const animaux = data[famille];

    // Génération dynamique des cartes d'espèces
    for (let espece in animaux) {

        const animal = animaux[espece];

        section.innerHTML += `
            <a class="nbShadow libraryBtnSpecie"
               href="bibliotheque-animal.html?famille=${famille}&nom=${espece}"
               style="background-image: url(${animal["image-espece-animale"]})">

                <p class="nom-espece-animale">
                    ${animal["nom-espece-animale"]}
                </p>

            </a>
        `;
    }

    // Affichage du nom de la famille dans le titre de la page
    document.getElementById("nom-famille").textContent =
        nomsFamilles[famille] || famille;
});