// Mengetahui Paradigma Functional Programming.
// Mengetahui konsep Pure Function, Immutability, dan Higher-Order Function.
// Menggunakan Reusable Function yang ada pada JavaScript.

// 1 IMPERATIF
const names = ['Harry', 'Ron', 'Jeff', 'Thomas'];

const newNamesWithExcMark = [];

for(let i = 0; i < names.length; i++) {
  newNamesWithExcMark.push(`${names[i]}!`);
}

console.log(newNamesWithExcMark);

/* output:
   [ 'Harry!', 'Ron!', 'Jeff!', 'Thomas!' ]
*/

// 2 DEKRALATIF
const names = ['Harry', 'Ron', 'Jeff', 'Thomas'];

const newNamesWithExcMark = names.map((name) => `${name}!`);

console.log(newNamesWithExcMark);

/* output:
 * [ 'Harry!', 'Ron!', 'Jeff!', 'Thomas!' ]
 */

// 3 Pure Function
// Mengembalikan nilai yang sama bila inputannya (nilai parameter) sama.
// Hanya bergantung pada argumen yang diberikan.
// Tidak menimbulkan efek samping.

// IMPURE 1
let PI = 3.14;

const hitungLuasLingkaran = (jariJari) => {
  return PI * (jariJari * jariJari); 
}

console.log(hitungLuasLingkaran(4)); // 50.24

PI = 5; // tidak sengaja nilai PI berubah

console.log(hitungLuasLingkaran(4)); // 80

// IMPURE 2

const createPersonWithAge = (age, person) => {
  person.age = age;
  return person;
};

const person = {
  name: 'Bobo'
};

const newPerson = createPersonWithAge(18, person);

console.log({
  person,
  newPerson
});

/**
 * Output:
 *  {
      person: { name: 'Bobo', age: 18 },
      newPerson: { name: 'Bobo', age: 18 }
    }
*/

// PURE 1
const hitungLuasLingkaran = (jariJari) => {
  return 3.14 * (jariJari * jariJari); 
}

console.log(hitungLuasLingkaran(4)); // 50.24
console.log(hitungLuasLingkaran(4)); // 50.24
console.log(hitungLuasLingkaran(8)); // 200.96
console.log(hitungLuasLingkaran(8)); // 200.96

// PURE 2
const createPersonWithAge = (age, person) => {
  return { ...person, age };
};

const person = {
  name: 'Bobo'
};

const newPerson = createPersonWithAge(18, person);

console.log({
  person,
  newPerson
});

/**
 * Output:
 *  { 
 *    person: { name: 'Bobo' },
 *    newPerson: { name: 'Bobo', age: 18 } 
 *  }
*/


 // 4 Immutability,
// NOT GOOD
const user = {
    firstname: 'Harry',
    lastName: 'Protter', // ups, typo!
}

const renameLastNameUser = (newLastName, user) => {
    user.lastName = newLastName;
}

renameLastNameUser('Potter', user);

console.log(user);

/**
 * output:
 * { firstname: 'Harry', lastName: 'Potter' }
 * 
 */

 // GOOD
 const user = {
    firstname: 'Harry',
    lastName: 'Protter', // ups, typo!
}

const createUserWithNewLastName = (newLastName, user) => {
    return { ...user, lastName: newLastName }
}

const newUser = createUserWithNewLastName('Potter', user);

console.log(newUser);

/**
 * output:
 * { firstname: 'Harry', lastName: 'Potter' }
 * 
 */

 // 5 Recursive
 // NOT GOOD
 const countDown = start => {
  do {
    console.log(start);
    start -=1;
  }
  while(start > 0);
};
 
countDown(10);

// GOOD
const countDown = start => {
  console.log(start);
  if(start > 0) countDown(start-1);
};

countDown(10);

