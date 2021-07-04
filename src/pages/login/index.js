import styles from './styles/styles.module.scss';
import {auth} from '../../store/actions/clientActions'
import {useDispatch} from "react-redux";

import {
  Link,
} from "react-router-dom";
import {URL_API} from "../../constants/system_settings";

const Login = () => {
  const dispatch = useDispatch();

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
        // localStorage.token = r.data[0].token;
        dispatch(auth(r.data[0].token, r.data[0].id));
        // history.push('/home/');
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
            Войти
          </h3>
          <form action={`${URL_API}/api/v0/auth/login`} method="POST" onSubmit={submitHandler}>
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
            <input className="uk-button uk-button-danger uk-width-1-1 uk-margin" type="submit"  value="Войти"/>
          </form>
          <Link to="/register" className="uk-margin-top">Нет аккаунта? Регистрируйся!</Link>
        </div>
      </div>
    </div>
  )
}

export default Login;
