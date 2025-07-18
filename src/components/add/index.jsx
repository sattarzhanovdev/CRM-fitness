import React from 'react'
import c from './add.module.scss'
import { Icons } from '../../assets/icons'
import { useForm } from 'react-hook-form'
import { IMaskInput } from "react-imask";
import { API } from '../../api';
import { Months } from '../../utils';

const Add = ({ clients, typeOfGym, setAddActive }) => {
  const [phone, setPhone] = React.useState('')
  const [pay, setPay] = React.useState(2500)
  const [timeFrom, setTimeFrom] = React.useState('')
  const [timeTo, setTimeTo] = React.useState('')
  const [clientsId, setClientsId] = React.useState(1)
  const [customId, setCustomId] = React.useState('')

  const { handleSubmit, register, reset } = useForm()

  const date = new Date()

  const addClient = (value) => {
    const num =
      typeOfGym === 'once' ? 1 :
      typeOfGym === 'aboutDay' ? 12 :
      typeOfGym === 'aboutDay3' ? 36 :
      typeOfGym === 'everyDay' ? 30 :
      typeOfGym === 'everyDay3' ? 90 :
      1

    const sessions = Array.from({ length: num }, (_, i) => i + 1)

    const data = {
      name: value.name,
      phone_number: phone,
      type: typeOfGym === 'gym' ? `${timeFrom} - ${timeTo}` : value.type,
      payment: pay,
      sessions,
      attended: "",
      freeze: false,
      aboutDay: typeOfGym === 'aboutDay',
      aboutDay3: typeOfGym === 'aboutDay3',
      everyDay: typeOfGym === 'everyDay',
      freeEveryDay: typeOfGym === 'freeEveryDay',
      freeAboutDay: typeOfGym === 'freeDayAbout',
      everyDay3: typeOfGym === 'everyDay3',
      gym: typeOfGym === 'gym',
      once: typeOfGym === 'once',
      month: date.getMonth() + 1,
      day: date.getDay(),
      year: date.getFullYear(),
      personal_id: customId || clientsId // <-- Используем customId если задан, иначе auto ID
    }

    API.postClients(data).then(() => {
      setAddActive(false)
      window.location.reload()
    })

    API.postBenefit(
      Months.find(item => item.id === date.getMonth() + 1).eng,
      date.getDate(),
      { summa: pay, cards: 1 }
    )

    setPhone('')
    reset()
    setCustomId('')
  }

  React.useEffect(() => {
    API.getClients().then(res => {
      const data = res.data && Object.entries(res.data).map((item, id) => {
        return {
          id: id + 1,
          ...item
        }
      })
      setClientsId(data?.length > 0 ? data[data.length - 1]?.id + 1 : 1)
    })
  }, [])

  return (
    <div className={c.container}>
      <div className={c.add}>
        <div className={c.up}>
          <div className={c.left}>
            <h1>Добавление клиента</h1>
            <p>Персональный номер: {customId || clientsId}</p>
          </div>
          <div className={c.right} onClick={() => setAddActive(false)}>
            <li>
              <img src={Icons.close} alt="" />
            </li>
          </div>
        </div>

        <form className={c.main} onSubmit={handleSubmit(value => addClient(value))}>
          {typeOfGym !== 'once' && (
            <>
              <div>
                <p>ФИО клиента</p>
                <input type="text" placeholder="Введите имя" {...register('name')} />
              </div>
              <div>
                <p>Номер клиента</p>
                <IMaskInput
                  id="phone"
                  mask={"+996 (000) 00-00-00"}
                  placeholder={"+996 (___) __-__-__"}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>
              <div>
                <p>Персональный ID (необязательно)</p>
                <input
                  type="number"
                  placeholder="Введите ID клиента"
                  value={customId}
                  onChange={(e) => setCustomId(e.target.value)}
                />
              </div>
            </>
          )}

          <div>
            <p>Оплата</p>
            {/* Отображение вариантов оплаты по типу */}
            {
              typeOfGym === 'aboutDay' ? (
                <ul>
                  <span className={pay === 2500 ? c.active : ''} onClick={() => setPay(2500)}>2500</span>
                  <span className={pay === 3000 ? c.active : ''} onClick={() => setPay(3000)}>3000</span>
                </ul>
              ) : typeOfGym === 'everyDay' ? (
                <ul>
                  <span className={pay === 3500 ? c.active : ''} onClick={() => setPay(3500)}>3500</span>
                  <span className={pay === 4000 ? c.active : ''} onClick={() => setPay(4000)}>4000</span>
                </ul>
              ) : typeOfGym === 'aboutDay3' ? (
                <ul>
                  <span className={pay === 7500 ? c.active : ''} onClick={() => setPay(7500)}>7500</span>
                </ul>
              ) : typeOfGym === 'everyDay3' ? (
                <ul>
                  <span className={pay === 10000 ? c.active : ''} onClick={() => setPay(10000)}>10000</span>
                </ul>
              ) : typeOfGym === 'freeDayAbout' ? (
                <ul>
                  <span className={pay === 22000 ? c.active : ''} onClick={() => setPay(22000)}>22000</span>
                </ul>
              ) : typeOfGym === 'freeEveryDay' ? (
                <ul>
                  <span className={pay === 33000 ? c.active : ''} onClick={() => setPay(33000)}>33000</span>
                </ul>
              ) : typeOfGym === 'once' ? (
                <ul>
                  <span className={pay === 400 ? c.active : ''} onClick={() => setPay(400)}>400</span>
                </ul>
              ) : (
                <ul>
                  <span className={pay === 1000 ? c.active : ''} onClick={() => setPay(1000)}>1000</span>
                </ul>
              )
            }
          </div>

          {(typeOfGym === 'everyDay' || typeOfGym === 'aboutDay') && (
            <div>
              <p>Тип посещения</p>
              <select {...register('type')}>
                <option value={'До'}>До 14:00</option>
                <option value={'После'}>После 14:00</option>
              </select>
            </div>
          )}

          {typeOfGym === 'gym' && (
            <div>
              <p>Время:</p>
              <div className={c.time}>
                <input type="time" onChange={e => setTimeFrom(e.target.value)} />
                <input type="time" onChange={e => setTimeTo(e.target.value)} />
              </div>
            </div>
          )}

          <div className={c.save}>
            <button type="submit">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Add