# Next.js Teslo-Shop APP
To run locally, the database is needed.
```
docker-compose up -d
```

* The -d means __detached__

MongoDB Local URL:

```
mongodb://localhost:27017/teslodb
```

## Setting enviroment variables
Rename the file __.env.template__ to __.env__ and use the MongoDB Local URL

* Rebuild node modules and stand up Next

```
    yarn install
    yarn dev
```

## Filling the database with test data
Call:
```
http://localhost:3000/api/seed
```