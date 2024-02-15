export default class DNIGenerator {
    static asignactionArray = [
        {
            remainder: 0,
            letter: 'T',
        },
        {
            remainder: 1,
            letter: 'R',
        },
        {
            remainder: 2,
            letter: 'W',
        },
        {
            remainder: 3,
            letter: 'A',
        },
        {
            remainder: 4,
            letter: 'G',
        },
        {
            remainder: 5,
            letter: 'M',
        },
        {
            remainder: 6,
            letter: 'Y',
        },
        {
            remainder: 7,
            letter: 'F',
        },
        {
            remainder: 8,
            letter: 'P',
        },
        {
            remainder: 9,
            letter: 'D',
        },
        {
            remainder: 10,
            letter: 'X',
        },
        {
            remainder: 11,
            letter: 'B',
        },
        {
            remainder: 12,
            letter: 'N',
        },
        {
            remainder: 13,
            letter: 'J',
        },
        {
            remainder: 14,
            letter: 'Z',
        },
        {
            remainder: 15,
            letter: 'S',
        },
        {
            remainder: 16,
            letter: 'Q',
        },
        {
            remainder: 17,
            letter: 'V',
        },
        {
            remainder: 18,
            letter: 'H',
        },
        {
            remainder: 19,
            letter: 'L',
        },
        {
            remainder: 20,
            letter: 'C',
        },
        {
            remainder: 21,
            letter: 'K',
        },
        {
            remainder: 22,
            letter: 'E',
        },
    ];

    static generateDNI() {
        const dniNumber = Math.floor(Math.random() * (79000000 - 78000000) + 78000000);
        const dniLetter = this.asignactionArray.find(object => object.remainder === (dniNumber % 23)).letter;
        const fullDNI = dniNumber + dniLetter;
        return fullDNI
    }

    static verifyDNI(dni) {
        const letter = dni.slice(-1).toLowerCase();
        const number = dni.slice(0, -1);
        const realLetter = this.asignactionArray.find(object => object.remainder === (number % 23)).letter.toLowerCase();

        return realLetter === letter ? true : false;
    }
}