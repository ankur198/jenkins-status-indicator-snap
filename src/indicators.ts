import chalk, { ChalkFunction } from 'chalk';
import { Status } from './jenkins'
import { Gpio, BinaryValue } from 'onoff'

class MockGpio {
    readonly chalkFunction: ChalkFunction;
    writeSync(value: BinaryValue): void {
        if (value == 1)
            console.log(this.chalkFunction("◉"))
    };
    constructor(chalkFunction: ChalkFunction) {
        this.chalkFunction = chalkFunction
    }
}



export const updateIndicator = (status: Status): void => {

    let redLed: Gpio | MockGpio;
    let yellowLed: Gpio | MockGpio;
    let greenLed: Gpio | MockGpio;
    
    if (Gpio.accessible) {
        console.log("GPIO compatible device");
    
        redLed = new Gpio(22, 'out')
        yellowLed = new Gpio(27, 'out')
        greenLed = new Gpio(17, 'out')
    }
    else {
        console.log("GPIO incompatible device, virtual led's will be used")
    
        redLed = new MockGpio(chalk.red)
        yellowLed = new MockGpio(chalk.yellow)
        greenLed = new MockGpio(chalk.green)
    }

    switch (status) {
        case Status.BUILDING:
            redLed.writeSync(0)
            yellowLed.writeSync(1)
            greenLed.writeSync(0)
            break;
        case Status.SUCCESS:
            console.log('success');
            redLed.writeSync(0)
            yellowLed.writeSync(0)
            greenLed.writeSync(1)
            break;
        case Status.FAILURE:
            redLed.writeSync(1)
            yellowLed.writeSync(0)
            greenLed.writeSync(0)
            break;

        default:
            break;
    }
    console.log(status);
}