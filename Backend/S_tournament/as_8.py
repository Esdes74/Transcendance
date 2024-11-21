import Player
import random

def play_game(player1, player2):
    winners = random.choice([player1, player2])
    winners.score += 1
    return winners
#initialisation des joueurs



def appariement(round, player):
    player.sort(key=lambda x: x.score, reverse=True) #tri des joueurs par score decroissants.
    matches = []
    i = 0
    while i < len(player) - 1:
        j = i + 1
        while j < len(player):
            player1 = player[i]
            player2 = player[j]
            if player2.name not in player1.name:
                matches.append((player1, player2))
                player1.add_opponents(player2.name)
                i += 1
                break
            j += 1
        i += 1
    return matches

def as_8():
    for round in range(3) :
        print(f"\n=== Round {round + 1} ===")
        matches = appariement(round, Player.players)
        for Player.player1, Player.player2 in matches:
            Player.winners = play_game(Player.player1, Player.player2)
            print(f"Match: {Player.player1.name} vs {Player.player2.name} - gagnant: {Player.winners}")
        print("\nScores:")
        for Player.player in Player.players:
            print(Player.player)