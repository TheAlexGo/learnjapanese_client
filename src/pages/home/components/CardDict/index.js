import styles from './styles/styles.module.scss'
import formUrlEncoded from 'form-urlencoded';
import {
  Link,
} from "react-router-dom";
import {store} from "../../../../store/store";
import {createNewDict} from "../../../../store/actions/clientActions";
import {useDispatch} from "react-redux";

const CardDict = ({data}) => {
  const { name, description, props, link, active } = data;
  const propsBlock = props.map((prop, index) =>
    <li key={index} className={styles.card__container__wrapper__propsList__prop}>
      <span className={styles.card__container__wrapper__propsList__prop__name}>{prop.name}</span>
      <span className={styles.card__container__wrapper__propsList__prop__value}>{prop.value}</span>
    </li>)

  const dispatch = useDispatch();
  const handlerSubmit = (e) => {
    e.preventDefault();

    const link = e.target.action;
    const id_user = store.getState().client.id_user;
    const allDict = store.getState().client.dict;
    const id_dict = allDict[allDict.length - 1].id_dict;

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
        dispatch(createNewDict(data.nameDict, data.desc, data.lang, data.typeDict, id_dict));
      } else {
        e.target.querySelectorAll('input').forEach(
          input => input.classList.add('uk-form-danger')
        )
      }
    });
  }

  if(active) {
    return(
      <div className={styles.card}>
        <div className={styles.card__container}>
          <div className={styles.card__container__wrapper}>
            <h3 className={styles.card__container__wrapper__heading}>{name}</h3>
            <p>{description}</p>
            <ul className={styles.card__container__wrapper__propsList}>
              {propsBlock}
            </ul>
            <Link to={link} className="uk-button uk-button-danger">
              Открыть
            </Link>
          </div>
        </div>
      </div>
    )
  } else {
    return(
      <div className={styles.card}>
        <div className={styles.card__container}>
          <div className={styles.card__container__wrapper}>
            <form action="/api/v0/dicts/add" method="PUT" onSubmit={handlerSubmit}>
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

}

export default CardDict;