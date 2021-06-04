import CardDict from './CardDict/index';
import AddDict from './CardDict/AddDict';
import {useSelector} from "react-redux";

const CardDicts = ({cards}) => {
  const opportunityCreateDict = useSelector(state => state.client.opportunityCreateDict);
  let content = cards.map((cardData, index) => <CardDict data={cardData} key={index} />)
  opportunityCreateDict && content.push(<AddDict key={cards.length} />)
  return content;
}

export default CardDicts;