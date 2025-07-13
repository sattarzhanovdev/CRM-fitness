import React from 'react'
import c from './edit.module.scss'
import { Icons } from '../../assets/icons'
import { API } from '../../api'

const Edit = ({ user, setActive }) => {
  const [freeze, setFreeze] = React.useState(false)
  const [client, setClient] = React.useState(user[1])
  const [newId, setNewId] = React.useState(user[0]) // ID можно редактировать

  const date = new Date()

  React.useEffect(() => {
    setClient(user[1])
    setNewId(user[0])
  }, [user])

  const handleDelete = () => {
    API.deleteClient(user[0]).then(() => window.location.reload())
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

  const handleSave = async () => {
    if (!newId || !client) return

    try {
      if (newId !== user[0]) {
        await API.putClient(newId, client)
        await API.deleteClient(user[0])
      } else {
        await API.putClient(user[0], client)
      }
      window.location.reload()
    } catch (e) {
      console.error('Ошибка при сохранении:', e)
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
            <p>Клиент ID: {client.personal_id}</p>
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
            <p>Personal ID</p>
            <input
              type="text"
              value={client.personal_id || ''}
              onChange={e => setClient({ ...client, personal_id: e.target.value })}
            />
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
                          <button className={c.check} onClick={() => markAttendance('checked')}>
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
                              <button className={c.check} onClick={() => markAttendance('checked')}>
                                Отметить
                              </button>
                            ) : (
                              isLast && freeze ? (
                                <button className={c.freeze} onClick={() => markAttendance('freezed')}>
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
          <button onClick={handleSave}>Сохранить</button>
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