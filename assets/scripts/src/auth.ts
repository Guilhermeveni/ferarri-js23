import queryStringToJSON from "./utils/queryStringToJSON.js";

const authPage = document.querySelector("main#auth");
if (authPage) {
  //Criando função para esconder os forms
  const hideAuthForms = () => {
    document.querySelectorAll("#auth form").forEach((el) => {
      el.classList.add("hide");
    });
  };
  //Criando função para exibir um form;
  const showAuthForm = (id: string) => {
    document.getElementById(id)?.classList.remove("hide");
  };

  //Criando uma função para ser carregada toda vez que a página for carregada e verificar
  // qual form deve ser exibido;
  const authHash = () => {
    // primeira coisa, esconde todos os forms
    hideAuthForms();

    if (sessionStorage.getItem("email")) {
      const emails = [
        ...document.querySelectorAll<HTMLInputElement>("[name=email]"),
      ];
      emails.forEach((el: HTMLInputElement) => {
        el.value = sessionStorage.getItem("email") ?? "";
      });
    }

    const queryString = queryStringToJSON();

    if (queryString.mode && queryString.mode === "resetPassword") {
      location.hash = "#reset";
      showAuthForm("reset");
    } else {
      switch (location.hash) {
        case "#register":
          showAuthForm("register");
          break;
        case "#login":
          showAuthForm("login");
          break;
        case "#forget":
          showAuthForm("forget");
          break;
        case "#reset":
          showAuthForm("reset");
          break;
        default:
          showAuthForm("auth-email");
          break;
      }
    }
  };

  window.addEventListener("load", (e) => {
    //Carregou a primeira vez
    console.log("Carregou a primeira vez");
    authHash();
  });

  window.addEventListener("hashchange", (e) => {
    //Alterou o hash
    console.log("Alterou o hash");
    authHash();
  });

  const formAuthEmail = document.querySelector(
    "#auth-email"
  ) as HTMLFormElement;

  if (formAuthEmail) {
    formAuthEmail.addEventListener("submit", (e: Event) => {
      e.preventDefault();

      try {
        const form = e.target as HTMLFormElement;
        const button = form.querySelector("[type=submit]") as HTMLButtonElement;
        const { value } = form.querySelector(
          "[type=email]"
        ) as HTMLInputElement;

        button.disabled = true;
        sessionStorage.setItem("email", value);
        location.hash = "#login";
        button.disabled = false;
      } catch (e) {
        console.warn("Houve um problema ao enviar o formulário");
      }
    });
  }
}
