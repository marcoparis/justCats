# justCats

The website of an imaginary cat shelter: browse the cats looking for a home, filter them by age or situation, pick the ones you would like to meet and send an adoption request. The request really arrives by email.

Site: https://marcoparis.github.io/justCats/

## What you can do

There are 16 cats: kittens, adults, seniors and two special cases, Pirate with an ocular prosthesis and Abbott and Costello, two brothers who are only adopted together. Each one has a photo, age, personality, health status and a short story.

You can pick up to three cats per request. The counter at the top shows how many you have picked, and the selection is kept even if you reload the page. The adoption form checks its fields (name, email, optional phone, type of home, a message and consent) and shows the errors next to each one. On submit the request is sent by email and a confirmation appears.

## How it is built

React 18 with Redux Toolkit. The rules live outside the components, so they can be tested without rendering the page:

- picking cats (add, remove, maximum three) is a Redux slice, `AdoptionSlice.js`
- form validation is a pure function, `validation.js`
- submission is in `adoptionApi.js`

The store saves the selection to `localStorage` on every change and reloads it on startup, dropping cats that are no longer in the catalog.

Requests go through [Web3Forms](https://web3forms.com), which forwards the form to my inbox without needing a server. The key in the code is public by design: it only allows sending emails to that address. A hidden field stops the simplest bots. While sending, the button is disabled and, if something goes wrong, a message appears and the cat selection is not lost.

The photos are stored in the project as WebP (about 650 KB in total) instead of being loaded from external sites. Vite's base path is relative, so the site works on GitHub Pages whatever the repository name.

Build with Vite, tests with Vitest, lint with ESLint, publishing with `gh-pages`.

## Run locally

```bash
npm install
npm run dev       # local site
npm test          # selection, validation and submission tests
npm run deploy    # build and publish to GitHub Pages
```

## Main files

```
src/data/cats.js         catalog: cats, categories and photo credits
src/AdoptionSlice.js     cat selection
src/store.js             Redux store and localStorage persistence
src/validation.js        form validation
src/adoptionApi.js       sending the request to Web3Forms
src/Shelter.jsx          top bar and page navigation
src/CatList.jsx          filters and cat cards
src/AdoptionRequest.jsx  selected cats, form and confirmation
src/Credits.jsx          photo credits page
```

## Photo credits

The cats' names and stories are made up; the photos are real and come from [Wikimedia Commons](https://commons.wikimedia.org), resized and cropped:

| Cat | Author | License | Source |
| --- | --- | --- | --- |
| Biscuit | Marie-Lan Nguyen | CC BY 2.5 | [link](https://commons.wikimedia.org/wiki/File:Golden_tabby_and_white_kitten_n01.jpg) |
| Crumb | André Karwath aka Aka | CC BY-SA 2.5 | [link](https://commons.wikimedia.org/wiki/File:Six_weeks_old_cat_(aka).jpg) |
| Leo | Nickolas Titkov | CC BY-SA 2.0 | [link](https://commons.wikimedia.org/wiki/File:BEN_Bengalian_kitten_(4492540155).jpg) |
| Dobby | Dmitry Makeev | CC BY-SA 4.0 | [link](https://commons.wikimedia.org/wiki/File:Cat_Sphynx._Kittens._img_11.jpg) |
| Carrot | José Reynaldo da Fonseca | CC BY 2.5 | [link](https://commons.wikimedia.org/wiki/File:Gato_(2)_REFON.jpg) |
| Tigger | David Corby (edited by Arad) | CC BY 2.5 | [link](https://commons.wikimedia.org/wiki/File:Kittyply_edit1.jpg) |
| Misty | Stephanemartin | CC BY-SA 3.0 | [link](https://commons.wikimedia.org/wiki/File:Chartreux-cat-edouard-marie.jpg) |
| Ash | Jakub Hałun | CC BY 4.0 | [link](https://commons.wikimedia.org/wiki/File:Cat_in_Piran,_Slovenia,_20240504_1600_8594.jpg) |
| Cream, cover | Basile Morin | CC BY-SA 4.0 | [link](https://commons.wikimedia.org/wiki/File:Felis_silvestris_catus_lying_on_rice_straw.jpg) |
| Azure | AdinaVoicu | CC0 | [link](https://commons.wikimedia.org/wiki/File:Tabby_cat_with_blue_eyes-3336579.jpg) |
| Snow | Keith Kissel | CC BY 2.0 | [link](https://commons.wikimedia.org/wiki/File:June_odd-eyed-cat_cropped.jpg) |
| Harley | Terragio67 | CC BY-SA 4.0 | [link](https://commons.wikimedia.org/wiki/File:Calico_cat,_-_Assisi,_Italy.jpg) |
| Grandpa Pino | Collard | CC BY 3.0 | [link](https://commons.wikimedia.org/wiki/File:Colossus_the_Cat_2.JPG) |
| Grandma Rosa | Dimitri “Diti” Torterat | CC BY 2.0 FR | [link](https://commons.wikimedia.org/wiki/File:Tired_20-year-old_cat.jpg) |
| Pirate | Aqwis | CC BY-SA 3.0 | [link](https://commons.wikimedia.org/wiki/File:CatWithOcularProsthetic.jpeg) |
| Abbott and Costello | Laitche | CC BY-SA 4.0 | [link](https://commons.wikimedia.org/wiki/File:Tabby_cats_of_%C5%8Cizumi_Ryokuchi_Park,_January_2019_-_8816.jpg) |
