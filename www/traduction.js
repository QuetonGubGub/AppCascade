siteLang = "english"

path = window.location.pathname;
pageActuelle = path.split("/").pop();

// Fonction pour transposer dynamiquement tous les champs du JSON
function transposeContent() {
    // Récupérer les données de la page actuelle dans la langue sélectionnée
    const pageData = lang[siteLang][pageActuelle];

    // Sélectionner tous les éléments avec l'attribut [contenuTxt]
    const elements = document.querySelectorAll('[contenuTxt]');

    // Mettre à jour chaque élément en fonction de son attribut contenuTxt
    elements.forEach(element => {
        const key = element.getAttribute('contenuTxt');
        if (pageData[key] !== undefined) {
            element.textContent = pageData[key];
        }
    });
}

// Appeler la fonction lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', transposeContent);