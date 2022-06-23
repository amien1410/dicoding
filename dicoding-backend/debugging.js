/**
Pada modul ini, kita akan mempelajari beberapa hal, seperti:

Bagaimana menangani error yang mungkin muncul pada aplikasi supaya tidak crash.
Membuat custom error untuk menandai error yang tidak tersedia pada JavaScript.
*/

/**
1 - Try and Catch
Taruh kode yang berpeluang menimbulkan eror di dalam blok try. 
Apabila terjadi eror di dalam blok kode try, maka ia akan ditangkap dan ditangani oleh blok kode catch. 
Sementara, jika tidak terjadi eror pada kode, maka blok catch akan diabaikan.
*/

try {
    console.log("Awal blok try");   // (1)
    errorCode;                      // (2)
    console.log("Akhir blok try");  // (3)
} catch (error) {
    console.log(error.name);
    console.log(error.message);
    console.log(error.stack);
}
 
/* output
Awal blok try
ReferenceError
errorCode is not defined
ReferenceError: errorCode is not defined
    at file:///home/dicoding/Playground/javascript/CoffeeMachine/error.js:3:5
    at ModuleJob.run (internal/modules/esm/module_job.js:152:23)
    at async Loader.import (internal/modules/esm/loader.js:166:24)
    at async Object.loadESM (internal/process/esm_loader.js:68:5)
*/

/**
2 - Try - Catch - Finally
Selain try dan catch, ada satu blok lagi yang ada dalam mekanisme 
error handling pada JavaScript, yaitu finally. 
Blok finally akan tetap dijalankan tanpa peduli 
apa pun hasil yang terjadi pada blok try-catch.
*/

try {
    console.log("Awal blok try");
    console.log("Akhir blok try");
} catch (error) {
    console.log("Baris ini diabaikan");
} finally {
    console.log("Akan tetap dieksekusi");
}

/**
throw. Operator ini akan “melemparkan” eror pada program, 
sehingga eksekusi kode akan masuk pada blok catch. 
Berikut ini adalah contoh mengimplementasikan throw untuk menimbulkan eror kita sendiri
*/

let json = '{ "age": 20 }';
 
try {
    let user = JSON.parse(json);
 
    if (!user.name) {
        throw new SyntaxError("'name' is required.");
    }
 
    console.log(user.name); // undefined
    console.log(user.age);  // 20
} catch (error) {
    console.log(`JSON Error: ${error.message}`);
}
 
/* output
JSON Error: 'name' is required.
*/

/**
menampilkan pesan eror sesuai eror yang muncul
*/
let json = '{ "name": "Yoda", "age": 20 }';
 
try {
    let user = JSON.parse(json);
 
    if (!user.name) {
        throw new SyntaxError("'name' is required.");
    }
 
    errorCode;
 
    console.log(user.name); // Yoda
    console.log(user.age);  // 20
} catch (error) {
    if (error instanceof SyntaxError) {
        console.log(`JSON Error: ${error.message}`);
    } else if (error instanceof ReferenceError) {
        console.log(error.message);
    } else {
        console.log(error.stack);
    }
}
 
/* output
JSON Error: errorCode is not defined
*/

/**
3 - Membuat kustom kelas Error sendiri
*/
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}
 
let json = '{ "age": 30 }';
 
try {
    let user = JSON.parse(json);
 
    if (!user.name) {
        throw new ValidationError("'name' is required.");
    }
    if (!user.age) {
        throw new ValidationError("'age' is required.");
    }
 
    console.log(user.name);
    console.log(user.age);
} catch (error) {
    if (error instanceof SyntaxError) {
        console.log(`JSON Syntax Error: ${error.message}`);
    } else if (error instanceof ValidationError) {
        console.log(`Invalid data: ${error.message}`);
    } else if (error instanceof ReferenceError) {
        console.log(error.message);
    } else {
        console.log(error.stack);
    }
}
 
