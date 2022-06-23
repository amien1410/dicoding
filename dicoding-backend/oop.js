function Mail() {
    this.from = 'pengirim@dicoding.com';
};
 
Mail.prototype.sendMessage = function n(msg, to) {
  console.log(`you send: ${msg} to ${to} from ${this.from}`);
};

// pemanggilan
 
const mail1 = new Mail();
mail1.sendMessage('hallo', 'penerima@dicoding.com');
 
/**
output:
you send: hallo to penerima@dicoding.com from pengirim@dicoding.com
**/

// menggunakan prototype
const mail = new Mail();
mail.hasOwnProperty('sendMessage');
// hasilnya = false
 

// tanpa prototype
const mail = new Mail();
mail.hasOwnProperty('sendMessage');
// hasilnya = true


// Cara 2
class Mail {
    constructor() {
        this.from = 'pengirim@dicoding.com';
    }
 
    sendMessage(msg, to) {
        console.log(`you send: ${msg} to ${to} from ${this.from}`);
    };
}
 
const mail1 = new Mail();
mail1.sendMessage('hallo', 'penerima@dicoding.com');
 
/**
output:
you send: hallo to penerima@dicoding.com from pengirim@dicoding.com
**/

// PROPERTY AND METHODS
class Mail {
    constructor() {
        this.from = 'pengirim@dicoding.com';
        this.contacts = [];
    }
    sendMessage(msg, to, from) {
        console.log(`you send: ${msg} to ${to} from ${from}`);
        // from di sini merujuk ke `from` parameter, bukan ke `from` dari global value yaitu pengirim@dicoding.com
        this.contacts.push(to);
    };
}

const mail1 = new Mail();
mail1.sendMessage('hallo', 'penerima@dicoding.com', 'aku@gmail.com');

/**
you send: hallo to penerima@dicoding.com from aku@gmail.com
**/

/** 
cara 1, menggunakan var (hanya dapat digunakan pada penulisan kelas menggunakan statement `function`)
**/
var contacts = [];
// contoh
function Mail() {
    this.from = 'pengirim@dicoding.com';
    var contacts = [];
}
 
/**
cara 2, cara ini dapat digunakan pada penulisan kelas menggunakan statement `function` dan `class`
**/
this._contacts = []
// contoh
class Mail {
    constructor() {
        this._contacts = [];
        this.from = 'pengirim@dicoding.com';
    }
}
 
/** 
cara 3, menambahkan prefix # , cara ini dapat digunakan pada penulisan kelas menggunakan statement `class` saja 
  **/
#contacts = [];
// contoh
class Mail {
    #contacts = [];
    constructor() {
        this.from = 'pengirim@dicoding.com';
    }
}

const mail1 = new Mail();
mail1.from; // 'pengirim@dicoding.com'
mail1.contacts; // ['penerima@dicoding.com']
mail1.sendMessage('hallo', 'penerima@dicoding.com'); // method mengirim pesan


// STATIC METHOD
class Mail{
  static isValidPhone(phone) {
    return typeof phone === 'number';
  }
}

Mail.isValidPhone(089000000000) //true


// CONSTRUCTOR
// cara 1
class Mail {
    constructor(author) {
        this.from = author;
        console.log('is instantiated', author);
    };
}
 
// cara 2
function Mail(author) {
    this.from = author;
    console.log('is instantiated', author);
}

const mail1 = new Mail(085000111222); // misalkan untuk SMS
const mail2 = new Mail("emailku@dicoding.com"); // misalkan untuk Email

// ENCAPSULATION
class Mail{
    constructor(author) {
        this._contacts = [];
        this.from = author;
    }
    sendMessage = function(msg, to) {
        console.log('you send:', msg, 'to', to, 'from', this.from);
        this._contacts.push(to);
    }
    showAllContacts() {
        return this._contacts;
    }
}

// INHIRITENCE
class Mail {
    constructor(author) {
        this.from = author;
        this._contacts = [];
    }
    sendMessage(msg, to) {
        console.log(`you send: ${msg} to ${to} from ${this.from}`);
        this._contacts.push(to);
    }
    showAllContacts() {
        return this._contacts;
    }
}

