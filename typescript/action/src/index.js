import as from '@lightbend/akkaserverless-javascript-sdk';
import myAction from './action.js';

/**
 * Create a new Akka Serverless server and add the action from
 * action.js to it. The server will listen on port 8080 and 
 * bind to all interfaces
 */
const server = new as.AkkaServerless();
server.addComponent(myAction);
server.start({bindAddress:'0.0.0.0', bindPort:'8080'});