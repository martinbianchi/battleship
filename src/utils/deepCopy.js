/**
 * 
 * @param {any} value 
 * 
 * @return Deep copy of the param
 */
export const deepCopy = (value) => {
    // We have simple data types inside the array. so this implementation is enough
    // if we want to change it later we have to change only one place.    
    return JSON.parse(JSON.stringify(value))
}