import styles from "./styles/styles.module.scss";
import {useDispatch} from "react-redux";
import {store} from "../../../../store/store";
import formUrlEncoded from "form-urlencoded";
import {createNewWord} from "../../../../store/actions/clientActions";

const AddWordForm = ({id_dict}) => {
  const dispatch = useDispatch();
  const id_user = store.getState().client.id_user;

  const handlerSubmit = (e) => {
    e.preventDefault();

    const link = e.target.action;
    const allDict = store.getState().client.dict;
    const crDict = allDict.find(dict => dict.id === Number(id_dict));
    const dictWords = crDict.words;
    const id_word = dictWords[dictWords.length - 1].id_word;

    let data = new FormData(e.target);
    data = Object.fromEntries(data);

    data.id_user = id_user;
    data.id_dict = id_dict;
    data.id_word = id_word;

    fetch(link, {
      "method": "PUT",
      "headers": { 'content-type': 'application/x-www-form-urlencoded' },
      "body": formUrlEncoded(data)
    })
      .then(r => r.json()).then(r => {
      if(r.success) {
        dispatch(createNewWord(data.value, data.translate, id_dict, id_word ));
      } else {
        e.target.querySelectorAll('input').forEach(
          input => input.classList.add('uk-form-danger')
        )
      }
    });
  }
  return(
    <div className={styles.card}>
      <div className={styles.card__container}>
        <div className={styles.card__container__wrapper}>
          <form action={`/api/v0/dicts/${id_user}/${id_dict}/words/add`} method="PUT" onSubmit={handlerSubmit}>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="value">Слово на иностранном языке:</label>
              <div className="uk-form-controls">
                <div className="uk-inline uk-width-1-1">
                  <input className="uk-input" type="text" id="value" name="value"/>
                </div>
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="translate">Слово на русском языке:</label>
              <div className="uk-form-controls">
                <div className="uk-inline uk-width-1-1">
                  <input className="uk-input" type="text" id="translate" name="translate" />
                </div>
              </div>
            </div>
            <input className="uk-button uk-button-danger uk-width-1-1 uk-margin" type="submit"  value="Добавить"/>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddWordForm;