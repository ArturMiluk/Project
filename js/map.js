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
        coords: [53.905105, 27.547372],
        name: "Костёл Святых Симеона и Елены (Красный костёл)",
        address: "ул. Советская, 15",
        description:
          "Самый известный католический храм Минска в неороманском стиле с элементами модерна. Построен из красного кирпича на средства мецената Эдварда Войниловича в память о его рано умерших детях.",
        workTime: "Пн-Пт: 08:00-20:00, Сб-Вс: 07:00-21:00",
        year: 1910,
        images: ["./img/bg.jpg", "", ""],
        url: "http://chyrvony.by",
      },
      {
        coords: [53.905047, 27.556272],
        name: "Кафедральный собор Сошествия Святого Духа",
        address: "ул. Кирилла и Мефодия, 3",
        description:
          "Главный православный храм города, возведенный в стиле виленского барокко. Бывший храм монастыря бернардинок. Здесь хранится чудотворная Минская икона Божией Матери, обретенная в 1500 году.",
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
          "Старейшая действующая церковь Минска, памятник архитектуры Ренессанса. Храм на протяжении веков оставался единственным оплотом православия в городе в окружении католических монастырей.",
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
          "Уникальный 72-метровый храм в форме шатра, построенный в память о невинно убиенных защитниках Отечества. В крипте храма собрана земля с мест сражений двух мировых войн.",
        workTime: "Пн-Пт: 08:00-19:00, Сб-Вс: 07:30-20:00",
        year: 2010,
        images: ["./img/bg.jpg", "", ""],
        url: "https://hramvs.by",
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
          "Один из крупнейших храмов города, построенный из красного кирпича в неорусском стиле. Духовный центр микрорайона Вишневец, возведенный на месте гибели солдат Второй мировой войны.",
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
          "Уникальный памятник архитектуры XII века и одна из старейших действующих церквей в Восточной Европе. Знаменита вставками из майоликовых плиток и отличной акустикой благодаря встроенным в стены голосникам.",
        workTime: "Ежедневно: 09:00-18:00 (службы до 20:00)",
        year: 1180,
        images: ["./img/bg.jpg", "", ""],
        url: "https://kalozha.by/",
      },
      {
        coords: [53.678393, 23.830919],
        name: "Собор Святого Франциска Ксаверия (Фарный костел)",
        address: "пл. Советская, 4",
        description:
          "Визитная карточка Гродно и один из самых богатых костелов Речи Посполитой. Высота башен — 50 метров. Внутри находится один из самых высоких деревянных алтарей в Европе и старейшие действующие башенные часы.",
        workTime: "Пн-Сб: 07:00-20:00, Вс: 07:00-21:30",
        year: 1678,
        images: ["./img/bg.jpg", "", ""],
        url: "http://farnygrodno.by",
      },
      {
        coords: [53.684534, 23.839885],
        name: "Свято-Покровский кафедральный собор",
        address: "ул. Э. Ожешко, 23",
        description:
          "Главный православный храм города, возведенный в память о воинах, погибших в Русско-японской войне. Построен в псевдорусском стиле и отличается богатым внутренним убранством с почитаемыми списками икон.",
        workTime: "Пн-Сб: 07:30-20:00, Вс: 06:30-20:00",
        year: 1904,
        images: ["./img/bg.jpg", "", ""],
        url: "https://pokrovbor.by",
      },
      {
        coords: [53.675031, 23.827725],
        name: "Костел Обретения Святого Креста (Бернардинский)",
        address: "ул. Парижской Коммуны, 1",
        description:
          "Крупнейший архитектурный комплекс Гродно, сочетающий черты готики, ренессанса и барокко. В интерьере сохранились уникальные скульптурные композиции и старинный орган.",
        workTime: "Пн-Сб: 07:00-19:30, Вс: 08:00-21:00",
        year: 1595,
        images: ["./img/bg.jpg", "", ""],
        url: "https://grodnensis.by",
      },
      {
        coords: [53.676643, 23.821424],
        name: "Костел Девы Марии Ангельской (Францисканский)",
        address: "ул. Огородная, 2",
        description:
          "Памятник барокко на левом берегу Немана. В этом храме служил святой Максимилиан Кольбе. Храм известен своим резным деревянным алтарем XVIII века.",
        workTime: "Пн-Сб: 07:00-19:00, Вс: 08:30-20:00",
        year: 1635,
        images: ["./img/bg.jpg", "", ""],
        url: "https://grodnensis.by",
      },
      {
        coords: [53.680654, 23.826723],
        name: "Свято-Рождество-Богородичный женский монастырь",
        address: "ул. Давыда Городенского, 3",
        description:
          "Обитель на месте древней Пречистенской церкви XII века. Центром комплекса является храм в стиле позднего барокко. Здесь хранится чудотворная Владимирская икона Божией Матери.",
        workTime: "Пн-Сб: 07:00-20:00, Вс: 06:00-20:00",
        year: 1720,
        images: ["./img/bg.jpg", "", ""],
        url: "https://obitel-grodno.by",
      },
    ],
    vitebsk: [
      {
        coords: [55.195353, 30.201734],
        name: "Свято-Успенский кафедральный собор",
        address: "ул. Комиссара Крылова, 9",
        description:
          "Величественный храм в стиле виленского барокко, возвышающийся на Успенской горе над слиянием рек Витьбы и Западной Двины. Воссоздан в 2000-х годах по чертежам XVIII века.",
        workTime: "Пн-Сб: 07:30-20:00, Вс: 06:30-20:00",
        year: 2001,
        images: ["./img/bg.jpg", "", ""],
        url: "http://vitprav.by",
      },
      {
        coords: [55.193635, 30.205934],
        name: "Витебская ратуша",
        address: "ул. Ленина, 36",
        description:
          "Символ городского самоуправления и одно из немногих сохранившихся зданий города с элементами барокко и классицизма. Внутри расположен областной краеведческий музей.",
        workTime: "Вт-Вс: 10:00-18:00, Пн: выходной",
        year: 1775,
        images: ["./img/bg.jpg", "", ""],
        url: "https://ratusha-vit.by",
      },
      {
        coords: [55.191422, 30.203875],
        name: "Благовещенская церковь",
        address: "ул. Замковая, 1",
        description:
          "Древнейший храм города (XII век), уникальный образец византийского зодчества. Стены сложены из чередующихся рядов белого камня и плоского кирпича (плинфы).",
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
          "Православный храм в стиле виленского барокко, восстановленный в 2009 году. Благодаря своей архитектурной легкости и изяществу считается одним из самых красивых зданий города.",
        workTime: "Пн-Пт: 08:00-19:00, Сб-Вс: 07:00-20:00",
        year: 2001,
        images: ["./img/bg.jpg", "", ""],
        url: "http://vitprav.by",
      },
    ],
    brest: [
      {
        coords: [52.083321, 23.669372],
        name: "Свято-Николаевский гарнизонный собор",
        address: "ул. Героев обороны Брестской крепости, 60/1",
        description:
          "Храм в византийском стиле, расположенный в самом центре крепости. Пережил множество штурмов, служил гарнизонным клубом, а ныне полностью восстановлен.",
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
          "Памятник русско-византийского стиля, построенный из кирпича. Главный православный храм города, где хранятся мощи преподобномученика Афанасия Брестского.",
        workTime: "Пн-Сб: 07:00-20:00, Вс: 06:00-20:00",
        year: 1865,
        images: ["", "", ""],
        url: "http://brest-svisimeon.by",
      },
      {
        coords: [52.094541, 23.693155],
        name: "Костел Воздвижения Святого Креста",
        address: "ул. Ленина, 34",
        description:
          "Католический храм в стиле позднего классицизма. Внутри находится одна из самых почитаемых католических святынь региона — икона Брестской Божьей Матери.",
        workTime: "Пн-Пт: 08:00-20:00, Сб-Вс: 07:30-21:00",
        year: 1856,
        images: ["./img/bg.jpg", "", ""],
        url: "https://brest-catholic.by",
      },
    ],
    gomel: [
      {
        coords: [52.422325, 31.016335],
        name: "Дворец Румянцевых и Паскевичей",
        address: "пл. Ленина, 4",
        description:
          "Центральный объект дворцово-паркового ансамбля, шедевр классицизма. Бывшее имение российских полководцев с богатыми интерьерами, гротами и зимним садом.",
        workTime: "Вт-Пт: 11:00-19:00, Сб-Вс: 10:00-18:00",
        year: 1794,
        images: ["./img/bg.jpg", "", ""],
        url: "http://www.palacegomel.by",
      },
      {
        coords: [52.423455, 31.015764],
        name: "Собор святых Петра и Павла",
        address: "пл. Ленина, 4",
        description:
          "Величественный классический собор на берегу Сожа, построенный графом Румянцевым. Является архитектурной доминантой дворцового парка.",
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
          "Духовный центр Гомеля. Деревянный храм был построен еще в 1904 году на средства железнодорожников и чудом уцелел в годы гонений.",
        workTime: "Ежедневно: 07:00-20:00",
        year: 1904,
        images: ["./img/bg.jpg", "", ""],
        url: "https://nikolsky.by",
      },
    ],
    mogilev: [
      {
        coords: [53.894541, 30.323562],
        name: "Свято-Никольский женский монастырь",
        address: "ул. Сурты, 19",
        description:
          "Жемчужина белорусского барокко XVII века. Внесен в список ЮНЕСКО как объект мирового значения. Славится своим уникальным четырехъярусным резным иконостасом.",
        workTime: "Ежедневно: 07:00-19:00",
        year: 1636,
        images: ["./img/bg.jpg", "", ""],
        url: "http://mazary.by",
      },
      {
        coords: [53.898324, 30.332451],
        name: "Городская ратуша",
        address: "ул. Ленинская, 1",
        description:
          "Символ вольного города, восстановленный в 2008 году. На башне установлены уникальные часы с механическим трубачом Магиславом, который выходит трижды в день.",
        workTime: "Вт-Вс: 10:00-18:00, Пн: выходной",
        year: 1578,
        images: ["./img/bg.jpg", "", ""],
        url: "https://museummogilev.by",
      },
      {
        coords: [53.901245, 30.334123],
        name: "Собор Успения Девы Марии и Святого Станислава",
        address: "ул. Комсомольская, 4",
        description:
          "Кафедральный костел с уникальными фресками XVIII века. Стены храма расписаны редкими для Беларуси библейскими сюжетами в стиле позднего барокко.",
        workTime: "Пн-Сб: 07:30-19:30, Вс: 08:00-20:00",
        year: 1738,
        images: ["./img/bg.jpg", "", ""],
        url: "https://mogilev-catholic.by",
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
