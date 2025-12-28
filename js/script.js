const books = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
  },
  {
    title: "1984",
    author: "George Orwell",
    year: 1949,
  },
];

const book = books[0];
let { title, year } = book;

console.log(title); // Output: To Kill a Mockingbird
console.log(year); // Output: 1960

// Rest and Spread Operators
const arr1 = [1, 2, 3, 4, 5];
const [first, second, ...rest] = arr1;
console.log(first, second, rest);
const newArr = [...arr1, 6, 7, 8];
console.log(newArr);

const obj1 = { a: 1, b: 2, c: 3 };
const { a, ...others } = obj1;
console.log(a, others);
const newObj = { ...obj1, d: 4, e: 5 };
console.log(newObj);

`My name is ${first}`;
const add = (x, y) => x + y;
console.log(add(5, 10)); // Output: 15

const obj3 = { a: { b: 1, c: 3 } };
const i = obj3.a.b;
const j = obj3.a.d?.e?.f ?? 0;
console.log(i + j);

const arr2 = [1, 2, 3, 4, 5, 6, 7, 8];
const arr3 = arr2.map((i, k) => i * 2);
console.log(arr3);

const arr4 = [1, 2, 3, 4, 5, 6, 7, 8];
const evenArr = arr4.filter((i) => (i & 1) === 0);
console.log(evenArr);

const receipt = [
  {
    item: "Apple",
    price: 15,
    quantity: 4,
  },
  {
    item: "Banana",
    price: 4,
    quantity: 6,
  },
];
receipt;

const total = receipt.reduce((sum, i) => sum + i.price * i.quantity, 0);
total;
const arrr = [1, 2, 3];
arrr.push(4);
arrr;
console.log([...arrr, 5]);
arrr.sort((x, y) => y - x);
arrr;

const z = arrr.map((i) => (i === 3 ? 33 : i));
z;

fetch("https://jsonplaceholder.typicode.com/todos")
  .then((res) => res.json())
  .then((data) => console.log(data));

let res = await fetch("https://jsonplaceholder.typicode.com/posts");
let res_json = await res.json();
res_json;
