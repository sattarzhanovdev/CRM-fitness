import React from 'react'
import c from './style.module.scss'
import { Icons } from '../../assets/icons'
import { API } from '../../api'
import { checkAttendens } from '../../helpers'
import { Components } from '../../components'

const Free = () => {
  const [ clients, setClients ] = React.useState(null)
  const [ hour, setHour ] = React.useState('До')
  const [ dep, setDep ] = React.useState(null)
  const [ active, setActive ] = React.useState(false)
  const [ addActive, setAddActive ] = React.useState(false)
  const [ payments, setPayments ] = React.useState(0)
  const [ cards, setCards ] = React.useState(0)
  const [ allCards, setAllCards ] = React.useState(0)
  const [ user, setUser ] = React.useState(null)
  const [ search, setSearch ] = React.useState('')
  const month = localStorage.getItem('month')

  React.useEffect(() => {
    API.getClients()
      .then(res => {
        if(res.data){
          const base = Object.entries(res.data).map((item, id) => {
            return {
              id: id+1,
              ...item
            }
          }).filter(item => item[1].free && item[1].type === hour)
          const data = Object.entries(res.data).map((item, id) => {
            return {
              id: id+1,
              ...item
            }
          }).filter(item => item[1].free)
          const totalPayment = data.reduce((a, b) => a + Number(b[1]?.payment), 0)
          console.log(totalPayment);
          setCards(data.map(item => item[1].free).length)
          setPayments(totalPayment)
          setClients(base)
          setAllCards(Object.values(res.data).length)
        }
      })
  }, [dep, hour])

  const searchUser = search.length > 0 ? clients?.filter(item => item[1].name.toLowerCase().includes(search.toLowerCase())) : clients

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
            <h1>{allCards}</h1>
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
              Активные карты раздела
            </li>
            <h1>{cards}</h1>
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
            <img src={Icons.monitor} alt=""/>
          </div>
          <ul>
            <li>
              Оплата за {month && month .toLowerCase()}            
            </li>
            <h1>{payments} сом</h1>
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
            <h2>Оплата за 12 месяцев</h2>
            <p>{month}</p> 
          </div>
          <div className={c.right}>
            <div className={c.search}>
              <input
                type="text"
                placeholder='Найти'
                onChange={e => setSearch(e.target.value)}
              />
              <img src={Icons.search} alt="" />
            </div>
            <button onClick={() => setAddActive(true)}>
              Добавить клиента
            </button>
          </div>
        </div>
        <table>
          <tr>
            <th>№ клиента</th>
            <th className={c.name}>ФИО клиента</th>
            <th>Оплата</th>
            <th>
              <div>
                Остаток
                <div className={c.btns}>
                  <button 
                    onClick={() => setHour('До')}
                    className={hour === 'До' ? c.active : ''}
                  >
                    До 14:00
                  </button>
                  <button 
                    onClick={() => setHour('После')}
                    className={hour === 'После' ? c.active : ''}
                  >
                    После 14:00
                  </button>
                </div>
              </div>
            </th>          </tr>
          {
            searchUser?.length > 0 ?
            searchUser?.map((item, i) => (
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item[1]?.name}</td>
                <td>{item[1]?.payment}</td>
                <td>
                  <p className={c.count}>
                    Сентябрь 2024 - Сентябрь 2025
                  </p>
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

      {active ? <Components.Edit user={user} setActive={setActive} setDep={setDep}/> : ""}
      {addActive ? <Components.Add clients={clients} typeOfGym={"free"} setAddActive={setAddActive}/> : ""}
    </div>
  )
}

export default Free