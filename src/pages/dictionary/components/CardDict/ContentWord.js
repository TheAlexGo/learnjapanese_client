import styles from "./styles/styles.module.scss";
import {T_DELETE, T_EDIT} from "../../../../constants/system_word";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {URL_API} from "../../../../constants/system_settings";

const ContentWord = ({translate, value, setIsEdit, id_word, updateCard}) => {
  const { id_dict } = useParams();
  const id_user = useSelector(state => state.client.id_user);
  const editWord = () => {
    setIsEdit(true);
  }
  const deleteWord = () => {
    fetch(`${URL_API}/api/v0/dicts/${id_user}/${id_dict}/words/${id_word}/remove`, {
      "method": "DELETE"
    }).then(() => {
      updateCard(true);
    });
  }
  return(
    <div className={styles.card}>
      <div className={styles.card__container}>
        <div className={styles.card__container__wrapper}>
          <h3 className={styles.card__container__wrapper__heading}>{value}</h3>
          <p className="uk-text-center">{translate}</p>
          <button onClick={editWord} className="uk-button uk-button-danger uk-margin">
            {T_EDIT}
          </button>
          <button onClick={deleteWord} className="uk-button uk-button-danger">
            {T_DELETE}
          </button>
        </div>
      </div>
    </div>
  )
}
export default ContentWord;