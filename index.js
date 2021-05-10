let data = {
  year: 2021,
  month: 1,
  weekday: "",
  day: "0",
  days: [],
  alldays: 31,
};
const weekdays = {
  0: "Ня",
  1: "Да",
  2: "Мя",
  3: "Лх",
  4: "Пү",
  5: "Ба",
  6: "Бя",
};
const months = {
  1: "jan",
  2: "feb",
  3: "mar",
  4: "apr",
  5: "may",
  6: "jun",
  7: "jul",
  8: "aug",
  9: "sep",
  10: "oct",
  11: "nov",
  12: "dec",
};
const calendar2021 = {
  jan: { 1: "Сайхан амарна" },
  feb: {
    1: "Сагсны тэмцээнтэй",
    3: "Шагнал гардуулна даа",
    17: "Жавхлан багшийн лаб 2-ыг хийнэ",
  },
  mar: {
    2: "Энэ лабынхаа хугацааг сунгах уу яах вэ гэдэгээ шийднэ",
    6: "Энд юу бичье дээ байз",
    8: "Эмэгтэйчүүддээ баяр хүргэнэ дээ",
  },
  apr: { 1: "Бүгдээрээ худлаа ярьцаагаагаарай" },
  may: { 10: "Энэ сард ч ёстой юу ч болдоггүй сар даа" },
  jun: { 6: "Жавхлан багшийн төрсөн өдөр" },
  jul: { 4: "Хичээл амарсаан ураа" },
  aug: { 1: "Хөдөө явдаг цаг даа", 25: "Хичээл сонголт эхэллээ" },
  sep: { 1: "9-н сарын нэгэн боллоо ерөөсөө бидний баяр даа" },
  oct: { 13: "Сур сур бас дахин сур" },
  nov: { 2: "Сурсаар л бай" },
  dec: {
    20: "Өвлийн семистер хаагдах нь дээ",
    30: "Дүн гаргаж дууслаа баярлалаа баяртай",
  },
};

const calendarContainer = document.querySelector(".calendar");
const descContainer = document.querySelector(".desc-container");
const calcDays = () => {
  data.days = [];
  data.alldays = new Date(data.year, data.month, 0).getDate();
  const startDay = new Date(`${data.year}/${data.month}/1`).getDay();
  for (let i = 1; i <= data.alldays; i++) {
    data.days.push(i);
  }
  for (let i = 0; i < startDay; i++) {
    data.days.unshift("");
  }
};

const render = (index) => {
  let html = `
 
  <header class="calendar__header">
    <span class="prev"><</span>
    <h1 class="calendar__header__month">${data.year} оны ${
    data.month
  }-р сар</h1>
    <span class="next">></span>
  </header>
  <div class="calendar__body">
    <div class="calendar__body__week-days">
      <div>Ня</div>
      <div>Да</div>
      <div>Мя</div>
      <div>Лх</div>
      <div>Пү</div>
      <div>Ба</div>
      <div>Бя</div>
    </div>
    <div class="calendar__body__month-days">
    ${data.days
      .map((day) => {
        return `<div><span class=${
          Object.keys(calendar2021[months[data.month]]).includes("" + day) &&
          `cbox cbox--green`
        }>${day}<span></div>`;
      })
      .join("")}
    </div>
  </div>

  `;
  calendarContainer.insertAdjacentHTML("beforeend", html);
  clickEvent();
};

const clickEvent = () => {
  let next = document.querySelector(".next");
  let prev = document.querySelector(".prev");
  if (prev && next) {
    prev.addEventListener("click", () => {
      data.month -= 1;
      if (data.month < 1) {
        data.month = 12;
        data.year -= 1;
      }
      calcDays();
      clear();
      render();
    });
    next.addEventListener("click", () => {
      data.month += 1;
      if (data.month > 12) {
        data.month = 1;
        data.year += 1;
      }
      calcDays();
      clear();
      render();
    });
  }
};
const clear = () => {
  const cal = document.querySelector(`.calendar`);

  if (cal) {
    cal.innerHTML = "";
  }
};

calcDays();
render();
// Search хийх
const searchField = document.querySelector(".calendar__search__list");
(function () {
  const input = document.getElementById("input");
  let monthEvents = [];
  Object.entries(calendar2021).map((month) => {
    // console.log(month[1]);
    Object.entries(month[1]).map((day) => {
      monthEvents.push(`${day[1]}|${day[0]}/${month[0]}`);
    });
  });
  let filteredEvents = [];
  if (input) {
    input.onkeyup = function (e) {
      // console.log(e.target.value !== "");
      if (e.target.value !== "") {
        filteredEvents = monthEvents.filter((event) => {
          if (event.split()[0].toLowerCase().includes(e.target.value)) {
            return event;
          }
        });
      } else {
        filteredEvents = [];
        searchField.classList.remove("calendar__search--active");
        searchField.innerHTML = "";
      }
      searchField.innerHTML = "";
      if (filteredEvents.length > 0) {
        filteredEvents.map((event) => {
          const split = event.split("|");
          const html = `
          <li>
         ${split[0].trim()}<span>${split[1]}</span>
        </li>
          `;
          searchField.classList.add("calendar__search--active");
          searchField.insertAdjacentHTML("beforeend", html);
        });
      } else {
        searchField.classList.remove("calendar__search--active");
        searchField.innerHTML = "";
      }
    };
  }
})();
