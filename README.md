# dcp-core-services

## Environment vars

Inside folder `./environment/` there is a file `env.example.yml`. You need to copy and rename it with the NODE_ENV value you want. For example if NODE_ENV=dev then rename it `env.dev.yml`. For real env values get it touch with a developer. The
`env.example.yml` only has the properties needed not the actual values.

## Runing the app

To run this API dockerized:

```bash
docker-compose up -d
```

To stop the app
```bash
docker-compose down
```

In case you want to run a particular `package.json` script (e.g.: You just want to run tests and not start
the server) you can modify `Docker/init.sh` file to do so.

To run this API locally:

```bash
npm install
npm start
```

This project has some eslint rules configurations. In case you want to see if there
are any errors run:

```bash
npm run lint
```

In case there are some linting errors you can let eslint fix them for you (if it can) running

```bash
npm run lint:fix
```

## API Reference

### health-check

```bash
  curl -X GET  http://localhost:3000/health-check
```

### Swagger UI

To access swagger UI go to

```bash
http://localhost:3000/api-docs/
```

### Rates

```bash
curl -X POST  http://localhost:3000/api/rates/ \
  -H 'content-type: application/json' \
  -d '{
 "originZip": "40165",
 "destinationZip": "40175",
 "parcel": { 
  "height": 10,
  "length": 10,
  "weight": 1,
  "width": 15
 }
}'
```

### Predictable Delivery Dates

```bash
curl -X POST http://localhost:3000/api/predictableDeliveryDates/ \
  -H 'content-type: application/json' \
  -d '{
 "sku": "WL2WDPG080",
 "destinationZip": "40175"
}'
```