class WhatsApp extends Mail {
    constructor() {
        super();
        this.username = 'dicoding';
        this.isBussinessAccount = true;
    }
    myProfile() {
        return `my name ${this.username}, is ${this.isBussinessAccount ? 'Business' : 'Personal'}`;
    }
}

const wa1 = new WhatsApp(080111000222);
console.log(wa1.myProfile());
// my name dicoding, is Business

// OVERRIDING CONSTRUCTOR
class WhatsApp extends Mail {
    constructor(username, isBussinessAccount, phone) {
        super(phone);
        this.username = username;
        this.isBussinessAccount = isBussinessAccount;
    }

    sendMessage(msg, to) {
	    super.sendMessage(msg, to);
	    console.log('Send by WA');
	}
}
 
const wa1 = new WhatsApp('dicoding', true, 089989090898);
wa1.sendMessage('halo', 089000999888);

// OBJECT COMPOSITION
// [1] list of abstractions
const canSendMessage = self => ({
    sendMessage: () => console.log('send message:', self.message)
  });

const checkIsValidPhone = self => ({
    isValid: () => console.log('valid phone', self.from)
  });

// [2] crate object composition
const personalEnterprise = (from, message, store) => {
  // [3] attributes
  const self = {
    from,
    message,
    store
  };
  // [4] method
  const personalEnterpriseBehaviors = self => ({
    createCatalog: () => console.log('Catalog has created: ', self.store)
  });
  
  // [5] create object composition
  return Object.assign(self, personalEnterpriseBehaviors(self), canSendMessage(self), checkIsValidPhone(self));
};

const pe1 = personalEnterprise('pengirim@gmail.com', 'hei produk baru nih', 'Dicoding Store');
pe1.createCatalog(); //Catalog has created:  Dicoding Store
pe1.sendMessage(); //send message: hei produk baru nih


// BUILT IN CLASS
// #1 tanpa parameter, yang berarti `myDate` akan berisi tanggal dan waktu saat ini
const myDate = new Date(); 
 
// #2 parameter tanggal dalam bentuk string, misal  "January 01, 2021" 
const myDate = new Date(dateString); 
 
// #3 parameter dalam bentuk number, misal 87400000
const myDate = new Date(miliseconds); 
 
// #4 parameter tanggal dalam bentuk number (7 parameter), [hour,minute,second,millisecond] bersifat opsional
const myDate = new Date(year,month,date,hour,minute,second,millisecond); 

// parameter birthday dapat berupa miliseconds ataupun date string
const myAge = birthday => {
  const birtday = new Date(birthday);
  const today = Date.now(); // today menghasilkan nilai miliseconds saat ini
  
  const diff_ms = today - birtday.getTime(); // menghitung selisih nilai miliseconds hari ini dan tanggal lahir
  const diffDate = new Date(diff_ms);
  
  return diffDate.getFullYear() - 1970; // 1970 adalah representasi 0 dari miliseconds
};

const listOfContent = [1,2,”President”, {}];
console.log(Array.isArray(listOfContent)); 
// result is true
 
const splitText = "12:20:00".split(':');
// result is [ '12', '20', '00' ]


// Testing Kode
function Animal(name, age, isMammal) {
	constructor() {
	   this.name = name;
	   this.age = age;
	   this.isMammal = isMammal;
	}
}

// Example method on the Animal object
Animal.prototype.getName = function() {
    return this.name;
}

function Mammal(name, hasHair) {
    // Use the parent constructor and set the correct `this`
    Animal.call(this, name);

    this.hasHair = hasHair;
}

// Inherit the Animal prototype
Mammal.prototype = Object.create(Animal.prototype);

// Set the Mammal constructor to 'Mammal'
Mammal.prototype.constructor = Mammal;

Mammal.prototype.getHasHair = function() {
    return this.hasHair;
}

function Dog(name, breed) {
    // Use the parent constructor and set the correct `this`
    // Assume the dog has hair
    Mammal.call(this, name, true);

    this.breed = breed;
}

// Inherit the Mammal prototype
Dog.prototype = Object.create(Mammal.prototype);

// Set the Dog constructor to 'Dog'
Dog.prototype.constructor = Dog;

Dog.prototype.getBreed = function() {
    return this.breed;
}

var fido = new Dog('Fido', 'Lab');

fido.getName();  // 'Fido'
fido.getHasHair(); // true
fido.getBreed(); // 'Lab'