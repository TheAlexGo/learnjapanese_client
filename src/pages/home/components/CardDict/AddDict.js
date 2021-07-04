import styles from './styles/styles.module.scss';
import {useDispatch} from "react-redux";
import {AddDictForm} from '../../../../store/actions/clientActions'
import {store} from "../../../../store/store";
import {URL_API} from "../../../../constants/system_settings";

const AddDict = () => {
  const dispatch = useDispatch();
  const clickHandler = () => {
    const id_user = store.getState().client.id_user;
    fetch(`${URL_API}/api/v0/dicts/${id_user}`).then((data) => data.json()).then(() => {
      dispatch(AddDictForm());
    })
  }
  return(
    <div className={styles.card}>
      <div className={styles.card__container}>
        <div className={styles.card__container__wrapper}>
          <h3 className={styles.card__container__wrapper__heading}>Добавить словарь</h3>
          <div className={styles.card__container__wrapper__containerPlus}>
            <span uk-icon="icon: plus;  ratio: 5" onClick={clickHandler} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddDict;