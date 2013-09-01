[![Build Status](https://secure.travis-ci.org/parris/iz.png)](http://travis-ci.org/parris/iz)

What is it?
====
A validation library written for client/server side needs in javascript. Oh and awesome syntax is important to us too.

Setup
====

Server side (Node/CommonJS)
----

    npm install iz --save

Then you can include iz, are and validators if needed

    var iz = require('iz'),
        are = iz.are,
        validators = iz.validators;

Client Side
----
This depends on situation. If you are using CommonJS modules use the server side syntax.

If you are using AMD modules, you can run `npm build` or grab the latest dist/iz.js. You can include it on your page; however, you wish then:

    require(['iz', 'are', 'validators'], function(iz, are, validators) {

    });

If you are **not** using a module system you may want to take a look at OneJS/Browserify, and how we did client side builds in v0.2.0 (just view the tag on github).

API
====
Chaining:
----

    iz(10).between(2, 15).int().multiple(5); //why yes, yes it is
    iz(10).not().between(1, 5); // the fancy not operator will cause the opposite result to happen next. This is also true!

iz(), and all validation commands return an Iz object. An iz object always contains an `errors`{array} and `valid`{bool}. `errors` will be filled with a default error messsage for each incorrect field. To provide custom error messages you can do the following:

    var errors = {
        between: 'Is not between, please fix',
        not_between: 'Value must be between!',
        int: 'Not an int!!!',
        multiple: 'This is terrible and you should fix it'
    }
    iz('Bob', errors).between(2, 15).int().multiple(5);

Simple Checks
----
You don't need to use the chained notation. The following will return true or false:

    iz.between(3, 2, 5); //is 3, between 2 and 5?

JSON
----
It is often useful to get a list of validations from your server for a given model. Nested objects work to!

    var rules = {
        'cost': [
            {
                'rule': 'between',
                'args': [17, 1000],
                'error': 'The cost must be between 17, 1000'
            },
            {
                'rule': 'required',
                'error': 'You must specify a cost'
            },
        ],
        'producer.id': [
            {
                'rule': 'int',
                'error': 'Producer ID must be an int'
            }
        ],
        'producer.name.first': [
            {
                'rule': 'alphaNumeric',
                'error': 'Must be names and numbers'
            }
        ]
    };

    are(rules).validFor({
        cost: 20,
        producer: {
            id: 1,
            name: {
                first: 'bob'
            }
        }
    });

Are/Multiple rules
----
`are` doesn't just force you to use json validations. You could also check if any number of chained or json rules are valid.

    var wine = new Bottle({age: 30, cost: 1000.01}),
        costErrors = {
            number: 'Cost must be given as a number'
        },
        ageErrors = {
            int: 'Must be an whole number',
            between: 'This wine is too young, it's no good'
        },
        rules = {
            cost: iz(wine.cost, costErrors).decimal(),
            age: iz(wine.age, ageErrors)
                .int().between(17, 10000)
        },
        areRules = are(rules);

    areRules.valid(); // true

    rules.cost.setValue(2000.00);
    areRules.valid(); // true, setValue revalidates, as does are.valid

    rules.cost('hi'); // we didn't use setValue on the Iz cost object
    rules.cost.valid; // and valid is still true

    are(rules).valid() // but `valid()` will revalidate, false
    rules.cost.valid // and `valid` is now in the correct state again

    // or you can use this and just give null values in the rules object
    areRules.validFor(wine)

Required Fields:
----
In most cases, you'll only want to validate values when they exist. By default iz functions in this way. If you want to force the presence of a value you can use the `required` method.

    iz(value).required() //a value is required
    iz(value).required().email() //value is required and is a valid email
    iz(value).date() //value is not required but must be a date if provided

Validators:
----
All validators (apart from iz.required) return true if no value is provided (e.g. null, undefined or '').

Validations (true case in comments):

    iz.alphaNumeric(*);               // Is number or string(contains only numbers or strings)
    iz.between(number, start, end);   // Number is start or greater but less than or equal to end, all params numeric
    iz.blank(*);                      // Empty string
    iz.boolean(*);                    // true, false, 0, 1
    iz.cc(*);                         // Luhn checksum approved value
    iz.date(*);                       // Is a date obj or is a string that is easily converted to a date
    iz.decimal(*);                    // int or float
    iz.email(*);                      // Seems like a valid email address
    iz.empty(*);                      // If an object, array or function contains no properties true. All primitives return true.
    iz.equal(*, *);                   // Any 2 things are strictly equal. If 2 objects their internal properties will be checked. If the first parameter has an equals method that will be run instead
    iz.extension(ob1, ob2);           // If obj2's methods are all found in obj1
    iz.fileExtension(value, arr);     // Checks if the extension of value is in arr. An obj can be provide, but must have indexOf defined.
    iz.fileExtensionAudio(value);     // Check against mp3, ogg, wav, aac
    iz.fileExtensionImage(value);     // Check against png, jpg, jpeg, gif, bmp, svg, gif
    iz.inArray(value, arr);           // If * is in the array
    iz.int(*, bool (optional));       // Is an int. If the 2nd variable is true (false by default) a decimal is allowed
    iz.ip(str);                       // str resembles an IPV4 or IPV6 address
    iz.minLength(val, min);           // val (str or arr) is greater than min
    iz.maxLength(val, max);           // val (str or arr) is shorter than max
    iz.multiple(num, mult);           // Number is multiple of another number
    iz.number(*);                     // Is either an int or decimal
    iz.ofType(obj, typeName);         // If it is a named object, and the name matches the string
    iz.phone(str, canHaveExtension?); // Is an american phone number. Any punctuations are allowed.
    iz.postal(*);                     // Is a postal code or zip code
    iz.required(*);                   // Is not null, undefined or an empty string
    iz.ssn(*);                        // Is a social security number

Almost all possible use cases that will definitely work (and definitely not work) are in the spec folder.


Ommissions
====
- Uniqueness: This is non-trivial since it requires db/server side/client side knowledge.
- File: Not sure what the scope should be yet. Mime types? Existence on the web?
- Email (more in depth): Right now we check for the @ symbol. There are extremely complicated regex out there. I haven't really found the need. If you have an idea send a pull request!
- Money: The scope is really large. I am thinking about having localized settings.
- URL: No real non-crazy regex exists. Checking for http:// at the front is lame, why force your user to type that in?

Did I miss a validation? Send me a message or a pull request.

Change Log
====

Next: Refactor Iz class a bit. Add support for custom validations.

0.3.0
----
- Added JSON based validations
- Replaced previous build system with requirejs.
- Doc simplification
- Code style reformatting

0.2.0
----
- Added iz.required()
- Falsy values now pass through as valid without `.required`

0.1.0
----
- Fixed loading of iz, are and validator modules
- Added missing 'blank' validator
- Added build/test system via grunt
- Removed versions in bin
- Added version/generation number in banner
- Changed file structure

0.0.4
----
- Revalidation was added to iz
- Add are() for group validation
- Clean-up of syntax/optimizations

0.0.3
----
- Added equal method
- Added empty method
- Added not() operation

0.0.2
----
- Re-ordered parameters for fileExtension and inArray
- Added method chaining
- Added error messages
