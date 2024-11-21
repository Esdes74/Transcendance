import random
import as_3
import as_4
import as_8
import Player




Player.players = [Player.Player(f"Jouer {i+1}") for i in range(8)]
#tournois de 3 round (8 joueurs)
as_8.as_8()


#final
Player.players.sort(key=lambda x : x.score, reverse = True)
print("\n===== Classement final======")
for Player.player in Player.players:
    print(Player.player)