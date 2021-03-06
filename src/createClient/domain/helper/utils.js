const calculateAge = (dob) => {
  const today = new Date();
  const birth = new Date(dob);

  let edad = today.getFullYear() - birth.getFullYear();
  let monthDifference = today.getMonth() - birth.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() <= birth.getDate())
  ) {
    edad--;
  }

  return edad;
};

const canOpenAccountByAge = (dob) => {
  const legalAge = process.env.LEGAL_AGE || 18;
  const topAge = process.env.TOP_AGE || 65;
  const age = calculateAge(dob);

  if ((age < legalAge) || (age > topAge)) {
    return false;
  }
  return true;
};

module.exports = { canOpenAccountByAge, calculateAge };
