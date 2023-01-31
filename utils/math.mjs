function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);

    return parseFloat(str);
}

function getFloatDecimal(float, decimals) {
    const str = float.toFixed(decimals);

    return parseFloat(str);
}

function getChanceBoolean(likelihood = 50){
    return Math.random() < (likelihood * 0.01);
}
export default {
    getRandomInt,
    getRandomFloat,
    getFloatDecimal,
    getChanceBoolean
}