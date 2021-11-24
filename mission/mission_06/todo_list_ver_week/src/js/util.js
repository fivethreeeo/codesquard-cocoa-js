function getYearMonth() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const yearMonth = `${year}년 ${month}월`;

  return yearMonth;
}

// 이번주 요일별 날짜 구하기
function getDateOfWeek() {
  const today = new Date();
  const weekWords = ['월', '화', '수', '목', '금', '토', '일'];
  const week = [];

  weekWords.forEach((weekWord, index) => {
    const date = new Date(
      today.setDate(today.getDate() - today.getDay() + index + 1)
    ).getDate();

    week.push([weekWord, date]);
  });

  return week;
}

// 이번 주가 월의 몇 번째 주인지 구하기
function getWeekOfMonth() {
  const inputDate = new Date();

  let year = inputDate.getFullYear();
  let month = inputDate.getMonth() + 1;

  const weekNumberByThurFnc = (paramDate) => {
    const year = paramDate.getFullYear();
    const month = paramDate.getMonth();
    const date = paramDate.getDate();

    const firstDate = new Date(year, month, 1);
    const lastDate = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDate.getDay() === 0 ? 7 : firstDate.getDay();
    const lastDayOfweek = lastDate.getDay();

    const lastDay = lastDate.getDate();

    const firstWeekCheck =
      firstDayOfWeek === 5 || firstDayOfWeek === 6 || firstDayOfWeek === 7;

    const lastWeekCheck =
      lastDayOfweek === 1 || lastDayOfweek === 2 || lastDayOfweek === 3;

    const lastWeekNo = Math.ceil((firstDayOfWeek - 1 + lastDay) / 7);

    let weekNo = Math.ceil((firstDayOfWeek - 1 + date) / 7);

    if (weekNo === 1 && firstWeekCheck) weekNo = 'prev';
    else if (weekNo === lastWeekNo && lastWeekCheck) weekNo = 'next';
    else if (firstWeekCheck) weekNo = weekNo - 1;

    return weekNo;
  };

  let weekNo = weekNumberByThurFnc(inputDate);

  if (weekNo === 'prev') {
    const afterDate = new Date(year, month - 1, 0);
    year = month === 1 ? year - 1 : year;
    month = month === 1 ? 12 : month - 1;
    weekNo = weekNumberByThurFnc(afterDate);
  }

  if (weekNo === 'next') {
    year = month === 12 ? year + 1 : year;
    month = month === 12 ? 1 : month + 1;
    weekNo = 1;
  }

  return weekNo;
}

export { getYearMonth, getDateOfWeek, getWeekOfMonth };
