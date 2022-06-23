/**
Concurrency sendiri berarti beberapa komputasi yang terjadi pada saat yang bersamaan
- Bagaimana menjalankan program secara asynchronous
- Bagaimana menangani kode asynchronous

Dalam synchronous program, kode dijalankan secara berurutan dari atas ke bawah. 
Artinya jika kita menuliskan dua baris kode, maka baris kode kedua tidak bisa dieksekusi 
sebelum kode baris pertama selesai. Kita bisa bayangkan ini dalam kehidupan nyata 
ketika mengantri membeli kopi di sebuah kedai kopi. Kita tidak akan dilayani 
sebelum semua antrian di depan kita selesai dilayani, begitu pula orang di belakang kita 
pun harus menunggu gilirannya.

Dalam asynchronous program, jika kita menuliskan dua baris kode, 
kita dapat membuat baris kode kedua dieksekusi tanpa harus menunggu 
kode pada baris pertama selesai dieksekusi. Dalam dunia nyata kita bisa 
membayangkan dengan memesan kopi, tetapi pemesanannya melalui pelayan. 
Sembari menunggu pesannya datang, kita dapat melakukan aktivitas lain 
seperti membuka laptop, menulis, hingga kopi itu datang dengan sendirinya.

## 1 - setTimeout
Fungsi setTimeout() merupakan cara yang paling mudah untuk membuat 
kode kita dijalankan secara asynchronous. Fungsi ini menerima dua buah parameter. 
Parameter pertama adalah fungsi yang akan dijalankan secara asynchronous. 
Kedua adalah nilai number dalam milisecond sebagai nilai tunggu sebelum fungsi dijalankan. 
Contoh penggunaannya adalah seperti ini:
*/
console.log("Selamat datang!");
setTimeout(() => {
  console.log("Terima kasih sudah mampir, silakan datang kembali!");
}, 3000);
console.log("Ada yang bisa dibantu?");

// 2 - Callback Function

const orderCoffee = callback => {
    let coffee = null;
    console.log("Sedang membuat kopi, silakan tunggu...");
    setTimeout(() => {
        coffee = "Kopi sudah jadi!";
        callback(coffee);
    }, 3000);
}
 
 
orderCoffee(coffee => {
    console.log(coffee);
});

// 3 - Promise
function makeACake(...rawIngredients) {
    collectIngredients(rawIngredients)
        .then(makeTheDough)
        .then(pourDough)
        .then(bakeACake)
        .then(console.log);
}
/**

Promise merupakan sebuah objek yang digunakan untuk membuat sebuah komputasi (kode) 
ditangguhkan dan berjalan secara asynchronous.

Promise memiliki tiga kondisi, yaitu:

	1 Pending (Janji sedang dalam proses)
	2 Fulfilled (Janji terpenuhi)
	3 Rejected (Janji gagal terpenuhi)

Di dalam constructor Promise, kita perlu menetapkan resolver function atau bisa disebut executor function. 
Fungsi tersebut akan dijalankan secara otomatis ketika constructor Promise dipanggil.
*/
const executorFunction = (resolve, reject) => {
    const isCoffeeMakerReady = true;
    if (isCoffeeMakerReady) {
        resolve("Kopi berhasil dibuat");
    } else {
        reject("Mesin kopi tidak bisa digunakan");
    }
}
 
 
const makeCoffee = () => {
    return new Promise(executorFunction);
}
const coffeePromise = makeCoffee();
console.log(coffeePromise);
/**
Executor function memiliki dua parameter, yaitu resolve dan reject yang berupa fungsi. 
Berikut penjelasan detailnya:

resolve() adalah parameter pertama pada executor function. 
Parameter ini merupakan fungsi yang dapat menerima satu parameter. 
Biasanya kita gunakan untuk mengirimkan data ketika promise berhasil dilakukan.
 Ketika fungsi ini terpanggil, kondisi Promise akan berubah dari pending menjadi fulfilled.

reject() adalah parameter kedua pada executor function. 
Parameter ini merupakan fungsi yang dapat menerima satu parameter dan
 digunakan untuk memberikan alasan kenapa Promise tidak dapat terpenuhi. 
 Ketika fungsi ini terpanggil, kondisi Promise akan berubah dari pending menjadi rejected.
Executor function akan berjalan secara asynchronous hingga akhirnya kondisi 
Promise berubah dari pending menjadi fulfilled/rejected.
*/


