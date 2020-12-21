const crdt = require("cloudstate").crdt;

const entity = new crdt.Crdt(
    "userfunction.proto",
    "com.example.helloworld.HelloWorld",
    {}
);

entity.commandHandlers = {
    Increment: increment,
    Get: get
};

function increment(update, ctx) {
    if (update.value < 0) {
        ctx.fail("Cannot decrement gcounter");
    }

    if (ctx.state === null) {
        ctx.state = new crdt.GCounter();
    }

    if (update.value > 0) {
        ctx.state.increment(update.value);
    }

    return {
        value: ctx.state.value
    };
}

function get(get, ctx) {
    if (ctx.state === null) {
        ctx.state = new crdt.GCounter();
    }

    return {
        value: ctx.state.value
    };
}

// Export the entity
module.exports = entity;