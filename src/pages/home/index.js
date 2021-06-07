import {useSelector, useDispatch} from "react-redux";
import styles from './styles/style.module.scss';
import CardDicts from './components/CardDicts';
import {fillDict} from "../../store/actions/clientActions";
import {useEffect} from "react";

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.client.dict);
  const content = <CardDicts cards={data} />
  const id_user = useSelector(state => state.client.id_user);

  useEffect(() => {
    fetch(`/api/v0/dicts/${id_user}`).then(r => r.json()).then(data => {
      dispatch(fillDict(data.data))
    });
  }, [dispatch, id_user])

  return(
    <div className={styles.home}>
      <div className={styles.home__container}>
        <div className={styles.home__container__wrapper}>
          <h1 className={styles.home__container__wrapper__heading}>Словари</h1>
        </div>
      </div>
      <div className={styles.home__cardList}>
        {content}
      </div>
    </div>
  )
}

export default Home;