// buat object untuk menyimpan stok dan fungsi yang mengembalikan objek Promise
const stock = {
    coffeeBeans: 250,
    water: 1000,
}
 
const checkStock = () => {
    return new Promise((resolve, reject) => {
        if (stock.coffeeBeans >= 16 && stock.water >= 250) {
            resolve("Stok cukup. Bisa membuat kopi");
        } else {
            reject("Stok tidak cukup");
        }
    });
};
// tambahkan dua fungsi untuk menangani masing-masing status resolve dan reject.
const handleSuccess = resolvedValue => {
    console.log(resolvedValue);
}
 
const handleFailure = rejectionReason => {
    console.log(rejectionReason);
}
// panggil method .then() pada checkStock() untuk menangani hasil yang dikembalikan dari promise.
checkStock()
	.then(handleSuccess)
  	.catch(handleFailure);

// 4 - Chaining Promises
const state = {
    stock: {
        coffeeBeans: 250,
        water: 1000,
    },
    isCoffeeMachineBusy: false,
}
 
const checkAvailability = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!state.isCoffeeMachineBusy) {
                resolve("Mesin kopi siap digunakan.");
            } else {
                reject("Maaf, mesin sedang sibuk.");
            }
        }, 1000);
    });
};
 
const checkStock = () => {
    return new Promise((resolve, reject) => {
        state.isCoffeeMachineBusy = true;
        setTimeout(() => {
            if (state.stock.coffeeBeans >= 16 && state.stock.water >= 250) {
                resolve("Stok cukup. Bisa membuat kopi.");
            } else {
                reject("Stok tidak cukup!");
            }
        }, 1500);
    });
};
 
const brewCoffee = () => {
    console.log("Membuatkan kopi Anda...")
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Kopi sudah siap!")
        }, 2000);
    });
};
 
function makeEspresso() {
    checkAvailability()
        .then((value) => {
            console.log(value);
            return checkStock();
        })
        .then((value) => {
            console.log(value)
            return brewCoffee();
        })
        .then(value => {
            console.log(value);
            state.isCoffeeMachineBusy = false;
        })
        .catch(rejectedReason => {
            console.log(rejectedReason);
            state.isCoffeeMachineBusy = false;
        });
}
 
makeEspresso();
 
/* output
Mesin kopi siap digunakan.
Stok cukup. Bisa membuat kopi.
Membuatkan kopi Anda...
Kopi sudah siap!
*/

// 5 - Promises All
const state = {
    stock: {
        coffeeBeans: 250,
        water: 1000,
    },
    isCoffeeMachineBusy: false,
}
 
const checkAvailability = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!state.isCoffeeMachineBusy) {
                resolve("Mesin kopi siap digunakan.");
            } else {
                reject("Maaf, mesin sedang sibuk.");
            }
        }, 1000);
    });
};
 
const checkStock = () => {
    return new Promise((resolve, reject) => {
        state.isCoffeeMachineBusy = true;
        setTimeout(() => {
            if (state.stock.coffeeBeans >= 16 && state.stock.water >= 250) {
                resolve("Stok cukup. Bisa membuat kopi.");
            } else {
                reject("Stok tidak cukup!");
            }
        }, 1500);
    });
};
 
const brewCoffee = () => {
    console.log("Membuatkan kopi Anda...")
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Kopi sudah siap!")
        }, 2000);
    });
};

const boilWater = () => {
    return new Promise((resolve, reject) => {
        console.log("Memanaskan air...");
        setTimeout(() => {
            resolve("Air panas sudah siap!");
        }, 2000);
    })
}
 
const grindCoffeeBeans = () => {
    return new Promise((resolve, reject) => {
        console.log("Menggiling biji kopi...");
        setTimeout(() => {
            resolve("Kopi sudah siap!");
        }, 1000);
    })
}
 
