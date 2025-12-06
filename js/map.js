let center = [53.5, 28.0];
let map;
let allPlacemarks = {};

window.applyFilter = function () {
  const filterSelect = document.getElementById("controlsFilters");
  if (!filterSelect) {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCity = urlParams.get("city");

    if (selectedCity) {
      map.geoObjects.removeAll();

      if (allPlacemarks[selectedCity]) {
        allPlacemarks[selectedCity].forEach((placemark) => {
          map.geoObjects.add(placemark);
        });
        updateMapCenter([selectedCity]);
      }
    } else {
      showAllCities();
    }
  } else {
    applyFilter();
  }
};

function init() {
  const mapContainer = document.getElementById("churchesMap");
  if (!mapContainer) {
    console.log("Контейнер карты не найден");
    return;
  }

  map = new ymaps.Map("churchesMap", {
    center: center,
    zoom: 7,
  });

  setTimeout(() => {
    if (typeof window.applyFilter === "function") {
      window.applyFilter();
    }
  }, 100);

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
        coords: [53.904167, 27.551944],
        name: "Свято-Петро-Павловский собор",
        address: "ул. Раковская, 4",
        description:
          "Один из старейших храмов Минска, построен в 1613 году. Памятник архитектуры с богатой историей.",
        image:
          "https://www.tuda-suda.by/images/countries/europe/belarus/minsk/cerkov-svyatyh-petra-i-pavla/tserkov-svyatykh-petra-i-pavla.jpg",
      },
      {
        coords: [53.941667, 27.473333],
        name: "Приход благоверного князя Александра Невского",
        address: "ул. Козлова, 11",
        description:
          "Современный храм, построенный в 2006 году. Назван в честь святого князя Александра Невского.",
        image:
          "https://tourweek.ru/storage/web/source/uploads/ckeditor/1134.jpg",
      },
      {
        coords: [53.931944, 27.645833],
        name: "Храм Всех Святых",
        address: "ул. Калиновского, 121",
        description:
          "Крупнейший храм Беларуси, построен в 2008 году. Вмещает до 1200 верующих.",
        image:
          "https://avatars.mds.yandex.net/i?id=00cc05e0306b9895e59fa4dbfaa9a83d_l-9095672-images-thumbs&n=13",
      },
      {
        coords: [53.856944, 27.476944],
        name: "Храм Божией Матери взыскание погибших",
        address: "ул. Аэродромная, 1",
        description:
          "Храм в честь чудотворной иконы Божией Матери. Построен в начале 2000-х годов.",
        image:
          "https://planetabelarus.by/upload/iblock/5f6/5f6a749eb66a4dd50c3b4f3516261159.jpg",
      },
      {
        coords: [53.888889, 27.551667],
        name: "Церковь Святой Марии Магдалины",
        address: "ул. Володарского, 2",
        description:
          "Старинная церковь 1847 года постройка. Расположена на Военном кладбище.",
        image:
          "https://planetabelarus.by/upload/iblock/315/31520df2b931b26ce581cd7aa0c3488f.jpg",
      },
      {
        coords: [53.858056, 27.663333],
        name: "Храм Праведной Софии Слуцкой",
        address: "ул. Скрипникова, 32",
        description:
          "Современный храм, освященный в честь святой праведной Софии Слуцкой.",
        image:
          "https://planetabelarus.by/upload/iblock/f66/f665431e240a4d56045c56e6f2044f30.jpg",
      },
      {
        coords: [53.876389, 27.595],
        name: "Храм Святителя Николая-чудотворца",
        address: "ул. Тимирязева, 65/2",
        description:
          "Приходской храм в честь одного из самых почитаемых святых - Николая Чудотворца.",
        image: "https://welcometobelarus.ru/images/thumbs/9199/1300.jpg",
      },
      {
        coords: [53.860556, 27.481667],
        name: "Храм Андрея Первозванного",
        address: "ул. Налибокская, 1",
        description:
          "Храм в честь апостола Андрея Первозванного. Современная архитектура.",
        image: "https://sobory.ru/pic/08850/08893_20160513_211048.jpg",
      },
      {
        coords: [53.908056, 27.438889],
        name: "Храм Покрова Пресвятой Богородицы",
        address: "ул. Гамарника, 21",
        description:
          "Храм в традиционном православном стиле. Построен в 2000-х годах.",
        image:
          "https://s3-minsk.becloud.by/media-assets/tvr/8443252d-804a-4bc3-8354-e53a39126c1a/conversions/a741474c-9708-4ce2-9a21-56fe0c99ec5f-xl-___webp_1920.webp",
      },
      {
        coords: [53.944444, 27.701667],
        name: "Храм Воскресения Христова",
        address: "ул. Одоевского, 52",
        description:
          "Крупный храм в микрорайоне Серебрянка. Построен в 2014 году.",
        image: "https://live.staticflickr.com/8464/8076744668_ffcc823f9a_b.jpg",
      },
      {
        coords: [53.866667, 27.633333],
        name: "Храм в честь Святой Троицы",
        address: "ул. Рафиева, 55",
        description:
          "Храм в честь Святой Троицы. Расположен в жилом районе Минска.",
        image:
          "https://www.holiday.by/files/sights/cerkov_vostok_6_25.09.12-ad46031084b4a27549e1324facd244f6-orig-thumb-780x1500.jpg",
      },
      {
        coords: [53.933889, 27.65],
        name: "Церковь в честь Рождества Иоанна Предтечи",
        address: "ул. П. Мстиславца, 3",
        description:
          "Храм в честь Иоанна Крестителя. Современная архитектура с традиционными элементами.",
        image:
          "https://eparhia-kaluga.ru/images/galleries/2022/20220708_03/1.jpg",
      },
      {
        coords: [53.951667, 27.701389],
        name: "Храм святой великомученицы Анастасии Узорешительницы",
        address: "ул. Толстого, 23",
        description: "Храм в честь святой Анастасии. Построен в 2000-х годах.",
        image:
          "https://avatars.dzeninfra.ru/get-zen_doc/1704908/pub_5dbb3d5e92414d00ac4e2134_5dbb4366a660d700ac95f7fe/scale_1200",
      },
      {
        coords: [53.9475, 27.698056],
        name: "Храм иконы Божьей Матери 'Всех скорбящих Радость'",
        address: "пр-т Победителей, 82",
        description:
          "Храм в честь чудотворной иконы. Расположен в новых микрорайонах Минска.",
        image:
          "https://travelagency.by/upload/iblock/3ed/vseh_skorbiashih.jpeg",
      },
      {
        coords: [53.927222, 27.586667],
        name: "Храм Архангела Михаила",
        address: "ул. Золотая Горка, 42",
        description:
          "Храм в честь Архистратига Михаила. Построен в традиционном византийском стиле.",
        image:
          "https://planetabelarus.by/upload/resize_cache/iblock/9e5/1330_887_18e21fe612b4afb807a26ecc22279a1d9/9e5616af8b125b5f31178bf9e7a0abe5.jpg",
      },
      {
        coords: [53.940278, 27.465278],
        name: "Храм Преображения Господня",
        address: "ул. Ратомская, 19",
        description:
          "Храм в честь Преображения Господня. Современная архитектура с золотыми куполами.",
        image: "https://sobory.ru/pic/12340/12348_20110422_131241.jpg",
      },
      {
        coords: [53.953056, 27.651389],
        name: "Храм в честь святой княгини Ольги",
        address: "ул. Червякова, 25",
        description:
          "Храм в честь святой равноапостольной княгини Ольги. Построен в 2000-х годах.",
        image:
          "https://ucare.timepad.ru/32c76549-7b46-4cab-982f-9f3b4bd81e2f/-/preview/",
      },
      {
        coords: [53.861111, 27.636667],
        name: "Храм святителя Николая Японского",
        address: "ул. Филатова, 15",
        description:
          "Храм в честь святителя Николая Японского. Один из новых храмов Минска.",
        image: "https://sobory.ru/pic/28100/28132_20131028_223532.jpg",
      },
      {
        coords: [53.95, 27.7],
        name: "Храм Святого Равноапостольного Князя Владимира",
        address: "ул. Чюрлениса, 2",
        description:
          "Храм в честь крестителя Руси князя Владимира. Современная архитектура.",
        image:
          "https://hrambel.by/image/upload/97c/fdk2k9nnzkd212r1hi6j6g7f1n0hoc3m.png",
      },
      {
        coords: [53.909722, 27.574167],
        name: "Свято-Духов кафедральный собор",
        address: "ул. Кирилла и Мефодия, 3",
        description:
          "Главный кафедральный собор Белорусского экзархата. Хранится чудотворная икона Божией Матери Минская.",
        image: "https://sobory.ru/pic/07800/07812_20210317_2145111.jpg",
      },
      {
        coords: [53.918056, 27.558889],
        name: "Свято-Елисаветинский монастырь",
        address: "ул. Выготского, 4",
        description:
          "Крупный женский монастырь с уникальными мастерскими и социальным служением.",
        image:
          "https://cdn.culture.ru/images/6a83a394-c506-5a22-987b-7c49a922a01b",
      },
    ],

    grodno: [
      {
        coords: [53.6775, 23.826667],
        name: "Церковь святителя Николая Чудотворца",
        address: "ул. Большая Троицкая, 2",
        description:
          "Один из старейших православных храмов Гродно. Построен в 1852 году.",
        image: "https://probelarus.by/images/thumbs/6191/1277.jpg",
      },
      {
        coords: [53.678889, 23.832222],
        name: "Свято-Покровский кафедральный собор",
        address: "ул. Элизы Ожешко, 23",
        description:
          "Кафедральный собор Гродненской епархии. Построен в 1907 году.",
        image:
          "https://grodnonews.by/upload/medialibrary/047/047d4336caa3252c31e290f28f822313.JPG",
      },
      {
        coords: [53.683611, 23.835278],
        name: "Храм Усекновения Главы Иоанна Предтечи",
        address: "ул. Антонова, 5",
        description:
          "Храм в честь Иоанна Крестителя. Современная постройка с традиционным стилем.",
        image: "https://sobory.ru/pic/27050/27053_20240520_1829510.jpg",
      },
      {
        coords: [53.668889, 23.881667],
        name: "Свято-Владимирская церковь",
        address: "ул. Гагарина, 82А",
        description:
          "Храм в честь святого князя Владимира. Расположен в новых районах Гродно.",
        image:
          "https://by.planetabelarus.by/upload/resize_cache/iblock/4c5/1330_887_12879bfa30a1c933ea552a9c2b55e4a57/4c55464333e04ee1a244ab0eee538bbd.jpg",
      },
      {
        coords: [53.694167, 23.821111],
        name: "Храм иконы Божьей Матери 'Взыскание погибших'",
        address: "ул. Пестрака, 33",
        description:
          "Храм в честь чудотворной иконы. Построен в начале 2000-х годов.",
        image: "https://sobory.ru/pic/11600/11629_20240717_1634350.jpg",
      },
      {
        coords: [53.686944, 23.823611],
        name: "Каложская церковь Св. Бориса и Глеба",
        address: "Коложский парк",
        description:
          "Уникальный памятник древнерусского зодчества XII века. Внесена в список ЮНЕСКО.",
        image: "",
      },
      {
        coords: [53.6625, 23.876667],
        name: "Храм в честь Собора Всех Белорусских Святых",
        address: "ул. Белые Росы, 69",
        description:
          "Современный храм, освященный в честь всех белорусских святых.",
        image: "",
      },
      {
        coords: [53.695833, 23.823056],
        name: "Храм в честь Рождества Христова",
        address: "ул. Дубко, 15А",
        description:
          "Храм в честь Рождества Христова. Построен в 2000-х годах.",
        image: "",
      },
      {
        coords: [53.691389, 23.836667],
        name: "Храм в честь святой праведной Марфы",
        address: "ул. Пушкина, 22",
        description:
          "Храм в честь святой праведной Марфы. Современная постройка.",
        image: "",
      },
      {
        coords: [53.681111, 23.829444],
        name: "Свято-Ольгинская Церковь",
        address: "ул. Ольги Соломовой, 77",
        description:
          "Храм в честь святой княгини Ольги. Расположен в жилом районе Гродно.",
        image: "",
      },
      {
        coords: [53.684722, 23.828056],
        name: "Свято-Рождество-Богородицкий женский монастырь",
        address: "ул. Горького, 75",
        description:
          "Действующий женский монастырь с храмом в честь Рождества Богородицы.",
        image: "",
      },
      {
        coords: [53.667222, 23.878611],
        name: "Церковь блаженной Матроны Московской",
        address: "ул. Брикеля, 15",
        description:
          "Храм в честь святой блаженной Матроны Московской. Современная постройка.",
        image: "",
      },
      {
        coords: [53.6725, 23.869167],
        name: "Храм святителя Спиридона Тримифунтского",
        address: "ул. Победы, 25",
        description:
          "Храм в честь святителя Спиридона Тримифунтского. Построен в 2000-х годах.",
        image: "",
      },
      {
        coords: [53.6975, 23.818611],
        name: "Храм святителя Луки",
        address: "ул. Белуша, 5",
        description:
          "Храм в честь святителя Луки Крымского. Расположен в новых микрорайонах.",
        image: "",
      },
      {
        coords: [53.693889, 23.819722],
        name: "Храм преподобномученика Серафима Жировицкого",
        address: "ул. Пестрака, 41",
        description:
          "Храм в честь преподобномученика Серафима, архимандрита Жировицкого.",
        image: "",
      },
    ],

    vitebsk: [
      {
        coords: [55.193333, 30.2025],
        name: "Свято-Успенский кафедральный собор",
        address: "ул. Крылова, 9",
        description:
          "Восстановленный кафедральный собор на Успенской горке. Исторический символ Витебска.",
        image: "",
      },
      {
        coords: [55.195833, 30.205278],
        name: "Воскресенская церковь",
        address: "Рыночная площадь",
        description:
          "Восстановленный храм в стиле виленского барокко. Исторический центр Витебска.",
        image: "",
      },
      {
        coords: [55.191111, 30.201667],
        name: "Покровский кафедральный собор",
        address: "ул. Шубина, 2",
        description:
          "Кафедральный собор в честь Покрова Пресвятой Богородицы. Действующий храм.",
        image: "",
      },
      {
        coords: [55.196389, 30.203889],
        name: "Благовещенская церковь",
        address: "ул. Замковая, 1",
        description:
          "Памятник древнеполоцкой архитектуры XII века. Один из старейших храмов Беларуси.",
        image: "",
      },
      {
        coords: [55.189722, 30.198611],
        name: "Храм святой мученицы Татьяны",
        address: "пр-т Фрунзе, 13А",
        description:
          "Храм в честь святой мученицы Татьяны. Современная постройка.",
        image: "",
      },
      {
        coords: [55.188056, 30.204167],
        name: "Свято-Георгиевская церковь",
        address: "ул. Воинов-Интернационалистов, 30",
        description:
          "Храм в честь святого Георгия Победоносца. Построен в 1990-х годах.",
        image: "",
      },
      {
        coords: [55.1925, 30.207222],
        name: "Храм святителя Тихона Задонского",
        address: "ул. Чкалова, 55",
        description:
          "Храм в честь святителя Тихона Задонского. Расположен в жилом районе.",
        image: "",
      },
      {
        coords: [55.194167, 30.199722],
        name: "Храм Святого Апостола Луки",
        address: "ул. Ленина, 32",
        description:
          "Храм в честь апостола и евангелиста Луки. Современная архитектура.",
        image: "",
      },
      {
        coords: [55.187222, 30.196667],
        name: "Храм Святого Апостола Андрея Первозванного",
        address: "ул. П. Бровки, 15",
        description:
          "Храм в честь апостола Андрея Первозванного. Построен в 2000-х годах.",
        image: "",
      },
      {
        coords: [55.185833, 30.208611],
        name: "Храм в честь 2000-летия Рождества Христова",
        address: "пр-т Московский, 77",
        description:
          "Храм построен к 2000-летию христианства. Современная архитектура.",
        image: "",
      },
      {
        coords: [55.191667, 30.195833],
        name: "Храм Святой Преподобной Евфросинии Полоцкой",
        address: "ул. Толстого, 8",
        description:
          "Храм в честь святой Евфросинии Полоцкой - небесной покровительницы Беларуси.",
        image: "",
      },
      {
        coords: [55.190278, 30.209167],
        name: "Храм Лонгина Сотника",
        address: "ул. Гагарина, 25",
        description:
          "Храм в честь святого мученика Лонгина Сотника. Современная постройка.",
        image: "",
      },
      {
        coords: [55.193056, 30.194444],
        name: "Храм священномученика Фаддея",
        address: "ул. Чехова, 12",
        description:
          "Храм в честь священномученика Фаддея, архиепископа Тверского.",
        image: "",
      },
      {
        coords: [55.186389, 30.202222],
        name: "Храм иконы Божией Матери Целительница",
        address: "ул. Чкалова, 68",
        description:
          "Храм в честь иконы Божией Матери 'Целительница'. Расположен в больничном комплексе.",
        image: "",
      },
      {
        coords: [55.188889, 30.1975],
        name: "Храм святой блаженной Матроны Московской",
        address: "ул. Правды, 33",
        description:
          "Храм в честь святой блаженной Матроны Московской. Современная постройка.",
        image: "",
      },
    ],

    brest: [
      {
        coords: [52.091944, 23.685833],
        name: "Свято-Николаевский гарнизонный собор",
        address: "ул. Гоголя, 2",
        description:
          "Легендарный храм - символ героизма защитников Брестской крепости. Построен в 1851-1876 гг.",
        image: "",
      },
      {
        coords: [52.093611, 23.683889],
        name: "Кафедральный собор Святого Симеона Столпника",
        address: "ул. К. Маркса, 84",
        description:
          "Главный православный собор Бреста. Построен в 1865 году в русско-византийском стиле.",
        image: "",
      },
      {
        coords: [52.090278, 23.6875],
        name: "Церковь Божией Матери 'Всецарица'",
        address: "ул. Московская, 271",
        description:
          "Храм в честь иконы Божией Матери 'Всецарица'. Современная постройка.",
        image: "",
      },
      {
        coords: [52.095, 23.681667],
        name: "Свято-Николаевская Братская церковь",
        address: "ул. Советская, 10",
        description:
          "Памятник архитектуры XIX века. Один из старейших храмов Бреста.",
        image: "",
      },
      {
        coords: [52.088611, 23.689444],
        name: "Свято-Воскресенский собор",
        address: "пр-т Машерова, 22",
        description:
          "Крупнейший храм Бреста. Построен в 1995-1998 годах в честь 50-летия Победы.",
        image: "",
      },
      {
        coords: [52.092222, 23.678889],
        name: "Церковь иконы Божией Матери 'Всех скорбящих Радость'",
        address: "ул. Ленина, 33",
        description:
          "Храм в честь чудотворной иконы. Расположен в историческом центре города.",
        image: "",
      },
      {
        coords: [52.094167, 23.686111],
        name: "Храм Тихвинской Иконы Божией Матери",
        address: "ул. Мицкевича, 25",
        description:
          "Храм в честь Тихвинской иконы Божией Матери. Построен в 1990-х годах.",
        image: "",
      },
      {
        coords: [52.089722, 23.684167],
        name: "Храм Святителя Спиридона Тримифунтского",
        address: "ул. Куйбышева, 32",
        description:
          "Храм в честь святителя Спиридона Тримифунтского. Современная архитектура.",
        image: "",
      },
      {
        coords: [52.0875, 23.682778],
        name: "Свято-Христо-Рождественская Церковь",
        address: "ул. Кирова, 55",
        description:
          "Храм в честь Рождества Христова. Расположен в жилом районе Бреста.",
        image: "",
      },
      {
        coords: [52.091111, 23.680556],
        name: "Храм Апостола Фомы",
        address: "ул. Гоголя, 45",
        description:
          "Храм в честь апостола Фомы. Современная постройка с традиционными элементами.",
        image: "",
      },
      {
        coords: [52.093056, 23.678056],
        name: "Приход в честь святителя Николая",
        address: "ул. Орловская, 15",
        description: "Приходской храм в честь святителя Николая Чудотворца.",
        image: "",
      },
      {
        coords: [52.096389, 23.683056],
        name: "Свято-Серафимовская Церковь",
        address: "ул. Лейтенанта Рябцева, 8",
        description:
          "Храм в честь преподобного Серафима Саровского. Построен в 2000-х годах.",
        image: "",
      },
      {
        coords: [52.095833, 23.685],
        name: "Свято-Троицкая церковь",
        address: "ул. Комсомольская, 33",
        description:
          "Храм в честь Святой Троицы. Расположен в центральной части города.",
        image: "",
      },
      {
        coords: [52.097222, 23.681389],
        name: "Свято-Георгиевская Церковь",
        address: "ул. Карбышева, 25",
        description:
          "Храм в честь святого Георгия Победоносца. Современная архитектура.",
        image: "",
      },
      {
        coords: [52.09, 23.679722],
        name: "Свято-Рождество-Богородицкий женский монастырь",
        address: "ул. Куйбышева, 2",
        description:
          "Действующий женский монастырь с храмом в честь Рождества Пресвятой Богородицы.",
        image: "",
      },
    ],

    gomel: [
      {
        coords: [52.428333, 31.006667],
        name: "Храм Преображения Господня",
        address: "пл. Ленина, 1",
        description:
          "Храм в неорусском стиле. Расположен в центральной части Гомеля.",
        image: "",
      },
      {
        coords: [52.431111, 31.003889],
        name: "Храм Святого Архангела Михаила",
        address: "ул. Советская, 45",
        description:
          "Храм в честь Архангела Михаила. Современная архитектура с традиционными элементами.",
        image: "",
      },
      {
        coords: [52.434444, 31.008333],
        name: "Храм святителя Николая Чудотворца",
        address: "ул. Ильича, 25",
        description:
          "Храм в честь святителя Николая Чудотворца. Один из старейших в Гомеле.",
        image: "",
      },
      {
        coords: [52.429722, 31.004167],
        name: "Храм Георгия Победоносца",
        address: "ул. Юбилейная, 3",
        description:
          "Храм в честь святого Георгия Победоносца. Современная постройка.",
        image: "",
      },
      {
        coords: [52.432778, 31.009444],
        name: "Храм святителя Луки Крымского",
        address: "ул. Барыкина, 15",
        description:
          "Храм в честь святителя Луки Крымского. Расположен в новых микрорайонах.",
        image: "",
      },
      {
        coords: [52.430556, 31.007222],
        name: "Храм 'Иверской' иконы Божией Матери",
        address: "ул. Ильича, 55",
        description:
          "Храм в честь Иверской иконы Божией Матери. Построен в 2000-х годах.",
        image: "",
      },
      {
        coords: [52.433611, 31.005556],
        name: "Храм Иконы Божией Матери Всех Скорбящих Радость",
        address: "ул. 50 лет БССР, 23",
        description: "Храм в честь чудотворной иконы. Современная архитектура.",
        image: "",
      },
      {
        coords: [52.4275, 31.01],
        name: "Свято-Троицкий Храм",
        address: "ул. Фрунзе, 8",
        description:
          "Храм в честь Святой Троицы. Расположен в исторической части города.",
        image: "",
      },
      {
        coords: [52.435278, 31.0025],
        name: "Храм Скитковской иконы Божией Матери",
        address: "ул. Крестьянская, 25",
        description:
          "Храм в честь Скитковской иконы Божией Матери. Построен в 1990-х годах.",
        image: "",
      },
      {
        coords: [52.428889, 31.008056],
        name: "Храм Иоанна Кормянского",
        address: "ул. Интернациональная, 33",
        description:
          "Храм в честь святого Иоанна Кормянского. Современная постройка.",
        image: "",
      },
      {
        coords: [52.431667, 31.006111],
        name: "Храм преподобного Сергия Радонежского",
        address: "ул. Жарковского, 12",
        description:
          "Храм в честь преподобного Сергия Радонежского. Традиционная архитектура.",
        image: "",
      },
      {
        coords: [52.434167, 31.003333],
        name: "Храм Святого Великомученика Пантелеймона",
        address: "ул. Богдана Хмельницкого, 45",
        description:
          "Храм в честь святого великомученика и целителя Пантелеймона.",
        image: "",
      },
      {
        coords: [52.429167, 31.009167],
        name: "Храм Святого Серафима Саровского",
        address: "ул. Советская, 88",
        description:
          "Храм в честь преподобного Серафима Саровского. Современная постройка.",
        image: "",
      },
      {
        coords: [52.4325, 31.004722],
        name: "Храм Александра Невского",
        address: "ул. Советская, 25",
        description:
          "Храм в честь святого благоверного князя Александра Невского.",
        image: "",
      },
      {
        coords: [52.426944, 31.005833],
        name: "Свято-Никольский мужской монастырь",
        address: "ул. Добрушская, 27",
        description:
          "Действующий мужской монастырь с храмом в честь святителя Николая.",
        image: "",
      },
    ],

    mogilev: [
      {
        coords: [53.894444, 30.331111],
        name: "Спасо-Преображенский храм",
        address: "ул. К. Маркса, 2",
        description:
          "Кафедральный собор Могилёвской епархии. Построен в 2014 году.",
        image: "",
      },
      {
        coords: [53.896667, 30.333056],
        name: "Храм Трех Святителей",
        address: "ул. Первомайская, 75",
        description:
          "Храм в честь трёх вселенских учителей и святителей. Построен в 1909-1914 гг.",
        image: "",
      },
      {
        coords: [53.892222, 30.334722],
        name: "Храм святых праведных Иоакима и Анны",
        address: "ул. Каштановая, 15",
        description:
          "Храм в честь святых праведных Иоакима и Анны - родителей Пресвятой Богородицы.",
        image: "",
      },
      {
        coords: [53.901111, 30.330833],
        name: "Свято-Никольский женский монастырь",
        address: "ул. Т. Сутры, 19",
        description:
          "Действующий женский монастырь с уникальным деревянным храмом.",
        image: "",
      },
    ],
  };

  createAllPlacemarks(placesData, colors);
  showAllCities();
  handleUrlParams();
}

