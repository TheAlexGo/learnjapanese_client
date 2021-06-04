import styles from "./styles/styles.module.scss";
import {T_DELETE, T_EDIT} from "../../../../constants/system_word";

const ContentWord = ({translate, value, callback, id_word, updateCard}) => {
  const editWord = () => {
    callback(true);
  }
  const deleteWord = () => {
    fetch(`/api/v0/words/${id_word}/remove`, {
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