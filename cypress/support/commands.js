import selectors from '../fixtures/selectors.json';

Cypress.Commands.add("login", (login, password) => {
  cy.contains("Авторизация");
  cy.get(selectors.mail).type(login);
  cy.get(selectors.password).type(password);
  cy.get(selectors.buttonLogin).click();
});

Cypress.Commands.add("createUser",(id, username, firstName, lastName, email, password, phone, userStatus) => {
    cy.request({
      method: "POST",
      url: "https://petstore.swagger.io/v2/user",
      body: {
        id: id,
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        phone: phone,
        userStatus: userStatus,
      },
    });
  }
);

Cypress.Commands.add(
  "updateUser",(id, username, firstName, lastName, email, password, phone, userStatus) => {
    cy.request({
      method: "PUT",
      url: "https://petstore.swagger.io/v2/user/marinaanna",
      body: {
        id: id,
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        phone: phone,
        userStatus: userStatus,
      },
    });
  }
);

Cypress.Commands.add("check_userStatus",() => {
    cy.request({
      method: "GET",
      url: "https://petstore.swagger.io/v2/user/marinaanna"
   });
  }
);

Cypress.Commands.add("deleteUser", (username) => {
  cy.request({
    method: "DELETE",
    url: "https://petstore.swagger.io/v2/user/marinaanna",
  });
});