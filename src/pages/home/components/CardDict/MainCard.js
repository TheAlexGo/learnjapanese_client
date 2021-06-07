import styles from "./styles/styles.module.scss";
import PropsBlock from "./PropsBlock";
import {Link} from "react-router-dom";

const MainCard = ({description, props, name, link, id_user, id_dict, updateDict}) => {
  const deleteDict = () => {
    fetch(`/api/v0/dicts/${id_user}/${id_dict}/remove`, {
      "method": "DELETE"
    }).then(() => {
      updateDict(true);
    });
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
            Открыть
          </Link>
          <button onClick={deleteDict} className="uk-button uk-button-danger uk-margin">Удалить</button>
        </div>
      </div>
    </div>
  )
}
export default MainCard;