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

function getHolidaysForDate(month, day, year = 2026) {
  const key = `${month}-${day}`;
  let holidays = [];

  if (belarusHolidays[key]) {
    holidays.push(belarusHolidays[key]);
  }

  if (year === 2026 && movingHolidays2026[key]) {
    holidays.push(movingHolidays2026[key]);
  }

  return holidays;
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

async function setCurrentMonthYearInSelectors() {
  const date = await getExactDate();
  const currentMonth = String(date.getMonth() + 1).padStart(2, "0");
  const currentYear = date.getFullYear();

  const monthSelect = document.getElementById("monthSelect");
  const yearSelect = document.getElementById("yearSelect");

  if (monthSelect) {
    monthSelect.value = currentMonth;
  }

  if (yearSelect) {
    yearSelect.value = currentYear;
  }
}

function setupCalendarControls() {
  const updateBtn = document.getElementById("updateCalendarBtn");
  const monthSelect = document.getElementById("monthSelect");
  const yearSelect = document.getElementById("yearSelect");

  if (updateBtn) {
    updateBtn.addEventListener("click", function () {
      const selectedMonth = monthSelect.value;
      const selectedYear = parseInt(yearSelect.value);

      const calendarItems = document.querySelectorAll(".calendar__item");
      calendarItems.forEach((item) => {
        item.dataset.month = selectedMonth;
        item.dataset.year = selectedYear;
      });

      alert(
        `Показан календарь на ${monthSelect.options[monthSelect.selectedIndex].text} ${selectedYear} года`,
      );
    });
  }
}

// Обновление блока "Сегодня"
async function updateTodayBlock() {
  const date = await getExactDate();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;

  const holidays = getHolidaysForDate(month, day, year);

  document.querySelector(".holiday__date").textContent = formattedDate;

  const descriptionElement = document.querySelector(".holiday__description");
  if (holidays.length > 0) {
    descriptionElement.innerHTML = holidays.map((h) => `${h}`).join("<br>");
  } else {
    descriptionElement.innerHTML = "";
  }
}

function setupCalendarClicks() {
  const calendarItems = document.querySelectorAll(".calendar__item");

  calendarItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();

      const day = this.textContent.trim();

      const monthSelect = document.getElementById("monthSelect");
      const yearSelect = document.getElementById("yearSelect");

      let month, year;

      if (this.dataset.month && this.dataset.year) {
        month = this.dataset.month;
        year = parseInt(this.dataset.year);
      } else {
        const now = new Date();
        month = String(now.getMonth() + 1).padStart(2, "0");
        year = now.getFullYear();
      }

      const holidays = getHolidaysForDate(month, day, year);

      const popupTitle = document.querySelector(".holidays-list__form-title");
      popupTitle.textContent = `Праздники на ${day}.${month}.${year}`;

      const popupSubtitle = document.querySelector(
        ".holidays-list__form-subtitle",
      );

      if (holidays.length > 0) {
        popupSubtitle.innerHTML = holidays.map((h) => `• ${h}`).join("<br>");
      } else {
        popupSubtitle.innerHTML = "В этот день праздников нет";
      }

      if (window.jQuery && jQuery.magnificPopup) {
        jQuery.magnificPopup.open({
          items: {
            src: "#holidays-list__form",
          },
          type: "inline",
        });
      }
    });
  });
}

function highlightCurrentDay() {
  const today = new Date();
  const currentDay = today.getDate();

  const calendarItems = document.querySelectorAll(".calendar__item");
  calendarItems.forEach((item) => {
    if (item.textContent.trim() === String(currentDay)) {
      item.classList.add("calendar__item--today");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateTodayBlock();
  setupCalendarClicks();
  highlightCurrentDay();
  setCurrentMonthYearInSelectors();
  setupCalendarControls();

  const now = new Date();
  const tomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
  );
  const timeToMidnight = tomorrow - now;

  setTimeout(() => {
    updateTodayBlock();
    setCurrentMonthYearInSelectors();
    setInterval(
      () => {
        updateTodayBlock();
        setCurrentMonthYearInSelectors();
      },
      24 * 60 * 60 * 1000,
    );
  }, timeToMidnight);
});
