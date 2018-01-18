export default function createSeedlines(field, lastFour) {

    const lastFourStartIdx = field.indexOf(lastFour[0]);
    const lastFourTwoIdx = field.indexOf(lastFour[1]);
    const lastFourThreeIdx = field.indexOf(lastFour[2]);
    const lastFourEndIdx = field.indexOf(lastFour[3]);
    field[lastFourStartIdx] = field[lastFourStartIdx] + '/' + field[lastFourTwoIdx];
    field[lastFourThreeIdx] = field[lastFourThreeIdx] + '/' + field[lastFourEndIdx];
    field.splice(lastFourTwoIdx, 1);
    field.splice(lastFourEndIdx, 1);
    
    let seed1 = field.slice(0, 4);
    let seed2 = field.slice(4, 8);
    let seed3 = field.slice(8, 12);
    let seed4 = field.slice(12, 16);
    let seed5 = field.slice(16, 20);
    let seed6 = field.slice(20, 24);
    let seed7 = field.slice(24, 28);
    let seed8 = field.slice(28, 32);
    let seed9 = field.slice(32, 36);
    let seed10 = field.slice(36, 40);
    let seed11 = field.slice(40, 44);
    let seed12 = field.slice(44, 48);
    let seed13 = field.slice(48, 52);
    let seed14 = field.slice(52, 56);
    let seed15 = field.slice(56, 60);
    let seed16 = field.slice(60, 66);

    return [
        seed1,
        seed2,
        seed3,
        seed4,
        seed5,
        seed6,
        seed7,
        seed8,
        seed9,
        seed10,
        seed11,
        seed12,
        seed13,
        seed14,
        seed15,
        seed16
    ]
}