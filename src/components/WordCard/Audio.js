import Loader from "./Loader";

const Audio = ({audioSrc, active, className}) => {
  const content = active ?
    <audio src={audioSrc} controls /> :
    <Loader />;
  
  return (
    <div className={className}>
      <span>Прослушать: </span>
      {content}
    </div>
  )
}

export default Audio;
