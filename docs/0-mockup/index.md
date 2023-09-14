---
title: Mockup
layout: default
nav_order: 2
---

# Mockup
{: .no_toc}

In questo capitolo si descriverà la progettazione delle schermate realizzate per
questo servizio.

## Contenuti
{: .no_toc}

- TOC
{:toc}

---

## Schermate

Durante la progettazione dell'interfaccia grafica del servizio, si deciso di scomporre
l'applicazione nelle schermate seguenti:
- **Homepage**: la schermata principale dell'applicazione. Deve permettere di accedere alle
  funzionalità più importanti dell'applicazione.
- **Log-in Page**: gestisce l'autenticazione degli utenti nell'applicazione.
- **Sign-in Page**: gestisce la registrazione degli utenti nell'applicazione.
- **Profile Page**: gestisce la visualizzazione e l'aggiornamento delle informazioni relative a uno
  specifico utente nel sistema.
- **Create Game Page**: gestisce la configurazione e la creazione di una partita di scacchi.
- **Join Game Page**: gestisce la partecipazione a una partita di scacchi.
- **Game Page**: gestisce l'esecuzione di una partita di scacchi.
- **Leaderboard Page**: gestisce la visualizzazione della classifica globale dei giocatori
  dell'applicazione.
- **Statistics Page**: gestisce la visualizzazione delle statistiche di uno specifico giocatore
  dell'applicazione.

Di seguito, si descriveranno i mockup relativi alle schermate dell'applicazione.

