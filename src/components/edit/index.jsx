import React from 'react'
import c from './edit.module.scss'
import { Icons } from '../../assets/icons'
import { checkAttendens } from '../../helpers'
import { API } from '../../api'

const Edit = ({ user, setActive, setDep }) => {
  const [freeze, setFreeze] = React.useState(false)

  const handleDelete = () => {
    API.deleteClient(user[0])
      .then(() => window.location.reload())
    
  }

  return (
    <div className={c.container}>
      <div className={c.add}>
        <div className={c.up}>
          <div className={c.left}>
            <h1>Изменение данных</h1>
            <p>Этот клиент под номером {user.id}</p>
          </div>
          <div className={c.right}>
            <li
              onClick={() => setActive(false)}
            >
              <img src={Icons.close} alt="" />
            </li>
          </div>
        </div>
        <div className={c.main}>
          <div>
            <p>ФИО клиента</p>
            <p>{user[1].name}</p>
          </div>
          <div>
            <p>Номер клиента</p>
            <p>{user[1].phone_number}</p>
          </div>
          <div>
            <p>Оплата</p>
            <p>{user[1].payment} сом</p>
          </div>
          <div>
            <p>Тип посещения</p>
            <p>{user[1].type} 12:00</p>
          </div>
        </div>
        <div className={c.sessions}>
          {
            user[1].sessions ?
              user[1].sessions.map((item, i) => (
                <div>
                  <button className={user[1]?.attended[i]?.type === 'checked' ? c.active : ''}>
                    {item}
                  </button>
                  {
                    user[1]?.attended?.length === 0 || !user[1].attended ? (
                      <button
                        className={c.check}
                        onClick={() => {
                          checkAttendens(user[0], user[1]?.attended, user, setDep, 'checked');
                          setTimeout(() => {
                            window.location.reload();
                          }, 1000);
                        }}
                      >
                        Отметить
                      </button>
                    ) : (
                      user[1].attended ? (
                        user[1].attended[user[1].attended.length - 1].num >= item ? (
                          user[1]?.attended[i]?.type === 'freezed' ? (
                            <button className={c.frozen}>Заморожено</button>
                          ) : (
                            <p>{user[1]?.attended[i]?.time}</p>
                          )
                        ) : (
                          i === user[1].attended.length && !freeze ? (
                            <button
                              className={c.check}
                              onClick={() => checkAttendens(user[0], user[1]?.attended, user, setDep, 'checked')}
                            >
                              Отметить
                            </button>
                          ) : user[1].attended.length && freeze && !user[1].freezed ? ( 
                            <button
                              className={c.freeze}
                              onClick={() => checkAttendens(user[0], user[1]?.attended, user, setDep, 'freezed')}
                            >
                              Заморозить
                            </button>
                          ) : null
                        )
                      ) : (
                        <p></p>
                      )
                    )
                  }
                </div>
              )) :
              null
          }
        </div>
        <div className={c.btns}>
          <button>Сохранить</button>
          <button onClick={() => handleDelete()}>Удалить</button>
          <button onClick={() => setFreeze(!freeze)}>{freeze ? 'Отменить' : 'Режим заморозки'}</button>
        </div>
      </div>
    </div>
  )
}

export default Edit