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

async function getExactDate() {
  try {
    const response = await fetch(
      "https://worldtimeapi.org/api/timezone/Europe/Minsk",
    );
    const data = await response.json();
    return new Date(data.datetime);
  } catch {
    return new Date();
  }
}

async function updateBlock() {
  const date = await getExactDate();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;
  const holidayKey = `${month}-${day}`;
  const holiday = belarusHolidays[holidayKey];
  document.querySelector(".holiday__date").textContent = formattedDate;
  if (holiday) {
    document.querySelector(".holiday__description").textContent = holiday;
  } else {
    document.querySelector(".holiday__description").textContent = "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateBlock();
  const now = new Date();
  const tomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
  );
  const timeToMidnight = tomorrow - now;
  setTimeout(() => {
    updateBlock();
    setInterval(updateBlock, 24 * 60 * 60 * 1000);
  }, timeToMidnight);
});
