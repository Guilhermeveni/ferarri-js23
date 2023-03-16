import {
  addDays,
  differenceInSeconds,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import locale from "date-fns/locale/pt-BR";
const page = document.querySelector("#schedules-new");

if (page) {
  //significa que estamos na página de agendamento

  const today = new Date();
  let beginOfMonth = startOfMonth(today);

  const btnToday = page.querySelector(".btn-today") as HTMLButtonElement;
  const btnPrev = page.querySelector(".btn-prev") as HTMLButtonElement;
  const btnNext = page.querySelector(".btn-next") as HTMLButtonElement;
  const title = page.querySelector("h2") as HTMLHeadingElement;
  const calendar = page.querySelector(".days") as HTMLUListElement;

  const render = () => {
    title.innerText = format(beginOfMonth, "MMMM yyyy", { locale });
    //toda vez que chamarem o método render, limpa o calendário
    calendar.innerHTML = "";
    let currentDay = startOfWeek(beginOfMonth);
    const lastDay = endOfWeek(endOfMonth(beginOfMonth));

    while (differenceInSeconds(lastDay, currentDay) > 0) {
      const li = document.createElement("li");
      li.innerText = format(currentDay, "d");
      li.dataset.schedule = format(currentDay, "yyyy-MM-dd");

      //verificando se estamos no mês passado
      if (format(currentDay, "yyyyMM") < format(beginOfMonth, "yyyyMM")) {
        li.classList.add("month-prev");
      }
      if (format(currentDay, "yyyyMM") > format(beginOfMonth, "yyyyMM")) {
        li.classList.add("month-next");
      }
      if (format(currentDay, "yyyyMM") === format(today, "yyyyMM")) {
        li.classList.add("active");
      }

      calendar.appendChild(li);
      currentDay = addDays(currentDay, 1);
    }
  };

  render();
}
