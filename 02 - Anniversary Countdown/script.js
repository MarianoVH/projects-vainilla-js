const newYear = "1 Jan 2022";

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minsEl = document.getElementById("mins");
const secondsEl = document.getElementById("seconds");

const validateDate = (dateValue) => {
  const selectedDate = dateValue;
  if (selectedDate == "") return false;

  const regExp = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
  const dateArray = selectedDate.match(regExp);

  if (dateArray == null) {
    return false;
  }

  const month = dateArray[1];
  const day = dateArray[3];
  const year = dateArray[5];

  const checkMonthAndDay = month < 1 || month > 12 || day < 1 || day > 31;
  const checkForDay31 =
    (month == 4 || month == 6 || month == 9 || month == 11) && day == 31;
  const isLeapYear = year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
  const checkForFebruary =
    month == 2 && (day > 29 || (day == 29 && !isLeapYear));

  const presentDay = new Date().setHours(0, 0, 0, 0);
  const dateFromTheUser = new Date(selectedDate).setHours(0, 0, 0, 0);

  if (
    checkMonthAndDay ||
    checkForDay31 ||
    checkForFebruary ||
    dateFromTheUser <= presentDay
  ) {
    return false;
  }
  return true;
};

const countDown = (dateAnniversary) => {
  const newAnniversaryDate = new Date(dateAnniversary);
  const currentDate = new Date();

  const totalSeconds = (newAnniversaryDate - currentDate) / 1000;
  const days = Math.floor(totalSeconds / 3600 / 24);
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const minutes = (Math.floor(totalSeconds / 60) % 24) % 60;
  const seconds = Math.floor(totalSeconds % 60);

  console.log("days", days);
  const formatSingleDigits = (time) => (time < 10 ? `0${time}` : time);
  daysEl.innerHTML = formatSingleDigits(days);
  hoursEl.innerHTML = formatSingleDigits(hours);
  minsEl.innerHTML = formatSingleDigits(minutes);
  secondsEl.innerHTML = formatSingleDigits(seconds);
};

let idInterval = null;

const submitDate = (event) => {
  event.preventDefault();
  const inputVal = document.getElementById("anniversary-input").value;
  const isValidDate = validateDate(inputVal);
  if (isValidDate) {
    idInterval && clearInterval(idInterval);
    countDown(inputVal);
    idInterval = setInterval(() => countDown(inputVal), 1000);
  } else {
    alert("Invalid Date!");
  }
};
