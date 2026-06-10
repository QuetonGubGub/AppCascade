// Changement de la langue
function changeLang(l = 1) {
    // Chaque langue a un chiffre de 0 à 3 (Francais, Anglais, Italien, Espagnol)
    // On fait joujou avec le Local Storage pour changer la langue actuelle
    // On recharge la page (si c'est possible)
}

// Activation du bouton
function showLang(actif = false) {
    console.log("Touché")

    // On récupère les informations du bouton
    bouton = document.getElementById("btnLang")

    // On change le bouton
    if (!actif) {
        console.log("Bouton activé")

        // Création du menu
        bouton.insertAdjacentHTML("afterend", '<div class="nbShadow" id="btnLangSelector"> <button class="btnLangSub" onclick="changeLang(0)">FR</button> <button class="btnLangSub" onclick="changeLang(1)">EN</button> <button class="btnLangSub" onclick="changeLang(1)">IT</button> <button class="btnLangSub" onclick="changeLang(3)">ES</button></div>')
        
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

console.log("Script importé")