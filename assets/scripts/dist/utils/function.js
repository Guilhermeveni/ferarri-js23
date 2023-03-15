export const fnCloseMenu = (elAll, stopEvent = false) => {
    const body = document.querySelector("body");
    if (body) {
        if (elAll) {
            elAll.forEach((el) => {
                el.addEventListener("click", (e) => {
                    if (stopEvent) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    body.classList.remove("open-menu");
                });
            });
        }
    }
};
