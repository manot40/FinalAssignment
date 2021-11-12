export function hashDecode(window: Window) {
  try {
    let hashParams: any = {};
    let e,
      a = /\+/g,
      r = /([^&;=]+)=?([^&;]*)/g,
      d = function (s: string) {
        return decodeURIComponent(s.replace(a, " "));
      },
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) hashParams[d(e[1])] = d(e[2]);
    return hashParams;
  } catch (e) {
    return {};
  }
}

export function isEmailValid(email: string) {
  const isValid = email.match(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})$/
  );
  return typeof isValid?.length !== "undefined";
}

export function isPasswordStrong(password: string) {
  const isStrong = password.match(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
  );
  return typeof isStrong?.length !== "undefined";
}
