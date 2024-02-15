export default class SSNGenerator {
    static generateSSN() {
        const firstDigit = Math.floor(Math.random() * 7);
        const secondDigit = Math.floor(Math.random() * 10);
        const eightDigits = Math.floor(Math.random() * 100000000);
        const tenDigits = firstDigit + '' + secondDigit + '' + eightDigits;
        const lastTwoDigits = parseInt(tenDigits) % 97;
        const fullSSN = tenDigits + lastTwoDigits.toString().padStart(2, '0');

        return fullSSN;
    }
}