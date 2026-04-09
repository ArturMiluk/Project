// Классификация праздников
const churchHolidays = {
  "01-07": "Рождество Христово",
  "01-19": "Крещение",
  "02-15": "Сретение",
  "04-07": "Благовещение",
  "08-14": "Медовый Спас",
  "08-19": "Яблочный Спас",
  "08-28": "Успение",
  "09-21": "Рождество Богородицы",
  "10-14": "Покров",
  "11-21": "Михайлов день",
  "12-04": "Введение во храм",
  "12-19": "День Николая",
};

const familyHolidays = {
  "01-01": "Новый год",
  "01-14": "Старый Новый год",
  "02-14": "День святого Валентина",
  "02-23": "День защитников Отечества",
  "03-08": "Международный женский день",
  "03-15": "День Конституции",
  "03-25": "День Воли",
  "04-01": "День смеха",
  "04-02": "День единения народов",
  "05-01": "День труда",
  "05-09": "День Победы",
  "05-14": "День матери",
  "06-01": "День детей",
  "07-03": "День Независимости",
  "09-01": "День знаний",
  "09-17": "День народного единства",
  "10-01": "День пожилых людей",
  "11-07": "День Октябрьской революции",
  "12-25": "Католическое Рождество",
  "12-31": "Новогодний вечер",
};

const belarusHolidays = {
  "01-01": "Новый год",
  "01-07": "Рождество Христово",
  "01-19": "Крещение",
  "01-21": "День инженерных войск",
  "02-10": "День дипломатического работника",
  "02-11": "День работников землеустройства",
  "02-14": "День святого Валентина",
  "02-15": "День памяти воинов-интернационалистов",
  "02-23": "День защитников Отечества",
  "03-08": "Международный женский день",
  "03-15": "День Конституции",
  "03-20": "День весеннего равноденствия",
  "03-25": "День Воли",
  "04-01": "День смеха",
  "04-02": "День единения народов",
  "04-07": "Благовещение",
  "04-12": "День космонавтики",
  "04-26": "День чернобыльской трагедии",
  "05-01": "День труда",
  "05-07": "День радио",
  "05-09": "День Победы",
  "05-14": "День матери",
  "05-28": "День пограничника",
  "06-01": "День детей",
  "06-22": "День всенародной памяти",
  "06-27": "День молодежи",
  "07-03": "День Независимости",
  "07-06": "Купалье",
  "07-07": "Иван Купала",
  "08-02": "День десантника",
  "08-14": "Медовый Спас",
  "08-19": "Яблочный Спас",
  "08-25": "День шахтера",
  "09-01": "День знаний",
  "09-17": "День народного единства",
  "10-01": "День пожилых людей",
  "10-14": "Покров",
  "11-07": "День Октябрьской революции",
  "11-17": "День студента",
  "12-19": "День Николая",
  "12-25": "Католическое Рождество",
  "12-31": "Новогодний вечер",
};

const movingHolidays2026 = {
  "04-12": "Пасха",
  "05-31": "Троица",
  "01-14": "Старый Новый год",
  "02-15": "Сретение",
  "04-07": "Благовещение",
  "08-28": "Успение",
  "09-21": "Рождество Богородицы",
  "10-14": "Покров",
  "11-21": "Михайлов день",
  "12-04": "Введение во храм",
};

// Описания праздников
const holidayDescriptions = {
  "Новый год":
    "Праздник наступления нового календарного года, один из самых любимых и ожидаемых праздников.",
  "Рождество Христово":
    "Великий христианский праздник, посвящённый рождению Иисуса Христа.",
  Крещение:
    "Христианский праздник, установленный в честь крещения Иисуса Христа в реке Иордан.",
  "День защитников Отечества": "Праздник всех, кто служил или служит в армии.",
  "Международный женский день": "Праздник весны, красоты и женственности.",
  "День Победы": "Праздник победы Советского Союза над нацистской Германией.",
  "День Независимости": "Главный государственный праздник Республики Беларусь.",
  Пасха:
    "Светлое Христово Воскресение — главное событие года для православных христиан.",
  Троица: "Праздник сошествия Святого Духа на апостолов.",
  Покров: "Праздник в честь явления Богородицы во Влахернском храме.",
};

