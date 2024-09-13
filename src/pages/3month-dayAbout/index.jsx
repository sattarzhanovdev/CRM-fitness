import React from 'react'
import c from './style.module.scss'
import { Icons } from '../../assets/icons'
import { API } from '../../api'
import { checkAttendens } from '../../helpers'

const Month3AboutDay = () => {
  const [ clients, setClients ] = React.useState(null)
  const [ dep, setDep ] = React.useState(null)
  const month = localStorage.getItem('month')

  React.useEffect(() => {
    API.getClients()
      .then(res => {
        const base = Object.entries(res.data).map((item, id) => {
          return {
            id: id+1,
            ...item
          }
        }).filter(item => item[1].aboutDay3)
        setClients(base)
      })
  }, [dep])

  return (
    <div className={c.container}>
      <div className={c.tracking}>
        <div>
          <div className={c.icon}>
            <img src={Icons.users} alt=""/>
          </div>
          <ul>
            <li>
              Активные карты
            </li>
            <h1>1200</h1>
            <p>
              <span>
                <img src={Icons.high} alt="" /> 16%
              </span>
              за этот месяц
            </p>
          </ul>
        </div>
        <div>
          <div className={c.icon}>
            <img src={Icons.profileTick} alt=""/>
          </div>
          <ul>
            <li>
              Оплата за {month && month.toLowerCase()}
            </li>
            <h1>100 893</h1>
            <p>
              <span>
                <img src={Icons.low} alt="" /> 1%
              </span>
              за этот месяц
            </p>
          </ul>
        </div>
        <div>
          <div className={c.icon}>
            <img src={Icons.monitor} alt=""/>
          </div>
          <ul>
            <li>
              Активные карты
            </li>
            <h1>189</h1>
            <p>
              <span>
                <img src={Icons.low} alt="" /> 1%
              </span>
              за этот месяц
            </p>
          </ul>
        </div>
      </div>
      <div className={c.clients}>
        <div className={c.up}>
          <div className={c.left}>
            <h2>Оплата за 3 месяца | Через день</h2>
            <p>{month}</p> 
          </div>
          <div className={c.right}>
            <div className={c.search}>
              <input type="text" placeholder='Найти'/>
              <img src={Icons.search} alt="" />
            </div>
            <button>
              Добавить клиента
            </button>
          </div>
        </div>
        <table>
          <tr>
            <th>Номер клиента</th>
            <th className={c.name}>ФИО клиента</th>
            <th>Оплата</th>
            <th>Остаток занятий</th>
            <th>Занятия</th>
          </tr>
          {
            clients?.length > 0 ?
            clients?.map((item, i) => (
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item[1]?.name}</td>
                <td>{item[1]?.payment}</td>
                <td>
                  <p className={c.count}>
                    {
                      item[1].attended ? item[1]?.sessions[item[1]?.sessions.length-1] - item[1]?.attended[item[1]?.attended.length-1] : 0
                    }
                  </p>
                </td>
                <td>
                  <div>
                    {
                      item[1]?.sessions?.map((value, j) => (
                        <button 
                          key={j}
                          className={item[1].attended && item[1].attended[item[1]?.attended?.length-1] >= value ? c.active : '' }
                          onClick={() => {
                            checkAttendens(item[0], value, setDep)
                          }}
                        >
                          {value}
                        </button>
                      ))
                    }
                  </div>
                </td>
              </tr> 
            )) :
            <tr>
              <td>
                Нет клиентов
              </td>
            </tr>
          }
        </table>
      </div>
    </div>
  )
}

export default Month3AboutDay