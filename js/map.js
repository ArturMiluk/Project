let map;
let allPlacemarks = {};
let belarusPolygon;

function init() {
  const mapContainer = document.getElementById("churchesMap");
  if (!mapContainer) {
    console.log("Контейнер карты не найден");
    return;
  }

  map = new ymaps.Map("churchesMap", {
    center: [53.5, 28.0],
    zoom: 7,
  });

  map.controls.remove("geolocationControl");
  map.controls.remove("searchControl");
  map.controls.remove("trafficControl");
  map.controls.remove("typeSelector");
  map.controls.remove("fullscreenControl");
  map.controls.remove("zoomControl");
  map.controls.remove("rulerControl");

  const colors = {
    minsk: "#3366cc",
    grodno: "#109618",
    vitebsk: "#dc3912",
    brest: "#ff9900",
    gomel: "#990099",
    mogilev: "#0099c6",
  };

  const placesData = {
    minsk: [
      {
        coords: [53.905047, 27.556272],
        name: "Кафедральный собор Сошествия Святого Духа",
        address: "ул. Кирилла и Мефодия, 3",
        description:
          "Главный православный храм города, возведенный в стиле виленского барокко. Здесь хранится чудотворная Минская икона Божией Матери, обретенная в 1500 году.",
        workTime: "Пн-Пт: 07:00-21:00, Сб-Вс: 06:00-21:00",
        year: 1642,
        images: ["./img/bg.jpg", "", ""],
        url: "https://sobor.minsk.by",
      },
      {
        coords: [53.905206, 27.551061],
        name: "Свято-Петро-Павловский собор",
        address: "ул. Раковская, 4",
        description:
          "Старейшая действующая церковь Минска, памятник архитектуры Ренессанса. Храм на протяжении веков оставался единственным оплотом православия в городе.",
        workTime: "Пн-Пт: 07:00-20:00, Сб-Вс: 06:30-20:00",
        year: 1612,
        images: ["./img/bg.jpg", "", ""],
        url: "http://sppsobor.by",
      },
      {
        coords: [53.946343, 27.652157],
        name: "Храм-памятник в честь Всех Святых",
        address: "ул. Всехсвятская, 2",
        description:
          "Уникальный 72-метровый храм в форме шатра. В крипте храма собрана земля с мест сражений, где гибли сыны белорусской земли.",
        workTime: "Пн-Пт: 08:00-19:00, Сб-Вс: 07:30-20:00",
        year: 2010,
        images: ["./img/bg.jpg", "", ""],
        url: "https://hramvs.by",
      },
      {
        coords: [53.9482, 27.5391],
        name: "Свято-Елисаветинский женский монастырь",
        address: "ул. Выготского, 6",
        description:
          "Крупный духовный и культурный центр. Включает несколько храмов, мастерские и паломническую гостиницу.",
        workTime: "Ежедневно: 07:00-21:00",
        year: 1999,
        images: ["./img/bg.jpg", "", ""],
        url: "https://obitel-minsk.by",
      },
      {
        coords: [53.9103, 27.5794],
        name: "Храм святого благоверного князя Александра Невского",
        address: "ул. Козлова, 11",
        description:
          "Единственный храм города, почти полностью сохранивший облик XIX века. Возведен в память о воинах, павших в русско-турецкой войне.",
        workTime: "Ежедневно: 08:00-20:00",
        year: 1898,
        images: ["./img/bg.jpg", "", ""],
        url: "http://nevsky.by",
      },
      {
        coords: [53.9115, 27.5542],
        name: "Церковь святой равноапостольной Марии Магдалины",
        address: "ул. Киселева, 42",
        description:
          "Храм в стиле классицизма. При нем действует старейшее в городе православное братство.",
        workTime: "Ежедневно: 08:00-20:00",
        year: 1847,
        images: ["./img/bg.jpg", "", ""],
        url: "http://hram-minsk.by",
      },
      {
        coords: [54.0042, 27.9348],
        name: "Свято-Благовещенский монастырь (Ляды)",
        address: "Смолевичский р-н, д. Малые Ляды",
        description:
          "Мужской монастырь с богатой историей, известный своим духовным просвещением и почитаемой святыней — списком иконы «Отрада и Утешение».",
        workTime: "06:00-20:00",
        year: 1794,
        images: ["./img/bg.jpg", "", ""],
        url: "http://lyady.by",
      },
      {
        coords: [54.2312, 28.5034],
        name: "Воскресенский кафедральный собор",
        address: "г. Борисов, ул. Лопатина, 34",
        description:
          "Величественный собор из красного кирпича в псевдорусском стиле, доминанта исторического центра Борисова.",
        workTime: "08:00-19:00",
        year: 1874,
        images: ["./img/bg.jpg", "", ""],
        url: "http://borisov-spas.by",
      },
      {
        coords: [53.1118, 27.5684],
        name: "Собор святого Архангела Михаила",
        address: "г. Слуцк, ул. Социалистическая, 90",
        description:
          "Памятник деревянного зодчества XVIII века. Главная православная святыня древнего Слуцка.",
        workTime: "07:00-19:00",
        year: 1795,
        images: ["./img/bg.jpg", "", ""],
        url: "http://sluck-eparchiya.by",
      },
    ],
    grodno: [
      {
        coords: [53.702287, 23.840742],
        name: "Приход Храма Усекновения Главы Иоанна Предтечи",
        address: "ул. Курчатова 19",
        description:
          "Величественный 47-метровый храм в неорусском стиле, напоминающий по форме пламя свечи. Имеет два придела: верхний в честь Иоанна Предтечи и нижний — Иоанна Русского.",
        workTime: "Пн-Пт: 08:30-19:30, Сб-Вс: 07:00-20:00",
        year: 1998,
        images: [
          "./img/main/churches/photo_2026-01-28_11-03-56.jpg",
          "https://avatars.mds.yandex.net/get-altay/11374564/2a00000193bae54807ff0296012477307c2e/orig",
          "https://avatars.mds.yandex.net/get-altay/9428388/2a0000018a316ddb7b7f4e881ff3f3aa23f8/L_height",
        ],
        url: "https://prodromos.by/",
        hasHistory: true,
      },
      {
        coords: [53.657512, 23.856855],
        name: "Храм в честь Собора Всех Белорусских Святых",
        address: "проспект Янки Купалы, 90",
        description:
          "Один из крупнейших храмов города, построенный из красного кирпича в неорусском стиле. Духовный центр микрорайона Вишневец.",
        workTime: "Пн-Пт: 07:30-20:00, Сб-Вс: 06:30-20:00",
        year: 1992,
        images: [
          "./img/main/churches/photo_2026-01-28_11-06-07.jpg",
          "https://avatars.mds.yandex.net/get-altay/15311720/2a00000197070f65fc52bfa67c5653af9bec/orig",
          "https://avatars.mds.yandex.net/get-altay/16480821/2a000001984c7d75e17899b090ba94e0c8d9/L_height",
        ],
        url: "https://svbs.by/",
        hasHistory: true,
      },
      {
        coords: [53.678411, 23.822452],
        name: "Борисоглебская (Коложская) церковь",
        address: "ул. Коложа, 6",
        description:
          "Уникальный памятник архитектуры XII века. Знаменита вставками из майоликовых плиток и отличной акустикой благодаря встроенным в стены голосникам.",
        workTime: "Ежедневно: 09:00-18:00 (службы до 20:00)",
        year: 1180,
        images: ["./img/bg.jpg", "", ""],
        url: "https://kalozha.by/",
      },
      {
        coords: [53.684534, 23.839885],
        name: "Свято-Покровский кафедральный собор",
        address: "ул. Э. Ожешко, 23",
        description:
          "Главный православный храм Гродно, возведенный в память о воинах, погибших в Русско-японской войне. Отличается богатым внутренним убранством.",
        workTime: "Пн-Сб: 07:30-20:00, Вс: 06:30-20:00",
        year: 1904,
        images: ["./img/bg.jpg", "", ""],
        url: "https://pokrovbor.by",
      },
      {
        coords: [53.680654, 23.826723],
        name: "Свято-Рождество-Богородичный женский монастырь",
        address: "ул. Давыда Городенского, 3",
        description:
          "Обитель на месте древней Пречистенской церкви XII века. Здесь хранится чудотворная Владимирская икона Божией Матери.",
        workTime: "Пн-Сб: 07:00-20:00, Вс: 06:00-20:00",
        year: 1720,
        images: ["./img/bg.jpg", "", ""],
        url: "https://obitel-grodno.by",
      },
      {
        coords: [53.6934, 23.8055],
        name: "Храм в честь преподобномученика Афанасия Брестского",
        address: "микрорайон Зарица",
        description:
          "Деревянная церковь, выполненная в традициях православного зодчества, центр духовной жизни северной части города.",
        workTime: "08:00-19:00",
        year: 2000,
        images: ["./img/bg.jpg", "", ""],
        url: "https://orthos.org",
      },
      {
        coords: [53.0163, 25.3444],
        name: "Свято-Успенский Жировичский монастырь",
        address: "Слонимский р-н, аг. Жировичи",
        description:
          "Главная православная святыня Беларуси. Место явления чудотворной Жировичской иконы Божией Матери — самой маленькой из почитаемых икон в мире.",
        workTime: "06:00-21:00",
        year: 1470,
        images: ["./img/bg.jpg", "", ""],
        url: "https://zhirovichi-monastery.by",
      },
      {
        coords: [53.2842, 24.7735],
        name: "Церковь Святого Михаила (Сынковичи)",
        address: "Зельвенский р-н, д. Сынковичи",
        description:
          "Один из самых ранних храмов-крепостей в Европе. Уникальное сочетание готики и православной архитектуры.",
        workTime: "08:00-19:00",
        year: 1407,
        images: ["./img/bg.jpg", "", ""],
        url: "https://synkovichi.by",
      },
    ],
    vitebsk: [
      {
        coords: [55.195353, 30.201734],
        name: "Свято-Успенский кафедральный собор",
        address: "ул. Комиссара Крылова, 9",
        description:
          "Величественный храм в стиле виленского барокко на Успенской горе. Главный собор города.",
        workTime: "Пн-Сб: 07:30-20:00, Вс: 06:30-20:00",
        year: 2001,
        images: ["./img/bg.jpg", "", ""],
        url: "http://vitprav.by",
      },
      {
        coords: [55.191422, 30.203875],
        name: "Благовещенская церковь",
        address: "ул. Замковая, 1",
        description:
          "Древнейший храм (XII век), уникальный образец византийского зодчества с аутентичной кладкой.",
        workTime: "Пн-Пт: 08:30-19:30, Сб-Вс: 07:30-20:00",
        year: 1140,
        images: ["./img/bg.jpg", "", ""],
        url: "http://vitprav.by",
      },
      {
        coords: [55.201468, 30.205218],
        name: "Свято-Воскресенская церковь",
        address: "ул. Толстого, 2",
        description:
          "Изящный храм в стиле виленского барокко, визитная карточка Ратушной площади.",
        workTime: "Пн-Пт: 08:00-19:00, Сб-Вс: 07:00-20:00",
        year: 2001,
        images: ["./img/bg.jpg", "", ""],
        url: "http://vitprav.by",
      },
      {
        coords: [55.5031, 28.7758],
        name: "Спасо-Евфросиниевский монастырь (Полоцк)",
        address: "г. Полоцк, ул. Евфросинии Полоцкой, 89",
        description:
          "Место паломничества к мощам прп. Евфросинии Полоцкой. Сохранились уникальные фрески XII века.",
        workTime: "06:00-20:00",
        year: 1125,
        images: ["./img/bg.jpg", "", ""],
        url: "https://spas-monastery.by",
      },
      {
        coords: [54.5152, 30.4305],
        name: "Свято-Богоявленский Кутеинский монастырь",
        address: "г. Орша, ул. Франциска Скорины, 79",
        description:
          "Знаменитый центр книгопечатания XVII века. Здесь Спиридон Соболь напечатал первый «Букварь».",
        workTime: "08:00-20:00",
        year: 1623,
        images: ["./img/bg.jpg", "", ""],
        url: "https://kuteyn-monastery.by",
      },
      {
        coords: [55.1385, 27.6952],
        name: "Собор Рождества Пресвятой Богородицы (Глубокое)",
        address: "г. Глубокое, ул. Гагарина, 22",
        description:
          "Один из красивейших православных храмов Беларуси. Поражает своим масштабом и подземными криптами.",
        workTime: "08:00-19:00",
        year: 1639,
        images: ["./img/bg.jpg", "", ""],
        url: "http://glubokoe.by",
      },
      {
        coords: [54.4093, 29.7042],
        name: "Свято-Покровский женский монастырь (Толочин)",
        address: "г. Толочин, ул. Ленина, 31",
        description:
          "Обитель, основанная при древнем храме XVIII века. Известна своими чудотворными святынями.",
        workTime: "07:00-19:00",
        year: 1769,
        images: ["./img/bg.jpg", "", ""],
        url: "http://tolochin.by",
      },
    ],
    brest: [
      {
        coords: [52.083321, 23.669372],
        name: "Свято-Николаевский гарнизонный собор",
        address: "ул. Героев обороны Брестской крепости, 60/1",
        description:
          "Храм в византийском стиле в центре Брестской крепости. Свидетель героической обороны 1941 года, ныне полностью восстановлен и является духовным символом цитадели.",
        workTime: "Пн-Вс: 08:00-19:00 (в дни праздников с 06:30)",
        year: 1876,
        images: ["./img/bg.jpg", "", ""],
        url: "https://sobormonastyr.by",
      },
      {
        coords: [52.091176, 23.684841],
        name: "Свято-Симеоновский кафедральный собор",
        address: "ул. Маркса, 84",
        description:
          "Главный православный храм города в русско-византийском стиле. Здесь почивают мощи небесного покровителя города — преподобномученика Афанасия Брестского.",
        workTime: "Пн-Сб: 07:00-20:00, Вс: 06:00-20:00",
        year: 1865,
        images: ["./img/bg.jpg", "", ""],
        url: "http://brest-svisimeon.by",
      },
      {
        coords: [52.1035, 23.7542],
        name: "Свято-Воскресенский собор",
        address: "ул. Московская, 271",
        description:
          "Крупнейший культовый объект города, возведенный в память о 50-летии Победы в Великой Отечественной войне. Вмещает до 5000 прихожан.",
        workTime: "07:00-20:00",
        year: 1995,
        images: ["./img/bg.jpg", "", ""],
        url: "http://voskresenka.by",
      },
      {
        coords: [52.0792, 23.6705],
        name: "Свято-Рождество-Богородичный монастырь",
        address: "Брестская крепость, Госпитальный остров",
        description:
          "Женская обитель, расположенная на территории крепости. Храм монастыря находится в отреставрированном здании бывшего каземата.",
        workTime: "08:00-19:00",
        year: 2002,
        images: ["./img/bg.jpg", "", ""],
        url: "https://obitel-brest.by",
      },
      {
        coords: [52.1285, 25.5412],
        name: "Храм Казанской иконы Божией Матери",
        address: "г. Пружаны, ул. Дзержинского, 1",
        description:
          "Архитектурная жемчужина региона в стиле позднего классицизма с элементами ретроспективно-русского стиля.",
        workTime: "08:00-18:00",
        year: 1864,
        images: ["./img/bg.jpg", "", ""],
        url: "http://pruzhany-sob.by",
      },
      {
        coords: [52.1158, 26.1035],
        name: "Свято-Варваринский собор (Пинск)",
        address: "г. Пинск, ул. Горького, 33",
        description:
          "Кафедральный собор Пинской епархии. Бывший храм бернардинского монастыря, переосвященный в православный в XIX веке.",
        workTime: "07:00-19:00",
        year: 1786,
        images: ["./img/bg.jpg", "", ""],
        url: "http://pinsk-eparchy.by",
      },
      {
        coords: [52.7214, 25.1385],
        name: "Троицкая церковь (Бездеж)",
        address: "Дрогичинский р-н, аг. Бездеж",
        description:
          "Уникальный памятник деревянного зодчества Полесья. Рядом находится знаменитый пункт дуги Струве.",
        workTime: "09:00-17:00",
        year: 1784,
        images: ["./img/bg.jpg", "", ""],
        url: "http://bezdezh.by",
      },
    ],
    gomel: [
      {
        coords: [52.423455, 31.015764],
        name: "Собор святых Петра и Павла",
        address: "пл. Ленина, 4",
        description:
          "Величественный кафедральный собор в стиле классицизма, архитектурная доминанта дворцово-паркового ансамбля. Построен по инициативе графа Н.П. Румянцева.",
        workTime: "Пн-Сб: 08:00-20:00, Вс: 06:30-20:00",
        year: 1819,
        images: ["./img/bg.jpg", "", ""],
        url: "https://pavel-petr.by",
      },
      {
        coords: [52.433241, 31.014234],
        name: "Свято-Никольский мужской монастырь",
        address: "ул. Демьяна Бедного, 4",
        description:
          "Духовный центр Гомеля. Каменный храм был построен в 1904 году на пожертвования железнодорожников и является редким примером сохранившейся дореволюционной архитектуры города.",
        workTime: "Ежедневно: 07:00-20:00",
        year: 1904,
        images: ["./img/bg.jpg", "", ""],
        url: "https://nikolsky.by",
      },
      {
        coords: [52.4345, 31.0102],
        name: "Свято-Тихвинский женский монастырь",
        address: "ул. Котовского, 36",
        description:
          "Обитель, выросшая из приходского храма. Главная святыня — чтимая Тихвинская икона Божией Матери.",
        workTime: "07:30-19:00",
        year: 1943,
        images: ["./img/bg.jpg", "", ""],
        url: "http://tihvinka.by",
      },
      {
        coords: [52.4182, 31.0025],
        name: "Храм святого Архангела Михаила",
        address: "пр. Речицкий, 34",
        description:
          "Храм-памятник жертвам Чернобыльской катастрофы. Построен в византийском стиле, украшен уникальной мозаикой.",
        workTime: "08:00-20:00",
        year: 1996,
        images: ["./img/bg.jpg", "", ""],
        url: "http://mikhail-gomel.by",
      },
      {
        coords: [52.4932, 31.3125],
        name: "Иоанно-Кормянский женский монастырь",
        address: "Добрушский р-н, аг. Корма",
        description:
          "Место упокоения святого праведного Иоанна Кормянского. Один из самых посещаемых паломнических центров Беларуси.",
        workTime: "06:30-20:00",
        year: 1760,
        images: ["./img/bg.jpg", "", ""],
        url: "http://korma.by",
      },
      {
        coords: [52.0465, 29.2315],
        name: "Собор святого Архангела Михаила (Мозырь)",
        address: "г. Мозырь, ул. Комсомольская, 20",
        description:
          "Кафедральный собор Туровской епархии. Бывший монастырь цистерцианок, ныне — главный оплот православия в Полесском регионе.",
        workTime: "07:00-19:00",
        year: 1745,
        images: ["./img/bg.jpg", "", ""],
        url: "http://turov-eparhia.by",
      },
      {
        coords: [52.0625, 27.7342],
        name: "Собор святителей Кирилла и Лаврентия Туровских",
        address: "г. Туров, ул. Ленинская, 97",
        description:
          "Построен в память о великих просветителях Туровской земли. Рядом находятся знаменитые «растущие» каменные кресты.",
        workTime: "08:00-18:00",
        year: 2013,
        images: ["./img/bg.jpg", "", ""],
        url: "http://turov.by",
      },
    ],
    mogilev: [
      {
        coords: [53.894541, 30.323562],
        name: "Свято-Никольский женский монастырь",
        address: "ул. Сурты, 19",
        description:
          "Шедевр белорусского барокко XVII века. Внесен в предварительный список ЮНЕСКО. Славится уникальным четырехъярусным резным иконостасом, выполненным в технике сквозной резьбы.",
        workTime: "Ежедневно: 07:00-19:00",
        year: 1636,
        images: ["./img/bg.jpg", "", ""],
        url: "http://mazary.by",
      },
      {
        coords: [53.9038, 30.3421],
        name: "Собор Преображения Господня",
        address: "ул. Габровская, 35",
        description:
          "Крупнейший православный храм города, способный вместить до 3500 прихожан. Построен в неовизантийском стиле, является кафедральным собором епархии.",
        workTime: "07:00-20:00",
        year: 2000,
        images: ["./img/bg.jpg", "", ""],
        url: "http://mogilev-eparchy.by",
      },
      {
        coords: [53.8964, 30.3375],
        name: "Собор Трёх Святителей",
        address: "ул. Первомайская, 75",
        description:
          "Памятник архитектуры начала XX века в форме креста с семью куполами. Назван в честь Василия Великого, Григория Богослова и Иоанна Златоуста.",
        workTime: "08:00-19:00",
        year: 1903,
        images: ["./img/bg.jpg", "", ""],
        url: "http://treh-svyatiteley.by",
      },
      {
        coords: [53.9512, 30.3745],
        name: "Свято-Покровская церковь (Полыковичи)",
        address: "Могилевский р-н, д. Полыковичи",
        description:
          "Храм при знаменитой «Полыковичской кринице» — целебном источнике, известном с 1552 года. Место массового паломничества.",
        workTime: "09:00-18:00",
        year: 1830,
        images: ["./img/bg.jpg", "", ""],
        url: "http://polykovichi.by",
      },
      {
        coords: [53.4025, 30.3342],
        name: "Свято-Успенский монастырь (Пустынки)",
        address: "Мстиславский р-н, пос. Пустынки",
        description:
          "Один из древнейших монастырей на востоке Беларуси, основанный князем Симеоном Лугвением. Известен явленным на стене ликом Христа.",
        workTime: "06:00-21:00",
        year: 1380,
        images: ["./img/bg.jpg", "", ""],
        url: "http://pustynki.by",
      },
      {
        coords: [53.8925, 29.2314],
        name: "Свято-Николо-Софийский храм (Бобруйск)",
        address: "г. Бобруйск, ул. Шмидта, 30",
        description:
          "Величественный храм из красного кирпича, духовный центр Бобруйска с богатой историей восстановления.",
        workTime: "07:30-19:00",
        year: 1991,
        images: ["./img/bg.jpg", "", ""],
        url: "http://bobruisk.hram.by",
      },
      {
        coords: [54.0215, 31.0342],
        name: "Александро-Невский собор (Мстиславль)",
        address: "г. Мстиславль, ул. Ленина, 30",
        description:
          "Построен на месте древнего бернардинского костела. Образец эклектичной архитектуры с элементами византийского стиля.",
        workTime: "08:00-18:00",
        year: 1870,
        images: ["./img/bg.jpg", "", ""],
        url: "http://mstislavl.by",
      },
    ],
  };

  createAllPlacemarks(placesData, colors);

  const urlParams = new URLSearchParams(window.location.search);
  const cityFromUrl = urlParams.get("city");

  filterByCity(cityFromUrl);
}