function getHolidayDescription(holidayName) {
  return (
    holidayDescriptions[holidayName] ||
    "Праздник, который объединяет людей и напоминает о важных ценностях."
  );
}

function getHolidayType(month, day, year = 2026) {
  const key = `${month}-${day}`;

  const isChurch = !!(churchHolidays[key] || movingHolidays2026[key]);
  const isFamily = !!familyHolidays[key];

  return {
    isChurch: isChurch,
    isFamily: isFamily,
    names: {
      church: churchHolidays[key] || movingHolidays2026[key] || null,
      family: familyHolidays[key] || null,
    },
  };
}

function getHolidaysForDate(month, day, year = 2026) {
  const key = `${month}-${day}`;
  const holidays = [];

  if (belarusHolidays[key]) {
    holidays.push(belarusHolidays[key]);
  }

  if (year === 2026 && movingHolidays2026[key]) {
    holidays.push(movingHolidays2026[key]);
  }

  return holidays;
}

function getAllHolidaysForYear(year = 2026) {
  const allHolidays = [];
  const allDates = {};

  // Собираем все праздники из belarusHolidays
  Object.keys(belarusHolidays).forEach((key) => {
    const [month, day] = key.split("-");
    allDates[key] = belarusHolidays[key];
  });

  // Добавляем переходящие праздники
  Object.keys(movingHolidays2026).forEach((key) => {
    if (year === 2026) {
      allDates[key] = movingHolidays2026[key];
    }
  });

  // Преобразуем в массив для сортировки
  Object.keys(allDates).forEach((key) => {
    const [month, day] = key.split("-");
    const date = new Date(year, parseInt(month) - 1, parseInt(day));
    const holidayType = getHolidayType(month, day, year);
    const holidayName = allDates[key];

    allHolidays.push({
      date: date,
      day: parseInt(day),
      month: parseInt(month),
      name: holidayName,
      type: holidayType.isChurch
        ? "Церковный"
        : holidayType.isFamily
          ? "Семейный"
          : "Государственный",
      description: getHolidayDescription(holidayName),
    });
  });

  // Сортируем по дате
  allHolidays.sort((a, b) => a.date - b.date);

  return allHolidays;
}

function getUpcomingHolidays(count = 3) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const allHolidays = getAllHolidaysForYear(currentYear);

  // Находим праздники, которые ещё не прошли
  const upcomingHolidays = allHolidays.filter((holiday) => {
    const holidayDate = new Date(currentYear, holiday.month - 1, holiday.day);
    // Сравниваем только по дате (без времени)
    return (
      holidayDate >=
      new Date(today.getFullYear(), today.getMonth(), today.getDate())
    );
  });

  // Если в текущем году нет праздников, берём из следующего года
  if (upcomingHolidays.length === 0) {
    const nextYearHolidays = getAllHolidaysForYear(currentYear + 1);
    return nextYearHolidays.slice(0, count);
  }

  return upcomingHolidays.slice(0, count);
}

function formatDate(month, day) {
  const monthNames = [
    "янв",
    "фев",
    "мар",
    "апр",
    "май",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек",
  ];
  return `${day} ${monthNames[month - 1]}`;
}

