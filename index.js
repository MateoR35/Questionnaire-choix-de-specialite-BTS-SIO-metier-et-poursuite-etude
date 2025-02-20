let slamCount = 0;
let sisrCount = 0;
const totalQuestions = 12;
let currentQuestion = 1;

function nextQuestion(questionNumber) {
    const answer = document.querySelector(`input[name="q${questionNumber}"]:checked`);
    if (!answer) {
        alert("Veuillez répondre à la question.");
        return;
    }

    // Update counters
    if (answer.value === 'slam') {
        slamCount++;
    } else if (answer.value === 'sisr') {
        sisrCount++;
    }

    // Update progress bars
    updateProgress();

    // Hide the current question
    document.getElementById(`question-${questionNumber}`).style.display = 'none';

    // Show next question or results
    if (currentQuestion < totalQuestions) {
        currentQuestion++;
        document.getElementById(`question-${currentQuestion}`).style.display = 'block';
    } else {
        showResults();
    }
};

function updateProgress() {
    const slamPercentage = (slamCount / totalQuestions) * 100;
    const sisrPercentage = (sisrCount / totalQuestions) * 100;

    // Update progress bars
    document.getElementById('progress-bar-slam').style.width = slamPercentage + '%';
    document.getElementById('progress-bar-slam').textContent = Math.round(slamPercentage) + '% SLAM';
    
    document.getElementById('progress-bar-sisr').style.width = sisrPercentage + '%';
    document.getElementById('progress-bar-sisr').textContent = Math.round(sisrPercentage) + '% SISR';
};

function showResults() {
    const slamPercentage = (slamCount / totalQuestions) * 100;
    const sisrPercentage = (sisrCount / totalQuestions) * 100;

    let resultText = 'Vous êtes plus orienté vers la spécialité : ';
    const resultElement = document.getElementById('results');

    if (slamPercentage > sisrPercentage) {
        resultText += '<span style="color: #f44336;">SLAM (Solutions Logicielles et Applications Métiers)</span>';
        
        // Masquer SISR et afficher SLAM dans la section des métiers
        document.querySelector('.metier .SISR').style.display = 'none';
        document.querySelector('.metier .SLAM').style.display = 'block';

        // Afficher les études SLAM
        document.querySelector('.etude .SISR').style.display = 'none';
        document.querySelector('.etude .SLAM').style.display = 'block';

    } else {
        resultText += '<span style="color: #2196F3;">SISR (Solutions Infrastructure, Systèmes et Réseaux)</span>';
        
        // Masquer SLAM et afficher SISR dans la section des métiers
        document.querySelector('.metier .SLAM').style.display = 'none';
        document.querySelector('.metier .SISR').style.display = 'block';

        // Afficher les études SISR
        document.querySelector('.etude .SLAM').style.display = 'none';
        document.querySelector('.etude .SISR').style.display = 'block';
    }

    resultElement.innerHTML = resultText;  // Utiliser innerHTML pour permettre l'utilisation de balises <span>
    resultElement.style.display = 'block';
};

// Initial setup
window.onload = function() {
    for (let i = 2; i <= totalQuestions; i++) {
        document.getElementById(`question-${i}`).style.display = 'none';
    }
};