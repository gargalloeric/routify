<p align="center">
   <img src="routify_logo.svg" alt="Routify logo" />
</p>

[![CI Test](https://github.com/gargalloeric/routify/actions/workflows/run_tests.yml/badge.svg)](https://github.com/gargalloeric/routify/actions/workflows/run_tests.yml)

## About

> [!WARNING]
> Do not use in production, the project may contain bugs. It has been developed to learn about ATDD, Vuejs, Web development and Vitest.

Routify is a project for the subjects EI1039 and EI1048 of the Jaume I University. It is a maps site where you can store your routes and favourite places. It uses openrouteservice under the hood in order to provide the route functionality and Vuejs for the interface.

## Running the project

In order to run the project use the following commands:

```bash
git clone git@github.com:gargalloeric/routify.git
cd routify
```

You need to create a `.env` file with the enviroment variables `VITE_API_KEY` with your openrouteservice api key and `VITE_FIREBASE_API_KEY` with your firebase api key.

```bash
# This is the .env file.
VITE_API_KEY=your_key_goes_here
VITE_FIREBASE_API_KEY=your_key_goes_here
```

After this you only need to run the following commands to run the project.

```bash
npm install
npm run dev
```

## License

This project is licensed under the MIT license.