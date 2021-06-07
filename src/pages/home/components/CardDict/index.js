import MainCard from "./MainCard";
import CreateCard from "./CreateCard";

const CardDict = ({data, id_user, updateDict}) => {
  const { name, description, props, link, active, id } = data;

  return active ?
    <MainCard updateDict={updateDict} id_user={id_user} id_dict={id} props={props} name={name} description={description} link={link} /> :
    <CreateCard id_user={id_user} />;
}

export default CardDict;