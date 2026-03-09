Question 1 : What is the difference between var, let, and const?

ans :var → old, function-scoped, can redeclare & reassign

let → block-scoped, can reassign but cannot redeclare

const → block-scoped, cannot reassign or redeclare

 Modern practice: Use const by default, let if value changes,we should avoid var.




 Question2: What is the spread operator (...)?

 ans:The spread operator (...) expands arrays, objects, or iterables into individual elements.

 example :  const numbers = [1, 2, 3];

console.log(...numbers); 
....



Question3:What is the difference between map(), filter(), and forEach()?


ans:In JavaScript, map(), filter(), and forEach() are array methods, but they are used for different purposes.

map() → transform items

filter() → select items

forEach() → just loop through items



Question4:What is an arrow function?


ans:In JavaScript, an arrow function is a shorter way to write a function,  in  (ES6).

example :const add = (a, b) => a + b;


Question5:



ans: Template literals are strings written with backticks(`) that allow embedding variables using ${} and support multi-line text
 
 example:const text = `This is
   me`;
