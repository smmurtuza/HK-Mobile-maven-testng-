// function fizzbuzz(n) {
//         for (let i = 1; i <= n; i++) {
//             if (i % 3 === 0 && i % 5 === 0) {
//                 console.log("FizzBuzz");
//             } else if (i % 3 === 0) {
//                 console.log("Fizz");
//             } else if (i % 5 === 0) {
//                 console.log("Buzz");
//             } else {
//                 console.log(i);
//             }
//         }
//     }
    
//     fizzbuzz(15);

function palindrome(str) {
    const cleanstr = str.replace(/\w/g, '').replace(/\s/g, '').toLowerCase();
    const reverseString = cleanstr.split('').reverse().join('');
        return cleanstr === reverseString;
  }
  
  // Example usage:
  const inputString = "RA CECAR";
  console.log(palindrome(inputString)); // Output: true