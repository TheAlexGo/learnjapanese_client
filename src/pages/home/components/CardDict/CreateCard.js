import styles from "./styles/styles.module.scss";
import formUrlEncoded from "form-urlencoded";
import {createNewDict, fillDict} from "../../../../store/actions/clientActions";
import {useDispatch, useSelector} from "react-redux";

const CreateCard = ({id_user}) => {
  const allDict = useSelector(state => state.client.dict);
  const id_dict = allDict[allDict.length - 1].id_dict;

  const dispatch = useDispatch();
  const submitForm = (e) => {
    e.preventDefault();

    const link = e.target.action;
    let data = new FormData(e.target);
    data = Object.fromEntries(data);
    data.id_user = id_user;
    data.id_dict = id_dict;

    fetch(link, {
      "method": "PUT",
      "headers": { 'content-type': 'application/x-www-form-urlencoded' },
      "body": formUrlEncoded(data)
    }).then(r => r.json()).then(r => {
      if(r.success) {
        fetch(`/api/v0/dicts/${id_user}`).then(r => r.json()).then(data => {
          dispatch(fillDict(data.data))
          dispatch(createNewDict());
        });
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
          <form action={`/api/v0/dicts/${id_user}/add`} method="PUT" onSubmit={submitForm}>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="nameDict">Название</label>
              <div className="uk-form-controls">
                <div className="uk-inline uk-width-1-1">
                  <input className="uk-input" type="text" id="nameDict" name="nameDict"/>
                </div>
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="desc">Описание:</label>
              <div className="uk-form-controls">
                <div className="uk-inline uk-width-1-1">
                  <input className="uk-input" type="text" id="desc" name="desc" />
                </div>
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="typeDict">Тип:</label>
              <div className="uk-form-controls">
                <div className="uk-inline uk-width-1-1">
                  <input className="uk-input" type="text" id="typeDict" name="typeDict" />
                </div>
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="lang">Язык:</label>
              <div className="uk-form-controls">
                <div className="uk-inline uk-width-1-1">
                  <input className="uk-input" type="text" id="lang" name="lang" />
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

export default CreateCard;