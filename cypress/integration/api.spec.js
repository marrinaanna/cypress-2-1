import '../support/commands.js'
const {
  id,
  username,
  firstName,
  lastName,
  email,
  password,
  phone,
  userStatus,
} = require("../fixtures/user.json");

describe("Api tests", () => {
  it("Should create a new user", () => {
    cy.createUser(id, username, firstName, lastName, email, password, phone, userStatus).then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eql("170420231056");
      }
    );
    cy.deleteUser(username);
  });

  it("Should update user", () => {
    cy.createUser(id, username, firstName, lastName, email, password, phone, userStatus);
    cy.updateUser(id, username, firstName, lastName, email, password, phone, "8").then(
      (response) => {
        expect(response.status).to.eq(200);
      }
    );
    cy.check_userStatus().then((response) => {expect(response.body.password).to.eql(password)});
    cy.deleteUser(username);
  });

  it("Should delete user", () => {
    cy.createUser(id, username, firstName, lastName, email, password, phone, userStatus);
    cy.deleteUser(username).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eql("marinaanna");
    });
  });
});