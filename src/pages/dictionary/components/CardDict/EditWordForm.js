import styles from "./styles/styles.module.scss";
import formUrlEncoded from "form-urlencoded";
import {useState} from "react";
import {T_CANCEL, T_SAVE} from "../../../../constants/system_word";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {URL_API} from "../../../../constants/system_settings";

const EditWordForm = ({setIsEdit, value, translate, id_word, updateCard}) => {
  const { id } = useParams();
  const id_user = useSelector(state => state.client.id_user);
  const allDict = useSelector(state => state.client.dict);
  const crDict = allDict.find(dict => dict.id_dict === Number(id));
  const id_dict = crDict.id;
  const [newValue, setNewValue] = useState(value);
  const [newTranslate, setNewTranslate] = useState(translate);
  const submitForm = (e) => {
    e.preventDefault();

    const link = e.target.action;

    let data = new FormData(e.target);
    data = Object.fromEntries(data);

    fetch(link, {
      "method": "PUT",
      "headers": { 'content-type': 'application/x-www-form-urlencoded' },
      "body": formUrlEncoded(data)
    })
      .then(r => r.json()).then(r => {
      if(!r.success) {
        e.target.querySelectorAll('input').forEach(
          input => input.classList.add('uk-form-danger')
        )
      } else {
        updateCard(true);
      }
    });
    setIsEdit(false);
  }
  const cancelEdit = () => {
    setIsEdit(false);
  }
  const editValue = (e) => {
    setNewValue(e.target.value);
  }
  const editTranslate = (e) => {
    setNewTranslate(e.target.value);
  }
  return(
    <div className={styles.card}>
      <div className={styles.card__container}>
        <div className={styles.card__container__wrapper}>
          <form action={`${URL_API}/api/v0/dicts/${id_user}/${id_dict}/words/${id_word}/update`} method="PUT" onSubmit={submitForm}>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="value">Слово на иностранном языке:</label>
              <div className="uk-form-controls">
                <div className="uk-inline uk-width-1-1">
                  <input
                    className="uk-input"
                    type="text"
                    id="value"
                    name="value"
                    value={newValue}
                    onChange={editValue}
                  />
                </div>
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="translate">Слово на русском языке:</label>
              <div className="uk-form-controls">
                <div className="uk-inline uk-width-1-1">
                  <input
                    className="uk-input"
                    type="text"
                    id="translate"
                    name="translate"
                    value={newTranslate}
                    onChange={editTranslate}
                  />
                </div>
              </div>
            </div>
            <button className="uk-button uk-button-danger uk-width-1-1 uk-margin" type="submit">
              { T_SAVE }
            </button>
            <button onClick={cancelEdit} className="uk-button uk-button-danger uk-width-1-1">
              { T_CANCEL }
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditWordForm;