//Core JS for HTML Switching in one file of different tabs
function setupTabs() {
    document.querySelectorAll(".tabs__button").forEach(button =>
        button.addEventListener("click", () => {

            const sideBar = button.parentElement;
            const tabsContainer = sideBar.parentElement;
            const tabNumber = button.dataset.forTab;
            const tabtoActivate = tabsContainer.querySelector(`.tabs__content[data-tab="${tabNumber}"]`);
        

            sideBar.querySelectorAll(".tabs__button").forEach(button => {
                button.classList.remove("tabs__button--active");
            });

            tabsContainer.querySelectorAll(".tabs__content").forEach(tab => {
                tab.classList.remove("tabs__content--active");
            });

            button.classList.add("tabs__button--active");
            tabtoActivate.classList.add("tabs__content--active");

        })

    );
}

//Run the function above as soon as DOM Content is loaded...
document.addEventListener("DOMContentLoaded", ()=> {
    setupTabs();

    document.querySelectorAll(".tabs").forEach(tabsContainer => {
        tabsContainer.querySelector(".tabs__sidebar .tabs__button").click();
    })
});
