# FlowyConnect Backend

This is the backend service for the FlowyConnect project.

## Architecture

The folder abstraction is based on domain-driven architecture, and for this project we use this folder structure:

-   `common`: Abstractions that are used across modules. _This is basically another abstraction layer from the modules folder itself, if it did not exist the contained logic would be present in modules._
-   `core`: Abstractions which are used across the project and does not belong in either the infrastructure or domain folder. These are mostly reusable interfaces.
-   `domain`: Contains domain entities, interfaces, enumerations, or similar classes.
-   `infrastructure`: Contains infrastructure logic such as repositories and server/service utilities.
-   `modules`: Contains most of the application logic in the form of typescript modules, CQRS command/queries, decorators, errors, and guards.

## Getting started

There are some requirements for running the service:

-   [Node Package Manager](https://www.npmjs.com/)
-   [NestCLI](https://docs.nestjs.com/cli/overview)
-   [MongoDB](https://www.mongodb.com/)

### Running first time

#### Installing packages

To run the service locally, you will have to install all of the required dependencies first with NPM using `npm install`.

#### MongoDB instance

If you do not have a mongodb instance available either remote or locally, you can set one up using [Docker](https://www.docker.com/). The command to pull and run a local mongodb instance in Docker.

-   `docker run -d -p 27017:27017 --name mongo mongo:latest`

_Note: The -d flag signifies that the container should run in the background._

#### Immutable variables

We use an environment file for immutable variables, make a copy of the `.env.example` named `.env`. Make sure not to rename/remove the `.env.example` as it is tracked in Git.

Change the variables according to your environment, eg. if you do not have a mongodb instance running locally, or if it is running on another port than 27017, then amend the connection string.

You will need to enter a `JWT_SECRET`, you can find generators online.

#### Running the service

The final step is running the service. Use the command(s) you prefer.

_Recommended for development:_

-   `npm run start:dev` - Runs `nest start` and does not rebuild with changes.
-   `npm run start:watch` - Runs `nest start --watch` and rebuilds with changes.

_Recommended for distribution:_

-   `npm run build && node dist main` - Builds the service and runs the resulting executable.