function filterByCity(city) {
  map.geoObjects.removeAll();
  if (belarusPolygon) map.geoObjects.add(belarusPolygon);

  let marksToShow = [];
  if (city && allPlacemarks[city]) {
    marksToShow = allPlacemarks[city];
  } else {
    marksToShow = Object.values(allPlacemarks).flat();
  }

  if (marksToShow.length > 0) {
    const clusterer = new ymaps.Clusterer({
      preset: "islands#invertedVioletClusterIcons",
      clusterIconColor: "#000",
      groupByCoordinates: false,
      clusterDisableClickZoom: false,
      clusterHideIconOnBalloonOpen: false,
      geoObjectHideIconOnBalloonOpen: false,
    });
    clusterer.add(marksToShow);
    map.geoObjects.add(clusterer);
  }

  const bounds = map.geoObjects.getBounds();
  if (bounds) {
    map.setBounds(bounds, { checkZoomRange: true, duration: 300 });
  }
}

function drawBelarus(map) {
  const simplifiedCoords = [
    [56.0, 23.0],
    [56.0, 26.0],
    [55.5, 28.0],
    [55.0, 30.5],
    [54.0, 31.5],
    [52.5, 31.5],
    [52.0, 30.0],
    [51.5, 28.0],
    [51.5, 26.0],
    [52.0, 24.0],
    [53.0, 23.5],
    [54.0, 23.5],
    [55.0, 24.0],
    [56.0, 23.0],
  ];
  belarusPolygon = new ymaps.GeoObject(
    {
      geometry: {
        type: "Polygon",
        coordinates: [simplifiedCoords],
      },
    },
    {
      fillColor: "#1E90FF33",
      strokeColor: "#FFD700",
      strokeWidth: 2,
      zIndex: 1,
      interactivityModel: "default#transparent",
    },
  );
  map.geoObjects.add(belarusPolygon);
}

