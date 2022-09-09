enum ErrorInput {
  EMAIL = 'латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть @ и точка после нее, но перед точкой обязательно должны быть буквы',
  LOGIN = 'Логин должен содержать от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчеркивание',
  FIRTS_NAME = 'латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
  SECOND_NAME = 'латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
  PHONE = 'от 10 до 15 символов, состоит из цифр, может начинаться с плюса',
  PASSWORD = 'Пароль должен содержать от 8 до 40 символов, должна быть одна заглавная буква и цифра',
  DISPLAY_NAME = 'латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
  MESSAGE = 'не должно быть пустым',
  DEFAULT = 'не должно быть пустым',
}

enum RegInput {
  EMAIL = '^[a-z0-9._%$#+-]+@[a-z0-9]*[a-z]+\.[a-z]+$',
  LOGIN = '^(?=.*[a-z])[a-zA-Z0-9_-]{3,20}$',
  FIRTS_NAME = '^[А-ЯA-Z][а-яА-ЯёЁa-zA-Z-]+$',
  SECOND_NAME = '^[А-ЯA-Z][а-яА-ЯёЁa-zA-Z-]+$',
  PHONE = '^[0-9+][0-9]{9,14}$',
  PASSWORD = '^(?=.*[A-Z])(?=.*[0-9]).{8,40}$',
  DISPLAY_NAME = '^[А-ЯA-Z][а-яА-ЯёЁa-zA-Z-]+$',
  MESSAGE = '[^\s]',
  DEFAULT = '[^\s]',
}

export function ValidationSettings(key: string): Array<string> {
  switch (key) {
    case 'email':
      return [ErrorInput.EMAIL, RegInput.EMAIL];
    case 'login':
      return [ErrorInput.LOGIN, RegInput.LOGIN];
    case 'first_name':
      return [ErrorInput.FIRTS_NAME, RegInput.FIRTS_NAME];
    case 'second_name':
      return [ErrorInput.SECOND_NAME, RegInput.SECOND_NAME];
    case 'phone':
      return [ErrorInput.PHONE, RegInput.PHONE];
    case 'password':
      return [ErrorInput.PASSWORD, RegInput.PASSWORD];
    case 'passwordYet':
      return [ErrorInput.PASSWORD, RegInput.PASSWORD];
    case 'oldPassword':
      return [ErrorInput.PASSWORD, RegInput.PASSWORD];
    case 'newPassword':
      return [ErrorInput.PASSWORD, RegInput.PASSWORD];
    case 'display_name':
      return [ErrorInput.DISPLAY_NAME, RegInput.DISPLAY_NAME];
    case 'message':
      return [ErrorInput.MESSAGE, RegInput.MESSAGE];
    }
  return [ErrorInput.DEFAULT, RegInput.DEFAULT];
}