function createAllPlacemarks(placesData, colors) {
  Object.keys(placesData).forEach((city) => {
    allPlacemarks[city] = [];

    placesData[city].forEach((place) => {
      let placemark = new ymaps.Placemark(
        place.coords,
        {
          balloonContent: createBalloonContent(place),
          hintContent: place.name,
        },
        {
          preset: "islands#icon",
          iconColor: colors[city],
          balloonCloseButton: true,
          hideIconOnBalloonOpen: false,
        }
      );

      placemark.events.add("mouseenter", function () {
        placemark.options.set("iconColor", "#ff0000");
      });

      placemark.events.add("mouseleave", function () {
        placemark.options.set("iconColor", colors[city]);
      });

      allPlacemarks[city].push(placemark);
    });
  });
}

function createBalloonContent(place) {
  const imageHtml = place.image
    ? `
     <div class="balloon__image">
      <img src="${place.image}" alt="${place.name}" loading="lazy" onerror="this.parentElement.classList.add('balloon__image-empty')" class="balloon__image--pic">
    </div>`
    : `<div class="balloon__image"></div>`;
  return `
     <div class="balloon">
      <div class="balloon__header">
        <div class="balloon__header--title">${place.name}</div>
      </div>
      ${imageHtml}
      <div class="balloon__body">
        <div class="balloon__body--address">${place.address}</div>
        <div class="balloon__body--description">${place.description}</div>
      </div>
    </div>
    `;
}

function handleUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const cityFromUrl = urlParams.get("city");

  setTimeout(() => {
    const filterSelect = document.getElementById("controlsFilters");
    if (cityFromUrl && filterSelect) {
      filterSelect.value = cityFromUrl;
      applyFilter();
    }
  }, 100);
}

function applyFilter() {
  const filterSelect = document.getElementById("controlsFilters");
  if (!filterSelect) {
    console.log("Фильтр не найден на странице");
    return;
  }

  const selectedCity = filterSelect.value;
  const visibleCities = [];

  map.geoObjects.removeAll();

  if (selectedCity === "belarus") {
    showAllCities();
  } else {
    if (allPlacemarks[selectedCity]) {
      allPlacemarks[selectedCity].forEach((placemark) => {
        map.geoObjects.add(placemark);
      });
      visibleCities.push(selectedCity);
    }
    updateMapCenter(visibleCities);
  }

  if (typeof window.updateActiveCity === "function") {
    window.updateActiveCity(selectedCity === "belarus" ? null : selectedCity);
  }
}

function showAllCities() {
  map.geoObjects.removeAll();

  Object.values(allPlacemarks).forEach((cityPlacemarks) => {
    cityPlacemarks.forEach((placemark) => {
      map.geoObjects.add(placemark);
    });
  });

  map.setBounds(map.geoObjects.getBounds(), {
    checkZoomRange: true,
    duration: 300,
  });
}

function updateMapCenter(visibleCities) {
  if (visibleCities.length === 0) return;

  const coordinates = [];
  visibleCities.forEach((cityId) => {
    if (allPlacemarks[cityId]) {
      allPlacemarks[cityId].forEach((placemark) => {
        coordinates.push(placemark.geometry.getCoordinates());
      });
    }
  });

  if (coordinates.length > 0) {
    map.setBounds(map.geoObjects.getBounds(), {
      checkZoomRange: true,
      duration: 300,
    });
  }
}

ymaps.ready(init);