function createAllPlacemarks(placesData, colors) {
  Object.keys(placesData).forEach((city) => {
    allPlacemarks[city] = [];
    placesData[city].forEach((place) => {
      let imageUrl =
        place.image ||
        (place.images && place.images[0]) ||
        "./img/no-image.jpg";

      const iconHtml = `
        <div style="
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 3px solid ${colors[city]};
          overflow: hidden;
          background: #fff;
          box-shadow: 0 2px 5px rgba(0,0,0,0.3);
          cursor: pointer;
          transition: transform 0.2s;
        " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
          <img src="${imageUrl}" 
               style="width: 100%; height: 100%; object-fit: cover; display: block;"
               onerror="this.src='./img/no-image.jpg'; this.onerror=null;">
        </div>
      `;

      let placemark = new ymaps.Placemark(
        place.coords,
        { hintContent: place.name },
        {
          iconLayout: "default#imageWithContent",
          iconImageHref: "",
          iconImageSize: [40, 40],
          iconImageOffset: [-20, -20],
          iconContentLayout: ymaps.templateLayoutFactory.createClass(iconHtml),
          iconContentOffset: [0, 0],
          zIndex: 10,
        },
      );

      placemark.events.add("click", function () {
        updateInfoBlock(place);
      });

      allPlacemarks[city].push(placemark);
    });
  });
}