function makeEspresso() {
    checkAvailability()
        .then((value) => {
            console.log(value);
            return checkStock();
        })
        .then(value => {
            console.log(value);
            const promises = [boilWater(), grindCoffeeBeans()];
            return Promise.all(promises);
        })
        .then((value) => {
            console.log(value)
            return brewCoffee();
        })
        .then(value => {
            console.log(value);
            state.isCoffeeMachineBusy = false;
        })
        .catch(rejectedReason => {
            console.log(rejectedReason);
            state.isCoffeeMachineBusy = false;
        });
}
 
makeEspresso();
 
/* output
Mesin kopi siap digunakan.
Stok cukup. Bisa membuat kopi.
Membuatkan kopi Anda...
Kopi sudah siap!
*/

// 6 - Async and Await
const getCoffee = () => {
    return new Promise((resolve, reject) => {
        const seeds = 100;
        setTimeout(() => {
            if (seeds >= 10) {
                resolve("Kopi didapatkan!");
            } else {
                reject("Biji kopi habis!");
            }
        }, 1000);
    })
}

async function makeCoffee() {
    const coffee = await getCoffee();
    console.log(coffee);
}
 
makeCoffee();
 
/* output
Kopi didapatkan!
*/

// 7 - Handle onRejected using async-await

async function makeCoffee() {
    try {
        const coffee = await getCoffee();
        console.log(coffee);
    } catch (rejectedReason) {
        console.log(rejectedReason);
    }
}
 
makeCoffee();
 
/* output
Biji kopi habis!
*/

// 8 - Chaining Promise using async-await

async function makeEspresso() {
    try {
        await checkAvailability();
        await checkStock();
        await Promise.all([boilWater(), grindCoffeeBeans()]);
        const coffee = await brewCoffee();
        console.log(coffee);
    } catch (rejectedReason) {
        console.log(rejectedReason);
    }
}

// latihan
/**
 * Ini adalah program untuk mendapatkan nama user dari internet.
 * Terdapat dua fungsi yang sudah dibuat, berikut penjelasanya:
 *   - fetchingUserFromInternet:
 *     - fungsi ini digunakan untuk mendapatkan data user seolah-olah dari internet.
 *     - fungsi ini menerima dua argumen yakni callback, dan isOffline.
 *     - Argumen callback membawa dua nilai yakni error dan user:
 *       - error: NetworkError akan dibawa oleh callback bila isOffline bernilai true.
 *       - user: data user akan dibawa oleh callback bila isOffline bernilai false.
 *   - gettingUserName:
 *      - fungsi ini memanggil fungsi fetchingUserFromInternet dengan nilai isOffline: false untuk mendapatkan data user name dari internet.
 *      - fungsi ini harus mengembalikan nilai user.name, namun sulit karena menggunakan pola callback.
 *      - Maka dari itu, ubahlah fetchingUserFromInternet dari callback menjadi promise
 *      - Dengan begitu, Anda bisa memanfaatkan .then atau async/await untuk mendapatkan user.name.
 *
 * TODO: 1
 * - Ubahlah fungsi fetchingUserFromInternet dengan memanfaatkan Promise. Anda bisa menghapus implementasi callback.
 *
 * TODO: 2
 * - Ubahlah cara mengonsumsi fungsi fetchingUserFromInternet dari callback ke Promise.
 * - Tips:
 *   - Agar penulisan kode lebih bersih dan mudah dibaca, coba manfaatkan async/await
 *
 *
 * Notes:
 * - Jangan ubah struktur atau nilai dari objek user yang dibawa oleh callback sebelumnya.
 * - Tetap gunakan NetworkError untuk membawa nilai error pada Promise
 */

class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NetworkError';
  }
}

// TODO: 1
const fetchingUserFromInternet = async (isOffline) => {

    if (isOffline) {
      throw new NetworkError('Gagal mendapatkan data dari internet');
    } else {
      return { name: 'John', age: 18 };
    };
};


// TODO: 2
const gettingUserName = async () => {
  try {
    let user = await fetchingUserFromInternet(false);
    return user.name;
  }  catch (error) {
    return error.message;
  }
};

/**
 * Abaikan kode di bawah ini
 */

module.exports = { fetchingUserFromInternet, gettingUserName, NetworkError };


/**
Beberapa hal yang telah kita pelajari, antara lain:

	1 Menangani proses asynchronous dengan callback.
	2 Menangani proses asynchronous dengan Promise.
*/