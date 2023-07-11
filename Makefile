games:
	./generate-positions.py write-games build/games.pgn

positions:
	./generate-positions.py write-positions build/games.pgn build/positions.json

undefended:
	./generate-positions.py undefended build/positions.json build/undefended.unpruned.json
	./generate-positions.py write-puzzles build/undefended.unpruned.json assets/puzzles/undefended.json

checks-captures:
	./generate-positions.py checks-captures build/positions.json build/checks-captures.unpruned.json
	./generate-positions.py write-puzzles build/checks-captures.unpruned.json assets/puzzles/checks-captures.json

knight-forkables:
	./generate-positions.py knight-forkables assets/puzzles/knight-forkables.json

all: games positions undefended checks-captures knight-forkables
