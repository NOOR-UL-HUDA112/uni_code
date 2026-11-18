
function log(message) {
  console.log(message);

  
  let box = document.getElementById("jsOutput");

  if (box.textContent === "(results will appear here)") {
    box.textContent = "";
  }

  
  box.textContent += message + "\n";
}

// Clears the output box (called by the "Clear output" button)
function clearOutput() {
  document.getElementById("jsOutput").textContent = "(results will appear here)";
}



function externalJsDemo() {
  alert("Hello! (External JS from script.js)");
}



function outputDemo() {
  console.log("Hello Console!");        // visible in F12 -> Console
  log("console.log() printed: Hello Console!");

  alert("Hello Popup!");                // popup


function varDemo() {
  log("--- var demo ---");
  var name = 'Ali';
  log("name = " + name);

  var name = 'Ahmed';          // Redeclare: ALLOWED with var
  log("After redeclaring: name = " + name);

  name = 'Usman';              // Reassign: ALLOWED
  log("After reassigning: name = " + name);
}

// ----- let demo -----
function letDemo() {
  log("--- let demo ---");
  let age = 25;
  log("age = " + age);

  age = 26;                    // Reassign: ALLOWED
  log("After reassigning: age = " + age);

  // let age = 30;             // Redeclare: NOT allowed -> SyntaxError: Identifier 'age' has already been declared
  log("(let age = 30 again would cause a SyntaxError)");
}

// ----- const demo -----
function constDemo() {
  log("--- const demo ---");
  const country = "Pakistan";
  log("country = " + country);

  // try...catch lets us show the error message instead of stopping the program
  try {
    country = "Germany";       // Reassign: NOT allowed
  } catch (error) {
    log("Error: " + error.name + " -> " + error.message);
  }

  // SPECIAL NOTE: objects and arrays declared with const CAN be modified internally
  const student = { name: "Ali" };
  student.name = "Umar";       // Allowed (we change a property, not the variable itself)
  log("const object modified: student.name = " + student.name);

  const fruits = ["apple"];
  fruits.push("banana");       // Allowed
  log("const array modified: " + fruits);

  // student = {};             // NOT allowed (this would reassign the variable)
}

// ----- Scope demo: function scope (var) vs block scope (let, const) -----
function scopeDemo() {
  log("--- scope demo ---");

  // FUNCTION SCOPE (var): accessible in the whole function, ignoring block { } boundaries
  function test() {
    var x = 10;
    if (true) {
      var y = 20;              // declared inside a block, but var ignores the block
    }
    log("Inside function: x = " + x + ", y = " + y);   // both accessible
  }
  test();
  // console.log(x);           // Error: x is not defined (x lives only inside test())

  // BLOCK SCOPE (let, const): accessible only inside the { } where they are declared
  {
    let a = 5;
    const b = 15;
    log("Inside block: a = " + a + ", b = " + b);
  }
  // typeof does not throw an error for undeclared variables, so we use it to prove a and b are gone
  log("Outside block: typeof a = " + typeof a + ", typeof b = " + typeof b);   // "undefined"
}

// ----- Hoisting demo -----
// Hoisting: JS moves declarations to the top of their scope before running the code.
// var          -> hoisted + initialized as undefined
// let, const   -> hoisted but uninitialized (Temporal Dead Zone, TDZ)
function hoistingDemo() {
  log("--- hoisting demo ---");

  // var is hoisted and initialized as undefined -> no error
  log("Before assignment, var x = " + x);   // undefined
  var x = 5;
  log("After assignment, var x = " + x);    // 5

  // let is in the TDZ before its declaration -> ReferenceError
  try {
    log(y);                                 // y exists but is not initialized yet
  } catch (error) {
    log("let y before declaration -> " + error.name + " (TDZ)");
  }
  let y = 10;
  log("After declaration, let y = " + y);

  // TIP from the slides: declare variables at the TOP of your block/function.
}


/* ---------------------------------------------------------------------
   3.4 DATA TYPES
   Primitive: String, Number, Boolean, Null, Undefined, Symbol, BigInt
   Non-primitive: Object, Array
   --------------------------------------------------------------------- */
function dataTypesDemo() {
  log("--- data types demo ---");
  log("String    : " + typeof "Hello");
  log("Number    : " + typeof 25);
  log("Boolean   : " + typeof true);
  log("Undefined : " + typeof undefined);
  log("Null      : " + typeof null + "   (known JS quirk: typeof null is 'object')");
  log("Symbol    : " + typeof Symbol("id"));
  log("BigInt    : " + typeof 12345678901234567890n);

  let person = { name: 'Ali', age: 21 };             // Object
  let fruits = ['apple', 'banana', 'cherry'];        // Array
  log("Object    : " + typeof person + " -> " + JSON.stringify(person));
  log("Array     : " + typeof fruits + " -> " + fruits + "  (Array.isArray: " + Array.isArray(fruits) + ")");
}


/* ---------------------------------------------------------------------
   OPERATORS: arithmetic, comparison, logical
   --------------------------------------------------------------------- */
function operatorsDemo() {
  log("--- operators demo ---");

  // Arithmetic
  let a = 10, b = 3;
  log("a + b = " + (a + b));
  log("a - b = " + (a - b));
  log("a * b = " + (a * b));
  log("a / b = " + (a / b));
  log("a % b = " + (a % b) + "   (remainder)");

  // Comparison:  == compares VALUE only (type conversion), === compares VALUE and TYPE
  log("5 == '5'  -> " + (5 == '5'));     // true
  log("5 === '5' -> " + (5 === '5'));    // false

  // Logical
  log("true && false -> " + (true && false));   // AND: both must be true
  log("true || false -> " + (true || false));   // OR : at least one true
  log("!true         -> " + (!true));           // NOT
}


/* ---------------------------------------------------------------------
   FUNCTIONS: declaration, expression, arrow
   --------------------------------------------------------------------- */
function functionsDemo() {
  log("--- functions demo ---");

  // 1) Function Declaration (hoisted, can be called before it is written)
  function greet(name) {
    return 'Hello ' + name;
  }
  log("Declaration : " + greet('Ali'));

  // 2) Function Expression (stored in a variable, NOT hoisted)
  const square = function (x) {
    return x * x;
  };
  log("Expression  : square(4) = " + square(4));

  // 3) Arrow Function (short syntax)
  const add = (a, b) => a + b;
  log("Arrow       : add(5, 6) = " + add(5, 6));
}

document.addEventListener("DOMContentLoaded", function () {

  document.getElementById("accessBtn").addEventListener("click", function () {
    let heading = document.getElementById("title");
    let paragraph = document.querySelector(".intro");

    console.log(heading.textContent);       // Welcome
    console.log(paragraph.innerHTML);       // This is a paragraph.

    console.log("By class name:", document.getElementsByClassName("intro"));
    console.log("By tag name (number of <p>):", document.getElementsByTagName("p").length);
    console.log("querySelectorAll('.dom-box p'):", document.querySelectorAll(".dom-box p"));

    alert("Check the Console (F12) for the selected elements!");
  });


  
  document.getElementById("innerHtmlBtn").addEventListener("click", function () {
    // <b> is rendered as bold
    document.getElementById("msg").innerHTML = "New <b>bold</b> message!";
  });

  document.getElementById("textContentBtn").addEventListener("click", function () {
    // <b> is NOT rendered: shown literally as text
    document.getElementById("msg").textContent = "New <b>bold</b> message! (textContent)";
  });

  document.getElementById("innerTextBtn").addEventListener("click", function () {
    document.getElementById("msg").innerText = "Visible text (innerText)";
  });


  
  document.getElementById("attrBtn").addEventListener("click", function () {
    let image = document.getElementById("pic");
    console.log("Old alt:", image.getAttribute("alt"));        // dog
    image.setAttribute("src", "https://picsum.photos/id/40/150/100");
    image.setAttribute("alt", "cute cat");
    console.log("New alt:", image.getAttribute("alt"));        // cute cat
  });

  document.getElementById("removeAttrBtn").addEventListener("click", function () {
    let link = document.getElementById("domLink");
    link.removeAttribute("href");                              // link stops working
    link.textContent = "href removed - this link no longer works";
  });


  document.getElementById("styleBtn").addEventListener("click", function () {
    let h = document.getElementById("heading");
    h.style.color = "blue";
    h.style.fontSize = "30px";
    h.style.backgroundColor = "lightyellow";
  });

  // BEST PRACTICE: toggle a CSS class (.highlight is defined in style.css)
  document.getElementById("classBtn").addEventListener("click", function () {
    document.getElementById("heading").classList.toggle("highlight");
    // classList.add("x") / classList.remove("x") / classList.toggle("x")
  });


 
  document.getElementById("addFruitBtn").addEventListener("click", function () {
    let input = document.getElementById("fruitInput");

    // Do nothing if the input is empty
    if (input.value.trim() === "") {
      alert("Please type a fruit name first.");
      return;
    }

    let newItem = document.createElement("li");   // 1) create <li>
    newItem.textContent = input.value;            // 2) add text
    document.getElementById("fruits").appendChild(newItem);   // 3) append to the <ul>

    input.value = "";                             // clear the input box
  });

  document.getElementById("removeFruitBtn").addEventListener("click", function () {
    // Select the last <li> inside #fruits using a CSS selector
    let last = document.querySelector("#fruits li:last-child");
    if (last) {
      last.remove();
    }
  });

  document.getElementById("removeParaBtn").addEventListener("click", function () {
    let element = document.getElementById("removeMe");
    if (element) {            // check it still exists (it is null after being removed)
      element.remove();
    }
  });


  /* -------------------------------------------------------------------
     4.6 EVENTS
     An event is an action on the page (click, typing, hovering, loading).
     Common events: click, mouseover, keyup, change, submit
     addEventListener("eventName", function) is the RECOMMENDED way.
     (Inline attributes like onclick="..." also work but mix JS into HTML.)
     ------------------------------------------------------------------- */

  // click event
  document.getElementById("btn").addEventListener("click", function () {
    document.getElementById("output1").textContent = "Button Clicked!";
  });

  // mouseover / mouseout events
  let hoverBox = document.getElementById("hoverBox");
  hoverBox.addEventListener("mouseover", function () {
    hoverBox.style.backgroundColor = "lightgreen";
    hoverBox.textContent = "Mouse is over me!";
  });
  hoverBox.addEventListener("mouseout", function () {
    hoverBox.style.backgroundColor = "";           // "" resets to the CSS default
    hoverBox.textContent = "Hover your mouse over me (onmouseover)";
  });

  // keyup event: runs every time a key is released (live typing preview)
  document.getElementById("keyInput").addEventListener("keyup", function () {
    document.getElementById("keyOutput").textContent = "You typed: " + this.value;
  });

  // change event: runs when the value changes AND the input loses focus
  document.getElementById("changeInput").addEventListener("change", function () {
    document.getElementById("changeOutput").textContent = "Value changed to: " + this.value;
  });


  /* -------------------------------------------------------------------
     4.7 GETTING VALUES FROM FORMS (recommended way)
     addEventListener("submit", ...) listens for the form submit event.
     event.preventDefault() stops the page from refreshing.
     ------------------------------------------------------------------- */
  document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();                                    // stop page reload
    let emailValue = document.getElementById("email").value;   // .value = current input value
    console.log("Email Entered:", emailValue);
    document.getElementById("output3").textContent = "Email Entered: " + emailValue;
  });

}); // end of DOMContentLoaded


/* ---------------------------------------------------------------------
   GLOBAL FUNCTIONS used by inline onclick="..." attributes in index.html
   (They are outside DOMContentLoaded so the HTML attributes can find them.)
   --------------------------------------------------------------------- */

// Interactive example: change text and color without reloading the page
function changeText() {
  document.getElementById("greet").textContent = "Welcome to JavaScript DOM!";
  document.getElementById("greet").style.color = "green";
}

// Form method 1: read an input value and show it in an alert
function getValue() {
  let name = document.getElementById("username").value;
  alert("Entered Username: " + name);
}

// Display the input value on the page using innerText
function displayValue() {
  let inputValue = document.getElementById("username").value;
  document.getElementById("output2").innerText = "You entered: " + inputValue;
}
