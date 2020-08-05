import chalk, { ChalkFunction } from "chalk";
import { Status } from "./jenkins";
import { Gpio, BinaryValue } from "onoff";

let redLed: Gpio;
let yellowLed: Gpio;
let greenLed: Gpio;

redLed = new Gpio(10, "out");
yellowLed = new Gpio(9, "out");
greenLed = new Gpio(11, "out");

export const updateIndicator = (status: Status): void => {
    switch (status) {
        case Status.BUILDING:
            redLed.writeSync(0);
            yellowLed.writeSync(1);
            greenLed.writeSync(0);
            break;
        case Status.SUCCESS:
            redLed.writeSync(0);
            yellowLed.writeSync(0);
            greenLed.writeSync(1);
            break;
        case Status.FAILED:
            redLed.writeSync(1);
            yellowLed.writeSync(0);
            greenLed.writeSync(0);
            break;

        default:
            break;
    }
    console.log(status);
};
