# Student Pal

## Stack

- [Next.js](https://nextjs.org/) - A React framework with hybrid static & server rendering, and route pre-fetching, etc.
- [Node.js](https://nodejs.org/en/) - A back-end Javascript runtime environment to executes JavaScript code outside a web browser.
- [MongoDB](https://www.mongodb.com/) - A document-oriented database program.
- [Chakra UI](https://chakra-ui.com/) - A simple, modular and accessible component library for React.
- [Framer Motion](https://www.framer.com/motion/) - An animation library for React.

## Config / Secrets environment variables

Copy `.env.example` from the server folder to `.env` and add your private information

*Note: never commit this file, it should be ignored by Git*

```
PORT=
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRE=
```

## Installation

```bash
https://github.com/theMillenniumFalcon/FSD-task
```

```bash
cd client
npm install
```

```bash
cd server
npm install
```

## Running the app

### For client
```bash
# development
npm run dev
```

### For server
```bash
# development
npm run dev
```

## Project Structure

### client
    .
    ├── components              # React components
    ├── constants               # constants
    ├── lib                     # utils
    ├── pages                   # nextJS pages
    ├── public                  # assets
    └── ...

### server

    .
    ├── ...
    ├── src                     # Source files
    │   ├── ...
    │   ├── config              # config files
    │   ├── controllers         # controllers for database schemas
    │   ├── db                  # database connection file
    │   ├── middleware          # middleware functions
    │   ├── models              # mongoDB models
    │   ├── routers             # routers
    │   ├── utils               # utils
    |   ├── index.js            # Starting point
    │   └── ...
    └── ...

### I have another question!

Feel free to ask me on [Twitter](https://twitter.com/nishankstwt)! You can also email me at nishankpr435@gmail.com.