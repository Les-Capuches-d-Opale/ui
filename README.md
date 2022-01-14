# :sparkles: Les Capuches d'Opales : Guilde d'aventuriers :sparkles:

:fire: https://les-capuches-d-opale.tk/

:computer: React, Typescript, Cypress, ESLint, Prettier, RainbowUI, Heroku, Netlify

:art: Guilde front : Chloé NOGER, Killian CAMBERT, Thaïs JUHEL, Marie GAUTRON

:gun: Guilde back : Martin DANVERS, Lilian OUVRARD, Abdellah JRONDI, Abderahim malick ASSIM MAHAMAT

:house: https://github.com/Les-Capuches-d-Opale

### Available Scripts

#### Install dependencies

To install all dependencies required for this project runs `npm install` or `yarn`

#### Run local app

Runs the app in the development mode. Runs `npm start` or `yarn start`\
Open [http://localhost:4002](http://localhost:4002) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### :bug: Detect problems, fix and format code

For detects syntax problems in your code runs : `yarn lint`
For detects and fix syntax problems in your code runs : `yarn lint-fix`
For format your code runs : `yarn format`

:warning: When you runs `yarn start`, before starting the projet, the app format your code (runs `yarn format` before)

:warning: Husky is installed. When you commit your code, ESLint detect and fix problems. You can't commit if ESLint detects errors.

### Folders :

- `components` : pour les composants lieu au métier (ex: Formulaire, modal...)

- `pages` : pour les pages principales du projet (ex: Login, Home...)

- `router` : pour implémentation de la logique des routes (Privates routes)

- `sdk` : pour les interfaces des types

- `uikit` : pour les composants basiques que l'on peut réutiliser

### Workflow :

Il y a 2 branches de base `master` et `develop`, lors des pull request mettre develop en main branch
