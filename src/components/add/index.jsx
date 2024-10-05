import React from 'react'
import c from './add.module.scss'
import { Icons } from '../../assets/icons'
import { useForm } from 'react-hook-form'
import { IMaskInput } from "react-imask";
import { API } from '../../api';

const Add = ({clients, setAddActive, typeOfGym}) => {
  const [ phone, setPhone ] = React.useState('')
  const [ pay, setPay ] = React.useState(3000)
  const [ clientsId, setClientsId ] = React.useState(1)

  const {
    handleSubmit,
    register,
    reset
  } = useForm()

  const addClient = (value) => {
    const data = {
      "name": value.name,
      "phone_number": phone,
      "type": value.type,
      "payment": pay,
      "sessions": typeOfGym === 'once' ? [1] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      "attended": "",
      "freeze": false,
      "aboutDay": typeOfGym === 'aboutDay',
      "aboutDay3": typeOfGym === 'aboutDay3',
      "everyDay": typeOfGym === 'everyDay',
      "free": typeOfGym === 'free',
      "everyDay3": typeOfGym === 'everyDay3',
      "once": typeOfGym === 'once'
    }

    API.postClients(data)
      .then(() => {
        setAddActive(false)
        window.location.reload()
      })
    setPhone('')
    reset()
  }

  React.useEffect(() => {
    API.getClients()
      .then(res => {
        const data = res.data && Object.entries(res.data).map((item, id) => {
          return {
            id: id+1,
            ...item
          }
        })
        setClientsId(data?.length >= 0 ? data[data?.length - 1]?.id + 1 : 1);
      })
  }, [])

  return (
    <div className={c.container}>
      <div className={c.add}>
        <div className={c.up}>
          <div className={c.left}>
            <h1>Добавление клиента</h1>
            <p>Этот клиент будет под номером {clientsId}</p>
          </div>
          <div className={c.right} onClick={() => setAddActive(false)}>
            <li>
              <img src={Icons.close} alt="" />
            </li>
          </div>
        </div>
        <form className={c.main} onSubmit={(handleSubmit(value => addClient(value)))}>
          <div>
            <p>ФИО клиента</p>
            <input type="text" placeholder='Введите Имя' {...register('name')}  />
          </div>
          <div>
            <p>Номер клиента</p>
            <IMaskInput
              id="phone"
              mask={"+996 (000) 00-00-00"}
              placeholder={"+996 (___) __-__-__" }
              onChange={e => setPhone(e.target.value)}
            />
            {/* <input type="text" placeholder='Номер' {...register('phone_number')} /> */}
          </div>
          <div>
            <p>Оплата</p>
            <ul>
              <span 
                className={pay === 3000 ? c.active : ''}
                onClick={() => setPay(3000)}
              >
                3000
              </span>
              <span 
                className={pay === 3500 ? c.active : ''}
                onClick={() => setPay(3500)}
              >
                3500
              </span>
            </ul>
            {/* <input type="text" placeholder='Введите сумму оплаты' {...register('payment')} /> */}
          </div>
          <div>
            <p>Тип посещения</p>
            <select {...register('type')}>
              <option value={'До'}>До 12:00</option>
              <option value={'После'}>После 12:00</option>
            </select>
          </div>
          <div>
            <button type='submit'>Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Add