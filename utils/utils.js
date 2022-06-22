
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Decimals = (amount) => {
    let point = 0

    if (amount > 999) {
        point = 0;
    } else if (amount > 0.9) {
        point = 2;
    } else if (amount > 0.009) {
        point = 4;
    } else if (amount > 0.0009) {
        point = 5;
    } else if (amount > 0.000009) {
        point = 7;
    } else if (amount > 0.000000009) {
        point = 11;
    }
    return numberWithCommas(amount.toFixed(point));
};
export { Decimals }