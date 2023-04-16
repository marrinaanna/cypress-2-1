import seat from '../fixtures/seats.json';
import admin_data from '../fixtures/admin_data.json';
import '../support/commands.js'

it("Should be possible to book", () => {
  cy.visit("qamid.tmweb.ru");
  cy.get("a.page-nav__day:nth-of-type(4)").click();
  cy.get(".movie").first().contains("21:00").click();
  
  seat.forEach((seat) => {
    cy.get(
      `.buying-scheme__wrapper > :nth-child(${seat.row}) > :nth-child(${seat.seat})`
    ).click();
  });
  cy.get(".acceptin-button").click();
  cy.contains("Вы выбрали билеты:").should("be.visible");
});

it("Should show correct number of days", () => {
  cy.visit("/admin");
  cy.login("qamid@qamid.ru", "qamid");
  cy.get('#start-sales > [style="display: block;"] > .conf-step__selectors-box')
    .its("length")
    .then((hall_number) => {
      for (let i = 1; i <= hall_number; i += 1) {
        let button = `#start-sales > div:nth-child(2) > ul > li:nth-child(${i})`;
        cy.get(button).click();
        if (cy.get('.text-center > .conf-step__paragraph').contains("Продажа билетов открыта!!!")) {
          cy.get(button).then(($el) => {
            const hall_name = $el.text();
            cy.visit("/");
            cy.get(`body > nav > a:nth-child(${2})`).click();
            cy.contains(hall_name).parent().find('.movie-seances__time').click();
            cy.get('.buying__info-hall').contains(hall_name).should("be.visible");
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




