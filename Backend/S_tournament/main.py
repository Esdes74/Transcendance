import as_3
import as_4
import as_8
import Player

nbr = input()
while nbr != '3' and nbr != '5' and nbr != '8':
    print("\n selectionner le bon nombre de player 3, 5 ou 8.")
    nbr = input()
if nbr == '8':
    Player.players = [Player.Player(f"Jouer {i+1}") for i in range(8)]
    as_8.as_8()
else if nbr == '5'
    Player.players = [Player.Player(f"Jouer {i+1}") for i in range(5)]
else if nbr == '3'
    Player.players = [Player.Player(f"Jouer {i+1}") for i in range(3)]