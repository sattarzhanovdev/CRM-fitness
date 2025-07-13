import React from 'react'
import c from './edit.module.scss'
import { Icons } from '../../assets/icons'
import { API } from '../../api'

const Edit = ({ user, setActive }) => {
  const [freeze, setFreeze] = React.useState(false)
  const [client, setClient] = React.useState(user[1])

  const date = new Date()

  React.useEffect(() => {
    setClient(user[1])
  }, [user])

  const handleDelete = () => {
    API.deleteClient(user[0])
      .then(() => window.location.reload())
  }

  const handleExtend = () => {
    if (client.attended?.length === client.sessions?.length) {
      API.putClient(user[0], {
        ...client,
        attended: "",
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
      }).then(() => window.location.reload())
    } else {
      alert('Еще есть дни!')
    }
  }

  const markAttendance = async (type = 'checked') => {
    const time = `${date.getDate()} ${getMonthName(date.getMonth())}/${date.getHours()}:${date.getMinutes()}`
    const newEntry = {
      num: client.attended?.length + 1 || 1,
      time,
      type
    }

    const newAttended = Array.isArray(client.attended)
      ? [...client.attended, newEntry]
      : [newEntry]

    const updatedData = { ...client, attended: newAttended }

    if (type === 'freezed') {
      updatedData.sessions = [
        ...client.sessions,
        client.sessions[client.sessions.length - 1] + 1
      ]
    }

    await API.putClient(user[0], updatedData)
    setClient(updatedData)
  }

  const getMonthName = (index) => {
    const months = [
      'Январь', 'Февраль', 'Март', 'Апрель',
      'Май', 'Июнь', 'Июль', 'Август',
      'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ]
    return months[index]
  }

  return (
    <div className={c.container}>
      <div className={c.add}>
        <div className={c.up}>
          <div className={c.left}>
            <h1>Изменение данных</h1>
            <p>Этот клиент под номером {user?.id}</p>
          </div>
          <div className={c.right}>
            <li onClick={() => setActive(false)}>
              <img src={Icons.close} alt="" />
            </li>
          </div>
        </div>

        <div className={c.main}>
          <div>
            <p>ФИО клиента</p>
            <p>{client.name}</p>
          </div>
          <div>
            <p>Номер клиента</p>
            <p>{client.phone_number}</p>
          </div>
          <div>
            <p>Оплата</p>
            <p>{client.payment} сом</p>
          </div>
          {
            client.freeAboutDay || client.freeEveryDay ? null : (
              <div>
                <p>Тип посещения</p>
                <p>{client.type} {client.gym ? null : '14:00'}</p>
              </div>
            )
          }
        </div>

        {
          !client.freeAboutDay && !client.freeEveryDay && (
            <div className={c.sessions}>
              {
                client.sessions?.map((item, i) => {
                  const attended = client.attended || []
                  const isChecked = attended[i]?.type === 'checked'
                  const isFreezed = attended[i]?.type === 'freezed'
                  const isLast = i === attended.length

                  return (
                    <div key={i}>
                      <button className={isChecked ? c.active : ''}>
                        {item}
                      </button>

                      {
                        attended.length === 0 ? (
                          <button
                            className={c.check}
                            onClick={() => markAttendance('checked')}
                          >
                            Отметить
                          </button>
                        ) : (
                          attended[attended.length - 1]?.num >= item ? (
                            isFreezed ? (
                              <button className={c.frozen}>Заморожено</button>
                            ) : (
                              <p>{attended[i]?.time}</p>
                            )
                          ) : (
                            isLast && !freeze ? (
                              <button
                                className={c.check}
                                onClick={() => markAttendance('checked')}
                              >
                                Отметить
                              </button>
                            ) : (
                              isLast && freeze ? (
                                <button
                                  className={c.freeze}
                                  onClick={() => markAttendance('freezed')}
                                >
                                  Заморозить
                                </button>
                              ) : null
                            )
                          )
                        )
                      }
                    </div>
                  )
                })
              }
            </div>
          )
        }

        <div className={c.btns}>
          <button>Сохранить</button>
          <button onClick={handleDelete}>Удалить</button>
          <button onClick={() => setFreeze(!freeze)}>
            {freeze ? 'Отменить' : 'Режим заморозки'}
          </button>
          <button onClick={handleExtend}>Продлить</button>
        </div>
      </div>
    </div>
  )
}

export default Edit