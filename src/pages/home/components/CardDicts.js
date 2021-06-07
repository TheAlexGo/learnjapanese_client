import CardDict from './CardDict/index';
import AddDict from './CardDict/AddDict';
import {useSelector} from "react-redux";

const CardDicts = ({cards, id_user, updateDict}) => {
  const opportunityCreateDict = useSelector(state => state.client.opportunityCreateDict);
  let content = cards.map((cardData, index) => <CardDict updateDict={updateDict} id_user={id_user} data={cardData} key={index} />)
  opportunityCreateDict && content.push(<AddDict key={cards.length} />)
  return content;
}

export default CardDicts;