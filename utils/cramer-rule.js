/**
 * Clone two dimensional Array using ECMAScript 5 map function and EcmaScript 3 slice
 * @param  {array} m Input matrix (multidimensional array) to clone
 * @return {array}   New matrix copy
 */
function clone(m) {
  return m.map(a => a.slice());
}

/**
 * Inserts single dimensional array into
 * @param  {array} matrix multidimensional array to have ins inserted into
 * @param  {array} ins single dimensional array to be inserted vertically into matrix
 * @param  {array} at  zero based offset for ins to be inserted into matrix
 * @return {array}     New multidimensional array with ins replacing the at column in matrix
 */
function insertInTerms(matrix, ins, at) {
  const tmpMatrix = clone(matrix);
  let i;
  for (i = 0; i < matrix.length; i++) {
    tmpMatrix[i][at] = ins[i];
  }
  return tmpMatrix;
}
/**
 * Compute the determinate of a matrix.  No protection, assumes square matrix
 * function borrowed, and adapted from MIT Licensed numericjs library (www.numericjs.com)
 * @param  {array} m Input Matrix (multidimensional array)
 * @return {number}   result rounded to 2 decimal
 */
function getDeterminant(m) {
  const determinant = (m) => {
    switch (m.length) {
      case 1:
        return m[0][0];
      case 2:
        return m[0][0] * m[1][1] - m[0][1] * m[1][0];
      default:
        return m[0].reduce(
          (r, e, i) =>
            r + (-1) ** (i + 2) * e * determinant(
              m.slice(1).map(
                c => c.filter((_, j) => i != j),
              ),
            ), 0);
    }
  };
  return determinant(m);
}

/**
 * Compute Cramer's Rule
 * @param  {array} matrix    x,y,z, etc. terms
 * @param  {array} freeTerms
 * @return {array} solution for x,y,z, etc.
 */
function cramersRule(matrix, freeTerms) {
  const det = getDeterminant(matrix);
  const returnArray = [];
  let i;

  for (i = 0; i < matrix[0].length; i++) {
    const tmpMatrix = insertInTerms(matrix, freeTerms, i);
    returnArray.push(getDeterminant(tmpMatrix) / det);
  }
  return returnArray;
}

/**
 * ref:
 * https://rosettacode.org/wiki/Cramer%27s_rule#JavaScript
 * https://stackoverflow.com/questions/44474864/compute-determinant-of-a-matrix
 */

module.exports = cramersRule;
