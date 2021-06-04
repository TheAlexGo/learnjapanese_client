import Loader from "./Loader";

const Romaji = ({readingRomaji, active, className}) => {
  const content = active ?
    <div>{readingRomaji}</div> :
    <Loader />;

  return(
    <div className={className}>
      <span>Ромадзи: </span>
      {content}
    </div>
  )
}
export default Romaji;
