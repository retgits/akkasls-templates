# {{functionname}}

This is a sample template for {{functionname}} - Below is a brief explanation of the files that have been generated:

```
.
├── .akkaserverless.yaml        <-- A template file for Akka Serverless Tools for VS Code 
├── .dockerignore               <-- Files that are ignored during the docker build
├── dockerfile                  <-- The docker build file
├── function.js                 <-- The source code for your Hello World example
├── index.js                    <-- The entrypoint for the docker container, which calls the function.js file
├── package.json                <-- The dependencies and description for the Node.js project
├── README.md                   <-- This file
└── userfunction.proto          <-- The interface description
```

## Requirements

* [An Akka Serverless account](https://docs.cloudstate.com/getting-started/lightbend-account.html)
* [Node.js installed](https://nodejs.org/en/download/)
* [Docker installed](https://www.docker.com/community-edition)

## Setup process

### Local development

All the code for the user function bits of the sample are located in `function.js`.

To run your sample locally, you can run:

```
docker build . -t <your dockerhub username>/helloworld
docker run -d --name helloworld -p 8080:8080 <your dockerhub username>/helloworld
docker run -d --name helloworld-proxy -p 9000:9000 --env USER_FUNCTION_HOST=<your IP address> cloudstateio/cloudstate-proxy-dev-mode:latest
```

To try out your functions, run:

```
## To set or increment the counter
curl -XPOST -H "Content-type: application/json" -d '{"key":"<your name>", "value": 2}' 'http://localhost:9000/counter/<your name>'

## To get the value
curl -XGET -H "Content-type: application/json" -d '{"key":"<your name>"}' 'http://localhost:9000/counter/<your name>'
```

### Deploying to Akka Serverless

To deploy to Akka Serverless, you can run:

```
docker build . -t <your dockerhub username>/helloworld
docker push <your dockerhub username>/helloworld
akkasls svc deploy {{functionname}}  docker.io/<your dockerhub username>/helloworld
```