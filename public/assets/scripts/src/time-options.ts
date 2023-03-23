import queryStringToJSON from "./utils/queryStringToJSON";
import parse from "date-fns/parse";
import format from "date-fns/format";
import locale from "date-fns/locale/pt-BR";
import appendChild from "./utils/appendChild";

const page = document.querySelector("#time-options") as HTMLElement;

type TimeOptionItem = {
  name: string;
  value: number;
  site?: string;
};

if (page) {
  const timeOptions: TimeOptionItem[] = [
    {
      name: "09:00",
      value: 9,
      site: "https://www.google.com",
    },
    {
      name: "10:00",
      value: 10,
    },
    {
      name: "11:00",
      value: 11,
    },
    {
      name: "12:00",
      value: 12,
    },
    {
      name: "13:00",
      value: 13,
    },
    {
      name: "14:00",
      value: 14,
    },
    {
      name: "15:00",
      value: 15,
    },
    {
      name: "16:00",
      value: 16,
    },
  ];

  const title = page.querySelector("h3") as HTMLHeadingElement;
  const options = page.querySelector(".options") as HTMLDivElement;
  const values = queryStringToJSON();
  const scheduleAtInput = page.querySelector(
    "[name=schedule_at]"
  ) as HTMLInputElement;

  scheduleAtInput.value = values.schedule_at;

  const scheduleAt = parse(values.schedule_at, "yyyy-MM-dd", new Date());

  if (scheduleAt.toString() === "Invalid Date") {
    location.href = "schedules-new.html";
  } else {
    //data é válida vamos preencher os horários.

    const checkSelectedInput = () => {
      const button = page.querySelector("[type=submit]") as HTMLButtonElement;

      if (page.querySelector("[name=option]:checked")) {
        //remove o atributo disabled do botão
        button.disabled = false;
      } else {
        //adiciona o atributo disabled do botão
        button.disabled = true;
      }
    };

    options.innerHTML = "";

    //a diferença entre forEach e array map é que o map retorna um novo array

    timeOptions.forEach((item) => {
      const label = appendChild(
        "label",
        `
        <input type="radio" name="option" value="${item.value}" />
        <span>${item.name}</span>
        `,
        options
      );

      const labelInput = label.querySelector("input") as HTMLInputElement;
      labelInput.addEventListener("change", checkSelectedInput);
    });

    title.innerText = format(scheduleAt, "cccc, d 'de' MMMM 'de' yyyy", {
      locale,
    });
  }
}
