/**
 * Import the Akka Serverless JavaScript SDK
 */
import as from '@lightbend/akkaserverless-javascript-sdk';

/**
 * Create a new EventSourced entity with parameters
 * * An array of protobuf files where the entity can find message definitions
 * * The fully qualified name of the service that provides this entities interface
 * * The entity type name for all event source entities of this type. This will be prefixed
 *   onto the entityId when storing the events for this entity.
 */
const entity = new as.EventSourcedEntity(
    ['./eventsourced.proto',],
    'eventsourced.EventSourcedEntityService',
    'eventsourcedentities'
);

/**
 * Messages in Akka Serverless are typically in Protobuf format. To make it easier to work 
 * with, you can load the protobuf types (as happens in the below code). The Protobuf types 
 * are needed so that Akka Serverless knowns how to serialize these objects when they are 
 * persisted.
 */
const response = entity.lookupType('eventsourced.HelloWorldResponse')
const state = entity.lookupType('eventsourced.HelloWorldState')
const event = entity.lookupType('eventsourced.UpdateStateEvent')

/**
 * Set a callback to create the initial state. This is what is created if there is no snapshot
 * to load, in other words when the entity is created and nothing else exists for it yet.
 */
entity.setInitial(name => state.create({
    name: name,
    numOfMessages: 0,
    greeting: ''
}));

/**
 * Set a callback to create the behavior given the current state. This callback will be invoked 
 * after each time that an event is handled to get the current behavior for the current state.
 */
entity.setBehavior(eventsourcedentities => {
    return {
        commandHandlers: {
            SayHello: sayHelloWorld,
            GetGreeting: getCurrentState
        },
        eventHandlers: {
            UpdateStateEvent: handleUpdate
        }
    }
})

/**
 * sayHelloWorld says hello to everyone and is the entrypoint to start handling events
 *
 * @param {*} request the request (in JSON format)
 * @param {*} current the current state of the entity
 * @param {*} context the Akka Serverless context object
 */
function sayHelloWorld(request, current, context) {
    // Log the incoming request
    console.log(JSON.stringify(request));

    // Generate a new response message using the request.name to say hello
    const message = response.create({message: `Hello, ${request.name}!`});

    // Create a new event and emit it to the event handler
    const evt = event.create({
        name: request.name,
        greeting: `Hello, ${request.name}!`
    })
    context.emit(evt)

    // Return the result
    return message;
}

/**
 * getCurrentState retrieves the current state of an entity
 *
 * @param {*} request the request (in JSON format)
 * @param {*} current the current state of the entity
 */
function getCurrentState(request, current) {
    // Log the incoming request
    console.log(JSON.stringify(request));

    return current;
}

/**
 * handleUpdate handles updating the actual state based on the event journal
 *
 * @param {*} evt the event emitted by sayHelloWorld (in JSON format)
 * @param {*} current the current state of the entity
 */
function handleUpdate(evt, current) {
    // Log the incoming request
    console.log(JSON.stringify(evt));

    // Update the greeting and counter
    current.greeting = evt.greeting
    current.numOfMessages = current.numOfMessages + 1;

    // Store the new state
    return current
}

export default entity