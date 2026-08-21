const today = new Date();
const weekNumber = getWeekNumber(today);

console.log(today);
console.log(weekNumber);

document.getElementById("week-number").textContent = weekNumber;

function getWeekNumber(date) {
    const tempDate = new Date(date.getTime());

    tempDate.setHours(0, 0, 0, 0);

    tempDate.setDate(
        tempDate.getDate() + 3 - (tempDate.getDay() + 6) % 7
    );

    const week1 = new Date(
        tempDate.getFullYear(),
        0,
        4
    );

    return 1 + Math.round(
        (
            (tempDate - week1) / 86400000
            - 3
            + (week1.getDay() + 6) % 7
        ) / 7
    );
}


fetch("veckomeny.json")
    .then(response => response.json())
    .then(weeks => {

        const today = new Date();
        const currentWeek = getWeekNumber(today);

        const week = weeks.find(
            week => week.vecka === currentWeek
        );

        if (!week) {
            return;
        }

        const menuWidget =
            document.getElementById("menu-widget");

        week.dagar.forEach(day => {

            const dayElement =
                document.createElement("div");

            dayElement.classList.add("menu-day");

            dayElement.innerHTML = `
                <h3>${day.dag}</h3>
                <a href="${day.url}">
                    ${day.recept}
                </a>
            `;

            menuWidget.appendChild(dayElement);
        });
    });