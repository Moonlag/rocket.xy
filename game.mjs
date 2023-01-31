import UtilMath from './utils/math.mjs'

const TIME = 3000;
const SPEED_MIN = 100;
const SPEED_MAX = 500;
const CHANCE_MIN = 0.5;
const CHANCE_MAX = 5;
const INCREMENT = 1.00;
export const Game = () => {
    let status = 1;
    let increment = INCREMENT;
    let speed = UtilMath.getRandomInt(SPEED_MIN, SPEED_MAX);
    let timePreparing = TIME;
    const start = (callback) => {
        return new Promise((resolve, reject) => {
            resolve(callback({ status, increment, timePreparing }))
        })
    }

    const stop = (callback) => {
        status = 3
        return new Promise((resolve, reject) => {
            resolve(callback({ status, increment, timePreparing }))
        })
    }

    const processing = (callback) => {
        status = 2
        speed = UtilMath.getRandomInt(SPEED_MIN, SPEED_MAX)
        const chanceStop = UtilMath.getRandomInt(CHANCE_MIN, CHANCE_MAX)
        return new Promise((resolve, reject) => {
            const processInterval = setInterval(() => {
                increment = UtilMath.getFloatDecimal(increment + 0.01, 2)
                callback({ status, increment, timePreparing })
                if(UtilMath.getChanceBoolean(chanceStop)){
                    clearInterval(processInterval)
                    resolve()
                }
            }, speed)
        })
    }

    const preparing = (callback) => {
        status = 1
        increment = INCREMENT
        timePreparing = TIME
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(callback({ status, increment, timePreparing }))
            }, timePreparing)
        })
    }

    function getStatus() {
        return status
    }

    function getIncrement() {
        return increment
    }

    return {
        getIncrement,
        getStatus,
        timePreparing,
        start,
        stop,
        processing,
        preparing
    }
};

