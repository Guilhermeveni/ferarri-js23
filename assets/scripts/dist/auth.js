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
    const showAuthForm = (id) => {
        document.getElementById(id)?.classList.remove("hide");
    };
    //Criando uma função para ser carregada toda vez que a página for carregada e verificar
    // qual form deve ser exibido;
    const authHash = () => {
        // primeira coisa, esconde todos os forms
        hideAuthForms();
        if (sessionStorage.getItem("email")) {
            const emails = [
                ...document.querySelectorAll("[name=email]"),
            ];
            emails.forEach((el) => {
                el.value = sessionStorage.getItem("email") ?? "";
            });
        }
        const queryString = queryStringToJSON();
        if (queryString.mode && queryString.mode === "resetPassword") {
            location.hash = "#reset";
            showAuthForm("reset");
        }
        else {
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
    const formAuthEmail = document.querySelector("#auth-email");
    if (formAuthEmail) {
        formAuthEmail.addEventListener("submit", (e) => {
            e.preventDefault();
            try {
                const form = e.target;
                const button = form.querySelector("[type=submit]");
                const { value } = form.querySelector("[type=email]");
                button.disabled = true;
                sessionStorage.setItem("email", value);
                location.hash = "#login";
                button.disabled = false;
            }
            catch (e) {
                console.warn("Houve um problema ao enviar o formulário");
            }
        });
    }
}
