
// Credit:  https://www.geeksforgeeks.org/convert-a-string-to-hexadecimal-ascii-values/
function decToHexa(n: number) {
    // char array to store
    // hexadecimal number
    var hexaDeciNum = new Array(100).fill(0);

    // counter for hexadecimal
    // number array
    var i = 0;

    while (n !== 0) {
      // temporary variable
      // to store remainder
      var temp = 0;

      // Storing remainder
      // in temp variable.
      temp = n % 16;

      // Check if temp < 10
      if (temp < 10) {
        hexaDeciNum[i] = String.fromCharCode(temp + 48);
        i++;
      } else {
        hexaDeciNum[i] = String.fromCharCode(temp + 87);
        i++;
      }

      n = Math.floor(n / 16); // check this
    }

    var ans = "";

    // Printing hexadecimal number
    // array in reverse order
    for (var j = i - 1; j >= 0; j--) {
      ans += hexaDeciNum[j];
    }

    return ans;
  }

  // Function to convert ASCII to HEX
  export function ASCIItoHEX(ascii: any) {
    // Initialize final String
    var hex = "";

    // Make a loop to iterate through
    // every character of ascii string
    for (var i = 0; i < ascii.length; i++) {
      // Take a char from
      // position i of string
      var ch = ascii[i];

      // Cast char to integer and
      // find its ascii value
      var tmp = ch.charCodeAt(0);

      // Change this ascii value
      // integer to hexadecimal value
      var part = decToHexa(tmp);

      // Add this hexadecimal value
      // to final string.
      hex += part;
    }

    // Return the final
    // string hex
    return `0x${hex.padEnd(64, '0')}`;
  }

  // Credit: https://stackoverflow.com/a/27418951
  export function HEXtoASCII(hex: string) {
    return hex.match(/.{1,2}/g)?.map(function(v){
        return String.fromCharCode(parseInt(v, 16));
      }).join('')
  }