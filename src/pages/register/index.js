import styles from '../login/styles/styles.module.scss';
import {
  Link,
} from "react-router-dom";

const Register = ({history}) => {
  const token = localStorage.token;
  if(token) {
    // history.push('/home');
  }

  const submitHandler = (e) => {
    const link = e.target.action;
    const method = e.target.method;
    let data = new FormData(e.target);
    data = Object.fromEntries(data);

    const formBody = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');

    fetch(link, {
      "method": method,
      "headers": { 'content-type': 'application/x-www-form-urlencoded' },
      "body": formBody
    }).then(r => r.json()).then(r => {
      if(r.success) {
        history.push('/login')
      } else {
        e.target.querySelectorAll('input').forEach(
            input => input.classList.add('uk-form-danger')
        )
      }
    });
    e.preventDefault();
  }

  const clearClass = (e) => {
    e.target.classList.remove('uk-form-danger')
  }

  return(
    <div className={styles.auth}>
      <div className={styles.auth__container}>
        <div className={styles.auth__container__wrapper}>
          <h3 className={styles.auth__container__wrapper__heading}>
            Регистрация
          </h3>
          <form action="/api/v0/auth/register" method="POST" onSubmit={submitHandler}>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="login">Логин:</label>
              <div className="uk-form-controls">
                <div className="uk-inline uk-width-1-1">
                  <span className="uk-form-icon" uk-icon="icon: user" />
                  <input className="uk-input" type="text" id="login" name="login" onChange={clearClass}/>
                </div>
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="password">Пароль:</label>
              <div className="uk-form-controls">
                <div className="uk-inline uk-width-1-1">
                  <span className="uk-form-icon" uk-icon="icon: lock" />
                  <input className="uk-input" type="password" id="password" name="password" onChange={clearClass} />
                </div>
              </div>
            </div>
            <input className="uk-button uk-button-danger uk-width-1-1 uk-margin" type="submit"  value="Регистрация"/>
          </form>
          <Link to="/login" className="uk-margin-top">Уже есть аккаунт? Входи!</Link>
        </div>
      </div>
    </div>
  )
}

export default Register;
