import controller from "../../lib/controller";

export async function asyncGcode(command = "") {
  return new Promise((resolve, reject) => {
    const callback = (data) => {
      if (data !== "echo:busy: processing") {
        controller.removeListener("serialport:read", callback);
        resolve();
      }
    };
    controller.addListener("serialport:read", callback);
    controller.command("gcode", command);
  });
}
