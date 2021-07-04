import styles from './styles/style.module.scss';
import {useEffect, useState} from "react";
import Audio from "./Audio";
import Romaji from "./Romaji";
import Translate from "./Translate";
import DataSite from "../../controllers/DataSite/DataSite";
import {T_CHECK} from "../../constants/system_word";
// import formUrlEncoded from "form-urlencoded";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {URL_API, URL_CONTENT} from "../../constants/system_settings";
import formUrlEncoded from "form-urlencoded";

const WordCard = ({word, translate, id, srcAudio}) => {

  const [readingRomaji, setReadingRomaji] = useState("");
  const [audioSrc, setAudioSrc] = useState("");

  const [activeAudio, setActiveAudio] = useState(false);
  const [activeRomaji, setActiveRomaji] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const id_user = useSelector(state => state.client.id_user);
  const id_dict = useParams().id;

  useEffect(() => {
    if(!word) return;
    const dataSite = new DataSite();
    setActiveAudio(false);
    setActiveRomaji(false);
    setIsCheck(false);

    const textToSpeech = async(text) => {
      let src;
      if(!srcAudio) {
        src = await dataSite.textToSpeech(text);
        const data = new FormData();
        data.src_audio = src;
        await fetch(`${URL_API}/api/v0/dicts/${id_user}/${id_dict}/words/${id}/addAudioSrc`, {
          "method": "PUT",
          "headers": { 'content-type': 'application/x-www-form-urlencoded' },
          "body": formUrlEncoded(data)
        });
      } else {
        src = URL_CONTENT+srcAudio;
      }

      setAudioSrc(src);
      setActiveAudio(true);
    }

    const goToRomaji = async(text) => {
      const romaji = await dataSite.getRomaji(text);
      setReadingRomaji(romaji);
      setActiveRomaji(true);
    }

    goToRomaji(word).then();
    textToSpeech(word).then();
  }, [id, id_dict, id_user, srcAudio, word]);

  return (
    <div className={styles.card}>
      <div className={styles.card__container}>
        <div className={styles.card__container__wrapper}>
          <h3 className={styles.card__container__wrapper__content__heading}>Карточка слова</h3>
          <div className={styles.card__container__wrapper__content}>
            <div className={styles.card__container__wrapper__content__word}>
              {word}
            </div>
            {isCheck ? <div className={styles.card__container__wrapper__content__footer}>
              <Romaji
                readingRomaji={readingRomaji}
                active={activeRomaji}
                className={styles.card__container__wrapper__content__footer__reading_romaji}
              />
              <Audio
                audioSrc={audioSrc}
                active={activeAudio}
                className={styles.card__container__wrapper__content__footer__audio}
              />
              <Translate
                readingTranslate={translate}
                active={true}
                className={styles.card__container__wrapper__content__footer__translate}
              />
            </div> :
              <button className="uk-button uk-button-danger uk-width-1-1" onClick={() => setIsCheck(true)}>
                {T_CHECK}
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default WordCard;
