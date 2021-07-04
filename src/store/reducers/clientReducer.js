import {
  USER_AUTH,
  USER_UNAUTH,
  USER_ADD_DICT,
  USER_CREATE_NEW_DICT,
  USER_FILL_DICT, USER_ADD_WORD, USER_CREATE_NEW_WORD, USER_FILL_WORD
} from "../constants/constantsClient";
let defaultState = {
  id_user: null,
  token: "",
  dict: [],
  opportunityCreateDict: true,
  opportunityCreateWord: true,
};

if(localStorage.state_learnjapanese) {
  // defaultState.id_user = JSON.parse(localStorage.state_learnjapanese).id_user;
  // defaultState.token = JSON.parse(localStorage.state_learnjapanese).token;
}

const clientReducer = (state = defaultState, action) => {

  switch (action.type) {
    case USER_AUTH:
      return {
        ...state,
        token: action.payload.token,
        id_user: action.payload.id_user
      };
    case USER_UNAUTH:
      return {
        ...state,
        token: ''
      };
    case USER_ADD_DICT:
      return {
        ...state,
        dict: [...state.dict, {active: false}],
        opportunityCreateDict: false
      };
    case USER_CREATE_NEW_DICT:
      return  {
        ...state,
        opportunityCreateDict: true
      }
    case USER_FILL_DICT:
      return {
        ...state,
        dict: action.payload.dict.map(dict => {
          const new_dict = {};
          new_dict.id = dict.id;
          new_dict.id_dict = dict.id_dict;
          new_dict.name = dict.name;
          new_dict.description = dict.description;
          new_dict.props = [
            {
              name: 'Язык',
              value: dict.lang
            },
            {
              name: 'Тип',
              value: dict.type
            }
          ];
          new_dict.words = [];
          new_dict.active = true;
          new_dict.link = `./dicts/${dict.id_dict}/`;
          return new_dict;
        })
      }
    case USER_ADD_WORD:
      return {
        ...state,
        dict: state.dict.map(dict => {
          if(dict.id === Number(action.payload.id_dict)) {
            dict.words.push({
              active: false
            });
            return dict;
          } else {
            return dict;
          }
        }),
        opportunityCreateWord: false
      };
    case USER_CREATE_NEW_WORD:
      return {
        ...state,
        opportunityCreateWord: true
      };
    case USER_FILL_WORD:
      return {
        ...state,
        dict: state.dict.map(dict => {
          if(dict.id === action.payload.id_dict) {
            dict.words = action.payload.words.map(word => {
              word.active = true;
              return word;
            });
            return dict;
          } else {
            return dict;
          }
        })
      };
    default:
      return state;
  }
}

export default clientReducer;
