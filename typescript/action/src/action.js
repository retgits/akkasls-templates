/**
 * Import the Action from the Akka Serverless JavaScript SDK
 */
import as from '@lightbend/akkaserverless-javascript-sdk';

/**
 * Create a new Action with parameters
 * * An array of protobuf files where the entity can find message definitions
 * * The fully qualified name of the service that provides this entities interface
 */
const myAction = new as.Action(
    ['./action.proto'],
    'action.ActionService'
);

/**
 * Messages in Akka Serverless are typically in Protobuf format. To make it easier to work 
 * with, you can load the protobuf types (as happens in the below code). The Protobuf types 
 * are needed so that Akka Serverless knowns how to serialize these objects when they are 
 * persisted.
 */
const response = myAction.lookupType('action.HelloWorldResponse')

/**
 * The commandHandlers for the action determine how the rpc methods from the Protobuf
 * file are mapped to Javascript functions. In this case the SayHello method from the
 * Protobuf file is mapped to the sayHelloWorld function in JavaScript
 */
myAction.commandHandlers = {
    SayHello: sayHelloWorld
}

/**
 * sayHelloWorld says hello to everyone!
 *
 * @param {*} request the request (in JSON format)
 * @param {*} context the Akka Serverless context object
 * @return {*} 
 */
function sayHelloWorld(request, context) {
    // Log the incoming request
    console.log(JSON.stringify(request));

    // Generate a new response message using the request.name to say hello
    const message = response.create({message: `Hello, ${request.name}!`});

    // Return the result
    return message;
}

export default myAction;