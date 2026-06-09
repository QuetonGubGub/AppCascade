// Gestion du quiz : questions, réponses et score
let indexQuestion = 0;
let scoreQuiz = 0;

// Éléments de l'interface
let numeroQuestion = document.querySelectorAll(".num-question");
let score = document.getElementById("score");
let question = document.getElementById("description-question");

// Boutons de réponses et association des événements de clic
let reponse1 = document.getElementById("rep-1");
reponse1.addEventListener("click", () => verifierReponse(1));

let reponse2 = document.getElementById("rep-2");
reponse2.addEventListener("click", () => verifierReponse(2));

let reponse3 = document.getElementById("rep-3");
reponse3.addEventListener("click", () => verifierReponse(3));

let reponse4 = document.getElementById("rep-4");
reponse4.addEventListener("click", () => verifierReponse(4));

// Tableau qui contiendra les questions du fichier JSON
let questions = [];

// Chargement des données du quiz
fetch("quizz.json")
    .then(response => response.json())
    .then(data => {
        questions = Object.values(data);

        // Affiche la première question
        afficherQuestion();
    })
    .catch(error => {
        console.error("Erreur lors du chargement du JSON :", error);
    });

// Affiche la question courante et ses réponses
function afficherQuestion() {

    let q = questions[indexQuestion];

    question.textContent = q.description;

    reponse1.textContent = q.reponse1;
    reponse2.textContent = q.reponse2;
    reponse3.textContent = q.reponse3;
    reponse4.textContent = q.reponse4;

    // Mise à jour du numéro de question affiché
    numeroQuestion.forEach(element => {
        element.textContent = indexQuestion + 1;
    });
}

function verifierReponse(numeroReponse) {

    let blockQuestion = document.getElementById("block-question");
    let q = questions[indexQuestion];

    const boutons = [
        reponse1,
        reponse2,
        reponse3,
        reponse4
    ];

    // Empêche plusieurs clics pendant la vérification
    boutons.forEach(btn => btn.disabled = true);

    // Met en évidence la bonne réponse et les mauvaises
    boutons.forEach((btn, index) => {

        const numeroBtn = index + 1;

        if (numeroBtn === q.reponseFinale) {
            btn.classList.add("bonne-reponse");
        } else {
            btn.classList.add("mauvaise-reponse");
        }
    });

    // Incrémente le score si la réponse choisie est correcte
    if (numeroReponse === q.reponseFinale) {
        scoreQuiz++;
        score.textContent = scoreQuiz;
    }
    
    // Attente avant de passer à la question suivante
    setTimeout(() => {

        // Réinitialisation de l'état des boutons
        boutons.forEach(btn => {
            btn.classList.remove("bonne-reponse");
            btn.classList.remove("mauvaise-reponse");
            btn.disabled = false;
        });

        indexQuestion++;

        if (indexQuestion < questions.length) {
            afficherQuestion();
        } else {
            // Fin du quiz
            blockQuestion.style.fontSize = "30px";
            blockQuestion.style.textAlign = "center";

            blockQuestion.innerHTML = `
                <h3>Quizz terminé !</h3>
                <button id="btn_continuer" class="btnCirclColor_grn nbShadow">
                    <a href="remerciements.html">CONTINUER</a>
                </button>
            `;
        }

    }, 1500);
}