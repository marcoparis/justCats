# justCats

Il sito di un rifugio per gatti, immaginario: sfogli i gatti che cercano casa, li filtri per età o per situazione, scegli quelli che vorresti conoscere e mandi una richiesta di adozione. La richiesta arriva davvero per email.

Sito: https://marcoparis.github.io/justCats/

## Cosa si può fare

I gatti sono 16: cuccioli, adulti, anziani e due casi speciali, Pirata con un occhio protesico e Gianni e Pinotto, due fratelli che si adottano solo insieme. Ognuno ha foto, età, carattere, stato di salute e una breve storia.

Si possono scegliere fino a tre gatti per richiesta. Il contatore in alto mostra quanti ne hai scelti, e la scelta resta salvata anche se ricarichi la pagina. Il modulo di adozione controlla i campi (nome, email, telefono facoltativo, tipo di casa, un messaggio e il consenso) e mostra gli errori accanto a ciascuno. All'invio la richiesta viene spedita via email e compare una conferma.

## Com'è fatto

React 18 con Redux Toolkit. Le regole stanno fuori dai componenti, così si testano senza disegnare la pagina:

- la scelta dei gatti (aggiungi, togli, massimo tre) è uno slice Redux, `AdoptionSlice.js`
- la validazione del modulo è una funzione pura, `validation.js`
- l'invio è in `adoptionApi.js`

Lo store salva la selezione in `localStorage` a ogni modifica e la ricarica all'avvio, scartando i gatti che non esistono più nel catalogo.

Le richieste passano da [Web3Forms](https://web3forms.com), che inoltra il modulo alla mia casella senza bisogno di un server. La chiave nel codice è pubblica per scelta: permette solo di mandare email a quell'indirizzo. Un campo nascosto ferma i bot più semplici. Durante l'invio il pulsante si disattiva e, se qualcosa va storto, compare un messaggio e la scelta dei gatti non si perde.

Le foto sono salvate nel progetto in WebP (circa 650 KB in tutto) invece di essere caricate da siti esterni. Il percorso base di Vite è relativo, così il sito funziona su GitHub Pages qualunque sia il nome del repository.

Build con Vite, test con Vitest, lint con ESLint, pubblicazione con `gh-pages`.

## Avvio in locale

```bash
npm install
npm run dev       # sito in locale
npm test          # test di selezione, validazione e invio
npm run deploy    # build e pubblicazione su GitHub Pages
```

## File principali

```
src/data/cats.js         catalogo: gatti, categorie e crediti delle foto
src/AdoptionSlice.js     selezione dei gatti
src/store.js             store Redux e salvataggio in localStorage
src/validation.js        controllo del modulo
src/adoptionApi.js       invio della richiesta a Web3Forms
src/Shelter.jsx          barra in alto e navigazione tra le pagine
src/CatList.jsx          filtri e schede dei gatti
src/AdoptionRequest.jsx  gatti scelti, modulo e conferma
src/Credits.jsx          pagina dei crediti delle foto
```

## Crediti delle foto

Nomi e storie dei gatti sono inventati, le foto sono reali e vengono da [Wikimedia Commons](https://commons.wikimedia.org), ridimensionate e ritagliate:

| Gatto | Autore | Licenza | Fonte |
| --- | --- | --- | --- |
| Biscotto | Marie-Lan Nguyen | CC BY 2.5 | [link](https://commons.wikimedia.org/wiki/File:Golden_tabby_and_white_kitten_n01.jpg) |
| Briciola | André Karwath aka Aka | CC BY-SA 2.5 | [link](https://commons.wikimedia.org/wiki/File:Six_weeks_old_cat_(aka).jpg) |
| Leo | Nickolas Titkov | CC BY-SA 2.0 | [link](https://commons.wikimedia.org/wiki/File:BEN_Bengalian_kitten_(4492540155).jpg) |
| Dobby | Dmitry Makeev | CC BY-SA 4.0 | [link](https://commons.wikimedia.org/wiki/File:Cat_Sphynx._Kittens._img_11.jpg) |
| Carota | José Reynaldo da Fonseca | CC BY 2.5 | [link](https://commons.wikimedia.org/wiki/File:Gato_(2)_REFON.jpg) |
| Tigro | David Corby (edited by Arad) | CC BY 2.5 | [link](https://commons.wikimedia.org/wiki/File:Kittyply_edit1.jpg) |
| Nebbia | Stephanemartin | CC BY-SA 3.0 | [link](https://commons.wikimedia.org/wiki/File:Chartreux-cat-edouard-marie.jpg) |
| Cenere | Jakub Hałun | CC BY 4.0 | [link](https://commons.wikimedia.org/wiki/File:Cat_in_Piran,_Slovenia,_20240504_1600_8594.jpg) |
| Crema, copertina | Basile Morin | CC BY-SA 4.0 | [link](https://commons.wikimedia.org/wiki/File:Felis_silvestris_catus_lying_on_rice_straw.jpg) |
| Azzurra | AdinaVoicu | CC0 | [link](https://commons.wikimedia.org/wiki/File:Tabby_cat_with_blue_eyes-3336579.jpg) |
| Neve | Keith Kissel | CC BY 2.0 | [link](https://commons.wikimedia.org/wiki/File:June_odd-eyed-cat_cropped.jpg) |
| Arlecchina | Terragio67 | CC BY-SA 4.0 | [link](https://commons.wikimedia.org/wiki/File:Calico_cat,_-_Assisi,_Italy.jpg) |
| Nonno Pino | Collard | CC BY 3.0 | [link](https://commons.wikimedia.org/wiki/File:Colossus_the_Cat_2.JPG) |
| Nonna Rosa | Dimitri “Diti” Torterat | CC BY 2.0 FR | [link](https://commons.wikimedia.org/wiki/File:Tired_20-year-old_cat.jpg) |
| Pirata | Aqwis | CC BY-SA 3.0 | [link](https://commons.wikimedia.org/wiki/File:CatWithOcularProsthetic.jpeg) |
| Gianni e Pinotto | Laitche | CC BY-SA 4.0 | [link](https://commons.wikimedia.org/wiki/File:Tabby_cats_of_%C5%8Cizumi_Ryokuchi_Park,_January_2019_-_8816.jpg) |
