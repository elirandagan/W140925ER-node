const EventEmitter = require("events");
const emitter = new EventEmitter();

const events = {
  Start: "startApp",
  Fire: "fire",
};

// Register Event
emitter.on(events.Start, (args) => {
  console.log("The App just started...", args);
});

// Optioanl to have more than one listener per event
// emitter.on(events.Start, (args) => {
//   console.log("One More Time - The App just started...", args);
// });

emitter.on(events.Fire, (args) => {
  console.log("Fire!!");
});

// Raise Event
const obj = { date: new Date(), path: __filename };
emitter.emit(events.Start, obj);

const fireStr = "FIRE!!!";
emitter.emit(events.Fire);
emitter.emit(events.Fire);
