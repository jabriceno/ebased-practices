const { canOpenAccountByAge } = require('../src/createClient/domain/helper/utils');

describe('Validates if a user can open a new account', () => {
  it('Should return true', () => {
    // Given
    const user = {
      dni: "90909090",
      name: "John",
      lastname: "Doe",
      dob: "2004-03-07"
    };

    // When
    const actualResult = canOpenAccountByAge(user.dob);

    // Then
    expect(actualResult).toBeTruthy();
  });

  it('Should return false', () => {
    // Given
    const user = {
      dni: "90909090",
      name: "Mary",
      lastname: "Jane",
      dob: "2007-03-07"
    };

    // When
    const actualResult = canOpenAccountByAge(user.dob);

    // Then
    expect(actualResult).toBeFalsy();
  });
});
