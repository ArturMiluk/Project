let map;
let allPlacemarks = {};
let colors;

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

  colors = {
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
        images: [
          "https://avatars.mds.yandex.net/get-altay/1352335/2a000001642aab427b1fe1efacacbecde4b9/XXL_height",
          "https://avatars.mds.yandex.net/get-vh/13965829/2a00000198dabe6272b3483ed2442543d258/smart_crop_483x322",
          "https://avatars.mds.yandex.net/get-vh/14921819/2a00000198be3cdec01435fd1589fb6d37a0/smart_crop_483x322",
        ],
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
        images: [
          "https://avatars.mds.yandex.net/get-altay/961502/2a000001642ab3305cde167c3e3d38c1eccb/XXL_height",
          "https://avatars.mds.yandex.net/get-altay/1426646/2a0000016939b36aaf0c98b3f84b28631e34/XXL_height",
          "https://avatars.mds.yandex.net/get-vh/16462352/2a00000198b91bc4e36df4048bbb17871d74/smart_crop_483x322",
        ],
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
        images: [
          "https://avatars.mds.yandex.net/get-altay/10488540/2a0000018a6db93e36cc92653968b9b81b36/XXL_height",
          "https://avatars.mds.yandex.net/get-altay/1018126/2a000001642ab37404956ccb44c5a1767d9c/XXL_height",
          "https://avatars.mds.yandex.net/get-vh/5109306/2a00000192a4e86adf13307f4d7fc5a84257/smart_crop_483x322",
        ],
        url: "",
      },
      {
        coords: [53.9482, 27.5391],
        name: "Свято-Елисаветинский женский монастырь",
        address: "ул. Выготского, 6",
        description:
          "Крупный духовный и культурный центр. Включает несколько храмов, мастерские и паломническую гостиницу.",
        workTime: "Ежедневно: 07:00-21:00",
        year: 1999,
        images: [
          "https://avatars.mds.yandex.net/get-altay/5534836/2a000001845447d8a347f3725c4b21b22b13/L_height",
          "https://ekskursii.by/images/obj2/17939/c552he5_92_true.jpg",
          "https://avatars.mds.yandex.net/get-altay/7979597/2a000001845447efb32f730e6c7e821b1e37/L_height",
        ],
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
        images: [
          "https://nevsky.by/wp-content/uploads/2024/02/img_5646.jpg",
          "https://nevsky.by/wp-content/uploads/2023/07/DSC_3664.jpg",
          "https://nevsky.by/wp-content/uploads/2024/02/img_3221.jpg",
        ],
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
        images: [
          "https://avatars.mds.yandex.net/get-altay/6406681/2a00000180b3435220bc8ae11d3b0fa978a3/L_height",
          "https://bpcmm.by/wp-content/uploads/2024/01/xxxl-2.webp",
          "https://planetabelarus.by/upload/resize_cache/iblock/88d/1330_887_18e21fe612b4afb807a26ecc22279a1d9/88df04f6aa92a4385c82e482ef4247ca.jpg",
        ],
        url: "",
      },
      {
        coords: [54.0042, 27.9348],
        name: "Свято-Благовещенский монастырь (Ляды)",
        address: "Смолевичский р-н, д. Малые Ляды",
        description:
          "Мужской монастырь с богатой историей, известный своим духовным просвещением и почитаемой святыней — списком иконы «Отрада и Утешение».",
        workTime: "06:00-20:00",
        year: 1794,
        images: [
          "https://avatars.mds.yandex.net/get-altay/16454077/2a00000199045b7ae286958bdfae5c2d47c0/orig",
          "https://avatars.mds.yandex.net/get-altay/14816713/2a00000194e4dfde619a1131ac8af6c065b8/M_height",
          "https://obitel-minsk.ru/assets/images/read/2020/inside/lyadenskij-monastyr-1.jpg",
        ],
        url: "",
      },
      {
        coords: [54.2312, 28.5034],
        name: "Воскресенский кафедральный собор",
        address: "г. Борисов, ул. Лопатина, 34",
        description:
          "Величественный собор из красного кирпича в псевдорусском стиле, доминанта исторического центра Борисова.",
        workTime: "08:00-19:00",
        year: 1874,
        images: [
          "https://storage.googleapis.com/my-places-bucket-1/images/blob-1726684151798",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrSVSiAcP6jHaKAkX_Pjgpy7LerkQNhl5haw&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxoMk4E6sAlwZMiBkTgll_HtisghPjvUv-QA&s",
        ],
        url: "",
      },
      {
        coords: [53.1118, 27.5684],
        name: "Собор святого Архангела Михаила",
        address: "г. Слуцк, ул. Социалистическая, 90",
        description:
          "Памятник деревянного зодчества XVIII века. Главная православная святыня древнего Слуцка.",
        workTime: "07:00-19:00",
        year: 1795,
        images: [
          "https://poshyk.info/wp-content/uploads/2022/07/sluckiy-sobor.jpg.webp",
          "https://poshyk.info/wp-content/uploads/2022/07/sluck-mihailovskiy-sobor.jpg.webp",
          "https://sluck-eparchiya.by/wp-content/uploads/2023/08/scale_1200.webp",
        ],
        url: "",
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
        url: "",
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
        url: "",
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
        images: [
          "https://avatars.mds.yandex.net/get-altay/239474/2a0000015ed669342b45105634c0097b42be/XXL_height",
          "https://avatars.mds.yandex.net/get-altay/372953/2a0000015ed6693c926c3f9d5d36a774a730/XXL_height",
          "https://avatars.mds.yandex.net/get-vh/4838477/2a0000019500717d328f55a2dc09ac117793/smart_crop_483x322",
        ],
        url: "",
      },
      {
        coords: [53.684534, 23.839885],
        name: "Свято-Покровский кафедральный собор",
        address: "ул. Э. Ожешко, 23",
        description:
          "Главный православный храм Гродно, возведенный в память о воинах, погибших в Русско-японской войне. Отличается богатым внутренним убранством.",
        workTime: "Пн-Сб: 07:30-20:00, Вс: 06:30-20:00",
        year: 1904,
        images: [
          "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/%D0%93%D1%80%D0%BE%D0%B4%D0%BD%D0%BE_%D1%83%D0%BB._%D0%9E%D0%B6%D0%B5%D1%88%D0%BA%D0%BE_09.jpg/1280px-%D0%93%D1%80%D0%BE%D0%B4%D0%BD%D0%BE_%D1%83%D0%BB._%D0%9E%D0%B6%D0%B5%D1%88%D0%BA%D0%BE_09.jpg",
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/dc/b9/a3/pakrouskaya-orthodox.jpg?w=900&h=500&s=1",
          "https://pokrovgrodno.org/files/images/Sobor/2023-05-20--9-1.jpg",
        ],
        url: "",
      },
      {
        coords: [53.680654, 23.826723],
        name: "Свято-Рождество-Богородичный женский монастырь",
        address: "ул. Давыда Городенского, 3",
        description:
          "Обитель на месте древней Пречистенской церкви XII века. Здесь хранится чудотворная Владимирская икона Божией Матери.",
        workTime: "Пн-Сб: 07:00-20:00, Вс: 06:00-20:00",
        year: 1720,
        images: [
          "https://avatars.mds.yandex.net/get-altay/6545454/2a00000190af5ee19e01540f2e428cdbcb00/XXL_height",
          "https://avatars.mds.yandex.net/get-altay/15081387/2a00000194ae0a8367c0c7a62c8169f16586/XXL_height",
          "https://avatars.mds.yandex.net/get-altay/4699294/2a00000190af5ee64cad4ff4602b77fa867a/XXL_height",
        ],
        url: "",
      },
      {
        coords: [53.6934, 23.8055],
        name: "Храм в честь преподобномученика Афанасия Брестского",
        address: "микрорайон Зарица",
        description:
          "Деревянная церковь, выполненная в традициях православного зодчества, центр духовной жизни северной части города.",
        workTime: "08:00-19:00",
        year: 2000,
        images: [
          "https://avatars.mds.yandex.net/get-altay/16398472/2a00000199176d4787844c5ade1753a465f2/orig",
          "https://avatars.mds.yandex.net/get-altay/7179902/2a00000183a92427ca7f9f1ba5d29c218f64/L_height",
          "https://avatars.mds.yandex.net/get-altay/5179687/2a000001904ccd6be36e45462245d6f49ca7/L_height",
        ],
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
        images: [
          "https://avatars.mds.yandex.net/get-altay/13287730/2a00000190bc28f8e6a3fd7c5a4dc66f562c/XXL_height",
          "https://avatars.mds.yandex.net/get-altay/16403814/2a000001970c5b73eaf13b8acef235326e22/XXL_height",
          "https://avatars.mds.yandex.net/get-vh/10268831/2a0000019a065178ee5b3bc83c92abc7f5a5/smart_crop_483x322",
        ],
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
        images: [
          "https://upload.wikimedia.org/wikipedia/commons/5/51/%D0%A1%D1%8B%D0%BD%D0%BA%D0%BE%D0%B2%D0%B8%D1%87%D0%B8_%D0%A6%D0%B5%D1%80%D0%BA%D0%BE%D0%B2%D1%8C_%D0%A1%D0%B2%D1%8F%D1%82%D0%BE%D0%B3%D0%BE_%D0%9C%D0%B8%D1%85%D0%B0%D0%B8%D0%BB%D0%B0_01.jpg",
          "https://hawat.by/sites/default/files/2018-03/DSC_0875.jpg",
          "https://planetabelarus.by/upload/resize_cache/iblock/fad/1330_886_18e21fe612b4afb807a26ecc22279a1d9/fad12ec872964ebd6d979a869ea0a415.jpg",
        ],
        url: "",
      },
    ],
    vitebsk: [
      {
        coords: [55.191422, 30.203875],
        name: "Благовещенская церковь",
        address: "ул. Замковая, 1",
        description:
          "Древнейший храм (XII век), уникальный образец византийского зодчества с аутентичной кладкой.",
        workTime: "Пн-Пт: 08:30-19:30, Сб-Вс: 07:30-20:00",
        year: 1140,
        images: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3e_wighs2PmYQ_L2h6cbxlS0fA8bCk7HCXA&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl4rrXqMznSDAZKh7kpSWeBwedpWx8WS0SQg&s",
          "https://ekskursii.by/images/obj2/16511/2_clear_resize1.jpg",
        ],
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
        images: [
          "https://probelarus.by/images/thumbs/5983/2.jpg",
          "https://cdn.mlyn.by/svoe.by/2024/05/svyatovoskresnskij-brest.webp",
          "https://planetabelarus.by/upload/resize_cache/iblock/f75/1330_887_18e21fe612b4afb807a26ecc22279a1d9/f75a6670da036557e610327294490d73.jpg",
        ],
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
        images: [
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAwephF4r0lHNtIoEiFsCzebHE1yprqEsk9L0E43lQgR-1Px925kAmC9Fm--w3iqn_aRoVzqoxZP7sznliBDpfYrRpjtOTNXgq-XZErvYPqozbM2mcJ6N7MGgLXZAke2oku21ororICfJ9GN0=w270-h312-n-k-no",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAwer1N2sLAFGWegZ4rvz4MGPR0bJhJo0mJhb7azDCdKJJvmXFJUoNpVP_vm7kIPoIw5FnAFF5iPAW-lSoCD9FWFKN2jmoT8PVLk4M7aR5Q6gXvxV76UQ5SFeQag1ybopwgnM_ZUO5=w135-h156-n-k-no",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerFwoU8sef9yqVE8GTjNvf56p1imSmx5_-dyNQLwdqotUjW2JEqkRxFY5bOqmeAw_9xrNs_VUOtvXJIsVMsCRPNwO7mfWCctwywXljG9OTJqbxr8C1xlpJ1OfvdIDDXL-huu5wEIQ=w135-h156-n-k-no",
        ],
        url: "",
      },
      {
        coords: [54.5152, 30.4305],
        name: "Свято-Богоявленский Кутеинский монастырь",
        address: "г. Орша, ул. Франциска Скорины, 79",
        description:
          "Знаменитый центр книгопечатания XVII века. Здесь Спиридон Соболь напечатал первый «Букварь».",
        workTime: "08:00-20:00",
        year: 1623,
        images: [
          "https://avatars.mds.yandex.net/get-altay/902827/2a000001642aaaa87693ce2f2c0425a52f27/XXL_height",
          "https://avatars.mds.yandex.net/get-altay/15386900/2a00000197705e512b1cab24b5800fa5a899/XXL_height",
          "https://avatars.mds.yandex.net/get-altay/16474107/2a0000019a739d9369c5ddf10e655c82e11c/XXL_height",
        ],
        url: "",
      },
      {
        coords: [55.1385, 27.6952],
        name: "Собор Рождества Пресвятой Богородицы (Глубокое)",
        address: "г. Глубокое, ул. Гагарина, 22",
        description:
          "Один из красивейших православных храмов Беларуси. Поражает своим масштабом и подземными криптами.",
        workTime: "08:00-19:00",
        year: 1639,
        images: [
          "https://my-places.by/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fmy-places-bucket-1%2Fimages%2Fblob-1728902053005&w=3840&q=75",
          "https://avatars.mds.yandex.net/get-altay/9728306/2a0000018a60f4502ad04b09e0adc35be958/L_height",
          "https://bestbelarus.by/upload/dev2fun.imagecompress/webp/iblock/26c/26c3be1d8e72e79953feac9d262f7be0.webp",
        ],
        url: "",
      },
      {
        coords: [54.4093, 29.7042],
        name: "Свято-Покровский женский монастырь (Толочин)",
        address: "г. Толочин, ул. Ленина, 31",
        description:
          "Обитель, основанная при древнем храме XVIII века. Известна своими чудотворными святынями.",
        workTime: "07:00-19:00",
        year: 1769,
        images: [
          "https://avatars.mds.yandex.net/get-altay/1588111/2a0000016fb67d97226b70c45ba971308c68/XXL_height",
          "https://avatars.mds.yandex.net/get-altay/16011054/2a00000199710cd0b37ca7a0d55cc9d3b3c8/XXL_height",
          "https://avatars.mds.yandex.net/get-altay/15629777/2a0000019a9301eabf154109e9e96cced877/XXL_height",
        ],
        url: "",
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
        images: [
          "https://forts.by/wp-content/uploads/2025/11/i_banner-2.jpg",
          "https://fs.tonkosti.ru/sized/c800x800/93/bh/93bhd02cihwkg800kgkkwogoc.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/0/0f/%D0%91%D1%80%D0%B5%D1%81%D1%82_%D0%A1%D0%B2%D1%8F%D1%82%D0%BE-%D0%9D%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D0%B5%D0%B2%D1%81%D0%BA%D0%B8%D0%B9_%D1%81%D0%BE%D0%B1%D0%BE%D1%80.jpg",
        ],
        url: "",
      },
      {
        coords: [52.091176, 23.684841],
        name: "Свято-Симеоновский кафедральный собор",
        address: "ул. Маркса, 84",
        description:
          "Главный православный храм города в русско-византийском стиле. Здесь почивают мощи небесного покровителя города — преподобномученика Афанасия Брестского.",
        workTime: "Пн-Сб: 07:00-20:00, Вс: 06:00-20:00",
        year: 1865,
        images: [
          "https://avatars.mds.yandex.net/get-altay/10647561/2a0000018b493c49b5f99e56211b388cdd3f/XXL_height",
          "https://avatars.mds.yandex.net/get-altay/14014133/2a000001935868460a92b205b2286d8896b5/XXL_height",
          "https://avatars.mds.yandex.net/get-altay/14922087/2a00000196e83521bee7bc27869fed948e14/XXL_height",
        ],
        url: "",
      },
      {
        coords: [52.1035, 23.7542],
        name: "Свято-Воскресенский собор",
        address: "ул. Московская, 271",
        description:
          "Крупнейший культовый объект города, возведенный в память о 50-летии Победы в Великой Отечественной войне. Вмещает до 5000 прихожан.",
        workTime: "07:00-20:00",
        year: 1995,
        images: [
          "https://culttourism.ru/data/photos/d/a/dab6e769e2bde73041e32477197d26dd.jpg",
          "https://yt3.googleusercontent.com/zD1_ZCzAN8_lzRts1CGzUjVZqh8FZoOwRUdBwQt-6PxMP4DnpoeG4Y71aw4tmN9h9Vz9zcDiOw=s900-c-k-c0x00ffffff-no-rj",
          "https://planetabelarus.by/upload/resize_cache/iblock/f75/1330_887_18e21fe612b4afb807a26ecc22279a1d9/f75a6670da036557e610327294490d73.jpg",
        ],
        url: "",
      },
      {
        coords: [52.0792, 23.6705],
        name: "Свято-Рождество-Богородичный монастырь",
        address: "Брестская крепость, Госпитальный остров",
        description:
          "Женская обитель, расположенная на территории крепости. Храм монастыря находится в отреставрированном здании бывшего каземата.",
        workTime: "08:00-19:00",
        year: 2002,
        images: [
          "https://avatars.mds.yandex.net/get-altay/902827/2a000001642aaa62a7b34dd374ed81deb910/XXL_height",
          "https://avatars.mds.yandex.net/get-altay/19636095/2a0000019bd2753f47efd111b5c72f063d89/XXL_height",
          "https://avatars.mds.yandex.net/get-vh/15247478/2a00000197b6f58c9ec570e84c54d018d706/smart_crop_483x322",
        ],
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
        images: [
          "https://upload.wikimedia.org/wikipedia/commons/7/7f/%D0%9A%D0%B0%D0%B7%D0%B0%D0%BD%D1%81%D0%BA%D0%B0%D1%8F_%D1%86%D0%B5%D1%80%D0%BA%D0%BE%D0%B2%D1%8C_%D0%B2_%D0%A3%D0%B7%D0%BA%D0%BE%D0%BC..JPG",
          "https://sobory.ru/pic/03250/03294bb.jpg",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPSrIO7D129WlXLDh258QwZRoq0BYTv8DKTQ&s",
        ],
        url: "",
      },
      {
        coords: [52.1158, 26.1035],
        name: "Свято-Варваринский собор (Пинск)",
        address: "г. Пинск, ул. Горького, 33",
        description:
          "Кафедральный собор Пинской епархии. Бывший храм бернардинского монастыря, переосвященный в православный в XIX веке.",
        workTime: "07:00-19:00",
        year: 1786,
        images: [
          "https://pinsk.gov.by/upload/medialibrary/8cb/8cb144d5cc97453c13774f01948422d4.jpg",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/%D0%9Fi%D0%BD%D1%81%D0%BA%2C%D0%92%D0%B0%D1%80%D0%B2%D0%B0%D1%80%D1%8B%D0%BD%D1%81%D0%BA%D0%B0%D1%8F_%D1%86%D0%B0%D1%80%D0%BA%D0%B2%D0%B0.JPG/330px-%D0%9Fi%D0%BD%D1%81%D0%BA%2C%D0%92%D0%B0%D1%80%D0%B2%D0%B0%D1%80%D1%8B%D0%BD%D1%81%D0%BA%D0%B0%D1%8F_%D1%86%D0%B0%D1%80%D0%BA%D0%B2%D0%B0.JPG",
          "https://sobory.ru/pic/11300/11306bb.jpg",
        ],
        url: "",
      },
      {
        coords: [52.7214, 25.1385],
        name: "Троицкая церковь (Бездеж)",
        address: "Дрогичинский р-н, аг. Бездеж",
        description:
          "Уникальный памятник деревянного зодчества Полесья. Рядом находится знаменитый пункт дуги Струве.",
        workTime: "09:00-17:00",
        year: 1784,
        images: [
          "https://avatars.mds.yandex.net/get-altay/15042938/2a000001982e6f4917edb3017ce00551f926/XXL_height",
          "https://avatars.mds.yandex.net/get-altay/1363018/2a000001642ab53250cd2dcc3a7d581b0ec2/XXL_height",
          "https://avatars.mds.yandex.net/get-altay/5098065/2a000001818f5cdec3cd12b7294ef87867a6/XXL_height",
        ],
        url: "",
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
        images: [
          "https://avatars.mds.yandex.net/get-altay/961502/2a000001642ab3305cde167c3e3d38c1eccb/XXL_height",
          "https://avatars.mds.yandex.net/get-altay/1426646/2a0000016939b36aaf0c98b3f84b28631e34/XXL_height",
          "https://avatars.mds.yandex.net/get-vh/16462352/2a00000198b91bc4e36df4048bbb17871d74/smart_crop_483x322",
        ],
        url: "",
      },
      {
        coords: [52.433241, 31.014234],
        name: "Свято-Никольский мужской монастырь",
        address: "ул. Демьяна Бедного, 4",
        description:
          "Духовный центр Гомеля. Каменный храм был построен в 1904 году на пожертвования железнодорожников и является редким примером сохранившейся дореволюционной архитектуры города.",
        workTime: "Ежедневно: 07:00-20:00",
        year: 1904,
        images: [
          "https://my-places.by/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fmy-places-bucket-1%2Fimages%2Fblob-1729110733500&w=3840&q=75",
          "https://avatars.mds.yandex.net/get-altay/14165812/2a00000193ef207e7d09bad0e68599646453/orig",
          "https://obitel-minsk.ru/assets/images/read/2025/main/monastyr-v-gomele-big.jpg",
        ],
        url: "",
      },
      {
        coords: [52.4345, 31.0102],
        name: "Свято-Тихвинский женский монастырь",
        address: "ул. Котовского, 36",
        description:
          "Обитель, выросшая из приходского храма. Главная святыня — чтимая Тихвинская икона Божией Матери.",
        workTime: "07:30-19:00",
        year: 1943,
        images: [
          "https://avatars.mds.yandex.net/get-altay/13941727/2a00000194ac7949f1ee19e7fb5fa002fb43/XXL_height",
          "https://avatars.mds.yandex.net/get-altay/813485/2a0000018817e42ea720ee4d0c44ad029eab/XXL_height",
          "https://avatars.mds.yandex.net/get-altay/14014133/2a00000194ac7949b5f6fcb276af74eb8f7a/XXL_height",
        ],
        url: "",
      },
      {
        coords: [52.4182, 31.0025],
        name: "Храм святого Архангела Михаила",
        address: "пр. Речицкий, 34",
        description:
          "Храм-памятник жертвам Чернобыльской катастрофы. Построен в византийском стиле, украшен уникальной мозаикой.",
        workTime: "08:00-20:00",
        year: 1996,
        images: [
          "https://avatars.mds.yandex.net/get-altay/15389647/2a00000197fe3e94d984a8d84193b6c176fa/XXL_height",
          "https://avatars.mds.yandex.net/get-altay/16792294/2a000001994d8308e5b7c3f51bb7dc8f0e80/XXL_height",
          "https://avatars.mds.yandex.net/get-altay/9686455/2a000001892ac372d49457319b361b343998/XXL_height",
        ],
        url: "",
      },
      {
        coords: [52.4932, 31.3125],
        name: "Иоанно-Кормянский женский монастырь",
        address: "Добрушский р-н, аг. Корма",
        description:
          "Место упокоения святого праведного Иоанна Кормянского. Один из самых посещаемых паломнических центров Беларуси.",
        workTime: "06:30-20:00",
        year: 1760,
        images: [
          "https://avatars.mds.yandex.net/get-altay/8093564/2a00000187a4a375d9b72bd77019d2058bec/XXL_height",
          "https://avatars.mds.yandex.net/get-altay/7691421/2a0000018872116011379583cb579fb54a1f/XXL_height",
          "https://avatars.mds.yandex.net/get-altay/14599414/2a000001996a61fc4d78440358cb7f059454/XXL_height",
        ],
        url: "",
      },
      {
        coords: [52.0465, 29.2315],
        name: "Собор святого Архангела Михаила (Мозырь)",
        address: "г. Мозырь, ул. Комсомольская, 20",
        description:
          "Кафедральный собор Туровской епархии. Бывший монастырь цистерцианок, ныне — главный оплот православия в Полесском регионе.",
        workTime: "07:00-19:00",
        year: 1745,
        images: [
          "https://avatars.mds.yandex.net/get-altay/15167717/2a00000196f466225e4421221943a2f4c6bb/orig",
          "https://avatars.mds.yandex.net/get-altay/18285113/2a0000019c8e2a5aac6a42c73fc1d865108d/L_height",
          "https://cdn.belarus.travel/Files/%D0%BC%D0%BE%D0%B7%D1%8B%D1%80%D1%8C/%D0%BC%D0%B8%D1%8522.jpg",
        ],
        url: "",
      },
      {
        coords: [52.0625, 27.7342],
        name: "Собор святителей Кирилла и Лаврентия Туровских",
        address: "г. Туров, ул. Ленинская, 97",
        description:
          "Построен в память о великих просветителях Туровской земли. Рядом находятся знаменитые «растущие» каменные кресты.",
        workTime: "08:00-18:00",
        year: 2013,
        images: [
          "https://ic.pics.livejournal.com/anonimusi/67966348/2649353/2649353_original.jpg",
          "https://turov.by/upload/iblock/dd0/uqsymaaqsrbbo3nx4z64e51dd98zytiu.jpg",
          "https://avatars.mds.yandex.net/get-altay/4524003/2a00000179e86aa9fbbbe09d0d28ca071558/L_height",
        ],
        url: "",
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
        images: [
          "https://core-pht-proxy.maps.yandex.ru/v1/photos/download?photo_id=FBRFzH5YrVkWSaoPfR2JHA&image_size=XXL",
          "https://core-pht-proxy.maps.yandex.ru/v1/photos/download?photo_id=eeS6iNinI8dTCMXVjbmZsQ&image_size=XXL",
          "https://core-pht-proxy.maps.yandex.ru/v1/photos/download?photo_id=lN12gHQTNAoI0fChXoW8rQ&image_size=XXL",
        ],
        url: "",
      },
      {
        coords: [53.9038, 30.3421],
        name: "Собор Преображения Господня",
        address: "ул. Габровская, 35",
        description:
          "Крупнейший православный храм города, способный вместить до 3500 прихожан. Построен в неовизантийском стиле, является кафедральным собором епархии.",
        workTime: "07:00-20:00",
        year: 2000,
        images: [
          "https://avatars.mds.yandex.net/get-altay/9237948/2a000001885e96402a3f6b9bf5f4ce8984ad/XXL_height",
          "https://avatars.mds.yandex.net/get-altay/15066961/2a00000197df845b16fc56de6c2519d5577e/XXL_height",
          "https://avatars.mds.yandex.net/get-altay/16497373/2a000001993a134304bea17b0dcdecf08fcd/XXL_height",
        ],
        url: "",
      },
      {
        coords: [53.8964, 30.3375],
        name: "Собор Трёх Святителей",
        address: "ул. Первомайская, 75",
        description:
          "Памятник архитектуры начала XX века в форме креста с семью куполами. Назван в честь Василия Великого, Григория Богослова и Иоанна Златоуста.",
        workTime: "08:00-19:00",
        year: 1903,
        images: [
          "https://avatars.mds.yandex.net/get-altay/13237301/2a000001907e97d29f3de1c30abe6a390a41/XXL_height",
          "https://avatars.mds.yandex.net/get-altay/481843/2a0000018d46cc18a61ed6019ffeca162dd1/XXL_height",
          "https://avatars.mds.yandex.net/get-altay/14021655/2a000001920582efc53a68b6b6291c11487a/XXL_height",
        ],
        url: "",
      },
      {
        coords: [53.9512, 30.3745],
        name: "Свято-Покровская церковь (Полыковичи)",
        address: "Могилевский р-н, д. Полыковичи",
        description:
          "Храм при знаменитой «Полыковичской кринице» — целебном источнике, известном с 1552 года. Место массового паломничества.",
        workTime: "09:00-18:00",
        year: 1830,
        images: [
          "https://avatars.mds.yandex.net/get-altay/15066961/2a000001978a26abe79335b2be1bbfd0c806/XXXL",
          "https://avatars.mds.yandex.net/get-altay/1622057/2a00000188d19cb0d4d641f49388063fc841/XXXL",
          "https://avatars.mds.yandex.net/get-altay/16444693/2a000001978a26bf6743e47a0ab329ad4dd8/XXXL",
        ],
        url: "",
      },
      {
        coords: [53.4025, 30.3342],
        name: "Свято-Успенский монастырь (Пустынки)",
        address: "Мстиславский р-н, пос. Пустынки",
        description:
          "Один из древнейших монастырей на востоке Беларуси, основанный князем Симеоном Лугвением. Известен явленным на стене ликом Христа.",
        workTime: "06:00-21:00",
        year: 1380,
        images: [
          "https://avatars.mds.yandex.net/get-altay/5195020/2a000001816223c4c7eb769a9ad5906b9cd6/XXXL",
          "https://avatars.mds.yandex.net/get-altay/15452616/2a00000198979db365baecad776c16f6b25d/XXXL",
          "https://avatars.mds.yandex.net/get-altay/5457654/2a0000017ed03c82b04369101e91119920b7/XXXL",
        ],
        url: "",
      },
      {
        coords: [53.8925, 29.2314],
        name: "Свято-Николо-Софийский храм (Бобруйск)",
        address: "г. Бобруйск, ул. Шмидта, 30",
        description:
          "Величественный храм из красного кирпича, духовный центр Бобруйска с богатой историей восстановления.",
        workTime: "07:30-19:00",
        year: 1991,
        images: [
          "https://avatars.mds.yandex.net/get-altay/12731162/2a0000019077471322d827bc09485f587877/XXXL",
          "https://avatars.mds.yandex.net/get-altay/3511135/2a0000017949492ade26ea3e1050f285c830/XXXL",
          "https://avatars.mds.yandex.net/get-altay/363317/2a0000015dd5f4651a7ced53d98bf55cd851/XXXL",
        ],
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
        images: [
          "https://avatars.mds.yandex.net/get-altay/3986135/2a0000017a060a69417469c6b98e8377865b/XXXL",
          "https://avatars.mds.yandex.net/get-altay/3986135/2a0000017a060a6f6522e9ff0dc7adc7c4cd/XXXL",
          "https://avatars.mds.yandex.net/get-altay/13212052/2a00000190e40951d3b97ae49bca03000a7e/XXXL",
        ],
        url: "",
      },
    ],
  };

  createAllPlacemarks(placesData, colors);

  const urlParams = new URLSearchParams(window.location.search);
  const cityFromUrl = urlParams.get("city");

  filterByCity(cityFromUrl, colors);
}

function filterByCity(city, colors) {
  map.geoObjects.removeAll();

  let marksToShow = [];
  if (city && allPlacemarks[city]) {
    marksToShow = allPlacemarks[city];
  } else {
    marksToShow = Object.values(allPlacemarks).flat();
  }

  if (marksToShow.length > 0) {
    let clusterColor = "#000";
    if (city && colors[city]) {
      clusterColor = colors[city];
    }

    const clusterer = new ymaps.Clusterer({
      preset: "islands#invertedVioletClusterIcons",
      clusterIconColor: clusterColor,
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

  if (images.length > 0) {
    const popupPic = document.querySelector(".browsing-history__form-pic");
    if (popupPic) {
      popupPic.src = images[0];
      popupPic.onerror = function () {
        this.src = "./img/no-image.jpg";
        this.onerror = null;
      };
    }
  }
}

ymaps.ready(init);
