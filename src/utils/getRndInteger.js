/**
 * 
 * @param {number} min 
 * @param {number} max 
 * 
 * @returns {number} random integer between min and max. Including min and excluding max.
 */
export const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}