// 6 High-Order Function.
/**
 Teknik Higher-Order Function biasanya digunakan untuk:

	Mengabstraksi atau mengisolasi sebuah aksi, event, atau menangani alur asynchronous menggunakan callback, promise, dan lainnya.
	Membuat utilities yang dapat digunakan di berbagai tipe data.
	Membuat teknik currying atau function composition.

*/
// EXAMPLE 1
const hello = () => {
  console.log('Hello!')
};

const say = (someFunction) => {
  someFunction();
}

const sayHello = () => {
    return () => {
        console.log('Hello!');
    }
}

hello();
say(hello);
sayHello()();

/**
 * Hello!
 * Hello!
 * Hello!
 */

 // EXAMPLE 2
const names = ['Harry', 'Ron', 'Jeff', 'Thomas'];

const arrayMap = (arr, action) => {
  const loopTrough = (arr, action, newArray = [], index = 0) => {
    const item = arr[index];
    if(!item) return newArray;
    return loopTrough(arr, action, [...newArray, action(arr[index])], index + 1);
  }

  return loopTrough(arr, action);
}


const newNames = arrayMap(names, (name) => `${name}!` );

console.log({
    names,
    newNames,
});

/**
 * output:
 * {
 *   names: [ 'Harry', 'Ron', 'Jeff', 'Thomas' ],
 *   newNames: [ 'Harry!', 'Ron!', 'Jeff!', 'Thomas!' ]
 * }
 */

 // ARRAY.MAP
 const newArray = ['Harry', 'Ron', 'Jeff', 'Thomas'].map((name) => { return `${name}!`});

console.log(newArray);

/**
 * [ 'Harry!', 'Ron!', 'Jeff!', 'Thomas!' ]
 * 
 */

 // ARRAY.FILTER
 const truthyArray = [1, '', 'Hallo', 0, null, 'Harry', 14].filter((item) => Boolean(item));

console.log(truthyArray);

/**
 * output:
 * [ 1, 'Hallo', 'Harry', 14 ]
 * 
 */

 // ARRAY.REDUCE
 const students = [
  {
    name: 'Harry',
    score: 60,
  },
  {
    name: 'James',
    score: 88,
  },
  {
    name: 'Ron',
    score: 90,
  },
  {
    name: 'Bethy',
    score: 75,
  }
];

const totalScore = students.reduce((acc, student) => acc + student.score, 0);

console.log(totalScore);

/**
 * output:
 * 313
 * 
 */

 // ARRAY.SOME
const array = [1, 2, 3, 4, 5];
const even = array.some(element => element % 2 === 0);

console.log(even);

/** 
output true
**/

// ARRAY.SORT => Secara default, fungsi sort akan mengubah semua nilai dalam 
// deretan menjadi bentuk string dan mengurutkannya secara ascending.

const months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort();
console.log(months);
// output: [ 'Dec', 'Feb', 'Jan', 'March' ]

const array1 = [1, 30, 4, 1000, 101, 121];
array1.sort();
console.log(array1);
// output: [ 1, 1000, 101, 121, 30, 4 ]

// CUSTOME CRITERIA
const compareNumber = (a, b) => {
  return a - b;
};
const sorting = array1.sort(compareNumber);
console.log(sorting);

/**
output
[ 1, 4, 30, 1000 ]
**/

// ARRAY.EVERY
const scores = [70,85,90];
const minimumScore = 65;

const examPassed = scores.every(score => score >= minimumScore);
console.log(examPassed);

/**
output
true
**/

// ARRAY.FOREACH
const names = ['Harry', 'Ron', 'Jeff', 'Thomas'];
 
names.forEach((name) => {
  console.log(`Hello, ${name}!`);
});

// OPERATOR BREAK CONTINUE
const names = ['Harry', 'Ron', 'Jeff', 'Thomas'];
 
for(let i = 0; i < names.length; i++) {
  if(names[i] === 'Jeff') continue; // Bisa!
  
  console.log(`Hello, ${names[i]}!`);
}
 
names.forEach((name) => {
  if(name === 'Jeff') continue; // Tidak Bisa!
  console.log(`Hello, ${name}`);
});