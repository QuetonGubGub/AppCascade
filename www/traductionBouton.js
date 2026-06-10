// Utilisation du bouton
function changeLang() {
    langue = localStorage.getItem("siteLang") || "francais"
    nouvelleLangue = ""

    switch (langue) {
    case "francais":
        nouvelleLangue = "english"
        break;
    case "english":
        nouvelleLangue = "español"
        break;
    case "español":
        nouvelleLangue = "italiano"
        break;
    case "italiano":
        nouvelleLangue = "francais"
        break;
    default:
        nouvelleLangue = "english"
    }

    localStorage.setItem("siteLang", nouvelleLangue);    // On change la langue dans Local Storage
    location.reload()                                    // On recharge la page
}

// Activation du bouton (ne marche pas)
function showLang(actif = false) {
    console.log("Touché")

    // On récupère les informations du bouton
    bouton = document.getElementById("btnLang")

    // On change le bouton
    if (!actif) {
        console.log("Bouton activé")

        // Création du menu
        bouton.insertAdjacentHTML("afterend", '<div class="nbShadow" id="btnLangSelector"> <button class="btnLangSub" onclick="changeLang(0)">FR</button> <button class="btnLangSub" onclick="changeLang(1)">EN</button>  <button class="btnLangSub" onclick="changeLang(2)">ES</button> <button class="btnLangSub" onclick="changeLang(3)">IT</button> </div>')
        
        // Modification du bouton
        bouton.setAttribute("onclick", "showLang(true)")
        bouton.setAttribute("class", "")

    } else {
        console.log("Bouton désactivé")

        // Suppression du menu
        menu = document.getElementById("btnLangSelector")
        menu.outerHTML = ""

        // Modification du bouton
        bouton.setAttribute("onclick", "showLang()")
        bouton.setAttribute("class", "nbShadow")
    }
}