## Installation
To install the project, you need to have Node.js installed on your machine. You can download it from [here](https://nodejs.org/en/download/). Then you need to clone the repository and run the following command in the root of the project:

```bash
$ npm install
```

After that you need to create a .env file in the root of the project and add the following variables:

```bash
PORT=3000
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER="your_username"
POSTGRES_PASSWORD="your_password"
POSTGRES_DATABASE="your_database_name"
MODE=DEV
RUN_MIGRATIONS=true
```

That is all you need to do to install the project.

## Running the app
To run the app you need to run the following command in the root of the project:
```bash
# development
$ npm run start
```
Or you can run the following command to run the app in watch mode (development mode):
```bash
# watch mode
$ npm run start:dev
```

## Directory structure
The project is structured in the following way:
```
random_project
├── src
│   ├── config
│   │   ├── config.service.ts (Configuration service)
│   ├── migration
│   ├── model
│   │   ├── product.entity.ts (Product entity)
│   ├── product
│   │   ├── dto
│   │   │   ├── create-product.dto.ts (Create product DTO)
│   │   │   ├── update-product.dto.ts (Update product DTO)
│   │   ├── product.controller.ts (Product controller)
│   │   ├── product.service.ts (Product service)
│   │   ├── product.module.ts (Product module)
│   ├── app.module.ts (Main module)
│   ├── app.controller.ts (Main controller)
│   ├── app.service.ts (Main service)
├   ├── main.ts (Main file)
├   ├── scripts
│   ├── shared (Shared module)
│   │   ├── pipes (Validation pipes)
│   │   │   ├── constants.ts (Validation pipe)
│   │   │   ├── paginationPipe.pipe.ts (Validation pipe)


## Disclaimer

This project is a simple example of a NestJS project. It is not meant to be used in production. It is meant to be used as a learning resource. If you want to use it in production, you need to add more features and tests to it.