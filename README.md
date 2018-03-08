## This is basic example project related with [GAPI](https://github.com/Stradivario/gapi) graphQL api with typescript Decorators

#### To start developing clone repository

```bash
git clone https://github.com/Stradivario/gapi-starter
```

#### Better use command line utility(gapi-cli) to install it type following command:

```bash
npm i -g gapi-cli
```



#### Type the following command to create new project from scratch via CLI

```bash
gapi-cli new my-project
```



#### To start project for "development" type:

```bash
npm start
```

#### To start project for "production" type:
This will run pm2-docker process.yml --only APP (check process.yml inside root repository)
```bash
npm run start:prod
```

### Docker

#### To build project with Docker type:
```bash
npm run build:docker
```

#### To start project with Docker type:
```bash
npm run start:docker
```
