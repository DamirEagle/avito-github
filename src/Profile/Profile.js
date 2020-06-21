import React, { Component } from "react";
import s from "./Profile.module.css";

class Profile extends Component {
  render() {
    return (
      <div className={s.wrapper}>
        <div className={s.left}>
          <img src="/img/Damir.jpg" alt="Damir" width="100" />
          <h4>Damir</h4>
        </div>
        <div className={s.right}>
          <div className={s.info}>
            <div className={s.info_data}>
              <div className={s.data}>
                <h4>ВУЗ</h4>
                <p>Московский Авиационный Институт(НИУ)</p>
              </div>
              <div className={s.data}>
                <h4>Дата обучения</h4>
                <p>2017-2021</p>
              </div>
            </div>
            <div className={s.info_data}>
              <div className={s.data}>
                <h4>Изученные языки</h4>
                <p>Pascal, С/C++, Java, JS</p>
              </div>
              <div className={s.data}>
                <h4>Front-end технологии</h4>
                <p>React, Redux, HTML5, CSS3</p>
              </div>
            </div>
            <div className={s.info_data}>
              <div className={s.data}>
                <h4>Базы Данных</h4>
                <p>MS SQL server, SQLite</p>
              </div>

              <div className={s.data}>
                <h4>ОС</h4>
                <p>Windows, Linux mint</p>
              </div>
            </div>
            <div className={s.info_data}>
              <div className={s.data}>
                <h4>Email</h4>
                <p>Ashimovd1908@gmail.com</p>
              </div>

              <div className={s.data}>
                <h4>Телефон</h4>
                <p>+7(929)654-55-80</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
