import styles from "../home/styles/style.module.scss";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams, Link} from "react-router-dom";
import CardWords from "./components/CardWords";
import {fillWord} from "../../store/actions/clientActions";
import {T_PRACTICE} from "../../constants/system_word";

const Dicts = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const id_user = useSelector(state => state.client.id_user);
  const allDict = useSelector(state => state.client.dict);
  const crDict = allDict.find(dict => dict.id_dict === Number(id));
  const id_dict = crDict.id;
  const data = crDict.words;
  
  const [isLoadContent, setIsLoadContent] = useState(true);

  useEffect(() => {
    if(isLoadContent) {
      fetch(`/api/v0/dicts/${id_user}/${id_dict}/words`).then(r => r.json())
        .then(data => dispatch(fillWord(id_dict, data.data)));
      setIsLoadContent(false);
    }
  }, [dispatch, id_dict, id_user, isLoadContent])

  const content = <CardWords id_dict={id_dict} words={data} callback={setIsLoadContent} />;

  return(
    <div className={styles.home}>
        <div className={styles.home__container}>
            <div className={`${styles.home__container__wrapper} uk-position-relative`}>
                <h1 className={styles.home__container__wrapper__heading}>Словарь</h1>
                <Link to="practice/" className="uk-button uk-button-danger uk-position-right">
                  {T_PRACTICE}
                </Link>
            </div>
        </div>
        <div className={styles.home__cardList}>
            {content}
        </div>
    </div>
  )
}

export default Dicts;
