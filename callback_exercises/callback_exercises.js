class Clock {
  constructor() {
    // 1. Create a Date object.
    const current_date = new Date();
    // 2. Store the hours, minutes, and seconds.
    this.hr = current_date.getHours();
    this.min = current_date.getMinutes();
    this.sec = current_date.getSeconds();
    // 3. Call printTime.
    this.printTime();
    // 4. Schedule the tick at 1 second intervals.
    setInterval(this._tick.bind(this), 1000);
  }

  printTime() {
    // Format the time in HH:MM:SS
    const print_hr = (this.hr < 10 ? "0" + this.hr : this.hr);
    const print_min = (this.min < 10 ? "0" + this.min : this.min);
    const print_sec = (this.sec < 10 ? "0" + this.sec : this.sec);
    // Use console.log to print it.
    console.log(print_hr + ":" + print_min + ":" + print_sec);
  }

  _tick() {
    // 1. Increment the time by one second.
    // 2. Call printTime.

    this.sec++;

    if (this.sec === 60) {
      this.sec = 0;
      this.min++;
    } if (this.min === 60) {
      this.min = 0;
      this.hr++;
    } if (this.hr === 24) {
      this.hr = 0;
    }

    this.printTime();
  }
}

// const clock = new Clock();

const readline = require("readline");
const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function addNumbers(sum, numsLeft, completionCallback) {
  if(numsLeft > 0) {
    reader.question('Enter a number: ', answer => {
      let newSum = parseInt(answer) + sum;
      console.log('New sum: ' + newSum);
      addNumbers(newSum, numsLeft - 1, completionCallback);
    })
  } else if(numsLeft === 0) {
    reader.close();
    completionCallback(sum);
  }
}

// addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));

function absurdBubbleSort(arr, sortCompletionCallback) {
  function askIfGreaterThan(el1, el2, callback) {
    let response = false;
    reader.question(`Is ${el1} greater than ${el2}? yes or no? `, answer => {
      if (answer === "yes") {
        response = true;
      }
    })
    return response;
  }

  let sorted = false;

  while(!sorted) {
    sorted = true;
    for(let i = 0; i < arr.length-1; i++) {
      if (askIfGreaterThan(arr[i], arr[i+1])) {
        [arr[i], arr[i+1]] = [arr[i+1], arr[i]];
        sorted = false;
      }
    }
  }
  return arr;
}

// Write this first.
function askIfGreaterThan(el1, el2, callback) {
  // Prompt user to tell us whether el1 > el2; pass true back to the
  // callback if true; else false.
  reader.question(`Is ${el1} greater than ${el2}? yes or no? `, answer => {
    if (answer === "yes") {
      callback(true);
    } else if (answer === "no") {
      callback(false);
    }
  })
}

// Once you're done testing askIfGreaterThan with dummy arguments, write this.
function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
  // Do an "async loop":
  // 1. If (i == arr.length - 1), call outerBubbleSortLoop, letting it
  //    know whether any swap was made.
  // 2. Else, use `askIfGreaterThan` to compare `arr[i]` and `arr[i +
  //    1]`. Swap if necessary. Call `innerBubbleSortLoop` again to
  //    continue the inner loop. You'll want to increment i for the
  //    next call, and possibly switch madeAnySwaps if you did swap.
  if (i === arr.length - 1) {
    outerBubbleSortLoop(madeAnySwaps);
  } else {
    askIfGreaterThan(arr[i], arr[i+1], (isGreaterThan) => {
      if (isGreaterThan) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        innerBubbleSortLoop(arr, i+1, true, outerBubbleSortLoop);
      } else {
        innerBubbleSortLoop(arr, i+1, madeAnySwaps, outerBubbleSortLoop);
      }
    })
  }
}

// Once you're done testing innerBubbleSortLoop, write outerBubbleSortLoop.
// Once you're done testing outerBubbleSortLoop, write absurdBubbleSort.

function absurdBubbleSort(arr, sortCompletionCallback) {
  function outerBubbleSortLoop(madeAnySwaps) {
    // Begin an inner loop if you made any swaps. Otherwise, call
    // `sortCompletionCallback`.
    if (madeAnySwaps === true) {
      innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    } else {
      sortCompletionCallback(arr);
    }
  }

  // Kick the first outer loop off, starting `madeAnySwaps` as true.
  outerBubbleSortLoop(true);
}

absurdBubbleSort([3, 2, 1], function (arr) {
  console.log("Sorted array: " + JSON.stringify(arr));
  reader.close();
});