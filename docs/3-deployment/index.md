---
title: Esecuzione
layout: default
nav_order: 5
---

## Esecuzione

Per eseguire il servizio è stata pubblicata un'immagine su [Docker](https://www.docker.com/). Quindi è sufficiente
utilizzare il seguente comando:
```shell
docker run -it -p 8080:8080 jahrim/io.github.jahrim.chess.frontend:<version>
```

Dopodiché, il sito è accessibile al seguente URL: http://localhost:8080.

L'esecuzione del servizio è configurabile specificando la variabile d'ambiente `VITE_RUNTIME_ENVIRONMENT`,
che permette di indicare gli host dei servizi da cui il **Frontend** dipende. In particolare, il contenuto
della variabile deve essere un [JSON](https://www.json.org/json-en.html) con i seguenti campi:

```yaml
{
  AUTHENTICATION_SERVICE: string,     # Default: "127.0.0.1:8081"
  STATISTICS_SERVICE: string,         # Default: "127.0.0.1:8082"
  CHESS_GAME_SERVICE: string          # Default: "127.0.0.1:8083"
}
```

Per quanto riguarda l'esecuzione dell'intera applicazione, comprendendo il **Frontend** ed i servizi da cui
dipende, il repository predispone e pubblica un opportuno ```docker-compose.yml``` file, che può essere
eseguito tramite [Docker](https://www.docker.com/). La descrizione esatta su come eseguire l'intera applicazione
è resa disponibile al seguente [link](/docs/3-deployment).

---

[Back to Top](#top) |
[Previous Chapter](/frontend/2-testing)