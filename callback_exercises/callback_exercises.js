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

const clock = new Clock();