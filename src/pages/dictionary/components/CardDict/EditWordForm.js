import styles from "./styles/styles.module.scss";
import formUrlEncoded from "form-urlencoded";
import {useState} from "react";
import {T_CANCEL, T_EDIT} from "../../../../constants/system_word";

const EditWordForm = ({callback, value, translate, id_word, updateCard}) => {
  const [newValue, setNewValue] = useState(value);
  const [newTranslate, setNewTranslate] = useState(translate);
  const handlerSubmit = (e) => {
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
    callback(false);
  }
  const cancelEdit = () => {
    callback(false);
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
          <form action={`/api/v0/words/${id_word}/update`} method="PUT" onSubmit={handlerSubmit}>
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
              { T_EDIT }
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