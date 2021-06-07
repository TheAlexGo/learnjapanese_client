import {useSelector, useDispatch} from "react-redux";
import styles from './styles/style.module.scss';
import CardDicts from './components/CardDicts';
import {fillDict} from "../../store/actions/clientActions";
import {useEffect, useState} from "react";

const Home = () => {
  const [isLoadDicts, setIsLoadDicts] = useState(true);
  const dispatch = useDispatch();
  const data = useSelector(state => state.client.dict);
  const id_user = useSelector(state => state.client.id_user);
  const content = <CardDicts cards={data} id_user={id_user} updateDict={setIsLoadDicts} />

  useEffect(() => {
    if(isLoadDicts) {
      fetch(`/api/v0/dicts/${id_user}`).then(r => r.json()).then(data => {
        dispatch(fillDict(data.data))
      });
      setIsLoadDicts(false);
    }

  }, [dispatch, id_user, isLoadDicts])

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
