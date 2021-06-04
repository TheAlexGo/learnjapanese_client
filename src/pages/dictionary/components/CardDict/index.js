import styles from './styles/styles.module.scss';
import AddWordForm from "./AddWordForm";
import ContentWord from "./ContentWord";
import {useState} from "react";
import EditWordForm from "./EditWordForm";

const CardWord = ({data, id_dict, callback}) => {
  const { value, translate, active, id } = data;
  const [isEdit, setIsEdit] = useState(false);

  if(active) {
    if(isEdit) {
      return <EditWordForm updateCard={callback} callback={setIsEdit} value={value} translate={translate} id_word={id} />
    } else {
      return <ContentWord updateCard={callback} callback={setIsEdit} value={value} translate={translate} id_word={id} />
    }
  } else {
    return <AddWordForm id_dict={id_dict}/>;
  }
}

export default CardWord;