function updateInfoBlock(place) {
  const title = document.querySelector(".baloon__title");
  const description = document.querySelector(".baloon__description");
  const address = document.querySelector(".baloon__adress");
  const yearElem = document.querySelector(".baloon__year");
  const workTimeElem = document.querySelector(".baloon__work-time");
  const mainImage = document.querySelector(".gallery__main-pic");
  const thumbsContainer = document.querySelector(".gallery__thumbs");
  const actionLinks = document.querySelectorAll(".baloon__actions a");
  const detailBtn = actionLinks[0];
  const historyBtn = actionLinks[1];

  if (
    !title ||
    !description ||
    !address ||
    !mainImage ||
    !thumbsContainer ||
    !detailBtn ||
    !historyBtn
  ) {
    console.warn("Не все элементы балуна найдены");
    return;
  }

  title.textContent = place.name || "Название отсутствует";
  description.textContent = place.description || "Описание отсутствует";
  address.textContent = place.address || "Адрес не указан";

  if (yearElem) {
    if (place.year) {
      yearElem.textContent = "Год постройки: " + place.year;
      yearElem.style.display = "block";
    } else {
      yearElem.style.display = "none";
    }
  }

  if (workTimeElem) {
    if (place.workTime) {
      workTimeElem.textContent = place.workTime;
      workTimeElem.style.display = "block";
    } else {
      workTimeElem.style.display = "none";
    }
  }

  let images = [];
  if (place.images && Array.isArray(place.images) && place.images.length > 0) {
    images = place.images;
  } else if (place.image) {
    images = [place.image];
  } else {
    images = [];
  }

  function updateGallery(newMainSrc) {
    mainImage.src = newMainSrc;
    mainImage.style.display = "block";
    mainImage.onerror = function () {
      this.src = "./img/no-image.jpg";
      this.onerror = null;
    };

    thumbsContainer.innerHTML = "";
    const otherImages = images.filter((src) => src !== newMainSrc);

    if (otherImages.length > 0) {
      otherImages.forEach((imgSrc) => {
        const thumb = document.createElement("img");
        thumb.src = imgSrc;
        thumb.alt = "Миниатюра";
        thumb.classList.add("gallery__thumb");

        thumb.addEventListener("click", () => {
          updateGallery(imgSrc);
        });

        thumb.onerror = function () {
          this.src = "./img/no-image.jpg";
          this.onerror = null;
        };

        thumbsContainer.appendChild(thumb);
      });
      thumbsContainer.style.display = "flex";
    } else {
      thumbsContainer.style.display = "none";
    }
  }

  if (images.length > 0) {
    updateGallery(images[0]);
  } else {
    mainImage.style.display = "none";
    thumbsContainer.style.display = "none";
  }

  function openImagePopup(e) {
    e.preventDefault();
    const src = this.src;
    if ($.magnificPopup) {
      $.magnificPopup.open(
        {
          items: { src: src },
          type: "image",
          closeOnContentClick: true,
          closeOnBgClick: true,
          showCloseBtn: true,
          enableEscapeKey: true,
          image: { verticalFit: true },
        },
        0,
      );
    }
  }

  mainImage.removeEventListener("click", openImagePopup);
  mainImage.addEventListener("click", openImagePopup);

  if (place.url) {
    detailBtn.href = place.url;
    detailBtn.style.display = "inline-block";
  } else {
    detailBtn.style.display = "none";
  }

  if (place.hasHistory) {
    historyBtn.style.display = "inline-block";
  } else {
    historyBtn.style.display = "none";
  }
}

ymaps.ready(init);
