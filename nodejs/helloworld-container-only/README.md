# Hello World

This is a sample template for Hello World, using prebuilt containers - Below is a brief explanation of the files in this repository:

```
.
├── package.json                <-- The dependencies and description for the Node.js project
├── README.md                   <-- This file
└── serverless.yml              <-- The interface description
```

## Requirements

* [An Akka Serverless account](https://docs.cloudstate.com/getting-started/lightbend-account.html)
* [Node.js installed](https://nodejs.org/en/download/)
* [Docker installed](https://www.docker.com/community-edition)
* [Serverless Framework installed](https://www.serverless.com/framework/docs/getting-started/)

## Setup process

### Local development

Since you're using the prebuilt containers, there is no source code in this folder. To see the example's source code, check out [helloworld](../helloworld)

To run your sample locally, you can run:

```bash
npm install
serverless local start -f helloworld
```

The `serverless local` command will download the container from DockerHub and start a local instance, together with a proxy server.

To try out your functions, run:

```bash
## To set or increment the counter
curl -XPOST -H "Content-type: application/json" -d '{"key":"<your name>", "value": 2}' 'http://localhost:9001/counter/<your name>'

## To get the value
curl -XGET -H "Content-type: application/json" -d '{"key":"<your name>"}' 'http://localhost:9001/counter/<your name>'
```
