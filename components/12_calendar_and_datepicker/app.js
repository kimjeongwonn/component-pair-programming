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

const $calendar = document.querySelector('.calendar');
const $datePicker = document.querySelector('.date-picker');

const getFormatedDate = () =>
  `${currentDate.year}-${('0' + (currentDate.month + 1)).slice(-2)}-${(
    '0' + currentDate.date
  ).slice(-2)}`;

const updateDatePickerValue = () => {
  $datePicker.value = getFormatedDate();
};

const createCalenderElement = () => {
  const $fragment = document.createDocumentFragment();

  const $calenderNav = document.createElement('section');
  $calenderNav.classList.add('calendar-nav');

  const $prevBtn = document.createElement('button');
  $prevBtn.className = 'btn prev-btn';
  $prevBtn.innerHTML = '◀';

  const $nextBtn = document.createElement('button');
  $nextBtn.className = 'btn next-btn';
  $nextBtn.innerHTML = '▶';

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
  const currMonthLastDate = new Date(year, month + 1, 0).getDate();
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
      length: 7 - ((prevMonthArray.length + currMonthLastDate) % 7 || 7)
    },
    (_, index) => index + 1
  );

  return { prevMonthArray, currMonthArray, nextMonthArray };
};

const checkCurrentDate = () => {
  document.querySelector('.date.selected').classList.remove('selected');
  document.querySelectorAll('.date:not(.disable)').forEach($date => {
    $date.classList.toggle('selected', +$date.textContent === currentDate.date);
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
    $dateDiv.classList.toggle('selected', date === currentDate.date);
    $dateDiv.textContent = date;
    $calendarGrid.append($dateDiv);
  });

  nextMonthArray.forEach(date => {
    const $dateDiv = document.createElement('div');
    $dateDiv.className = 'date disable';
    $dateDiv.textContent = date;
    $calendarGrid.append($dateDiv);
  });

  $calendar.innerHTML = '';

  $calendarFragment.querySelector('.prev-btn').addEventListener('click', () => {
    const prevMonthLastDate = new Date(
      currentDate.year,
      currentDate.month,
      0
    ).getDate();
    const prevDate = new Date(
      currentDate.year,
      currentDate.month - 1,
      currentDate.date > prevMonthLastDate
        ? prevMonthLastDate
        : currentDate.date
    );
    currentDate = {
      year: prevDate.getFullYear(),
      month: prevDate.getMonth(),
      date: prevDate.getDate()
    };
    render();
  });

  $calendarFragment.querySelector('.next-btn').addEventListener('click', () => {
    const nextMonthLastDate = new Date(
      currentDate.year,
      currentDate.month + 2,
      0
    ).getDate();
    const nextDate = new Date(
      currentDate.year,
      currentDate.month + 1,
      currentDate.date > nextMonthLastDate
        ? nextMonthLastDate
        : currentDate.date
    );
    currentDate = {
      year: nextDate.getFullYear(),
      month: nextDate.getMonth(),
      date: nextDate.getDate()
    };
    render();
  });

  $calendar.append($calendarFragment);
};

const fetchCalendar = () => {
  const today = new Date();
  currentDate = {
    year: today.getFullYear(),
    month: today.getMonth(),
    date: today.getDate()
  };
  render();
};

window.addEventListener('DOMContentLoaded', () => {
  fetchCalendar();
});

$datePicker.addEventListener('focus', () => {
  document.querySelector('.calendar').classList.add('active');
  document.addEventListener('click', function closeCalendarHandler(e) {
    if (
      e.target.matches('.disable, .calendar-nav, .calendar-nav *, .date-picker')
    )
      return;
    document.querySelector('.calendar').classList.remove('active');
    document.removeEventListener('click', closeCalendarHandler);
  });
});

$calendar.addEventListener('click', e => {
  if (
    !e.target.classList.contains('btn') &&
    !e.target.classList.contains('date')
  )
    return;

  if (e.target.matches('.date:not(.disable)')) {
    currentDate = {
      year: currentDate.year,
      month: currentDate.month,
      date: +e.target.textContent
    };
  }
  updateDatePickerValue();
  checkCurrentDate();
});
