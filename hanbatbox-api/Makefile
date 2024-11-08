all: build up

build:
	@./gradlew build

up:
	@docker-compose -f docker-compose.yml -p test up --build -d

down:
	@./gradlew clean
	@docker-compose -f docker-compose.yml -p test down

re: down all
