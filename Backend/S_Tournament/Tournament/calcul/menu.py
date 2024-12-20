from tournament import tournoi_suisse

nbr = input()
while nbr != '3' and nbr != '4' and nbr != '8':
    print("\n selectionner le bon nombre de player 3, 4 ou 8.")
    nbr = input()
if nbr == '8':
    #Player.players = [Player.Player(f"Jouer {i+1}") for i in range(8)]
    tournoi_suisse(8, 3)
elif nbr == '4':
   # Player.players = [Player.Player(f"Jouer {i+1}") for i in range(4)]
    tournoi_suisse(4, 2)
elif nbr == '3':
  #  Player.players = [Player.Player(f"Jouer {i+1}") for i in range(3)]
    tournoi_suisse(3, 2)