function updateUpcomingHolidays() {
  const upcomingHolidays = getUpcomingHolidays(3);
  const container = document.querySelector(".holidays__coming-list");

  if (!container) return;

  if (upcomingHolidays.length === 0) {
    container.innerHTML =
      '<div class="holidays__coming-list-item">Нет ближайших праздников</div>';
    return;
  }

  let html = "";
  upcomingHolidays.forEach((holiday) => {
    html += `
      <div class="holidays__coming-list-item">
        <div class="holidays__coming-list-item-date">${formatDate(holiday.month, holiday.day)}</div>
        <div class="holidays__coming-list-item-info">
          <div class="holidays__coming-list-item-info-title">${holiday.name}</div>
          <div class="holidays__coming-list-item-info-type">${holiday.type}</div>
          <div class="holidays__coming-list-item-info-subtitle">${holiday.description}</div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

async function getExactDate() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(
      "https://worldtimeapi.org/api/timezone/Europe/Minsk",
      { signal: controller.signal },
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return new Date(data.datetime);
  } catch (error) {
    console.warn(
      "Не удалось получить точное время, используется локальное:",
      error,
    );
    return new Date();
  }
}

async function updateTodayBlock() {
  const date = await getExactDate();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;

  const holidays = getHolidaysForDate(month, day, year);

  const dateElement = document.querySelector(".holiday__date");
  if (dateElement) dateElement.textContent = formattedDate;

  const descriptionElement = document.querySelector(".holiday__description");
  if (descriptionElement) {
    descriptionElement.innerHTML = holidays.length
      ? holidays.map((h) => `${h}`).join("<br>")
      : "";
  }
}

function setupCalendarClicks() {
  const calendarItems = document.querySelectorAll(".calendar__item");

  calendarItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();

      const day = this.textContent.trim();
      const now = new Date();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();

      const holidayType = getHolidayType(month, day, year);
      const holidays = getHolidaysForDate(month, day, year);
      const formattedHolidays = [];

      if (holidayType.isChurch && holidayType.names.church) {
        formattedHolidays.push(`${holidayType.names.church}`);
      }
      if (holidayType.isFamily && holidayType.names.family) {
        formattedHolidays.push(`${holidayType.names.family}`);
      }

      const otherHolidays = holidays.filter(
        (h) => h !== holidayType.names.church && h !== holidayType.names.family,
      );
      otherHolidays.forEach((h) => formattedHolidays.push(`• ${h}`));

      const popupTitle = document.querySelector(".holidays-list__form-title");
      if (popupTitle) {
        popupTitle.textContent = `${day}.${month}.${year}`;
      }

      const popupSubtitle = document.querySelector(
        ".holidays-list__form-subtitle",
      );
      if (popupSubtitle) {
        popupSubtitle.innerHTML = formattedHolidays.length
          ? formattedHolidays.map((h) => `${h}`).join("<br>")
          : "В этот день праздников нет";
      }

      if (window.jQuery && jQuery.magnificPopup) {
        jQuery.magnificPopup.open({
          items: { src: "#holidays-list__form" },
          type: "inline",
        });
      }
    });
  });
}

function highlightCurrentDay() {
  const today = new Date();
  const currentDay = today.getDate();

  document.querySelectorAll(".calendar__item").forEach((item) => {
    if (item.textContent.trim() === String(currentDay)) {
      item.classList.add("calendar__item--today");
    } else {
      item.classList.remove("calendar__item--today");
    }
  });
}

function highlightHolidayDays() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  document.querySelectorAll(".calendar__item").forEach((item) => {
    const day = item.textContent.trim();
    if (day && !isNaN(parseInt(day))) {
      const holidayType = getHolidayType(month, day, year);

      item.classList.remove("calendar__item--church", "calendar__item--family");

      if (holidayType.isChurch) {
        item.classList.add("calendar__item--church");
      }
      if (holidayType.isFamily) {
        item.classList.add("calendar__item--family");
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateTodayBlock();
  updateUpcomingHolidays();
  setupCalendarClicks();
  highlightCurrentDay();
  highlightHolidayDays();

  const now = new Date();
  const tomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
  );
  const timeToMidnight = tomorrow - now;

  setTimeout(() => {
    updateTodayBlock();
    updateUpcomingHolidays();
    highlightCurrentDay();
    highlightHolidayDays();
    setInterval(
      () => {
        updateTodayBlock();
        updateUpcomingHolidays();
        highlightCurrentDay();
        highlightHolidayDays();
      },
      24 * 60 * 60 * 1000,
    );
  }, timeToMidnight);
});
