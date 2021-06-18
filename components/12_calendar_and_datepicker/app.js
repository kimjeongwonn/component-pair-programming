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

const setCurrentDate = (year, month, date) => {
  currentDate = { year, month, date };
};

const isToday = date => {
  const today = new Date();

  return (
    today.getFullYear() === currentDate.year &&
    today.getMonth() === currentDate.month &&
    today.getDate() === date
  );
};

const isPrevMonthDate = targetDate => targetDate > 15;

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

  // 해당 월의 1번째 요일의 숫자값을 음수로 넣어 이전달에서 해당 월 달력에
  // 보여야할 첫번째 일수를 구할 수 있다.
  const firstCalendarDate = new Date(year, month, -firstDay).getDate();

  // firstCalendarDate부터 prevMonthLastDate까지 배열을 생성하여
  // 이전 달에 대한 날짜를 담은 배열 생성
  const prevMonthArray = Array.from(
    { length: prevMonthLastDate - firstCalendarDate },
    (_, index) => index + firstCalendarDate + 1
  );

  const currMonthArray = Array.from(
    { length: currMonthLastDate },
    (_, index) => index + 1
  );

  // 현재까지의 모든 일수를 7로 나눈 나머지를 7에서 빼주는 식으로
  // 달력의 남은 칸을 1부터 채움
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

    // 이전 달의 마지막 일을 가져와서 현재 선택한 날짜와 비교
    // 현재 선택된 일이 이전달의 마지막 일보다 크다면 이전달의 마지막 일로 변경
    const prevDate = new Date(
      currentDate.year,
      currentDate.month - 1,
      currentDate.date > prevMonthLastDate
        ? prevMonthLastDate
        : currentDate.date
    );
    setCurrentDate(
      prevDate.getFullYear(),
      prevDate.getMonth(),
      prevDate.getDate()
    );
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
    setCurrentDate(
      nextDate.getFullYear(),
      nextDate.getMonth(),
      nextDate.getDate()
    );
    render();
  });

  $calendar.style.left = $datePicker.offsetLeft + 'px';
  $calendar.style.top =
    $datePicker.offsetTop + $datePicker.offsetHeight + 5 + 'px';

  $calendar.append($calendarFragment);
};

// 최초 오늘 날짜 가져와서 캘린더 초기화
const fetchCalendar = () => {
  const today = new Date();
  setCurrentDate(today.getFullYear(), today.getMonth(), today.getDate());
  render();
};

window.addEventListener('DOMContentLoaded', () => {
  fetchCalendar();
});

$datePicker.addEventListener('focus', () => {
  document.querySelector('.calendar').classList.add('active');
  document.addEventListener('click', function closeCalendarHandler(e) {
    if (e.target.matches('.calendar-nav, .calendar-nav *, .date-picker'))
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

  // 해당 월의 일자를 클릭하면 선택한 날짜로 상태지정
  if (e.target.matches('.date:not(.disable)'))
    setCurrentDate(currentDate.year, currentDate.month, +e.target.textContent);

  // 이전 혹은 다음달의 날자를 클릭하면 선택한 달로 렌더하고 상태지정
  if (e.target.matches('.date.disable')) {
    const targetDate = +e.target.textContent;
    const changeDate = new Date(
      currentDate.year,
      (currentDate.month += isPrevMonthDate(targetDate) ? -1 : 1),
      targetDate
    );
    setCurrentDate(
      changeDate.getFullYear(),
      changeDate.getMonth(),
      changeDate.getDate()
    );
    render();
  }

  // 상태 지정한 날짜로 인풋값 변경하고 체크
  updateDatePickerValue();
  checkCurrentDate();
});
