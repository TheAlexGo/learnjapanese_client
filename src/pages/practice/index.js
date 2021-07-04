import styles from "../home/styles/style.module.scss";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import WordCard from "../../components/WordCard";
import {T_END_PRACTICE, T_NEXT_PRACTICE} from "../../constants/system_word";

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
  return array;
}

const Practice = ({history}) => {
  const { id } = useParams();
  const allDicts = useSelector(state => state.client.dict);
  const crDict = allDicts.find(dict => dict.id_dict === Number(id));
  const allWords = crDict.words;

  const [wordArray, setWordArray] = useState(allWords);
  const [crWord, setCrWord] = useState(null);
  const [crTranslate, setCrTranslate] = useState(null);
  const [crId, setCrId] = useState(null);
  const [lengthWords, setLengthWords] = useState(null);
  const [isEnd, setIsEnd] = useState(false);
  const [srcAudio, setSrcAudio] = useState(false);

  useEffect(() => {
    setWordArray(shuffle(wordArray));
    setCrWord(wordArray[wordArray.length - 1].value);
    setCrTranslate(wordArray[wordArray.length - 1].translate);
    setSrcAudio(wordArray[wordArray.length - 1].audio_src);
    setCrId(wordArray[wordArray.length - 1].id);
    setLengthWords(wordArray.length - 2);
  }, [wordArray]);

  const nextWord = () => {
    if(lengthWords >= 0) {
      setCrWord(wordArray[lengthWords].value);
      setCrTranslate(wordArray[lengthWords].translate);
      setSrcAudio(wordArray[lengthWords].audio_src);
      setLengthWords(lengthWords - 1);
      setCrId(wordArray[lengthWords].id);
      if(lengthWords === 0) setIsEnd(true);
    }
  };

  return(
    <div className={styles.home}>
      <div className={styles.home__container}>
        <div className={styles.home__container__wrapper}>
          <h1 className={styles.home__container__wrapper__heading}>Практика</h1>
          {isEnd ?
            <button onClick={() => history.goBack()} className="uk-button uk-button-danger">
              { T_END_PRACTICE }
            </button> :
            <button onClick={nextWord} className="uk-button uk-button-danger">
              { T_NEXT_PRACTICE }
            </button>
          }
        </div>
      </div>
      <div className={styles.home__cardList}>
        <WordCard word={crWord} translate={crTranslate} id={crId} srcAudio={srcAudio}/>
      </div>
    </div>
  )
}

export default Practice;
