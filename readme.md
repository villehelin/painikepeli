## Multiplayer Button Game Rules

The objective of this game is to press a button to win points. Pressing the button costs one point, and players start with 20 points. The button can only be pressed if the player's point balance is positive. When the button is pressed, the player may win prizes based on certain milestones.

Prizes:

    5 points every 10 presses
    40 points every 100 presses
    250 points every 500 presses

Players can win a maximum of one prize with each press. If a press qualifies for multiple prizes, the player receives the highest one.

Gameplay:

    Pressing the button deducts one point from the player.
    The counter increases by one.
    If the counter matches a prize milestone, the player is notified and the prize is added to their balance.
    Players are shown the number of presses required for the next prize.

Player's point balance is displayed.
The game state is preserved even if the browser (if a web application) or the app (if a mobile application) is restarted.
If the player's point balance reaches 0, they are given the option to start over, resetting their balance to 20 points.

This is a full stack application containing frontend made with vue and backend made with nodejs and socketio.

## How to run the application

First `git clone` the repository and run these commands in separete command lines

```
cd frontend && npm install && npm run start
```

```
cd backend && npm install && npm run start
```

Now you can play the game on `localhost:5173` you can open this address on different tabs and browsers to test the application

## Rules in Finnish

Tavoitteena on toteuttaa yksinkertainen moninpeli, jota pelataan painamalla painiketta. Painikkeen painaminen maksaa yhden pisteen, joita pelaajalla on lähtötilanteessa 20. Painiketta voi painaa vain, jos pelaajan pistesaldo on positiivinen. Pelaajan painettua painiketta hänelle ilmoitetaan mahdollisesta voitosta.

Pelaaja voittaa

● 5 pistettä joka 10. painallus

● 40 pistettä joka 100. painallus

● 250 pistettä joka 500. painallus.

Pelaaja voi voittaa enimmillään yhden palkinnon yhdellä painalluksella. Mikäli samalla painalluksella voittaisi yllä olevan listan mukaan monta palkintoa, voittaa pelaaja näistä suurimman. Painiketta painaessa pelaaja ei tiedä, mikä laskurin nykyinen arvo on, sillä kaikki pelaajat kasvattavat saman laskurin arvoa.

Kun pelaaja painaa painiketta, tapahtuu seuraavat asiat:

    Pelaajalta vähennetään yksi piste.
    Laskurin arvo kasvaa yhdellä.
    Mikäli laskurin arvolle osuu palkinto (esim. laskurin arvolla 500 voittaa 250 pistettä), ilmoitetaan tästä pelaajalle ja lisätään voitto pelaajan pistesaldoon.
    Pelaajalle näytetään vaadittujen painallusten määrä seuraavaan voittavaan arvoon.

Pelin käyttöliittymässä tulee näkyä pelaajan pistesaldo. Pelitilanteen tulee säilyä, vaikka selaimen (mikäli selainsovellus) tai sovelluksen (mikäli mobiilisovellus) käynnistää uudelleen. Mikäli pelaajan pistesaldo on 0, tarjotaan pelaajalle mahdollisuus aloittaa alusta, jolloin hänen pistesaldonsa palautetaan jälleen arvoon 20.

Sovellus koostuu kahdesta osasta: käyttöliittymästä ja palvelimesta.