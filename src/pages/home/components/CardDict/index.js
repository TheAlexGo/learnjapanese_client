import MainCard from "./MainCard";
import CreateCard from "./CreateCard";
import {useState} from "react";
import EditMainCard from "./EditMainCard";

const CardDict = ({data, id_user, updateDict}) => {
  const { name, description, props, link, active, id } = data;
  const [isEdit, setIsEdit] = useState(false);

  if(active) {
    return isEdit ?
      <EditMainCard
        setIsEdit={setIsEdit}
        updateDict={updateDict}
        name={name}
        desc={description}
        type={props[1].value}
        lang={props[0].value}
        id_dict={id}
      /> :
      <MainCard
        setIsEdit={setIsEdit}
        updateDict={updateDict}
        id_user={id_user}
        id_dict={id}
        props={props}
        name={name}
        description={description}
        link={link} />

  } else {
    return <CreateCard id_user={id_user} />;
  }

}

export default CardDict;