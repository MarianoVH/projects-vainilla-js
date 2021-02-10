const newYear = "1 Jan 2022";

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minsEl = document.getElementById("mins");
const secondsEl = document.getElementById("seconds");

const countDown = () => {
  const newYearDate = new Date(newYear);
  const currentDate = new Date();

  const totalSeconds = (newYearDate - currentDate) / 1000;
  const days = Math.floor(totalSeconds / 3600 / 24);
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const minutes = (Math.floor(totalSeconds / 60) % 24) % 60;
  const seconds = Math.floor(totalSeconds % 60);

  const formatSingleDigits = (time) => (time < 10 ? `0${time}` : time);
  daysEl.innerHTML = formatSingleDigits(days);
  hoursEl.innerHTML = formatSingleDigits(hours);
  minsEl.innerHTML = formatSingleDigits(minutes);
  secondsEl.innerHTML = formatSingleDigits(seconds);
};

// Initial Call
countDown();

setInterval(countDown, 1000);
