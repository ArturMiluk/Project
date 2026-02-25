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
    // minsk: [
    //   {
    //     coords: [53.904167, 27.551944],
    //     name: "Свято-Петро-Павловский собор",
    //     address: "ул. Раковская, 4",
    //     description:
    //       "Один из старейших храмов Минска, построен в 1613 году. Памятник архитектуры с богатой историей.",
    //     year: 1613,
    //     images: [
    //       "https://www.tuda-suda.by/images/countries/europe/belarus/minsk/cerkov-svyatyh-petra-i-pavla/tserkov-svyatykh-petra-i-pavla.jpg",
    //       "https://tourweek.ru/storage/web/source/uploads/ckeditor/1134.jpg",
    //       "https://avatars.mds.yandex.net/i?id=00cc05e0306b9895e59fa4dbfaa9a83d_l-9095672-images-thumbs&n=13",
    //     ],
    //     url: "http://sppsobor.by/",
    //   },
    //   {
    //     coords: [53.941667, 27.473333],
    //     name: "Приход благоверного князя Александра Невского",
    //     address: "ул. Козлова, 11",
    //     description:
    //       "Современный храм, построенный в 2006 году. Назван в честь святого князя Александра Невского.",
    //     image:
    //       "https://tourweek.ru/storage/web/source/uploads/ckeditor/1134.jpg",
    //     url: "https://nevsky.by/",
    //   },
    //   {
    //     coords: [53.931944, 27.645833],
    //     name: "Храм Всех Святых",
    //     address: "ул. Калиновского, 121",
    //     description:
    //       "Крупнейший храм Беларуси, построен в 2008 году. Вмещает до 1200 верующих.",
    //     image:
    //       "https://avatars.mds.yandex.net/i?id=00cc05e0306b9895e59fa4dbfaa9a83d_l-9095672-images-thumbs&n=13",
    //     url: "https://prihodvs.by/",
    //   },
    //   {
    //     coords: [53.856944, 27.476944],
    //     name: "Храм Божией Матери взыскание погибших",
    //     address: "ул. Аэродромная, 1",
    //     description:
    //       "Храм в честь чудотворной иконы Божией Матери. Построен в начале 2000-х годов.",
    //     image:
    //       "https://planetabelarus.by/upload/iblock/5f6/5f6a749eb66a4dd50c3b4f3516261159.jpg",
    //     url: "https://vpg.by/",
    //   },
    //   {
    //     coords: [53.888889, 27.551667],
    //     name: "Церковь Святой Марии Магдалины",
    //     address: "ул. Володарского, 2",
    //     description:
    //       "Старинная церковь 1847 года постройка. Расположена на Военном кладбище.",
    //     image:
    //       "https://planetabelarus.by/upload/iblock/315/31520df2b931b26ce581cd7aa0c3488f.jpg",
    //     url: "https://yandex.by/maps/org/tserkov_svyatoy_mironositsy_ravnoapostolnoy_marii_magdaliny/1003036690/?ll=27.553675%2C53.916032&z=16",
    //   },
    //   {
    //     coords: [53.858056, 27.663333],
    //     name: "Храм Праведной Софии Слуцкой",
    //     address: "ул. Скрипникова, 32",
    //     description:
    //       "Современный храм, освященный в честь святой праведной Софии Слуцкой.",
    //     image:
    //       "https://planetabelarus.by/upload/iblock/f66/f665431e240a4d56045c56e6f2044f30.jpg",
    //     url: "https://yandex.by/maps/org/khram_pravednoy_sofii_knyagini_slutskoy/199242184673/?ll=27.565281%2C53.016627&z=16",
    //   },
    //   {
    //     coords: [53.876389, 27.595],
    //     name: "Храм Святителя Николая-чудотворца",
    //     address: "ул. Тимирязева, 65/2",
    //     description:
    //       "Приходской храм в честь одного из самых почитаемых святых - Николая Чудотворца.",
    //     image: "https://welcometobelarus.ru/images/thumbs/9199/1300.jpg",
    //     url: "https://niko.cerkov.ru/",
    //   },
    //   {
    //     coords: [53.860556, 27.481667],
    //     name: "Храм Андрея Первозванного",
    //     address: "ул. Налибокская, 1",
    //     description:
    //       "Храм в честь апостола Андрея Первозванного. Современная архитектура.",
    //     image: "https://sobory.ru/pic/08850/08893_20160513_211048.jpg",
    //     url: "https://xn--80aefeathgw5ao.xn--80aykt.xn--90ais/",
    //   },
    //   {
    //     coords: [53.908056, 27.438889],
    //     name: "Храм Покрова Пресвятой Богородицы",
    //     address: "ул. Гамарника, 21",
    //     description:
    //       "Храм в традиционном православном стиле. Построен в 2000-х годах.",
    //     image:
    //       "https://s3-minsk.becloud.by/media-assets/tvr/8443252d-804a-4bc3-8354-e53a39126c1a/conversions/a741474c-9708-4ce2-9a21-56fe0c99ec5f-xl-___webp_1920.webp",
    //     url: "https://pokrovgrodno.org/ru",
    //   },
    //   {
    //     coords: [53.944444, 27.701667],
    //     name: "Храм Воскресения Христова",
    //     address: "ул. Одоевского, 52",
    //     description:
    //       "Крупный храм в микрорайоне Серебрянка. Построен в 2014 году.",
    //     image: "https://live.staticflickr.com/8464/8076744668_ffcc823f9a_b.jpg",
    //     url: "https://voskresenie.by/",
    //   },
    //   {
    //     coords: [53.866667, 27.633333],
    //     name: "Храм в честь Святой Троицы",
    //     address: "ул. Рафиева, 55",
    //     description:
    //       "Храм в честь Святой Троицы. Расположен в жилом районе Минска.",
    //     image:
    //       "https://www.holiday.by/files/sights/cerkov_vostok_6_25.09.12-ad46031084b4a27549e1324facd244f6-orig-thumb-780x1500.jpg",
    //     url: "https://prihodvs.by/o-prihode/hram-v-chest-svyatoj-troicy",
    //   },
    //   {
    //     coords: [53.933889, 27.65],
    //     name: "Церковь в честь Рождества Иоанна Предтечи",
    //     address: "ул. П. Мстиславца, 3",
    //     description:
    //       "Храм в честь Иоанна Крестителя. Современная архитектура с традиционными элементами.",
    //     image:
    //       "https://eparhia-kaluga.ru/images/galleries/2022/20220708_03/1.jpg",
    //     url: "https://prodromos.by/",
    //   },
    //   {
    //     coords: [53.951667, 27.701389],
    //     name: "Храм святой великомученицы Анастасии Узорешительницы",
    //     address: "ул. Толстого, 23",
    //     description: "Храм в честь святой Анастасии. Построен в 2000-х годах.",
    //     image:
    //       "https://avatars.dzeninfra.ru/get-zen_doc/1704908/pub_5dbb3d5e92414d00ac4e2134_5dbb4366a660d700ac95f7fe/scale_1200",
    //     url: "https://uzorhram.by/",
    //   },
    //   {
    //     coords: [53.9475, 27.698056],
    //     name: "Храм иконы Божьей Матери 'Всех скорбящих Радость'",
    //     address: "пр-т Победителей, 82",
    //     description:
    //       "Храм в честь чудотворной иконы. Расположен в новых микрорайонах Минска.",
    //     image:
    //       "https://travelagency.by/upload/iblock/3ed/vseh_skorbiashih.jpeg",
    //     url: "https://yandex.by/maps/157/minsk/house/Zk4Ycg5jQEADQFtpfXVydnViZg==/?ll=27.493955%2C53.937913&z=16",
    //   },
    //   {
    //     coords: [53.927222, 27.586667],
    //     name: "Храм Архангела Михаила",
    //     address: "ул. Золотая Горка, 42",
    //     description:
    //       "Храм в честь Архистратига Михаила. Построен в традиционном византийском стиле.",
    //     image:
    //       "https://planetabelarus.by/upload/resize_cache/iblock/9e5/1330_887_18e21fe612b4afb807a26ecc22279a1d9/9e5616af8b125b5f31178bf9e7a0abe5.jpg",
    //     url: "https://yandex.by/maps/org/khram_svyatogo_arkhangela_mikhaila/125131070171/?ll=25.108101%2C53.402434&z=16",
    //   },
    //   {
    //     coords: [53.940278, 27.465278],
    //     name: "Храм Преображения Господня",
    //     address: "ул. Ратомская, 19",
    //     description:
    //       "Храм в честь Преображения Господня. Современная архитектура с золотыми куполами.",
    //     image: "https://sobory.ru/pic/12340/12348_20110422_131241.jpg",
    //     url: "https://yandex.by/maps/org/tserkov_preobrazheniya_gospodnya/236536970455/",
    //   },
    //   {
    //     coords: [53.953056, 27.651389],
    //     name: "Храм в честь святой княгини Ольги",
    //     address: "ул. Червякова, 25",
    //     description:
    //       "Храм в честь святой равноапостольной княгини Ольги. Построен в 2000-х годах.",
    //     image:
    //       "https://ucare.timepad.ru/32c76549-7b46-4cab-982f-9f3b4bd81e2f/-/preview/",
    //     url: "https://maps.app.goo.gl/rMkA6oEGcbLtCCc57",
    //   },
    //   {
    //     coords: [53.861111, 27.636667],
    //     name: "Храм святителя Николая Японского",
    //     address: "ул. Филатова, 15",
    //     description:
    //       "Храм в честь святителя Николая Японского. Один из новых храмов Минска.",
    //     image: "https://sobory.ru/pic/28100/28132_20131028_223532.jpg",
    //     url: "https://n-do.by/",
    //   },
    //   {
    //     coords: [53.95, 27.7],
    //     name: "Храм Святого Равноапостольного Князя Владимира",
    //     address: "ул. Чюрлениса, 2",
    //     description:
    //       "Храм в честь крестителя Руси князя Владимира. Современная архитектура.",
    //     image:
    //       "https://hrambel.by/image/upload/97c/fdk2k9nnzkd212r1hi6j6g7f1n0hoc3m.png",
    //     url: "https://orthos.org/khramy/kartochki-khramov/khram-ravnoapostol-nogo-knyazya-vladimira/",
    //   },
    //   {
    //     coords: [53.909722, 27.574167],
    //     name: "Свято-Духов кафедральный собор",
    //     address: "ул. Кирилла и Мефодия, 3",
    //     description:
    //       "Главный кафедральный собор Белорусского экзархата. Хранится чудотворная икона Божией Матери Минская.",
    //     image: "https://sobory.ru/pic/07800/07812_20210317_2145111.jpg",
    //     url: "https://sobor.minsk.by/",
    //   },
    //   {
    //     coords: [53.918056, 27.558889],
    //     name: "Свято-Елисаветинский монастырь",
    //     address: "ул. Выготского, 4",
    //     description:
    //       "Крупный женский монастырь с уникальными мастерскими и социальным служением.",
    //     image:
    //       "https://cdn.culture.ru/images/6a83a394-c506-5a22-987b-7c49a922a01b",
    //     url: "https://obitel-minsk.ru/",
    //   },
    // ],

    grodno: [
      {
        coords: [53.702287, 23.840742],
        name: "Приход Храма Усекновения Главы Иоанна Предтечи",
        address: "ул. Курчатова 19",
        description:
          "Величественный 47-метровый храм в неорусском стиле, напоминающий по форме пламя свечи. Имеет два придела: верхний в честь Иоанна Предтечи и нижний — Иоанна Русского.",
        year: 1998,
        images: [
          "./img/main/churches/photo_2026-01-28_11-03-56.jpg",
          "https://avatars.mds.yandex.net/get-altay/11374564/2a00000193bae54807ff0296012477307c2e/orig",
          "https://avatars.mds.yandex.net/get-altay/9428388/2a0000018a316ddb7b7f4e881ff3f3aa23f8/L_height",
        ],
        url: "https://prodromos.by/",
      },
      {
        coords: [53.657512, 23.856855],
        name: "Храм в честь Собора Всех Белорусских Святых",
        address: "проспект Янки Купалы, 90",
        description:
          "Один из крупнейших храмов города, построенный из красного кирпича в неорусском стиле. Духовный центр микрорайона Вишневец, возведенный на месте гибели солдат Второй мировой войны.",
        year: 1992,
        images: [
          "./img/main/churches/photo_2026-01-28_11-06-07.jpg",
          "https://avatars.mds.yandex.net/get-altay/15311720/2a00000197070f65fc52bfa67c5653af9bec/orig",
          "https://avatars.mds.yandex.net/get-altay/16480821/2a000001984c7d75e17899b090ba94e0c8d9/L_height",
        ],
        url: "https://svbs.by/",
      },
      {
        coords: [53.678411, 23.822452],
        name: "Борисоглебская (Коложская) церковь",
        address: "ул. Коложа, 6",
        description:
          "Уникальный памятник архитектуры XII века и одна из старейших действующих церквей в Восточной Европе. Знаменита вставками из майоликовых плиток и отличной акустикой благодаря встроенным в стены голосникам.",
        year: 1180,
        images: ["", "", ""],
        url: "https://kalozha.by/",
      },
      {
        coords: [53.678393, 23.830919],
        name: "Собор Святого Франциска Ксаверия (Фарный костел)",
        address: "пл. Советская, 4",
        description:
          "Визитная карточка Гродно и один из самых богатых костелов Речи Посполитой. Высота башен — 50 метров. Внутри находится один из самых высоких деревянных алтарей в Европе и старейшие действующие башенные часы.",
        year: 1678,
        images: ["", "", ""],
        url: "http://farnygrodno.by",
      },
      {
        coords: [53.684534, 23.839885],
        name: "Свято-Покровский кафедральный собор",
        address: "ул. Э. Ожешко, 23",
        description:
          "Главный православный храм города, возведенный в память о воинах, погибших в Русско-японской войне. Построен в псевдорусском стиле и отличается богатым внутренним убранством с почитаемыми списками икон.",
        year: 1904,
        images: ["", "", ""],
        url: "https://pokrovbor.by",
      },
      {
        coords: [53.675031, 23.827725],
        name: "Костел Обретения Святого Креста (Бернардинский)",
        address: "ул. Парижской Коммуны, 1",
        description:
          "Крупнейший архитектурный комплекс Гродно, сочетающий черты готики, ренессанса и барокко. В интерьере сохранились уникальные скульптурные композиции и старинный орган.",
        year: 1595,
        images: ["", "", ""],
        url: "https://grodnensis.by",
      },
      {
        coords: [53.676643, 23.821424],
        name: "Костел Девы Марии Ангельской (Францисканский)",
        address: "ул. Огородная, 2",
        description:
          "Памятник барокко на левом берегу Немана. В этом храме служил святой Максимилиан Кольбе. Храм известен своим резным деревянным алтарем XVIII века.",
        year: 1635,
        images: ["", "", ""],
        url: "https://grodnensis.by",
      },
      {
        coords: [53.680654, 23.826723],
        name: "Свято-Рождество-Богородичный женский монастырь",
        address: "ул. Давыда Городенского, 3",
        description:
          "Обитель на месте древней Пречистенской церкви XII века. Центром комплекса является храм в стиле позднего барокко. Здесь хранится чудотворная Владимирская икона Божией Матери.",
        year: 1720,
        images: ["", "", ""],
        url: "https://obitel-grodno.by",
      },
      {
        coords: [53.687747, 23.838421],
        name: "Лютеранская кирха святого Иоанна",
        address: "ул. Академическая, 7а",
        description:
          "Единственная действующая историческая лютеранская церковь в Беларуси. Здание в стиле неоготики славится своими концертами органной музыки.",
        year: 1793,
        images: ["", "", ""],
        url: "http://luther.by",
      },
    ],

    // vitebsk: [
    //   {
    //     coords: [55.193333, 30.2025],
    //     name: "Свято-Успенский кафедральный собор",
    //     address: "ул. Крылова, 9",
    //     description:
    //       "Восстановленный кафедральный собор на Успенской горке. Исторический символ Витебска.",
    //     image: "",
    //     url: "",
    //   },
    //   {
    //     coords: [55.195833, 30.205278],
    //     name: "Воскресенская церковь",
    //     address: "Рыночная площадь",
    //     description:
    //       "Восстановленный храм в стиле виленского барокко. Исторический центр Витебска.",
    //     image: "https://a.d-cd.net/fd2ba24s-960.jpg",
    //     url: "",
    //   },
    //   {
    //     coords: [55.191111, 30.201667],
    //     name: "Покровский кафедральный собор",
    //     address: "ул. Шубина, 2",
    //     description:
    //       "Кафедральный собор в честь Покрова Пресвятой Богородицы. Действующий храм.",
    //     image:
    //       "https://avatars.mds.yandex.net/get-altay/11471993/2a0000019071396325535228ea7815195baf/orig",
    //     url: "",
    //   },
    //   {
    //     coords: [55.196389, 30.203889],
    //     name: "Благовещенская церковь",
    //     address: "ул. Замковая, 1",
    //     description:
    //       "Памятник древнеполоцкой архитектуры XII века. Один из старейших храмов Беларуси.",
    //     image:
    //       "https://i.pinimg.com/originals/ce/36/b6/ce36b6a275ed9e5315805b10a9d15ff2.jpg",
    //     url: "",
    //   },
    //   {
    //     coords: [55.189722, 30.198611],
    //     name: "Храм святой мученицы Татьяны",
    //     address: "пр-т Фрунзе, 13А",
    //     description:
    //       "Храм в честь святой мученицы Татьяны. Современная постройка.",
    //     image:
    //       "https://cont.ws/uploads/pic/2025/1/%D0%A5%D1%80%D0%B0%D0%BC%20%D1%81%D0%B2%D1%8F%D1%82%D0%BE%D0%B9%20%D0%BC%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D1%86%D1%8B%20%D0%A2%D0%B0%D1%82%D0%B8%D0%B0%D0%BD%D1%8B%2C%20%D0%B3.%20%D0%92%D0%B8%D1%82%D0%B5%D0%B1%D1%81%D0%BA.webp",
    //     url: "",
    //   },
    //   {
    //     coords: [55.188056, 30.204167],
    //     name: "Свято-Георгиевская церковь",
    //     address: "ул. Воинов-Интернационалистов, 30",
    //     description:
    //       "Храм в честь святого Георгия Победоносца. Построен в 1990-х годах.",
    //     image:
    //       "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Saint_George_Orthodox_church_in_Viciebsk_%2801%29.jpg/960px-Saint_George_Orthodox_church_in_Viciebsk_%2801%29.jpg",
    //     url: "",
    //   },
    //   {
    //     coords: [55.1925, 30.207222],
    //     name: "Храм святителя Тихона Задонского",
    //     address: "ул. Чкалова, 55",
    //     description:
    //       "Храм в честь святителя Тихона Задонского. Расположен в жилом районе.",
    //     image:
    //       "https://lib.vstu.by/Vitebsk_site/img/Xram%20Vitebska/ul%20Titova.jpg",
    //     url: "",
    //   },
    //   {
    //     coords: [55.194167, 30.199722],
    //     name: "Храм Святого Апостола Луки",
    //     address: "ул. Ленина, 32",
    //     description:
    //       "Храм в честь апостола и евангелиста Луки. Современная архитектура.",
    //     image:
    //       "https://avatars.mds.yandex.net/get-altay/11398069/2a000001916c35a3403f7c2c577a849690be/orig",
    //     url: "",
    //   },
    //   {
    //     coords: [55.187222, 30.196667],
    //     name: "Храм Святого Апостола Андрея Первозванного",
    //     address: "ул. П. Бровки, 15",
    //     description:
    //       "Храм в честь апостола Андрея Первозванного. Построен в 2000-х годах.",
    //     image:
    //       "https://travelagency.by/upload/iblock/9ae/hram_v_serebranke.jpeg",
    //     url: "",
    //   },
    //   {
    //     coords: [55.185833, 30.208611],
    //     name: "Храм в честь 2000-летия Рождества Христова",
    //     address: "пр-т Московский, 77",
    //     description:
    //       "Храм построен к 2000-летию христианства. Современная архитектура.",
    //     image: "https://sobory.ru/pic/19620/19633_20111113_214006.jpg",
    //     url: "",
    //   },
    //   {
    //     coords: [55.191667, 30.195833],
    //     name: "Храм Святой Преподобной Евфросинии Полоцкой",
    //     address: "ул. Толстого, 8",
    //     description:
    //       "Храм в честь святой Евфросинии Полоцкой - небесной покровительницы Беларуси.",
    //     image: "https://vitebsk.1prof.by/file/2023/04/i.jpg",
    //     url: "",
    //   },
    //   {
    //     coords: [55.190278, 30.209167],
    //     name: "Храм Лонгина Сотника",
    //     address: "ул. Гагарина, 25",
    //     description:
    //       "Храм в честь святого мученика Лонгина Сотника. Современная постройка.",
    //     image: "https://vitprav.by/wp-content/uploads/2014/08/0124.jpg",
    //     url: "",
    //   },
    //   {
    //     coords: [55.193056, 30.194444],
    //     name: "Храм священномученика Фаддея",
    //     address: "ул. Чехова, 12",
    //     description:
    //       "Храм в честь священномученика Фаддея, архиепископа Тверского.",
    //     image: "https://www.fotobel.by/images/vitebsk/vitebsk-hramfad_1.jpg",
    //     url: "",
    //   },
    //   {
    //     coords: [55.186389, 30.202222],
    //     name: "Храм иконы Божией Матери Целительница",
    //     address: "ул. Чкалова, 68",
    //     description:
    //       "Храм в честь иконы Божией Матери 'Целительница'. Расположен в больничном комплексе.",
    //     image:
    //       "https://avatars.mds.yandex.net/get-altay/1881820/2a0000016aa28745eb35485eb9af3a98319b/XXL_height",
    //     url: "",
    //   },
    //   {
    //     coords: [55.188889, 30.1975],
    //     name: "Храм святой блаженной Матроны Московской",
    //     address: "ул. Правды, 33",
    //     description:
    //       "Храм в честь святой блаженной Матроны Московской. Современная постройка.",
    //     image:
    //       "https://avatars.mds.yandex.net/get-altay/11937297/2a0000018e3537474c0c36d9b5ffff91fb6f/XXL_height",
    //     url: "",
    //   },
    // ],

    // brest: [
    //   {
    //     coords: [52.091944, 23.685833],
    //     name: "Свято-Николаевский гарнизонный собор",
    //     address: "ул. Гоголя, 2",
    //     description:
    //       "Легендарный храм - символ героизма защитников Брестской крепости. Построен в 1851-1876 гг.",
    //     image:
    //       "https://avatars.dzeninfra.ru/get-zen_doc/5205780/pub_6362d4e6febbba473de389ea_6362d59aaa962d13f87c889d/scale_1200",
    //     url: "",
    //   },
    //   {
    //     coords: [52.093611, 23.683889],
    //     name: "Кафедральный собор Святого Симеона Столпника",
    //     address: "ул. К. Маркса, 84",
    //     description:
    //       "Главный православный собор Бреста. Построен в 1865 году в русско-византийском стиле.",
    //     image: "https://openborder.brsu.by/wp-content/uploads/2024/02/1.jpg",
    //     url: "",
    //   },
    //   {
    //     coords: [52.090278, 23.6875],
    //     name: "Церковь Божией Матери 'Всецарица'",
    //     address: "ул. Московская, 271",
    //     description:
    //       "Храм в честь иконы Божией Матери 'Всецарица'. Современная постройка.",
    //     image:
    //       "https://planetabelarus.by/upload/resize_cache/iblock/766/1330_747_18e21fe612b4afb807a26ecc22279a1d9/766dcac2939e6dbcd4e6a56c26443024.jpg",
    //     url: "",
    //   },
    //   {
    //     coords: [52.095, 23.681667],
    //     name: "Свято-Николаевская Братская церковь",
    //     address: "ул. Советская, 10",
    //     description:
    //       "Памятник архитектуры XIX века. Один из старейших храмов Бреста.",
    //     image:
    //       "https://ldd.by/wp-content/uploads/2025/09/brest-svyato-nikolaevskaya-cerkov.jpg",
    //     url: "",
    //   },
    //   {
    //     coords: [52.088611, 23.689444],
    //     name: "Свято-Воскресенский собор",
    //     address: "пр-т Машерова, 22",
    //     description:
    //       "Крупнейший храм Бреста. Построен в 1995-1998 годах в честь 50-летия Победы.",
    //     image: "https://www.fotobel.by/images/brest/brest-xram_18.jpg",
    //     url: "",
    //   },
    //   {
    //     coords: [52.092222, 23.678889],
    //     name: "Церковь иконы Божией Матери 'Всех скорбящих Радость'",
    //     address: "ул. Ленина, 33",
    //     description:
    //       "Храм в честь чудотворной иконы. Расположен в историческом центре города.",
    //     image: "https://sobory.ru/pic/11600/11635_20210815_1353400.jpg",
    //     url: "",
    //   },
    //   {
    //     coords: [52.094167, 23.686111],
    //     name: "Храм Тихвинской Иконы Божией Матери",
    //     address: "ул. Мицкевича, 25",
    //     description:
    //       "Храм в честь Тихвинской иконы Божией Матери. Построен в 1990-х годах.",
    //     image: "https://welcometobelarus.ru/images/thumbs/9068/1088.jpg",
    //     url: "",
    //   },
    //   {
    //     coords: [52.089722, 23.684167],
    //     name: "Храм Святителя Спиридона Тримифунтского",
    //     address: "ул. Куйбышева, 32",
    //     description:
    //       "Храм в честь святителя Спиридона Тримифунтского. Современная архитектура.",
    //     image:
    //       "https://mchs.gov.by/upload/resize_cache/iblock/116/1280_1082_19a20e5127c124c53586921eaf043b9cf/photo5303402587942401564.jpg",
    //     url: "",
    //   },
    //   {
    //     coords: [52.0875, 23.682778],
    //     name: "Свято-Христо-Рождественская Церковь",
    //     address: "ул. Кирова, 55",
    //     description:
    //       "Храм в честь Рождества Христова. Расположен в жилом районе Бреста.",
    //     image:
    //       "https://upload.wikimedia.org/wikipedia/commons/9/9e/%D0%A1%D0%92%D0%AF%D0%A2%D0%9E-%D0%A5%D0%A0%D0%98%D0%A1%D0%A2%D0%9E-%D0%A0%D0%9E%D0%96%D0%94%D0%95%D0%A1%D0%A2%D0%92%D0%95%D0%9D%D0%A1%D0%9A%D0%90%D0%AF_%D0%A6%D0%95%D0%A0%D0%9A%D0%9E%D0%92%D0%AC_%D0%B3.%D0%9A%D0%9E%D0%91%D0%A0%D0%98%D0%9D_%28%D0%A4%D0%9E%D0%A2%D0%9E_2%29.jpg",
    //     url: "",
    //   },
    //   {
    //     coords: [52.091111, 23.680556],
    //     name: "Храм Апостола Фомы",
    //     address: "ул. Гоголя, 45",
    //     description:
    //       "Храм в честь апостола Фомы. Современная постройка с традиционными элементами.",
    //     image:
    //       "https://avatars.mds.yandex.net/get-altay/10768923/2a0000018af168efb80b057216bf42b07325/XXXL",
    //     url: "",
    //   },
    //   {
    //     coords: [52.093056, 23.678056],
    //     name: "Приход в честь святителя Николая",
    //     address: "ул. Орловская, 15",
    //     description: "Приходской храм в честь святителя Николая Чудотворца.",
    //     image: "",
    //     url: "",
    //   },
    //   {
    //     coords: [52.096389, 23.683056],
    //     name: "Свято-Серафимовская Церковь",
    //     address: "ул. Лейтенанта Рябцева, 8",
    //     description:
    //       "Храм в честь преподобного Серафима Саровского. Построен в 2000-х годах.",
    //     image:
    //       "https://avatars.mds.yandex.net/get-altay/5584339/2a0000017cfe35b4e4f5cb7fedc38b2f6c70/XXL_height",
    //     url: "",
    //   },
    //   {
    //     coords: [52.095833, 23.685],
    //     name: "Свято-Троицкая церковь",
    //     address: "ул. Комсомольская, 33",
    //     description:
    //       "Храм в честь Святой Троицы. Расположен в центральной части города.",
    //     image: "",
    //     url: "",
    //   },
    //   {
    //     coords: [52.097222, 23.681389],
    //     name: "Свято-Георгиевская Церковь",
    //     address: "ул. Карбышева, 25",
    //     description:
    //       "Храм в честь святого Георгия Победоносца. Современная архитектура.",
    //     image:
    //       "https://vitebsk.flatbook.by/img/landmarks/vitebsk/full/9q6w3hv6lkcosg4wgo0s0480g.jpg",
    //     url: "",
    //   },
    //   {
    //     coords: [52.09, 23.679722],
    //     name: "Свято-Рождество-Богородицкий женский монастырь",
    //     address: "ул. Куйбышева, 2",
    //     description:
    //       "Действующий женский монастырь с храмом в честь Рождества Пресвятой Богородицы.",
    //     image: "https://sobory.ru/pic/40950/40973_20160304_115304_1.jpg",
    //     url: "",
    //   },
    // ],

    // gomel: [
    //   {
    //     coords: [52.428333, 31.006667],
    //     name: "Храм Преображения Господня",
    //     address: "пл. Ленина, 1",
    //     description:
    //       "Храм в неорусском стиле. Расположен в центральной части Гомеля.",
    //     image:
    //       "https://img.belta.by/uploads/lotus/news/2023/000019_EA9D550C488234374325899F002BBE03_834931.jpg",
    //     url: "",
    //   },
    //   {
    //     coords: [52.431111, 31.003889],
    //     name: "Храм Святого Архангела Михаила",
    //     address: "ул. Советская, 45",
    //     description:
    //       "Храм в честь Архангела Михаила. Современная архитектура с традиционными элементами.",
    //     image:
    //       "https://avatars.mds.yandex.net/get-altay/9368060/2a00000189cb2b3563c7e713a13d7d30408d/XXXL",
    //     url: "",
    //   },
    //   {
    //     coords: [52.434444, 31.008333],
    //     name: "Храм святителя Николая Чудотворца",
    //     address: "ул. Ильича, 25",
    //     description:
    //       "Храм в честь святителя Николая Чудотворца. Один из старейших в Гомеле.",
    //     image:
    //       "https://avatars.mds.yandex.net/get-altay/9828935/2a0000018998f496bffad6b9e63af9f07ee1/orig",
    //     url: "",
    //   },
    //   {
    //     coords: [52.429722, 31.004167],
    //     name: "Храм Георгия Победоносца",
    //     address: "ул. Юбилейная, 3",
    //     description:
    //       "Храм в честь святого Георгия Победоносца. Современная постройка.",
    //     image:
    //       "https://avatars.mds.yandex.net/get-altay/4802381/2a000001793d343cdba9d46c4d2c6c566e01/XXL_height",
    //     url: "",
    //   },
    //   {
    //     coords: [52.432778, 31.009444],
    //     name: "Храм святителя Луки Крымского",
    //     address: "ул. Барыкина, 15",
    //     description:
    //       "Храм в честь святителя Луки Крымского. Расположен в новых микрорайонах.",
    //     image:
    //       "https://avatars.mds.yandex.net/get-altay/10232404/2a0000018f9c7326911be7516a73d6167f3e/orig",
    //     url: "",
    //   },
    //   {
    //     coords: [52.430556, 31.007222],
    //     name: "Храм 'Иверской' иконы Божией Матери",
    //     address: "ул. Ильича, 55",
    //     description:
    //       "Храм в честь Иверской иконы Божией Матери. Построен в 2000-х годах.",
    //     image: "https://s2.fotokto.ru/photo/full/330/3301561.jpg",
    //     url: "",
    //   },
    //   {
    //     coords: [52.433611, 31.005556],
    //     name: "Храм Иконы Божией Матери Всех Скорбящих Радость",
    //     address: "ул. 50 лет БССР, 23",
    //     description: "Храм в честь чудотворной иконы. Современная архитектура.",
    //     image: "https://sobory.ru/pic/11600/11635_20210815_1353400.jpg",
    //     url: "",
    //   },
    //   {
    //     coords: [52.4275, 31.01],
    //     name: "Свято-Троицкий Храм",
    //     address: "ул. Фрунзе, 8",
    //     description:
    //       "Храм в честь Святой Троицы. Расположен в исторической части города.",
    //     image: "https://www.fotobel.by/images/gomel/gomel-troickhram_2.jpg",
    //     url: "",
    //   },
    //   {
    //     coords: [52.435278, 31.0025],
    //     name: "Храм Скитковской иконы Божией Матери",
    //     address: "ул. Крестьянская, 25",
    //     description:
    //       "Храм в честь Скитковской иконы Божией Матери. Построен в 1990-х годах.",
    //     image: "https://www.fotobel.by/images/gomel/gomel-troickhram_2.jpg",
    //     url: "",
    //   },
    //   {
    //     coords: [52.428889, 31.008056],
    //     name: "Храм Иоанна Кормянского",
    //     address: "ул. Интернациональная, 33",
    //     description:
    //       "Храм в честь святого Иоанна Кормянского. Современная постройка.",
    //     image:
    //       "https://avatars.mds.yandex.net/i?id=28220fa5d9522b4dd1b94e0248c2f65e_l-5221961-images-thumbs&n=13",
    //     url: "",
    //   },
    //   {
    //     coords: [52.431667, 31.006111],
    //     name: "Храм преподобного Сергия Радонежского",
    //     address: "ул. Жарковского, 12",
    //     description:
    //       "Храм в честь преподобного Сергия Радонежского. Традиционная архитектура.",
    //     image:
    //       "https://avatars.mds.yandex.net/get-altay/1871013/2a0000016b31d9775eda86582ecd2849d386/XXL_height",
    //     url: "",
    //   },
    //   {
    //     coords: [52.434167, 31.003333],
    //     name: "Храм Святого Великомученика Пантелеймона",
    //     address: "ул. Богдана Хмельницкого, 45",
    //     description:
    //       "Храм в честь святого великомученика и целителя Пантелеймона.",
    //     image:
    //       "https://www.holiday.by/files/sights/thumbnails/sights_gallery_fullsize/1bde3deee4e0c8de135951cd42d97b2c-orig.jpg",
    //     url: "",
    //   },
    //   {
    //     coords: [52.429167, 31.009167],
    //     name: "Храм Святого Серафима Саровского",
    //     address: "ул. Советская, 88",
    //     description:
    //       "Храм в честь преподобного Серафима Саровского. Современная постройка.",
    //     image:
    //       "https://planetabelarus.by/upload/iblock/ca6/ca669576c94c3846a6e29fdd99a80375.jpg",
    //     url: "",
    //   },
    //   {
    //     coords: [52.4325, 31.004722],
    //     name: "Храм Александра Невского",
    //     address: "ул. Советская, 25",
    //     description:
    //       "Храм в честь святого благоверного князя Александра Невского.",
    //     image: "https://nevsky.by/wp-content/uploads/2024/02/img_5646.jpg",
    //     url: "",
    //   },
    //   {
    //     coords: [52.426944, 31.005833],
    //     name: "Свято-Никольский мужской монастырь",
    //     address: "ул. Добрушская, 27",
    //     description:
    //       "Действующий мужской монастырь с храмом в честь святителя Николая.",
    //     image:
    //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb7cu4Y-0AK416Zl3ZCo9Wf19ZxFzenZVUvw&s",
    //     url: "",
    //   },
    // ],

    // mogilev: [
    //   {
    //     coords: [53.894444, 30.331111],
    //     name: "Спасо-Преображенский храм",
    //     address: "ул. К. Маркса, 2",
    //     description:
    //       "Кафедральный собор Могилёвской епархии. Построен в 2014 году.",
    //     image:
    //       "https://planetabelarus.by/upload/iblock/c20/c20059d3491632dc46947ffb38b443b6.jpg",
    //     url: "",
    //   },
    //   {
    //     coords: [53.896667, 30.333056],
    //     name: "Храм Трех Святителей",
    //     address: "ул. Первомайская, 75",
    //     description:
    //       "Храм в честь трёх вселенских учителей и святителей. Построен в 1909-1914 гг.",
    //     image:
    //       "https://www.palomnik-tur.by/upload/resize_cache/iblock/de7/800_600_1/de76df04c64e621b81dfa08ad4ae956e.jpg",
    //     url: "",
    //   },
    //   {
    //     coords: [53.892222, 30.334722],
    //     name: "Храм святых праведных Иоакима и Анны",
    //     address: "ул. Каштановая, 15",
    //     description:
    //       "Храм в честь святых праведных Иоакима и Анны - родителей Пресвятой Богородицы.",
    //     image: "https://mogeparhia.by/wp-content/uploads/2018/09/dsc_0605.jpg",
    //     url: "",
    //   },
    //   {
    //     coords: [53.901111, 30.330833],
    //     name: "Свято-Никольский женский монастырь",
    //     address: "ул. Т. Сутры, 19",
    //     description:
    //       "Действующий женский монастырь с уникальным деревянным храмом.",
    //     image:
    //       "https://welcome-belarus.ru/wp-content/uploads/2018/08/Mogilev_ghenskij_monastyr1.jpg",
    //     url: "",
    //   },
    // ],
  };

  createAllPlacemarks(placesData, colors);

  const urlParams = new URLSearchParams(window.location.search);
  const cityFromUrl = urlParams.get("city");

  filterByCity(cityFromUrl);
}

function filterByCity(city) {
  map.geoObjects.removeAll();
  if (belarusPolygon) map.geoObjects.add(belarusPolygon);

  if (city && allPlacemarks[city]) {
    allPlacemarks[city].forEach((placemark) => {
      map.geoObjects.add(placemark);
    });
    const bounds = map.geoObjects.getBounds();
    if (bounds) {
      map.setBounds(bounds, { checkZoomRange: true, duration: 300 });
    }
  } else {
    Object.values(allPlacemarks).forEach((cityPlacemarks) => {
      cityPlacemarks.forEach((placemark) => {
        map.geoObjects.add(placemark);
      });
    });
    const bounds = map.geoObjects.getBounds();
    if (bounds) {
      map.setBounds(bounds, { checkZoomRange: true, duration: 300 });
    }
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
}

ymaps.ready(init);
