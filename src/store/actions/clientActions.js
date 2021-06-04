import {
  USER_AUTH,
  USER_UNAUTH,
  USER_ADD_DICT,
  USER_CREATE_NEW_DICT,
  USER_FILL_DICT, USER_CREATE_NEW_WORD, USER_ADD_WORD, USER_FILL_WORD
} from "../constants/constantsClient";

/**
 * Аутентификация пользователя
 * @param {string} token - токен пользователя;
 * @param {number} id_user - id пользователя
 */
export const auth = (token, id_user) => (
  {
    type: USER_AUTH,
    payload: {
      token: token,
      id_user: id_user
    }
  }
)

/**
 * Разлогинизация пользователя
 */
export const unAuth = () => (
  {
      type: USER_UNAUTH,
      payload: {}
  }
)

/**
 * Создание шаблона словаря
 * @returns {{payload: {}, type}}
 * @constructor
 */
export const AddDictForm = (id_dict) => (
  {
    type: USER_ADD_DICT,
    payload: {
      id_dict: id_dict,
      props: [],
      active: false
    }
  }
)

/**
 * Создание нового словаря
 * @param name
 * @param desc
 * @param lang
 * @param type
 * @param id_dict
 * @returns {{payload: {id_dict, name, lang, type, desc}, type: string}}
 */
export const createNewDict = (name, desc, lang, type, id_dict) => (
  {
    type: USER_CREATE_NEW_DICT,
    payload: {
      name: name,
      desc: desc,
      lang: lang,
      type: type,
      id_dict: id_dict
    }
  }
)

/**
 * Создание шаблона слова
 * @param id_dict
 * @param id_word
 * @returns {{payload: {id_dict, active: boolean, props: *[]}, type: string}}
 * @constructor
 */
export const AddWordForm = (id_dict, id_word) => (
  {
    type: USER_ADD_WORD,
    payload: {
      id_dict: id_dict,
      id_word: id_word,
      value: '',
      translate: '',
      active: false
    }
  }
)

/**
 * Создание нового слова
 * @param value
 * @param translate
 * @param id_dict
 * @param id_word
 * @returns {{payload: {id_dict, value, translate}, type: string}}
 */
export const createNewWord = (value, translate, id_dict, id_word, id) => (
  {
    type: USER_CREATE_NEW_WORD,
    payload: {
      value: value,
      translate: translate,
      id_dict: id_dict,
      id_word: id_word,
      id: id
    }
  }
)

/**
 * Заполнение списков
 * @param dict
 * @returns {{payload: {dict}, type: string}}
 */
export const fillDict = (dict) => (
  {
    type: USER_FILL_DICT,
    payload: {
      dict: dict
    }
  }
)

/**
 * Заполнение слов
 * @returns {{payload: {dict}, type: string}}
 * @param id_dict
 * @param words
 */
export const fillWord = (id_dict, words) => (
  {
    type: USER_FILL_WORD,
    payload: {
      id_dict: Number(id_dict),
      words: words
    }
  }
)