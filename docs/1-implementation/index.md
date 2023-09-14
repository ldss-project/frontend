---
title: Implementazione
layout: default
nav_order: 3
---

# Implementazione
{: .no_toc}

In questo capitolo si descriverà l'implementazione di questo servizio, basata sul
framework [Vue3](https://vuejs.org/) + [Typescript](https://www.typescriptlang.org/).

## Contenuti
{: .no_toc}

- TOC
{:toc}

---

## Moduli

Per la realizzazione di questo servizio, si è deciso di suddividere l'implementazione
in moduli, descritti dal seguente diagramma.

![Frontend Modules](/frontend/resources/images/implementation/frontend-modules.png)

Come mostrato dal diagramma, nell'applicazione sono presenti quattro moduli principali:
- **Logic**: gestisce la logica dell'applicazione. In particolare, si compone di due sotto-moduli:
  - **Utility**: contiene un insieme di estensioni funzionali utilizzate all'interno dell'applicazione
    per migliorare la qualità del codice e facilitare lo sviluppo dell'applicazione.
  - **Proxies**: gestisce l'interazione con i diversi servizi da cui il **Frontend** dipende.
- **Router**: gestisce la navigazione tra le schermate dell'applicazione. In particolare,
  utilizza la **View** per mostrare le schermate, mentre è utilizzato dalla **View** stessa
  per navigare nell'applicazione.
- **Assets**: contiene le risorse utilizzate per configurare la presentazione della **View**.
- **View**: gestisce la presentazione grafica dell'applicazione. In particolare, si
  compone di due sotto-moduli principali:
  - **Pages**: gestisce la modellazione delle schermate dell'applicazione.
  - **Components**: gestisce la modellazione dei componenti grafici utilizzati dalle
    schermate dell'applicazione.

### Logic

Di seguito si presenteranno i sotto-moduli di cui è composto il modulo **Logic**.

#### Utility

Il modulo **Utility** definisce diverse classi e funzioni di utilità utilizzate
nell'implementazione del servizio. In particolare, definisce le seguenti estensioni:
- `array-extension`: fornisce alcune funzioni per la gestione di array;
- `chart-extension`: fornisce alcune funzioni per la gestione di grafici con [Chart JS](https://www.chartjs.org/);
- `form-extension`: fornisce alcune funzioni per la verifica dei campi dei form dell'applicazione;
- `lazy-extension`: fornisce una classe di utilità, detta `Lazy`, che modella una variabile il cui valore viene
  valutato al suo primo utilizzo dopo la sua dichiarazione;
- `number-extension`: fornisce delle funzioni per la valutazione di alcune proprietà dei numeri;
- `option-extension`: fornisce una classe di utilità, detta `Option`, che modella una variabile il cui valore
  potrebbe non esistere;
- `try-extension`: fornisce una classe di utilità, detta `Try`, che modella una computazione che potrebbe fallire;
- `vue-extension`: fornisce delle funzioni di utilità per estendere [Vue3](https://vuejs.org/);
- `websocket-extension`: fornisce una classe di utilità, detta `Websocket`, che modella una connessione Websocket
  configurabile in modo fluente.

#### Proxies

Il modulo **Proxies** definisce gli _Anti-Corruption Layer_ che sono utilizzati dal **Frontend** per comunicare
con i servizi da cui dipende.

In particolare, al suo interno sono definite le seguenti classi:
- `AuthenticationProxy`: gestisce la comunicazione con
  l'[authentication-service](https://github.com/ldss-project/authentication-service), esponendo il suo
  contratto all'interno dell'applicazione. In particolare, gestisce la registrazione e l'autenticazione
  di un utente nell'applicazione, il reperimento e l'aggiornamento del suo profilo e la gestione della
  sua sessione.

  Per implementare l'`AuthenticationProxy`, è stato necessario rimodellare il dominio
  dell'[authentication-service](https://github.com/ldss-project/authentication-service) dal punto
  di vista del **Frontend**.
- `StatisticsProxy`: gestisce la comunicazione con lo
  [statistics-service](https://github.com/ldss-project/statistics-service), esponendo il suo contratto
  all'interno dell'applicazione. In particolare, gestisce l'ottenimento delle statistiche di un giocatore
  e della classifica globale dei giocatori.

  Per implementare lo `StatisticsProxy`, è stato necessario rimodellare il dominio
  dello [statistics-service](https://github.com/ldss-project/statistics-service) dal punto
  di vista del **Frontend**.
- `ChessGameProxy`: gestisce la comunicazione con il
  [chess-game-service](https://github.com/ldss-project/chess-game-service), esponendo il suo contratto
  _REST_ all'interno dell'applicazione. In particolare, gestisce la creazione e la partecipazione alle
  partite dell'applicazione.

  Durante la partecipazione a una partita, il `ChessGameProxy` genera una `PlayerConnection`, espone il
  contratto _WebSocket_ del [chess-game-service](https://github.com/ldss-project/chess-game-service),
  permettendo l'interazione di un giocatore con una specifica partita di scacchi. Inoltre, una
  `PlayerConnection` può essere configurata per specificare un comportamento da eseguire alla ricezione
  degli eventi del [chess-game-service](https://github.com/ldss-project/chess-game-service).

  Per implementare il `ChessGameProxy`, è stato necessario rimodellare il dominio
  del [chess-game-service](https://github.com/ldss-project/chess-game-service) dal punto
  di vista del **Frontend**. In particolare, lo stato di una partita come inteso dal
  [chess-game-service](https://github.com/ldss-project/chess-game-service), modellato dalla classe
  `ChessGameServer`, è stato arricchito attraverso la classe `RelativeChessGameServer`, che
  permette di accedere allo stato della partita osservandolo dal punto di vista di uno specifico
  giocatore.

### Router

Il modulo **Router** definisce le rotte a cui è possibile accedere all'interno dell'applicazione, ovvero:
- `/`: reindirizza alla **Homepage**;
- `/log-in`: reindirizza alla **Log-in Page**;
- `/log-out`: reindirizza alla **Log-out Page**;
- `/sign-in`: reindirizza alla **Sign-in Page**;
- `/create-game`: reindirizza alla **Create Game Page**;
- `/join-game`: reindirizza alla **Join Game Page**;
- `/game`: reindirizza alla **Game Page**;
- `/profile/:username`: reindirizza alla **Profile Page** relativa a uno specifico utente;
- `/statistics/:username`: reindirizza alla **Statistics Page** relativa a uno specifico utente;
- `/leaderboard`: reindirizza alla **Leaderboard Page**;
- `/:pathMatch(.*)*`: rappresenta una qualsiasi altra rotta e reindirizza a una pagina di errore di risorsa
  non trovata (errore 404).

### Assets

Il modulo **Assets** definisce la configurazione globale della presentazione della **View**.

Tale configurazione è stata suddivisa in tre file:
- `classes.scss`: definisce alcune classi css globali utilizzate;
- `variables.scss`: definisce alcune variabili scss globali;
- `piece-image.ts`: definisce un'enumerazione per mappare i pezzi degli scacchi alle loro rispettive immagini,
  determinando la presentazione della scacchiera.

### View

Il modulo **View** gestisce la presentazione grafica dell'applicazione.

Di seguito, si riporta il diagramma del modulo, comprendendo i due sotto-moduli **Pages** e
**Components** e le loro interazioni con il modulo **Proxies**.

![View Module Class Diagram](/frontend/resources/images/implementation/frontend-view.png)

#### Homepage

![Homepage Screenshot](/frontend/resources/images/screenshots/homepage-screenshot.png)

#### Log-in Page

![Login Screenshot](/frontend/resources/images/screenshots/login-screenshot.png)
![Login Error Screenshot](/frontend/resources/images/screenshots/login-error-screenshot.png)

#### Sign-in Page

![Signin Screenshot](/frontend/resources/images/screenshots/signin-screenshot.png)

#### Profile Page

![Profile Screenshot](/frontend/resources/images/screenshots/profile-screenshot.png)

#### Create Game Page

![Create Game Screenshot](/frontend/resources/images/screenshots/create-game-screenshot.png)

#### Join Game Page

![Join Game Screenshot](/frontend/resources/images/screenshots/join-game-screenshot.png)

#### Game Page

##### Waiting for Players
{: .no_toc}

![Game Waiting For Players Screenshot](/frontend/resources/images/screenshots/game-waiting-for-players-screenshot.png)

##### Running
{: .no_toc}

![Game Running Screenshot](/frontend/resources/images/screenshots/game-running-screenshot-1.png)
![Game Running Some Moves Screenshot](/frontend/resources/images/screenshots/game-running-screenshot-2.png)
![Game Error Screenshot](/frontend/resources/images/screenshots/game-error-screenshot.png)

##### Promotion
{: .no_toc}

![Game Promotion Screenshot](/frontend/resources/images/screenshots/game-promotion-screenshot.png)

##### Terminated
{: .no_toc}

![Game Over Screenshot](/frontend/resources/images/screenshots/game-terminated-screenshot.png)

#### Leaderboard Page

![Leaderboard Screenshot](/frontend/resources/images/screenshots/leaderboard-screenshot.png)

#### Statistics Page

![Statistics Screenshot](/frontend/resources/images/screenshots/statistics-screenshot.png)

---

[Back to Top](#top) |
[Previous Chapter](/frontend/0-mockup) |
[Next Chapter](/frontend/2-testing)