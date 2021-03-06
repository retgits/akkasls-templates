# Hello World

This is a sample template for Hello World - Below is a brief explanation of the files in this repository:

```
.
├── package.json                <-- The dependencies and description for the Node.js project
├── README.md                   <-- This file
└── serverless.yml              <-- The deployment file for the Serverless Framework
```

## Requirements

* [An Akka Serverless account](https://docs.cloudstate.com/getting-started/lightbend-account.html)
* [Node.js installed](https://nodejs.org/en/download/)
* [Docker installed](https://www.docker.com/community-edition)
* [Serverless Framework installed](https://www.serverless.com/framework/docs/getting-started/)

## Setup process

### Local development

All the code for the user function bits of the sample are located in `function.js`.

To run your sample locally, you can run:

```bash
npm install
serverless package
serverless local start -f helloworld
```

To try out your functions, run:

```bash
## To set or increment the counter
curl -XPOST -H "Content-type: application/json" -d '{"key":"<your name>", "value": 2}' 'http://localhost:9001/counter/<your name>'

## To get the value
curl -XGET -H "Content-type: application/json" -d '{"key":"<your name>"}' 'http://localhost:9001/counter/<your name>'
```

### Deploying to Akka Serverless

To deploy to Akka Serverless, you can run:

```bash
## Package and push the container
serverless package --push
## OR push from the CLI
docker push <dockerhub username>/<akka serverless project>-helloworld:1.0.0
## Deploy to Akka Serverless
serverless asdeploy -f helloworld
```