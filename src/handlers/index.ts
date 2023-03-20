import * as path from "path";
import * as fs from "fs";

const handlersPath = path.join(__dirname, "./");
// for test we must include .ts extensions???
const handlerFiles = fs
  .readdirSync(handlersPath)
  .filter((file) => file.endsWith(".js") && file !== "index.js");

const handlers = new Map();

for (const file of handlerFiles) {
  const filePath = path.join(handlersPath, file);
  const handler = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  console.log(handler);
  if ("event" in handler && "execute" in handler) {
    handlers.set(handler.event.name, handler);
  } else {
    console.log(
      `[WARNING] The handler at ${filePath} is missing a required "event" or "execute" property.`,
    );
  }
}

export default handlers;
