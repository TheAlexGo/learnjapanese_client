import Loader from "./Loader";

const Translate = ({readingTranslate, active, className}) => {
  const content = active ?
    <div>{readingTranslate}</div> :
    <Loader />;

  return (
    <div className={className}>
      <span>Перевод: </span>
      {content}
    </div>
  )
}

export default Translate;
