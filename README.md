# Zampa Amica – Adotta un gatto

A React + Redux Toolkit web app for a (fictional) cat shelter: browse the cats looking for a home, filter them by category, pick up to three you would like to meet and send an adoption request.

**Live demo:** https://marcoparis.github.io/e-plantShopping/

## Features

- **16 cats** with photo, age, sex, personality traits, health notes and a short story
- **Category filters**: kittens, adults, seniors and special cases (a cat with an ocular prosthesis, a bonded pair to adopt together)
- **Adoption list** managed with Redux: add or remove cats (max 3 per request), live counter in the navbar
- The selection is **persisted in `localStorage`**, so it survives a page reload
- **Adoption request form** with client-side validation (name, email, optional phone, home type, message, consent), accessible error messages (`aria-invalid`, `aria-describedby`) and a confirmation screen
- **Photo credits page**: every photo comes from Wikimedia Commons under a free licence, with author and licence listed
- Responsive layout, keyboard-accessible controls, optimised WebP images (~650 KB for all cats)

## Tech stack

| Area | Tools |
| --- | --- |
| UI | React 18, CSS (custom properties, grid, flexbox), lucide-react icons |
| State management | Redux Toolkit (`createSlice`, `configureStore`), React-Redux hooks |
| Build tooling | Vite |
| Testing | Vitest |
| Linting | ESLint |
| Deployment | GitHub Pages (`gh-pages`) |

## Architecture

```
src/
├── data/cats.js           # catalog: cats, categories and photo credits
├── AdoptionSlice.js       # Redux slice: selected cats (toggle, remove, clear, max 3) + selectors
├── store.js               # Redux store, loads/saves the selection in localStorage
├── validation.js          # pure function validating the adoption form
├── App.jsx                # landing page and transition to the shelter
├── Shelter.jsx            # navbar with request counter, view switching, footer
├── CatList.jsx            # filters and cat cards
├── AdoptionRequest.jsx    # selected cats, request form, confirmation
├── Credits.jsx            # photo credits
└── *.test.js              # unit tests for the slice, the catalog and the validation
```

Business rules live outside the components: the selection rules are in the Redux slice and the form rules in `validation.js`, so both are unit-tested without rendering the UI.

The Vite `base` is relative (`./`), so the build works on GitHub Pages whatever the repository is called.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm test         # run the unit tests
npm run lint     # lint the code
npm run build    # production build in dist/
npm run deploy   # build and publish to GitHub Pages
```

## Photo credits

The cat names and stories are fictional. Photos from [Wikimedia Commons](https://commons.wikimedia.org), resized and cropped:

| Cat | Author | Licence | Source |
| --- | --- | --- | --- |
| Biscotto | Marie-Lan Nguyen | CC BY 2.5 | [link](https://commons.wikimedia.org/wiki/File:Golden_tabby_and_white_kitten_n01.jpg) |
| Briciola | André Karwath aka Aka | CC BY-SA 2.5 | [link](https://commons.wikimedia.org/wiki/File:Six_weeks_old_cat_(aka).jpg) |
| Leo | Nickolas Titkov | CC BY-SA 2.0 | [link](https://commons.wikimedia.org/wiki/File:BEN_Bengalian_kitten_(4492540155).jpg) |
| Dobby | Dmitry Makeev | CC BY-SA 4.0 | [link](https://commons.wikimedia.org/wiki/File:Cat_Sphynx._Kittens._img_11.jpg) |
| Carota | José Reynaldo da Fonseca | CC BY 2.5 | [link](https://commons.wikimedia.org/wiki/File:Gato_(2)_REFON.jpg) |
| Tigro | David Corby (edited by Arad) | CC BY 2.5 | [link](https://commons.wikimedia.org/wiki/File:Kittyply_edit1.jpg) |
| Nebbia | Stephanemartin | CC BY-SA 3.0 | [link](https://commons.wikimedia.org/wiki/File:Chartreux-cat-edouard-marie.jpg) |
| Cenere | Jakub Hałun | CC BY 4.0 | [link](https://commons.wikimedia.org/wiki/File:Cat_in_Piran,_Slovenia,_20240504_1600_8594.jpg) |
| Crema, cover | Basile Morin | CC BY-SA 4.0 | [link](https://commons.wikimedia.org/wiki/File:Felis_silvestris_catus_lying_on_rice_straw.jpg) |
| Azzurra | AdinaVoicu | CC0 | [link](https://commons.wikimedia.org/wiki/File:Tabby_cat_with_blue_eyes-3336579.jpg) |
| Neve | Keith Kissel | CC BY 2.0 | [link](https://commons.wikimedia.org/wiki/File:June_odd-eyed-cat_cropped.jpg) |
| Arlecchina | Terragio67 | CC BY-SA 4.0 | [link](https://commons.wikimedia.org/wiki/File:Calico_cat,_-_Assisi,_Italy.jpg) |
| Nonno Pino | Collard | CC BY 3.0 | [link](https://commons.wikimedia.org/wiki/File:Colossus_the_Cat_2.JPG) |
| Nonna Rosa | Dimitri “Diti” Torterat | CC BY 2.0 FR | [link](https://commons.wikimedia.org/wiki/File:Tired_20-year-old_cat.jpg) |
| Pirata | Aqwis | CC BY-SA 3.0 | [link](https://commons.wikimedia.org/wiki/File:CatWithOcularProsthetic.jpeg) |
| Gianni e Pinotto | Laitche | CC BY-SA 4.0 | [link](https://commons.wikimedia.org/wiki/File:Tabby_cats_of_%C5%8Cizumi_Ryokuchi_Park,_January_2019_-_8816.jpg) |
