import styles from "./styles/styles.module.scss";

const PropsBlock = ({props}) => {
  const content = props.map((prop, index) =>
    <li key={index} className={styles.card__container__wrapper__propsList__prop}>
      <span className={styles.card__container__wrapper__propsList__prop__name}>{prop.name}</span>
      <span className={styles.card__container__wrapper__propsList__prop__value}>{prop.value}</span>
    </li>)
  return(
    <div>
      { content }
    </div>
  )
}

export default PropsBlock;