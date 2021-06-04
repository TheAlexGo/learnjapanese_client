import NewWord from './CardDict/NewWord';
import {useSelector} from "react-redux";
import CardWord from "./CardDict/index";

const CardWords = ({id_dict, words, callback}) => {
  const opportunityCreateWord = useSelector(state => state.client.opportunityCreateWord);
  let content = words.map((cardData, index) => <CardWord callback={callback} id_dict={id_dict} data={cardData} key={index} />)
  opportunityCreateWord && content.push(<NewWord id_dict={id_dict} key={words.length} />)
  return content;
}

export default CardWords;