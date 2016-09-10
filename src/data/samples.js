const samples = [
  {
    "id": "WEVNB26J",
    "title": "Front-End Interview Prep",
    "description": "Typical interview questions for a front-end engineering position, with a focus on: Javascript, ReactJS, HTML5, CSS3, and HTTP.",
    "cards": [
      {
        "title": "What is a closure?",
        "answer": ""
      },
      {
        "title": "What is a callback?",
        "answer": ""
      },
      {
        "title": "What does IIFE stand for and what are its uses in practice?",
        "answer": ""
      },
      {
        "title": "How can you use scope a variable to keep a copy of i in a loop?",
        "answer": ""
      },
      {
        "title": "What is happens when you click a link to go to a website?",
        "answer": ""
      },
      {
        "title": "Describe the difference between classical inheritance vs prototypical inheritance",
        "answer": ""
      },
      {
        "title": "Difference between object-oriented programming vs functional",
        "answer": ""
      },
      {
        "title": "How can you tell what `this` is referencing at different points inside a function/class?",
        "answer": ""
      },
      {
        "title": "What is the difference between `<p>`, `<div>` and `<span>`?",
        "answer": ""
      },
      {
        "title": "What is the difference between CSS selectors: `.classA.classB`, `.classA .classB`, `.classA > .classB`",
        "answer": ""
      },
      {
        "title": "What is the difference between `x is undefined` and `x is not defined` error messages?",
        "answer": ""
      },
      {
        "title": "What does a `doctype` do?",
        "answer": ""
      },
      {
        "title": "Are there any problems with serving pages as `application/xhtml+xml`?",
        "answer": ""
      },
      {
        "title": "How do you serve a page with content in multiple languages?",
        "answer": ""
      },
      {
        "title": "What are `data-` attributes good for?",
        "answer": ""
      },
      {
        "title": "Describe the difference between a `cookie`, `sessionStorage` and `localStorage`",
        "answer": ""
      },
      {
        "title": "Describe the difference between `<script>`, `<script async>` and `<script defer>`",
        "answer": ""
      },
      {
        "title": "What is progressive rendering?",
        "answer": ""
      },
      {
        "title": "What is the difference between classes and IDs in CSS?",
        "answer": ""
      },
      {
        "title": "What's the difference between \"resetting\" and \"normalizing\" CSS? Which would you choose, and why?",
        "answer": "Normalizing CSS **preserves useful defaults**, whereas resetting CSS unstyles virtually everything."
      },
      {
        "title": "Explain CSS sprites, and how you would implement them on a page or site",
        "answer": ""
      },
      {
        "title": "How do you optimize your webpages for print?",
        "answer": ""
      },
      {
        "title": "Describe pseudo-elements and discuss what they are used for",
        "answer": ""
      },
      {
        "title": "What does `* { box-sizing: border-box; }` do? What are its advantages?",
        "answer": ""
      },
      {
        "title": "What's the difference between `inline` and `inline-block`?",
        "answer": ""
      },
      {
        "title": "What's the difference between a relative, fixed, absolute and statically positioned element?",
        "answer": ""
      },
      {
        "title": "The 'C' in CSS stands for Cascading. How is priority determined in assigning styles (a few examples)? How can you use this system to your advantage?",
        "answer": ""
      },
      {
        "title": "Explain event delegation in Javascript",
        "answer": ""
      },
      {
        "title": "Explain how `this` works in JavaScript",
        "answer": ""
      },
      {
        "title": "What's the difference between a variable that is: `null`, `undefined` or undeclared?",
        "answer": ""
      },
      {
        "title": "What is a closure, and how/why would you use one?",
        "answer": ""
      },
      {
        "title": "What's a typical use case for anonymous functions?",
        "answer": ""
      },
      {
        "title": "What's the difference between host objects and native objects?",
        "answer": "**Native objects** are objects that are specified in the ECMAScript standard. **Host objects** are objects provided by the environment, either the browser or V8 (Node)\n\n# Examples\nNative objects: Object (constructor), Date, Math, parseInt, eval, string methods like indexOf and replace, array methods, ...\n\nHost objects (assuming browser environment): window, document, location, history, XMLHttpRequest, setTimeout, getElementsByTagName, querySelectorAll, ..."
      },
      {
        "title": "What's the difference between `Function.call` and `Function.apply`?",
        "answer": "They both require a context for the first argument (usually `null` or `this`). The two functions are nearly identical, however, `Function.apply` accepts an array of values for the second argument. `Function.call` accepts n arguments after the context."
      },
      {
        "title": "Explain `Function.prototype.bind`",
        "answer": ""
      },
      {
        "title": "When would you use `document.write()`?",
        "answer": ""
      },
      {
        "title": "What's the difference between feature detection, feature inference, and using the UA string?",
        "answer": ""
      },
      {
        "title": "Explain Ajax in as much detail as possible",
        "answer": ""
      },
      {
        "title": "Explain how JSONP works (and how it's not really Ajax)",
        "answer": "JSONP - JSON with padding\n\nAllows for bypassing of cross-domain policies by injecting the request URL in a `<script>` tag instead of calling `XMLHttpRequest`.\nThis is functionality provided by jQuery"
      },
      {
        "title": "Explain \"hoisting\"",
        "answer": ""
      },
      {
        "title": "What is the difference between `==` and `===`?",
        "answer": ""
      },
      {
        "title": "What is `\"use strict\";`? What are the advantages and disadvantages to using it?",
        "answer": ""
      },
      {
        "title": "Explain what a single page app is and how to make one SEO-friendly",
        "answer": ""
      },
      {
        "title": "In the Javascript event loop, what is the difference between call stack and task queue?",
        "answer": ""
      },
      {
        "title": "What are the differences between Long-Polling, Websockets and Server-Sent Events?",
        "answer": ""
      },
      {
        "title": "What are HTTP methods? List all HTTP methods that you know, and explain them",
        "answer": ""
      },
      {
        "title": "Have you ever worked with retina graphics? If so, when and what techniques did you use?",
        "answer": ""
      },
      {
        "title": "Is there any reason you'd want to use translate() instead of absolute positioning, or vice-versa? And why?",
        "answer": ""
      },
      {
        "title": "What does `* { box-sizing: border-box; }` do? What are its advantages?",
        "answer": ""
      },
      {
        "title": "What are the different ways to visually hide content (and make it available only for screen readers)?",
        "answer": ""
      },
      {
        "title": "What's the primary difference between `Array.slice()` and `Array.splice()`?",
        "answer": "`splice()` mutates the array, whereas `slice()` does not.\n\nAlso totally different in functionality: `splice(startIndex, numItems)` and `slice(startIndex, endIndex)`"
      },
      {
        "title": "What features does the new HTTP2 protocol provide?",
        "answer": "- Header compression\n- Multiplexed connections (and therefore more than one concurrent connections)\n- Binary, not textual"
      }
    ]
  },
   {
     "id": "j82ssosK",
     "title": "California DMV Prep",
     "description": "Questions and answers that will help prepare for the California DMV drivers' license exam.",
     "cards": [
       {
         "title": "A police officer stops you because he suspects you are DUI. You refuse to take a chemical test. What happens now?",
         "answer": "If an officer suspects that you are under the influence of drugs, the officer can legally require you to take a blood or urine test. Drivers who refuse these tests are subject to longer driver license suspensions and revocations."
       },
       {
         "title": "In California, it is illegal for any person under the age of 21 to operate a motor vehicle if their Blood Alcohol Concentration is at or higher than what?",
         "answer": "Under California law, it is illegal for any person under the age of 21 to operate a motor vehicle with a BAC of **0.01% or higher**."
       },
       {
         "title": "When two vehicles meet on a steep road where neither vehicle can pass, the vehicle _______ must yield the right of way by backing up.",
         "answer": "When two vehicles meet on a steep road where neither vehicle can pass, it is the vehicle **pointing downhill** that should yield the right of way by backing up, because the vehicle facing downhill has the greater amount of control when backing up."
       },
       {
         "title": "If you receive too many negligent driver points, the DMV will do what?",
         "answer": "In the event that you receive too many negligent driver points, the DMV will either place you on probation for one year with an included six-month suspension, or revoke your driving privilege altogether.\n\n_[Page, 93. Suspension or Revocation by the DMV, Administrative, California Drivers Handbook]_"
       },
       {
         "title": "*Which of the following driving rules must you obey?",
         "answer": "When driving, there are additional rules to follow. Some include turning on your headlights within 30 minutes after sunset, leaving them on until thirty minutes before sunrise. Another is to always dim your lights to low within 500 feet of a vehicle coming towards you, or within 300 feet of a vehicle you are following. It is also important to drive as far to the right as possible on narrow mountain roads, honking your horn if visibility is lower than 200 feet\n\n_[Page, 90,91. Things You Must Do, Additional Driving Laws/ Rules, California Drivers Handbook]_"
       },
       {
         "title": "The Mature Driver Program is an eight-hour course for drivers of what age?",
         "answer": "The Mature Driver Program is an eight-hour course for drivers aged 55 years or older.\n\n_[Page, 18,19. Mature Driver Program, Miscellaneous Licensing Information, California Drivers Handbook]_"
       },
       {
         "title": "What is the DMV's standard vision requirement?",
         "answer": "The DMV's standard vision requirement is 20/40 for drivers with or without corrective vision. If you do not meet this requirement, you must set up an appointment with a vision specialist.\n\n_[Page, 16. Vision, Miscellaneous Licensing Information, California Drivers Handbook]_"
       },
       {
         "title": "A white painted curb means",
         "answer": "Loading zone for passengers or mail only"
       },
       {
         "title": "To avoid last minute moves, you should be looking down the road to where your vehicle will be in about _______ seconds.",
         "answer": "10 to 15 seconds"
       },
       {
         "title": "To turn left from a multilane one-way street onto a one-way street, you should turn from:",
         "answer": "The lane closest to the left curb."
       },
       {
         "title": "Unless otherwise posted the speed limit in a residential district is ___ mph.",
         "answer": "25"
       },
       {
         "title": "When can you drive in a bike lane?",
         "answer": "When you are within 200 feet of a cross street where you plan to turn right."
       },
       {
         "title": "With a Class C drivers license a person may drive",
         "answer": "A 3-axle vehicle if the Gross Vehicle Weight is less than 6,000 pounds.\n\nWith a valid Class C license you may drive:\n- any 2-axle vehicle with a Gross Vehicle Weight Rating (GVWR) of 26,000 lbs. or less.\n- any 3-axle vehicle weighing 6,000 lbs. or less gross.\n- any house car 40 feet or less.\n- a vanpool vehicle, designed to carry more than 10 but no more than 15 persons including the driver. The driver must have a valid medical certification on file with DMV and carry a valid medical card. The driver must also have a signed certification stating he/she has not been convicted of reckless driving, drunk driving, or hit-and-run in the last five years."
       },
       {
         "title": "When two vehicles from different directions arrive at the same time at a four-way stop, which one should be given the right-of-way?",
         "answer": "The vehicle approaching from the right.\n\nYield to the vehicle that arrives first, or to the vehicle on your right if it reaches the intersection at the same time as you."
       },
       {
         "title": "To avoid tailgating, use the ___ second rule",
         "answer": "**3 second rule**\n\nThe three-second rule refers to a following distance. Many drivers follow too closely (tailgate) and are not able to see as far ahead as they should because the vehicle ahead blocks their view. To avoid tailgating, use the three-second rule. \n\nIn some situations, you should allow a four-second or more cushion."
       },
       {
         "title": "What is considered a \"standard drink\"?",
         "answer": "A standard drink is defined as **12 ounces of beer, 5 ounces of wine, or 1.5 ounces of 80-proof distilled spirits**, all of which contain the same amount of alcohol."
       },
       {
         "title": "Parking close to the driveway entrance to a fire station is allowed, if you keep the following distance from the driveway",
         "answer": "More than 15 feet.\n\nThe law states: do not park within 15 feet of a fire hydrant or a fire station driveway."
       }
     ]
   },
   {
      id: "ABCDEFG",
      title: "ES6",
      description: "New keywords and concepts from ES6",
      url: "https://scontent.cdninstagram.com/hphotos-xap1/t51.2885-15/e35/12552326_495932673919321_1443393332_n.jpg",
      cards: [
         {
            title: "`typeof [DOMElement]` yields...",
            answer: "Node"
         },
         {
            title: "(T/F) WeakMaps have a length property",
            answer: "True, **WeakMaps** do not have a length"
         }
      ]
   },
   {
      id: "ZYXSAD",
      title: "React/Redux Study",
      description: "Material for studying basic concepts of the React/Redux framework.\n\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      url: "https://scontent.cdninstagram.com/hphotos-xap1/t51.2885-15/e35/12552326_495932673919321_1443393332_n.jpg",
      cards: [
         {
            title: "React is the ____ in MVC",
            answer: "View"
         },
         {
            title: "What is the mandatory function for a React Component?",
            answer: "render()\n\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n#quis nostrud \nexercitation ullamco laboris nisi ut aliquip ex ea commodo\nconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\ncillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\nproident, sunt in culpa qui officia deserunt mollit anim id est laborum."
         }
      ]
   }
];

export default samples;
