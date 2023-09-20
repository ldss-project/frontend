---
title: Implementazione
layout: default
nav_order: 3
---

# Implementazione
{: .no_toc}

In questo capitolo si descriverà l'implementazione di questo servizio, ovvero una
_Single Page Application_ basata sul framework [Vue3](https://vuejs.org/) +
[Typescript](https://www.typescriptlang.org/).

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
- `websocket-extension`: fornisce una classe di utilità, detta `WebSocketClient`, che modella una connessione 
  Websocket configurabile in modo fluente.

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

  Durante la partecipazione a una partita, il `ChessGameProxy` genera una `PlayerConnection` che espone il
  contratto _WebSocket_ del [chess-game-service](https://github.com/ldss-project/chess-game-service),
  permettendo l'interazione di un giocatore con quella specifica partita di scacchi. Inoltre, una
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
- `classes.scss`: definisce alcune classi css globali;
- `variables.scss`: definisce alcune variabili scss globali;
- `piece-image.ts`: definisce un'enumerazione per mappare i pezzi degli scacchi alle loro rispettive immagini,
  determinando la presentazione della scacchiera.

### View

Il modulo **View** gestisce la presentazione grafica dell'applicazione.

Di seguito, si riporta il diagramma del modulo, inclusi i due sotto-moduli **Pages** e
**Components** e le loro interazioni con il modulo **Proxies**.

![View Module Class Diagram](/frontend/resources/images/implementation/frontend-view.png)

Come mostrato in figura, l'entrypoint dell'interfaccia grafica è la `App`, che agisce da
scheletro dell'interfaccia, mostrando tutti gli elementi grafici comuni alle schermate
dell'applicazione (ad esempio, la barra di navigazione) e renderizzando tali schermate sulla
base della rotta in cui si trova l'utente. Inoltre, la
`App` crea le istanze dei proxy che saranno utilizzati dal servizio, fornendole ai diversi
componenti dell'applicazione tramite un meccanismo di _dependency injection_.

In maggior dettaglio, i componenti vue realizzati per le schermate dell'applicazione sono i seguenti:
- `HomePage`: implementa il mockup della [Homepage](/frontend/0-mockup#homepage);
- `LogInPage`: implementa il mockup della [Log-in Page](/frontend/0-mockup#log-in-page);
- `LogOutPage`: una schermata fittizia utilizzata per revocare l'autenticazione dell'utente;
- `SignInPage`: implementa il mockup della [Sign-in Page](/frontend/0-mockup#sign-in-page);
- `ProfilePage`: implementa il mockup della [Profile Page](/frontend/0-mockup#profile-page);
- `CreateGamePage`: implementa il mockup della [Create Game Page](/frontend/0-mockup#create-game-page);
- `JoinGamePage`: implementa il mockup della [Join Game Page](/frontend/0-mockup#join-game-page);
- `GamePage`: implementa il mockup della [Game Page](/frontend/0-mockup#game-page);
- `StatisticsPage`: implementa il mockup della [Statistics Page](/frontend/0-mockup#statistics-page);
- `LeaderboardPage`: implementa il mockup della [Leaderboard Page](/frontend/0-mockup#leaderboard-page);
- `NotFoundPage`: una schermata di errore utilizzata per notificare all'utente che la rotta da lui
  indicata non è implementata dall'applicazione.

Di seguito, si scenderà nel dettaglio dell'implementazione di tali componenti e dei
loro sotto-componenti.

#### HomePage

La `HomePage` è il componente vue che implementa la schermata principale dell'applicazione.

La rappresentazione grafica della `HomePage` per un utente non autenticato è mostrata dal
seguente screenshot.

![Homepage Screenshot](/frontend/resources/images/screenshots/homepage-screenshot.png)

Come mostrato in figura, la schermata è divisibile in due aree: la prima è occupata dalla
barra di navigazione verticale a sinistra, modellata dal `NavBarComponent`; la seconda è
occupata dal corpo della schermata, in questo caso modellata dalla `HomePage`.

Questa organizzazione è ripetuta per tutte le schermate dell'applicazione. Infatti, è
definita all'interno del componente vue `App` citato precedentemente.

All'apertura dell'applicazione, il componente vue `App` viene caricato sull'interfaccia
dell'applicazione, creando i proxy utilizzati all'interno dell'applicazione per
comunicare con i servizi da cui dipende, inizializzando il `NavBarComponent` e caricando
la `HomePage` come corpo della prima schermata da mostrare.

Il `NavBarComponent` consiste in una barra verticale contenente una serie di pulsanti che
permettono all'utente di navigare le diverse rotte definite dall'applicazione. 

I pulsanti dell'applicazione sono modellati dal componente vue `ButtonComponent`, che permette di
specificare il contenuto del pulsante alla creazione. In particolare, i pulsanti utilizzati
dal `NavBarComponent` sono dei `ButtonLinkComponent`, ovvero un tipo di `ButtonComponent` che
permette di specificare una rotta a cui l'utente sarà reindirizzato quando il pulsante è
premuto. 

> **Nota**: il meccanismo di estensione dei componenti vue è stato realizzato tramite composizione.

Quando l'utente è reindirizzato verso una specifica rotta dell'applicazione, la `App`
carica il componente corrispondente a tale rotta (specificato all'interno del modulo **Router**)
come corpo della schermata da visualizzare.

Alla creazione, il `NavBarComponent` specifica una dipendenza con l'`AuthenticationProxy`, che utilizza
per reagire all'autenticazione o alla revoca di autenticazione dell'utente, mostrando gli opportuni pulsanti
di navigazione, come indicato dai mockup dell'applicazione. Di seguito, si riporta la rappresentazione grafica
della `HomePage` per un utente autenticato, per mostrare come cambia la barra di navigazione dallo screenshot
precedente.

![Homepage Authenticated Screenshot](/frontend/resources/images/screenshots/homepage-authenticated-screenshot.png)

La `HomePage` contiene i due `ButtonLinkComponent` **Create Game** e **Join Game**, che reindirizzano l'utente
verso la `CreateGamePage` e la `JoinGamePage` rispettivamente, come da mockup.

#### LogInPage

La `LogInPage` è il componente vue che implementa la schermata relativa all'autenticazione
dell'utente nell'applicazione.

La rappresentazione grafica della `LogInPage` per un utente non autenticato è mostrata dal
seguente screenshot. Per un utente autenticato non è possibile accedere alla schermata, in
quanto sarebbe automaticamente reindirizzato alla `HomePage` dell'applicazione.

![Login Screenshot](/frontend/resources/images/screenshots/login-screenshot.png)

La `LogInPage` contiene il form che accetta le credenziali dell'utente per autenticarlo
all'applicazione, modellato dal componente `FormComponent`. 

Il form permette all'utente di specificare il proprio nome e la propria password,
i cui formati sono verificati attraverso la `form-extension` del modulo **Utility**.
Inoltre, il form contiene due pulsanti:
- **Sign In**: è un `ButtonLinkComponent` che reindirizza verso la `SignInPage`;
- **Log In**: è un `ButtonComponent` che autentica l'utente quando premuto, se il form è
  stato compilato correttamente.

L'autenticazione è delegata all'`AuthenticationProxy` dell'applicazione, accessibile
tramite _dependency injection_. In particolare, alla richiesta di autenticazione,
l'`AuthenticationProxy` inoltra la richiesta verso
l'[authentication-service](https://github.com/ldss-project/authentication-service), che
risponde con le informazioni relative alla nuova sessione dell'utente, in caso di successo.
Quindi, l'`AuthenticationProxy` memorizza ed espone tali informazioni attraverso il proprio
`AuthenticationSessionManager`, che gestisce la sessione attuale dell'utente nell'applicazione
mediante i cookie.

Eventuali errori di compilazione del form vengono mostrati all'utente ad ogni tentativo di
autenticazione, come mostrato dal seguente screenshot. I messaggi di errore nell'applicazione
sono modellati dal componente vue `ErrorText`.

![Login Error Screenshot](/frontend/resources/images/screenshots/login-error-screenshot.png)

Dopo l'autenticazione, l'utente viene reindirizzato automaticamente alla `HomePage`, dove potrà
revocare la propria autenticazione attraverso il pulsante **Logout**, che reindirizzerà l'utente
verso la schermata `LogOutPage`. La `LogOutPage` è una schermata fittizia che, quando caricata,
revoca l'autenticazione dell'utente mediante l'`AuthenticationProxy`, reindirizzandolo successivamente
verso la `HomePage`.

#### SignInPage

La `SignInPage` è il componente vue che implementa la schermata relativa alla registrazione
dell'utente nell'applicazione.

La rappresentazione grafica della `SignInPage` per un utente non autenticato è mostrata dal
seguente screenshot. Analogamente alla `LogInPage`, per un utente autenticato non è possibile
accedere alla schermata, in quanto sarebbe automaticamente reindirizzato alla `HomePage`
dell'applicazione.

![Signin Screenshot](/frontend/resources/images/screenshots/signin-screenshot.png)

La `SignInPage` contiene un `FormComponent` che accetta le informazioni dell'utente per
registrarlo all'applicazione.

Il comportamento della schermata è del tutto simile a quello della `LogInPage`, ad eccezione
dei campi che possono essere compilati dall'utente, dei controlli sui formati di tali campi e
del pulsante di invio del form, che in questo caso prende il nome di **Sign In**.

Anche la delegazione della registrazione all'`AuthenticationProxy` si svolge in maniera
analoga a quella dell'autenticazione, producendo di fatto gli stessi effetti.

Dopo la registrazione, l'utente risulterà autenticato e verrà reindirizzato automaticamente
alla `HomePage`.

#### ProfilePage

La `ProfilePage` è il componente vue che implementa la schermata relativa alla visualizzazione
del profilo di un utente specifico.

La rappresentazione grafica della `ProfilePage` per un utente autenticato è mostrata dal seguente
screenshot. Per un utente non autenticato non è possibile accedere alla schermata, in quanto
è necessario essere autenticati come l'utente di cui si vuole visualizzare il profilo,
altrimenti si è reindirizzati verso la `HomePage`.

![Profile Screenshot](/frontend/resources/images/screenshots/profile-screenshot.png)

Inizialmente, la `ProfilePage` contiene un `FormComponent` che mostra le informazioni
dell'utente conosciute dall'applicazione, senza permettergli di modificarle. Tali
informazioni includono il nome e la email che l'utente ha specificato in fase di
registrazione, oltre che un campo fittizio rappresentante un placeholder per la password.

Alla pressione del `ButtonComponent` **pen-icon** a lato del placeholder per la password,
il `FormComponent` viene esteso con nuovi campi che permettono all'utente di aggiornare
la propria password, ovvero **New Password** e **Confirm New Password**. Cliccando nuovamente la
**pen-icon**, il `FormComponent` tornerà nello stato iniziale.

Una volta compilato il form per aggiornare la password, è possibile premere il pulsante
**Update** del form esteso per confermare l'operazione. In tal caso, l'aggiornamento della
password viene delegato all'`AuthenticationProxy`, accessibile sempre per _dependency injection_,
il quale inoltra la richiesta all'[authentication-service](https://github.com/ldss-project/authentication-service).

Eventuali errori di compilazione del form vengono mostrati all'utente ad ogni tentativo di
modifica della password.

#### CreateGamePage

La `CreateGamePage` è il componente vue che implementa la schermata relativa alla configurazione
e creazione di una partita di scacchi.

La rappresentazione grafica della `CreateGamePage` è mostrata dal seguente screenshot.

![Create Game Screenshot](/frontend/resources/images/screenshots/create-game-screenshot.png)

La `CreateGamePage` contiene un `FormComponent` che permette all'utente di configurare
una partita di scacchi, specificandone eventuali vincoli di tempo e la durata di tali
vincoli. Inoltre, permette di indicare se la partita è pubblica o privata attraverso
l'opportuna checkbox. In questo secondo caso, il `FormComponent` viene esteso con un
nuovo campo che permette di specificare anche l'identificatore della partita. 

Una volta completata la compilazione del form, l'utente può premere il `ButtonComponent`
**Create Game** per creare una partita con la configurazione da lui specificata.

La creazione della partita è delegata al `ChessGameProxy`, accessibile tramite _dependency
injection_. In particolare, alla richiesta di creazione di una partita, il `ChessGameProxy`
inoltra la richiesta verso il [chess-game-service](https://github.com/ldss-project/chess-game-service),
che risponde con l'URL per connettersi a tale partita, in caso di successo.
Quindi, il `ChessGameProxy` crea una connessione Websocket verso l'URL ricevuto, esponendola
all'interno dell'applicazione attraverso una `PlayerConnection`, che gestisce la comunicazione tra il
giocatore e il server di gioco a cui è connesso.

Dopo la connessione con il server di gioco, la `CreateGamePage` invia al server
una richiesta di partecipazione alla partita come giocatore della squadra bianca. Come
conseguenza di ciò, i giocatori che ospitano le partite di scacchi appartengono sempre
alla squadra bianca.

Per determinare il nome del giocatore in tale richiesta di partecipazione, la `CreateGamePage`
fa affidamento all'`AuthenticationProxy`, accessibile tramite _dependency injection_, per 
riconoscere se l'utente è autenticato all'applicazione. In tal caso, specifica lo username
dell'utente autenticato come il nome del giocatore partecipante alla partita, altrimenti
utilizza un nome placeholder.

Al completamento con successo del processo di creazione e di partecipazione alla partita di scacchi,
la `CreateGamePage` reindirizza l'utente automaticamente alla `GamePage`. 

Eventuali errori di compilazione del form di configurazione, vengono mostrati all'utente ad ogni
tentativo di creazione di una partita.

#### JoinGamePage

La `JoinGamePage` è il componente vue che implementa la schermata relativa alla partecipazione
a una partita di scacchi.

La rappresentazione grafica della `JoinGamePage` è mostrata dal seguente screenshot.

![Join Game Screenshot](/frontend/resources/images/screenshots/join-game-screenshot.png)

La `JoinGamePage` contiene due `ButtonComponent` attraverso i quali è possibile partecipare a una
partita di scacchi:
- **Join Public Game**: permette all'utente di partecipare a una partita di scacchi pubblica
  qualsiasi;
- **Join Private Game**: permette all'utente di partecipare alla partita di scacchi privata
  con l'identificatore specificato nel riquadro adiacente.
  
Alla pressione di uno dei due pulsanti, il processo di partecipazione alla partita è delegato
al `ChessGameProxy` e all'`AuthenticationProxy`, in modo analogo rispetto a come accade dopo
la creazione di una partita. L'unica differenza è che i giocatori ospiti (non host) partecipano
alla partita come giocatori appartenenti alla squadra nera.

Al completamento con successo del processo di partecipazione alla partita di scacchi,
la `JoinGamePage` reindirizza l'utente automaticamente alla `GamePage`.

Eventuali errori vengono mostrati all'utente ad ogni tentativo di partecipazione a una partita.

#### GamePage

La `GamePage` è il componente vue che implementa la schermata relativa all'esecuzione di una
specifica partita di scacchi. 

In particolare, la `GamePage` mantiene e mostra un proprio stato locale della partita osservata
dal punto di vista dell'utente, modellato dalla classe `RelativeChessGameServer`. Quindi, fornisce
tale stato ai suoi componenti, sempre tramite il meccanismo di _dependency injection_.

Il `RelativeChessGameServer` arricchisce lo stato della partita ricevuto dal server di gioco, modellato dalla classe
`ChessGameServer`, permettendo di conoscere il giocatore a cui corrisponde l'utente dell'applicazione, quali
pezzi può controllare, il pezzo attualmente selezionato, quali mosse può eseguire e il punto di vista del suo
avversario.

Al caricamento della schermata, la `GamePage` configura la `PlayerConnection` esposta dal `ChessGameProxy`,
ottenuto tramite _dependency injection_, in modo da aggiornare il `RelativeChessGameServer` ad ogni evento
ricevuto dal server di gioco, aggiornando di conseguenza anche gli elementi grafici che ne dipendono. Infine,
la `GamePage` si sincronizza al server di gioco richiedendone lo stato.

La schermata della `GamePage` cambia in base allo stato della partita, come descritto nelle sezioni che seguono.

##### Waiting for Players
{: .no_toc}

Quando non ci sono abbastanza partecipanti alla partita, la rappresentazione grafica della `GamePage` corrisponde
a quella mostrata dal seguente screenshot. In generale, questa schermata sarà visibile solo al giocatore host di una
partita quando ancora nessun altro giocatore sta partecipando alla sua partita.

![Game Waiting For Players Screenshot](/frontend/resources/images/screenshots/game-waiting-for-players-screenshot.png)

In questa situazione, la `GamePage` mostra un popup sopra il corpo della schermata, modellato dal componente vue
`LobbyPopupComponent`, che avverte l'utente di tale situazione e gli permette di tornare nella schermata principale
attraverso il `ButtonLinkComponent` **Back to Main Menu**, abbandonando la partita.

Il `LobbyPopupComponent` è un particolare tipo del componente vue `PopupComponent`, che generalizza i popup
utilizzati all'interno dell'applicazione. Il `PopupComponent` è stato realizzato attraverso il componente
vue `Dialog` di [PrimeVue](https://primevue.org/).

##### Running
{: .no_toc}

Quando ci sono abbastanza partecipanti alla partita, la rappresentazione grafica della `GamePage` corrisponde
a quella mostrata dal seguente screenshot.

![Game Running Screenshot](/frontend/resources/images/screenshots/game-running-screenshot-1.png)

In questa situazione, la `GamePage` mostra una scacchiera, modellata dal componente vue `ChessboardComponent`,
e le informazioni relative ai due giocatori, posizionate sopra e sotto la scacchiera, modellate dal componente
vue `PlayerInfoComponent`.

Un `PlayerInfoComponent` è associato alla squadra di uno dei due giocatori della partita, che viene utilizzata
insieme al `RelativeChessGameServer` della `GamePage`, ottenuto per _dependency injection_, per conoscere il nome
e il tempo rimasto a quel giocatore, oltre che per determinare lo stile del componente. In particolare, la `GamePage`
posiziona i due `PlayerInfoComponent` in modo che le informazioni del giocatore corrispondente all'utente siano sempre
sotto la scacchiera.

Il `ChessboardComponent` utilizza il `RelativeChessGameServer` della `GamePage` per mostrare lo stato attuale della
scacchiera rispetto al punto di vista dell'utente. In particolare, posiziona i pezzi sulla scacchiera in modo che
quelli controllati dall'utente siano sempre in basso, almeno all'inizio della partita.

Alla creazione, il `ChessboardComponent` crea le caselle della scacchiera, modellate dal componente vue
`ChessboardCellComponent`, associando ogni casella alla sua posizione nella scacchiera e permettendo la loro
pressione, come se fossero dei pulsanti. 

Ogni `ChessboardCellComponent` gestisce la visualizzazione di una specifica casella della scacchiera, identificata
dalla sua posizione. In maggior dettaglio, un `ChessboardCellComponent` utilizza il `RelativeChessGameServer` della
`GamePage` per determinare l'eventuale pezzo da visualizzare nella casella che rappresenta, oltre che il colore della
casella stessa, che corrisponde a un determinato effetto applicato sulla casella.

Per visualizzare un pezzo, un `ChessboardCellComponent` controlla se all'interno del `RelativeChessGameServer` esiste
un pezzo nella posizione della propria casella, dopodiché converte tale pezzo in un'immagine utilizzando l'enumerazione
`PieceImage` del modulo **Assets**.

Per visualizzare un effetto, un `ChessboardCellComponent` controlla diverse proprietà relative alla propria posizione,
affidandosi al `RelativeChessGameServer`. In ordine di priorità crescente, le proprietà e i corrispondenti effetti sono
i seguenti:
- **Chessboard Effect**: se la riga e la colonna della propria posizione hanno la stessa parità
  (entrambi pari o entrambi dispari), la casella è di colore marrone chiaro, altrimenti è di colore marrone scuro;
- **Last Move Effect**: se la propria posizione è la posizione di partenza o di arrivo dell'ultima mossa registrata
  nello storico delle mosse, la casella è di colore giallo;
- **Move Effect**: se la propria posizione è la posizione di arrivo di una mossa disponibile all'utente,
  la casella contiene un pallino grigio;
- **Capture Move Effect**: se la propria posizione è la posizione di arrivo di una mossa di cattura disponibile
  all'utente, la casella è di colore rosso;
- **Selected Effect**: se la propria posizione è la posizione del pezzo selezionato dall'utente, la casella è di
  colore verde.

Quando una casella viene cliccata, il `ChessboardComponent` genera un evento relativo alla posizione cliccata sulla
scacchiera. Quindi, la `GamePage` reagisce a tali eventi nei seguenti modi:
- se in tale posizione nel `RelativeChessGameServer` è presente un pezzo dell'utente, la casella contenente il pezzo
  viene selezionata e viene richiesto alla `PlayerConnection` del `ChessGameProxy` di ricercare le mosse disponibili
  per quel pezzo. La `PlayerConnection` delegherà tale ricerca al [chess-game-service](https://github.com/ldss-project/chess-game-service)
  che notificherà l'utente delle mosse trovate tramite un opportuno evento;
- se in tale posizione nel `RelativeChessGameServer` è presente una mossa disponibile per il pezzo selezionato 
  dall'utente, il pezzo viene deselezionato e viene richiesto alla `PlayerConnection` del `ChessGameProxy` di applicare
  tale mossa. La `PlayerConnection` delegherà tale operazione al
  [chess-game-service](https://github.com/ldss-project/chess-game-service) che notificherà l'utente delle conseguenze
  dell'applicazione di tale mossa tramite degli opportuni eventi;
- in ogni altro caso, il pezzo attualmente selezionato dall'utente viene deselezionato e le sue mosse disponibili
  vengono rimosse.

Di seguito, si riporta uno screenshot della `GamePage` dopo l'applicazione di alcune mosse, il quale mostra i
componenti e gli effetti sopra citati.

![Game Running Some Moves Screenshot](/frontend/resources/images/screenshots/game-running-screenshot-2.png)

Nel caso in cui il server di gioco generi un'eccezione che impedisca il proseguimento della partita (ad esempio,
uno dei giocatori abbandona la partita), la `GamePage` mostra un popup con la descrizione dell'errore generato
dal server, modellato dal componente vue `ErrorPopupComponent`. L'`ErrorPopupComponent` permette di tornare nella
schermata principale dell'applicazione attraverso il `ButtonLinkComponent` **Back to Main Menu**.

Di seguito, si riporta uno screenshot della `GamePage` dopo l'abbandono della partita da parte di uno dei due
giocatori.

![Game Error Screenshot](/frontend/resources/images/screenshots/game-error-screenshot.png)

##### Promotion
{: .no_toc}

Durante l'esecuzione della partita, quando il server è in attesa che un pedone venga promosso, la
rappresentazione grafica della `GamePage` corrisponde a quella mostrata dal seguente screenshot.

![Game Promotion Screenshot](/frontend/resources/images/screenshots/game-promotion-screenshot.png)

In questa situazione, se l'utente controlla il pedone da promuovere, la `GamePage` mostra un popup che
gli permette di selezionare il pezzo a cui promuoverlo, modellato dal componente vue `PromotionPopupComponent`.

Il `PromotionPopupComponent` è composto di quattro `ChessboardCellComponent` cliccabili, corrispondenti
alle quattro alternative per la promozione del pedone. In particolare, il `PromotionPopupComponent` si
affida al `RelativeChessGameServer` per rappresentare correttamente le alternative all'utente, ad esempio
scegliendo il colore adeguato per i pezzi raffigurati nei `ChessboardCellComponent`.

Alla pressione di una delle alternative, il `PromotionPopupComponent` genera un evento corrispondente all'alternativa
selezionata dall'utente. Quindi, la `GamePage` reagisce a tali eventi richiedendo alla `PlayerConnection` del
`ChessGameProxy` di applicare tale promozione.
La `PlayerConnection` delegherà tale operazione al [chess-game-service](https://github.com/ldss-project/chess-game-service)
che notificherà l'utente delle conseguenze di tale promozione tramite degli opportuni eventi.

##### Terminated
{: .no_toc}

Al termine della partita, la rappresentazione grafica della `GamePage` corrisponde a quella mostrata dal
seguente screenshot.

![Game Over Screenshot](/frontend/resources/images/screenshots/game-terminated-screenshot.png)

In questa situazione, la `GamePage` mostra un popup che indica all'utente la causa di terminazione della
partita e il risultato ottenuto nella partita, modellato dal componente vue `GameOverPopupComponent`. Inoltre,
gli permette di tornare alla schermata principale dell'applicazione tramite l'apposito `ButtonLinkComponent` con il
nome **Back to Main Menu**.

Il `GameOverPopupComponent` si affida al `RelativeChessGameServer` per conoscere le cause di terminazione della
partita e il risultato ottenuto dall'utente dell'applicazione.

#### LeaderboardPage

La `LeaderboardPage` è il componente vue che implementa la schermata relativa alla visualizzazione
della classifica globale dei giocatori.

La rappresentazione grafica della `LeaderboardPage` è mostrata dal seguente screenshot.

![Leaderboard Screenshot](/frontend/resources/images/screenshots/leaderboard-screenshot.png)

La `LeaderboardPage` contiene la classifica globale dei giocatori, modellata come una tabella,
le cui righe sono popolate con i nomi dei giocatori dell'applicazione e i relativi punteggi.
Cliccando su una riga della tabella, l'utente viene reindirizzato nella **StatisticsPage**
del giocatore corrispondente.

Sopra la tabella, è anche presente un riquadro chiamato **First Displayed Rank**, nel quale è possibile
specificare la porzione della classifica a cui si è interessati. Eventuali errori di formato, vengono
mostrati all'utente ad ogni tentativo di aggiornamento della classifica visualizzata.

Al caricamento della schermata, la `LeaderboardPage` dichiara una dipendenza con lo `StatisticsProxy`,
che utilizza per ottenere la classifica globale dei giocatori. In particolare, lo `StatisticsProxy`
richiede la valutazione della classifica in un certo intervallo allo
[statistics-service](https://github.com/ldss-project/statistics-service), inoltrando la risposta alla
`LeaderboardPage`.

La classifica viene valutata sia al caricamento della schermata che ad ogni modifica del
**First Displayed Rank**.

#### StatisticsPage

La `StatisticsPage` è il componente vue che implementa la schermata relativa alla visualizzazione
delle statistiche di uno specifico giocatore dell'applicazione.

La rappresentazione grafica della `StatisticsPage` è mostrata dal seguente screenshot.

![Statistics Screenshot](/frontend/resources/images/screenshots/statistics-screenshot.png)

La `StatisticsPage` contiene due componenti principali:
- Sopra la schermata, un `FormComponent` mostra il nome del giocatore e il suo ultimo punteggio aggiornato,
  che comprende la sua posizione in classifica, il numero di vittorie conseguite, il numero di sconfitte
  subite e il suo ratio (ovvero il quoziente tra le vittorie e le sconfitte).
- Sotto la schermata, un grafico mostra l'andamento del ratio del giocatore nel tempo. Il grafico è stato
  realizzato tramite il componente vue `Chart` di [PrimeVue](https://primevue.org/). In particolare, è
  possibile selezionare una porzione del grafico per ingrandirla oppure resettare il grafico tramite un
  doppio click del mouse.

Al caricamento della schermata, la `StatisticsPage` dichiara una dipendenza con lo `StatisticsProxy`,
che utilizza per ottenere lo storico dei punteggi del giocatore. In particolare, lo `StatisticsProxy`
richiede la valutazione dello storico dei punteggi del giocatore (incluso l'ultimo punteggio aggiornato)
allo [statistics-service](https://github.com/ldss-project/statistics-service), inoltrando la risposta alla
`StatisticsPage`.

Lo storico dei punteggi del giocatore viene richiesto al caricamento della schermata per mostrare l'ultimo
punteggio del giocatore e l'andamento del suo ratio nel tempo.

Nel caso in cui nessun punteggio fosse registrato per il giocatore, se le statistiche appartengono all'utente
saranno mostrati dei dati placeholder, altrimenti l'utente sarà reindirizzato alla `NotFoundPage`. 

Per sapere se le statistiche appartengono all'utente, la `StatisticsPage` dichiara una dipendenza con
l'`AuthenticationProxy`, che utilizza per accedere alla sessione dell'utente, quindi potendo confrontare il
nome dell'utente con il nome del giocatore di cui sono state richieste le statistiche.

#### NotFoundPage

La `NotFoundPage` è il componente vue che implementa la schermata di errore mostrata ogni
volta che l'utente prova ad accedere a una rotta che non è implementata dall'applicazione.

La rappresentazione grafica della `NotFoundPage` è mostrata dal seguente screenshot.

![Page Not Found Screenshot](/frontend/resources/images/screenshots/page-not-found-screenshot.png)

---

[Back to Top](#top) |
[Previous Chapter](/frontend/0-mockup) |
[Next Chapter](/frontend/2-testing)