import styles from "./styles/styles.module.scss";
import PropsBlock from "./PropsBlock";
import {Link} from "react-router-dom";
import {T_DELETE, T_EDIT, T_OPEN} from "../../../../constants/system_word";
import {URL_API} from "../../../../constants/system_settings";

const MainCard = ({description, props, name, link, id_user, id_dict, updateDict, setIsEdit}) => {
  const deleteDict = () => {
    fetch(`${URL_API}/api/v0/dicts/${id_user}/${id_dict}/remove`, {
      "method": "DELETE"
    }).then(() => {
      updateDict(true);
    });
  }
  const editDict = () => {
    setIsEdit(true);
  }
  return(
    <div className={styles.card}>
      <div className={styles.card__container}>
        <div className={styles.card__container__wrapper}>
          <h3 className={styles.card__container__wrapper__heading}>{name}</h3>
          <p>{description}</p>
          <ul className={styles.card__container__wrapper__propsList}>
            <PropsBlock props={props} />
          </ul>
          <Link to={link} className="uk-button uk-button-danger">
            {T_OPEN}
          </Link>
          <button onClick={editDict} className="uk-button uk-button-danger uk-margin">
            {T_EDIT}
          </button>
          <button onClick={deleteDict} className="uk-button uk-button-danger">
            {T_DELETE}
          </button>
        </div>
      </div>
    </div>
  )
}
export default MainCard;