const tournamentTree = document.getElementById('tournament-tree');

// Exemple de données des matchs
const rounds = [
    ["Joueur 1 vs Joueur 2", "Joueur 3 vs Joueur 4"],
    ["Gagnant 1 vs Gagnant 2"],
    ["Finale"]
];

const petiteFinale = ["Perdant 1 vs Perdant 2"];

// Génère l'arborescence
function generateTournament(rounds, petiteFinale) {
    rounds.forEach((matches, roundIndex) => {
        const roundDiv = document.createElement('div');
        roundDiv.classList.add('round');

        matches.forEach((match, matchIndex) => {
            const matchDiv = document.createElement('div');
            matchDiv.classList.add('match');
            matchDiv.innerText = match;

            // Ajoute des connecteurs pour les matchs
            if (roundIndex > 0) {
                const connector = document.createElement('div');
                connector.classList.add('connector');
                matchDiv.appendChild(connector);

                if (matchIndex % 2 === 0) {
                    const verticalConnector = document.createElement('div');
                    verticalConnector.classList.add('connector-vertical');
                    matchDiv.appendChild(verticalConnector);
                }
            }

            roundDiv.appendChild(matchDiv);
        });

        tournamentTree.appendChild(roundDiv);
    });

    // Ajoute la petite finale
    const petiteFinaleDiv = document.createElement('div');
    petiteFinaleDiv.classList.add('round');
    petiteFinale.forEach(match => {
        const matchDiv = document.createElement('div');
        matchDiv.classList.add('match');
        matchDiv.innerText = match;
        petiteFinaleDiv.appendChild(matchDiv);
    });
    tournamentTree.appendChild(petiteFinaleDiv);
}

// Lance la génération
generateTournament(rounds, petiteFinale);