> **Nota**: i mockup sono stati realizzati attraverso lo strumento online
> [draw.io](https://app.diagrams.net/).

### Homepage

Di seguito si riporta il mockup progettato per la **Homepage**.

![Homepage Mockup](/frontend/resources/images/mockups/homepage-mockup.png)

La schermata prevede due aree principali:
- **Barra di navigazione**: una barra verticale posizionata alla sinistra della schermata,
  con lo scopo di permettere a un utente di navigare all'interno dell'applicazione.
  In particolare, può contenere i seguenti pulsanti:
  - **ChessGame**: contiene il logo dell'applicazione. Se cliccato, l'utente viene reindirizzato
    alla schermata principale dell'applicazione.
  - **Login**: presente solo se l'utente non è autenticato (_guest_ nel mockup). Se cliccato,
    l'utente viene reindirizzato alla **Log-in Page**.
  - **Leaderboard**: se cliccato, l'utente viene reindirizzato alla **Leaderboard Page**.
  - **Profile**: presente solo se l'utente è autenticato (_user_ nel mockup). Se cliccato,
    l'utente viene reindirizzato alla sua **Profile Page**.
  - **Statistics**: presente solo se l'utente è autenticato. Se cliccato, l'utente viene
    reindirizzato alla sua **Statistics Page**.
  - **Logout**: presente solo se l'utente è autenticato. Se cliccato, l'utente revoca la
    propria autenticazione, diventando un utente guest.
  
  La barra di navigazione sarà condivisa tra tutte le schermate dell'applicazione.
- **Corpo della schermata**: racchiude il contenuto specifico della schermata. Nel caso
  della **Homepage**, contiene i due pulsanti seguenti:
  - **Create Game**: se cliccato, l'utente viene reindirizzato alla **Create Game Page**.
  - **Join Game**: se cliccato, l'utente viene reindirizzato alla **Join Game Page**.
  
  Il corpo della schermata è un elemento condiviso tra tutte le schermate dell'applicazione,
  ma in ogni schermata racchiude un contenuto diverso.

### Log-in Page 

Di seguito si riporta il mockup progettato per la **Log-in Page**.

![Login Mockup](/frontend/resources/images/mockups/login-mockup.png)

Il corpo della schermata contiene un form che l'utente può compilare per autenticarsi
all'interno dell'applicazione.

Il form richiede che l'utente specifichi le sue credenziali, composte da:
- **Username**: il proprio nome all'interno dell'applicazione.
- **Password**: una stringa segreta utilizzata per verificare la propria identità.

Una volta compilato il form, l'utente può inviare le proprie credenziali cliccando sul
pulsante **Submit**, autenticandosi all'interno dell'applicazione. Nel caso in cui le
credenziali non fossero corrette, un messaggio di errore viene mostrato all'utente
(il testo in rosso nel mockup).

Il form contiene anche un pulsante **Sign In** che, se cliccato, reindirizza l'utente
alla **Sign-in Page**, permettendogli di registrarsi all'applicazione.

### Sign-in Page

Di seguito si riporta il mockup progettato per la **Sign-in Page**.

![Signin Mockup](/frontend/resources/images/mockups/signin-mockup.png)

Il corpo della schermata contiene un form che l'utente può compilare per registrarsi
all'interno dell'applicazione.

Il form richiede che l'utente specifichi le informazioni relative al proprio profilo, 
composte da:
- **Username**: il proprio nome all'interno dell'applicazione.
- **Email**: il proprio indirizzo di posta elettronica.
- **Password**: una stringa segreta utilizzata per verificare la propria identità.

Una volta compilato il form, l'utente può inviare le proprie informazioni cliccando sul
pulsante **Submit**, registrandosi all'interno dell'applicazione. Nel caso in cui le
informazioni non fossero valide, un messaggio di errore viene mostrato all'utente
(il testo in rosso nel mockup).

### Profile Page

Di seguito si riporta il mockup progettato per la **Profile Page**.

![Profile Mockup](/frontend/resources/images/mockups/profile-mockup.png)

Il corpo della schermata contiene un form che mostra all'utente le sue informazioni
all'interno dell'applicazione, ovvero:
- **Username**: il nome dell'utente all'interno dell'applicazione.
- **Email**: l'indirizzo di posta elettronica dell'utente.
- **Password**: una stringa segreta utilizzata per verificare l'identità dell'utente.
  
In particolare, la password non viene effettivamente mostrata all'utente, ma è utilizzata
come placeholder per ospitare un pulsante **pen-icon** per modificarla (nel mockup, il
pulsante con l'icona della penna sulla destra del riquadro).

Il pulsante **pen-icon**, se cliccato, estende o restringe il form del profilo, permettendo
all'utente di modificare la propria password attraverso l'inserimento dei campi seguenti:
- **New Password**: la nuova password dell'utente.
- **Confirm Password**: la ripetizione della nuova password dell'utente (in modo da ridurre la
  probabilità di errore durante l'inserimento della password).
Una volta compilati questi campi, l'utente può cliccare il pulsante **Update** del form esteso per
aggiornare la propria password con quella nuova specificata.

### Create Game Page

Di seguito si riporta il mockup progettato per la **Create Game Page**.

![Create Game Mockup](/frontend/resources/images/mockups/create-game-mockup.png)

Il corpo della schermata contiene un form che l'utente può compilare per configurare
una nuova partita all'interno dell'applicazione.

In particolare, il form permette di specificare i seguenti campi della configurazione
della partita:
- **Time Mode**: il vincolo di tempo nella partita. L'input consiste in una combobox
  che permette di selezionare uno tra i seguenti valori:
  - **No Limit**: nessun vincolo di tempo nella partita.
  - **Move Limit**: un vincolo di tempo per cui i giocatori hanno un tempo limitato
    per eseguire le loro mosse. Il tempo a disposizione viene resettato ad ogni mossa.
  - **Player Limit**: un vincolo di tempo per cui i giocatori hanno un tempo limitato
    per eseguire le loro mosse. Il tempo a disposizione non viene resettato durante la
    partita.
- **Time (minutes)**: il tempo a disposizione per i giocatori durante la partita.
  Mostrato solo quando **Move Limit** o **Player Limit** è selezionato.
- **Public**: indica se la partita è pubblica o privata. L'input consiste in una checkbox
  che indica che la partita è pubblica, se selezionata, o privata, altrimenti.
- **Id**: l'identificatore della partita. Mostrato solo se la partita è privata.

Una volta compilato il form, l'utente può creare una partita con la configurazione
specificata cliccando il pulsante **Create Game**. Nel caso in cui la configurazione
non fosse valida, un messaggio di errore viene mostrato all'utente (il testo in rosso
nel mockup).

### Join Game Page

Di seguito si riporta il mockup progettato per la **Join Game Page**.

![Join Game Mockup](/frontend/resources/images/mockups/join-game-mockup.png)

Il corpo della schermata contiene due pulsanti che permettono di partecipare a una
partita nell'applicazione:
- **Join Random Game**: permette di partecipare a una partita pubblica casuale tra
  quelle presenti nell'applicazione.
- **Join**: permette di partecipare alla partita privata con l'identificatore specificato
  nel riquadro adiacente.

### Game Page

Di seguito si riportano i mockup progettati per la **Game Page**. In particolare, i
mockup mostrano la schermata nelle varie situazioni di una partita di scacchi.

#### Running
{: .no_toc}

Di seguito, si riporta il mockup della **Game Page** durante l'esecuzione di una
partita di scacchi.

![Running Game Mockup](/frontend/resources/images/mockups/game-mockup-running.png)

Il corpo della schermata contiene tre componenti principali:
- **Chessboard**: la scacchiera che mostra ai giocatori lo stato della partita.

  In particolare, la scacchiera mostra la posizione dei pezzi di entrambi i giocatori.
  Inoltre, evidenzia in giallo l'ultima mossa eseguita, in verde il pezzo attualmente
  selezionato, in rosso le mosse di cattura disponibili per il pezzo attualmente
  selezionato e con un pallino grigio tutte le altre mosse disponibili per tale pezzo.
- **Black Player Header**: il riquadro nero sopra la scacchiera che contiene le
  informazioni riguardanti il giocatore appartenente alla squadra nera.

  In particolare, tali informazioni includono lo username del giocatore, se autenticato,
  e il tempo a lui rimasto per eseguire la prossima mossa, se esiste un vincolo di tempo
  nella partita.
- **White Player Header**: il riquadro bianco sotto la scacchiera che contiene le
  informazioni riguardanti il giocatore appartenente alla squadra bianca, analogamente
  al **Black Player Header**.

Il giocatore di turno può cliccare un pezzo che possiede per selezionarlo, individuando
tutte le mosse disponibili per quel pezzo. Quindi, può cliccare su una di quelle mosse
per eseguirla.

Se un giocatore esce dalla schermata della partita, automaticamente si disconnetterà
da tale partita.

#### Promotion
{: .no_toc}

Di seguito, si riporta il mockup della **Game Page** durante la promozione di un pedone.

![Promotion Game Mockup](/frontend/resources/images/mockups/game-mockup-promotion.png)

Durante la promozione di un pedone, sul corpo della schermata sarà visualizzato un popup
che permette al giocatore di turno di selezionare il pezzo a cui promuovere il pedone.
In particolare, il popup contiene quattro caselle cliccabili, corrispondenti alle quattro
possibili alternative per la promozione, ovvero cavallo, alfiere, torre o regina.
Il giocatore di turno può cliccare una di quelle caselle per promuovere il proprio pedone
al pezzo mostrato da tale casella.

#### Terminated
{: .no_toc}

Di seguito, si riporta il mockup della **Game Page** durante la terminazione di una partita.

![Terminated Game Mockup](/frontend/resources/images/mockups/game-mockup-terminated.png)

Durante la terminazione di una partita, sul corpo della schermata sarà visualizzato un popup
che mostra a ciascun giocatore il proprio risultato e la causa della terminazione della
partita.

### Leaderboard Page

Di seguito si riporta il mockup progettato per la **Leaderboard Page**.

![Leaderboard Mockup](/frontend/resources/images/mockups/leaderboard-mockup.png)

Il corpo della schermata contiene una tabella che mostra i giocatori dell'applicazione
ed i loro punteggi. In particolare, ogni riga della tabella corrisponde a un giocatore
e descrive i seguenti campi:
- **Rank**: la posizione in classifica del giocatore.
- **Name**: il nome del giocatore nell'applicazione.
- **Wins**: il numero di vittorie conseguite dal giocatore.
- **Losses**: il numero di sconfitte subite dal giocatore.
- **Ratio**: il rapporto tra le vittorie e le sconfitte del giocatore.

Le righe della tabella sono ordinate per ordine crescente di **Rank**.

Inoltre, cliccando sul nome di un giocatore, l'utente viene reindirizzato alla schermata
delle statistiche di quel giocatore.

### Statistics Page

Di seguito si riporta il mockup progettato per la **Statistics Page** di un
giocatore.

![Statistics Mockup](/frontend/resources/images/mockups/statistics-mockup.png)

Il corpo della schermata contiene due componenti principali:
- **Player Score**: un form che descrive il punteggio attuale del giocatore
  all'interno dell'applicazione. In particolare, contiene i seguenti campi:
  - **Username**: il nome del giocatore nell'applicazione.
  - **Rank**: l'attuale posizione in classifica del giocatore.
  - **Wins**: l'attuale numero di vittorie conseguite dal giocatore.
  - **Losses**: l'attuale numero di sconfitte subite dal giocatore.
  - **Ratio**: il rapporto tra le vittorie e le sconfitte del giocatore.
- **Player Statistics Graph**: un grafico che mostra l'andamento del **Ratio**
  del giocatore nel tempo.

---

[Back to Top](#top) |
[Previous Chapter](/frontend) |
[Next Chapter](/frontend/1-implementation)