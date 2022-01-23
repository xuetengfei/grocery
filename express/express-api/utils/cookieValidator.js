async function cookieValidator(cookies) {
  return 'ok';
  try {
    await externallyValidateCookie(cookies.testCookie);
  } catch {
    throw new Error('Invalid cookies');
  }
}

module.exports = cookieValidator;
