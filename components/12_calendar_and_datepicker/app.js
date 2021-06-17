const MONTH = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC'
];

const DAY = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

let currentDate;
let selectedDate;

const $calendar = document.querySelector('.calendar');
const $datePicker = document.querySelector('.date-picker');

const updateDatePickerValue = () => {
  $datePicker.value = `${currentDate.year}-${
    currentDate.month + 1
  }-${selectedDate}`;
};

const createCalenderElement = () => {
  const $fragment = document.createDocumentFragment();

  const $calenderNav = document.createElement('section');
  $calenderNav.classList.add('calendar-nav');

  const $prevBtn = document.createElement('button');
  $prevBtn.className = 'btn prev-btn';
  $prevBtn.innerHTML = '&ltrif;';

  const $nextBtn = document.createElement('button');
  $nextBtn.className = 'btn next-btn';
  $nextBtn.innerHTML = '&rtrif;';

  const $calenderTitle = document.createElement('div');
  $calenderTitle.className = 'calendar-title';

  const $month = document.createElement('h2');
  $month.className = 'title-month';
  $month.textContent = MONTH[currentDate.month];

  const $year = document.createElement('h3');
  $year.className = 'title-year';
  $year.textContent = currentDate.year;

  const $calendarGrid = document.createElement('section');
  $calendarGrid.className = 'calendar-grid';

  DAY.forEach(day => {
    const $dayDiv = document.createElement('div');
    $dayDiv.className = 'day';
    $dayDiv.textContent = day;
    $calendarGrid.append($dayDiv);
  });

  $calenderTitle.append($month, $year);
  $calenderNav.append($prevBtn, $calenderTitle, $nextBtn);
  $fragment.append($calenderNav, $calendarGrid);
  return $fragment;
};

const getDateArray = () => {
  const { year, month } = currentDate;
  const firstDay = new Date(year, month, 1).getDay();
  const prevMonthLastDate = new Date(year, month, 0).getDate();
  const currMonthLastDate = new Date(year, month, 0).getDate();
  const firstCalendarDate = new Date(year, month, -firstDay).getDate();
  const prevMonthArray = Array.from(
    { length: prevMonthLastDate },
    (_, index) => index + 1
  ).filter(date => firstCalendarDate < date);
  const currMonthArray = Array.from(
    { length: currMonthLastDate },
    (_, index) => index + 1
  );
  const nextMonthArray = Array.from(
    {
      length: 7 - ((prevMonthArray.length + currMonthLastDate) % 7)
    },
    (_, index) => index + 1
  );

  return { prevMonthArray, currMonthArray, nextMonthArray };
};

const setSelectedDate = _selectedDate => {
  selectedDate = _selectedDate;
};

const selectDate = date => {
  document.querySelector('.date.selected')?.classList.remove('selected');
  console.log(document.querySelector('.date.selected'));
  setSelectedDate(date);
  [...document.querySelectorAll('.date:not(.disable)')].forEach($date => {
    if (+date.textContent === selectedDate) $date.classList.add('selected');
  });
};

const render = () => {
  const $calendarFragment = createCalenderElement();
  const $calendarGrid = $calendarFragment.querySelector('.calendar-grid');
  const { prevMonthArray, currMonthArray, nextMonthArray } = getDateArray();

  const isToday = date => {
    const today = new Date();

    return (
      today.getFullYear() === currentDate.year &&
      today.getMonth() === currentDate.month &&
      today.getDate() === date
    );
  };

  prevMonthArray.forEach(date => {
    const $dateDiv = document.createElement('div');
    $dateDiv.className = 'date disable';
    $dateDiv.textContent = date;
    $calendarGrid.append($dateDiv);
  });

  currMonthArray.forEach(date => {
    const $dateDiv = document.createElement('div');
    $dateDiv.className = isToday(date) ? 'date today' : 'date';
    if (date === selectedDate) selectDate(date);
    $dateDiv.textContent = date;
    $calendarGrid.append($dateDiv);
  });

  // TODO: 마지막 요소 선택하는거 리팩토링
  // if (!currMonthArray.find(date => date === selectedDate)) {
  //   const ableDates = $calendarGrid.querySelectorAll('.date:not(.disable)');
  //   ableDates[ableDates.length - 1].classList.add('selected');
  // }

  nextMonthArray.forEach(date => {
    const $dateDiv = document.createElement('div');
    $dateDiv.className = 'date disable';
    $dateDiv.textContent = date;
    $calendarGrid.append($dateDiv);
  });

  $calendar.innerHTML = '';
  $calendar.append($calendarFragment);
};

const setCurrentDate = _currentDate => {
  currentDate = _currentDate;
  render();

  document.querySelector('.prev-btn').addEventListener('click', () => {
    const prevDate = new Date(currentDate.year, currentDate.month - 1);
    setCurrentDate({
      year: prevDate.getFullYear(),
      month: prevDate.getMonth(),
      date: prevDate.getDate()
    });
  });

  document.querySelector('.next-btn').addEventListener('click', () => {
    const nextDate = new Date(currentDate.year, currentDate.month + 1);
    setCurrentDate({
      year: nextDate.getFullYear(),
      month: nextDate.getMonth(),
      date: nextDate.getDate()
    });
  });
};

const fetchCalendar = () => {
  const today = new Date();
  selectedDate = today.getDate();
  setCurrentDate({
    year: today.getFullYear(),
    month: today.getMonth(),
    date: today.getDate()
  });
  selectDate(today.getDate());
};

window.addEventListener('DOMContentLoaded', () => {
  fetchCalendar();
});

$datePicker.addEventListener('focus', () => {
  document.querySelector('.calendar').classList.add('active');
});

$calendar.addEventListener('click', e => {
  if (
    !e.target.classList.contains('btn') &&
    !e.target.classList.contains('date')
  )
    return;

  if (e.target.matches('.date:not(.disable)')) {
    selectDate(e.target.textContent);
  }
  updateDatePickerValue();
});

// TODO: 선택한 날짜 띄우기
