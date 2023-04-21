import seat from '../fixtures/seats.json';
import '../support/commands.js'
const selectors = require("../fixtures/selectors.json");

it("Should show correct number of days", () => {
  cy.visit("/admin");
  cy.login("qamid@qamid.ru", "qamid");
  cy.get(selectors.openSale)
    .its("length")
    .then((hall_number) => {
      for (let i = 1; i <= hall_number; i += 1) {
        let button = `#start-sales > div:nth-child(2) > ul > li:nth-child(${i})`;
        cy.get(button).click();
        if (cy.get(selectors.openSale).contains("Продажа билетов открыта!!!")) {
          cy.get(button).then(($el) => {
            const hall_name = $el.text();
            cy.visit("/");
            cy.get(`body > nav > a:nth-child(${2})`).click();
            cy.contains(hall_name).parent().find(selectors.movieSeanceTime).click();
            cy.get(selectors.buying__info_hall).contains(hall_name).should("be.visible");
            seat.forEach((seat) => {
              cy.get(
                `.buying-scheme__wrapper > :nth-child(${seat.row}) > :nth-child(${seat.seat})`
              ).click();
            });
            cy.get('button').contains("Забронировать").click();
            cy.get("h2").should("have.text", "Вы выбрали билеты:").should("be.visible");
            const place = seat[0].row + "/" + seat[0].seat;
            cy.contains(place).should("be.visible");
            cy.contains(hall_name).should("be.visible");
            cy.get("button").contains("Получить код бронирования").click();
            cy.get("h2").should("have.text", "Электронный билет").should("be.visible");
          });
          break;
        }
      }
    });
});




