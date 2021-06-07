import styles from './styles/styles.module.scss';
import {useDispatch} from "react-redux";
import {AddWordForm} from '../../../../store/actions/clientActions'
import {store} from "../../../../store/store";

const NewWord = ({ id_dict }) => {
  const dispatch = useDispatch();
  const clickHandler = () => {
    const id_user = store.getState().client.id_user;
    fetch(`/api/v0/dicts/${id_user}/${id_dict}/words`).then((data) => data.json()).then(data => {
      let id_word;
      const wordData = data[data.length - 1];

      if(!wordData) id_word = 0
      else id_word = wordData.id;
      dispatch(AddWordForm(id_dict, id_word));
    })
  }
  return(
    <div className={styles.card}>
      <div className={styles.card__container}>
        <div className={styles.card__container__wrapper}>
          <h3 className={styles.card__container__wrapper__heading}>Добавить слово</h3>
          <div className={styles.card__container__wrapper__containerPlus}>
            <span uk-icon="icon: plus;  ratio: 5" onClick={clickHandler} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewWord;