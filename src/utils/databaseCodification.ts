/**
 * Change a string to not get database special characters errors
 * @param {string} valueToEncode - a string to encode to the database
 * @returns {string} an encoded string to use in the database
 */
export const encodeForDatabase = (valueToEncode: string): string => {
  const encodedValue = valueToEncode
    .split('.')
    .join('_P')
    .split('$')
    .join('_S')
    .split('#')
    .join('_H')
    .split('[')
    .join('_LB')
    .split(']')
    .join('_RB')
    .split('/')
    .join('_B')
  return encodedValue
}

/**
 * Decode a database string
 * @param {string} valueToDecode - a string to decode from the database
 * @returns {string} a decoded string to show the user
 */
export const decodeFromDatabase = (valueToDecode: string): string => {
  const decodedValue = valueToDecode
    .split('_P')
    .join('.')
    .split('_S')
    .join('$')
    .split('_H')
    .join('#')
    .split('_LB')
    .join('[')
    .split('_RB')
    .join(']')
    .split('_B')
    .join('/')
  return decodedValue
}
