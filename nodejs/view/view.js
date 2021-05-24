/**
 * Import the Akka Serverless JavaScript SDK
 */
import * as as from '@lightbend/akkaserverless-javascript-sdk';

/**
 * Create a new View with parameters
 * * An array of protobuf files where the entity can find message definitions
 * * The fully qualified name of the service that provides this entities interface
 * * The viewId
 */
const view = new as.View(
    ['./view.proto'],
    'view.ViewService',
    {
        viewId: "greetingsView"
    }
);

export default view;