import random

def tournoi_suisse(n, rondes):
    # Initialisation des joueurs et scores
    joueurs = [f"Joueur {i+1}" for i in range(n)]
    scores = {joueur: 0 for joueur in joueurs}
    matchs_joués = {joueur: [] for joueur in joueurs}

    def jouer_match(joueur1, joueur2):
        """Simule un match entre deux joueurs et retourne le gagnant."""
        gagnant = random.choice([joueur1, joueur2])
        scores[gagnant] += 1
        matchs_joués[joueur1].append(joueur2)
        matchs_joués[joueur2].append(joueur1)
        print(f"Match : {joueur1} vs {joueur2} | Gagnant : {gagnant}")

    for ronde in range(1, rondes + 1):
        print(f"\n--- Ronde {ronde} ---")
        # Trier les joueurs par score
        joueurs_tries = sorted(joueurs, key=lambda x: scores[x], reverse=True)

        # Pairer les joueurs
        pairs = []
        joueurs_restants = joueurs_tries[:]
        while joueurs_restants:
            joueur1 = joueurs_restants.pop(0)
            for joueur2 in joueurs_restants:
                if joueur2 not in matchs_joués[joueur1]:
                    pairs.append((joueur1, joueur2))
                    joueurs_restants.remove(joueur2)
                    break

        # Jouer les matchs de la ronde
        for joueur1, joueur2 in pairs:
            jouer_match(joueur1, joueur2)

    # Afficher les scores finaux
    print("\n--- Résultats finaux ---")
    classement = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    for place, (joueur, score) in enumerate(classement, 1):
        print(f"{place}. {joueur} - {score} points")