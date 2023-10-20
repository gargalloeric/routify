# Routify

## Running the project

For running the project use the following commands:

```bash
git clone git@github.com:gargalloeric/routify.git
cd routify
git switch spike
```

You need to create a `.env` file with the enviroment variable `VITE_API_KEY` and your openrouteservice api key.

```bash
# This is the .env file.
VITE_API_KEY=your_key_goes_here
```

After this you only need to run the following commands to run the project.

```bash
npm install
npm run dev
```