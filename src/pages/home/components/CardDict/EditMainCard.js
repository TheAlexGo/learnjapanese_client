import {useSelector} from "react-redux";
import {useState} from "react";
import formUrlEncoded from "form-urlencoded";
import styles from "../../../dictionary/components/CardDict/styles/styles.module.scss";
import {T_CANCEL, T_SAVE} from "../../../../constants/system_word";
import {URL_API} from "../../../../constants/system_settings";

const EditMainCard = ({setIsEdit, updateDict, name, desc, type, lang, id_dict}) => {
  const id_user = useSelector(state => state.client.id_user);
  const [newName, setNewName] = useState(name);
  const [newDesc, setNewDesc] = useState(desc);
  const [newType, setNewType] = useState(type);
  const [newLang, setNewLang] = useState(lang);
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
        updateDict(true);
      }
    });
    setIsEdit(false);
  }
  const cancelEdit = () => {
    setIsEdit(false);
  }
  const editName = (e) => {
    setNewName(e.target.value);
  }
  const editDesc = (e) => {
    setNewDesc(e.target.value);
  }
  const editType = (e) => {
    setNewType(e.target.value);
  }
  const editLang = (e) => {
    setNewLang(e.target.value);
  }
  return(
    <div className={styles.card}>
      <div className={styles.card__container}>
        <div className={styles.card__container__wrapper}>
          <form action={`${URL_API}/api/v0/dicts/${id_user}/${id_dict}/update`} method="PUT" onSubmit={submitForm}>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="nameDict">Название</label>
              <div className="uk-form-controls">
                <div className="uk-inline uk-width-1-1">
                  <input
                    className="uk-input"
                    type="text"
                    id="nameDict"
                    name="nameDict"
                    value={newName}
                    onChange={editName}
                  />
                </div>
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="desc">Описание:</label>
              <div className="uk-form-controls">
                <div className="uk-inline uk-width-1-1">
                  <textarea
                    className="uk-input"
                    id="desc"
                    name="desc"
                    rows="10"
                    value={newDesc}
                    onChange={editDesc}
                  />
                </div>
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="typeDict">Тип:</label>
              <div className="uk-form-controls">
                <div className="uk-inline uk-width-1-1">
                  <input
                    className="uk-input"
                    type="text"
                    id="typeDict"
                    name="typeDict"
                    value={newType}
                    onChange={editType}
                  />
                </div>
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="lang">Язык:</label>
              <div className="uk-form-controls">
                <div className="uk-inline uk-width-1-1">
                  <input
                    className="uk-input"
                    type="text"
                    id="lang"
                    name="lang"
                    value={newLang}
                    onChange={editLang}
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

export default EditMainCard;