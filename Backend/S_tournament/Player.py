class Player:
    def __init__(self, name):
        self.name = name
        self.score = 0
        self.opponents = set()

    def add_opponents(self, opponents):
        self.opponents.add(opponents)
    
    def __repr__(self):
        return f"{self.name} (Score:{self.score})"
