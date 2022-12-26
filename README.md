# Recovered version of PDP project

Initial repo was accidentally deleted both localy and remotely.\
In this one I tried to recover most of the parts ASAP\
But due to lack of time was only able to rewrite some main parts such as:

- Creation of users, chats and messages
- described their relationships in DB
- setup DB

In other words this project is not yet finished but since it will be a part of my full-stack app I'll continue working on it and cover all other parts such as:

- authentication / authorization
- additional features for messages
- etc.

# Prerequisites

- Docker Desktop installed
- Postman installed (or web version)
- yarn installed

# Installation

```bash
git clone https://github.com/1nspir3d/chat-backend.git
cd chat-backend
yarn
```

Above steps will clone project's repo and install required dependencies\
Next step is to launch Docker Desktop and Postman\
Make sure both applications up and running and then proceed to the next step

## Database

In order for this project to work you have to create database container using following command:

```bash
yarn run db:create
```

This will create and start database container

Later on you won't need to create it again and can use following command to start previously created container:

```bash
yarn run db:start
```

But if by any reason you deleted mentioned container you have to create it again

## Server

```bash
yarn run start:dev
```

## Postman

Now when database and server are running we can test our endpoints\
Open Postman and import `chat-backend.postman_collection.json` file which can be found in the root of this project

This collection has pre-written requests for `users` and `chats` endpoints

In order to test `messages` you have to create a new WebSocket request
