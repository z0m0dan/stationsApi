## Description

Find My Bike - Aplicacion para encontrar las estaciones de MiBici mas cercanas

## Project setup

```bash
pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod


```

## Seeding the database

The app contains a seeder to update the information of the database by
default the application uses the [CSV file sep/2024](https://www.mibici.net/site/assets/files/1118/nomenclatura_2024_09.csv)
but this can be overridden by changing the CSV URL location
on the `config.json` file

```bash
# Execute seeders
$ pnpm run seed
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Testing

The app is deployed on a EC2 instance and the URL is [FindMyBikeApi](http://ec2-18-234-92-92.compute-1.amazonaws.com)

The app can be tested via

```bash

$ curl -X GET "http://ec2-18-234-92-92.compute-1.amazonaws.com/stations?latitude=20.66682&longitude=-103.39182"

#also with options

$ curl -X GET "http://ec2-18-234-92-92.compute-1.amazonaws.com/stations?latitude=20.66682&longitude=-103.39182&limit=5&distance=1000"

```

The app supports limit to set the number of stations to return and distance to
set the distance in kilometers to search for stations

This can be seen on the docs of the project, it's generated with swagger and the
URL its [FindMyBikeApi Documentation](http://ec2-18-234-92-92.compute-1.amazonaws.com/docs)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
