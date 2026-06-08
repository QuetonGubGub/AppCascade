// Variables
language = "francais"
page = "remerciements"

fetch("lang.json")
.then(res => res.json())
  .then(texte => {
    // Message d'erreur
    if (!texte || !texte[language]) {
        console.error("Langue invaldie / fichier de traduction invalide");
        return;
    }

    // Extraction du texte de la page nommé par la fonction page
    texte = texte[language].page;

    // On cherche dans tout les éléments qui ont un attibut appelé "contenuTxt"
    const elements = document.querySelectorAll("[contenuTxt]");
    elements.forEach(element => {
        const key = element.getAttribute("contenuTxt");
        // Pour chacun de ces éléments, on change son contenu texte 
        if (texteTraduit[key]) {
            element.textContent = texteTraduit[key];
        } else {
            console.log("Aucune traduction trouvée pour la clé :"+key);
        }
    });
});

// Code en partie genré par Mistral IA (autant être 100% honnête)