/* output
Invalid data: 'name' is required.
*/

// Latihan
/**
 * Saat ini, Anda sudah memiliki fungsi detectTriangle yang berguna untuk
 * mendeteksi jenis segitiga berdasarkan nilai argumen.
 * Contoh:
 *  - 1, 1, 1 -> Segitiga sama sisi
 *  - 4, 4, 2 -> Segitiga sama kaki
 *  - 3, 4, 6 -> Segitiga sembarang
 *
 * Namun fungsi detectTriangle belum berjalan dengan baik karena
 * bila ada argumen fungsi yang bukan number, alih-alih error, ia akan mengembalikan "Segitiga sembarang".
 * Contoh:
 *  - 1, false, 1 -> Segitiga sembarang
 *  - 'a', 3, 5 -> Segitiga sembarang
 *  - 12, 2, null -> Segitiga sembarang
 * Kondisi yang diharapkan:
 *  - 1, false, 1 -> Argumen kedua harus number
 *  - 'a', 3, 5 -> Argumen pertama harus number
 *  - 12, 2, null -> Argumen ketiga harus number
 *
 *  Tugas Anda adalah memperbaiki fungsi detectTriangle agar berjalan dengan kondisi yang diharapkan.
 *  Pastikan Anda menggunakan teknik Throwing dan Handling Error yah.
 *
 * TODO 1:
 * - Buatlah class ValidationError yang merupakan custom error dengan spesifikasi berikut:
 *   - Turunan dari class Error
 *   - Memiliki constructor(message)
 *   - this.name harus bernilai "ValidationError"
 *
 * TODO 2:
 * - Buatlah fungsi validateNumberInput yang memvalidasi 3 buah input (argumen) dengan spesifikasi berikut:
 *   - Menerima 3 argumen
 *   - Bila argumen pertama bukan number:
 *     - throw ValidationError dengan pesan 'Argumen pertama harus number'
 *   - Bila argumen kedua bukan number:
 *     - throw ValidationError dengan pesan 'Argumen kedua harus number'
 *   - Bila argumen ketiga bukan number:
 *     - throw ValidationError dengan pesan 'Argumen ketiga harus number'
 *
 * TODO 3:
 * - Panggil fungsi validateNumberInput di dalam fungsi detectTriangle untuk memvalidasi nilai argumen a, b, dan c.
 *   - pastikan Anda memanggil validateNumberInput menggunakan try .. catch.
 *   - bila block catch terpanggil, kembalikan fungsi detectTriangle dengan pesan error yang dibawa fungsi validateNumberInput.
 */


// TODO 1
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}
// TODO 2
const validateNumberInput = (a,b,c) => {
   	if (typeof a !== 'number') {
        throw new ValidationError("Argumen pertama harus number");
    }
    if (typeof b !== 'number') {
        throw new ValidationError("Argumen kedua harus number");
    }
    if (typeof c !== 'number') {
        throw new ValidationError("Argumen ketiga harus number");
    }
}

const detectTriangle = (a, b, c) => {
  // TODO 3
	try{
		validateNumberInput(a,b,c);
		if (a === b && b === c) {
		    return 'Segitiga sama sisi';
		}

		if (a === b || a === c || b === c) {
		    return 'Segitiga sama kaki';
		}

		return 'Segitiga sembarang';
	} catch (error) {
		if (error instanceof ValidationError) {
	        return error.message;
		}
	}
  
};

/**
 * Jangan hapus kode di bawah ini
 */
module.exports = { ValidationError, validateNumberInput, detectTriangle };

+
/**
Beberapa poin yang sudah kita bahas di antaranya:

Penggunaan sintaksis try-catch untuk menangani eror.
Melemparkan eror sendiri yang tidak terdeteksi oleh JavaScript.
Membuat kelas sendiri untuk menandai eror yang tidak tersedia di JavaScript.
*/


