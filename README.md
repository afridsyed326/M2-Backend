# Setup instructions

### Requirements

1. NodeJs < v18
2. MySql

## Steps

1. Clone the repository
2. Copy `.env.example` file to `.env`
3. Change `PORT`, `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USERNAME`, `MYSQL_PASSWORD`, `DB_NAME` according to your configration
4. Run command `ts-node src/scripts/populateDb.ts` to initials default values in the DB
5. Run `yarn dev` to start a dev server
6. To run a production build, run `yarn build` && `yarn start`

### Frontend link

# https://github.com/afridsyed326/M2-Frontend

### Live Demo Link

# https://m2x.afrid.dev
