import React from 'react'
import c from './add.module.scss'
import { Icons } from '../../assets/icons'
import { useForm } from 'react-hook-form'
import ReactInputMask from 'react-input-mask'

const Add = () => {
  const [ type, setType ] = React.useState('До')

  const {
    handleSubmit,
    register,
    reset
  } = useForm()

  const addClient = () => {
    reset()
  }

  return (
    <div className={c.container}>
      <div className={c.add}>
        <div className={c.up}>
          <div className={c.left}>
            <h1>Добавление клиента</h1>
            <p>Этот клиент будет под номером 1111</p>
          </div>
          <div className={c.right}>
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
              <ReactInputMask
                mask="0 (999) 99-99-99"
              />
            {/* <input type="text" placeholder='Номер' {...register('phone_number')} /> */}
          </div>
          <div>
            <p>Оплата</p>
            <input type="text" placeholder='Введите сумму оплаты' {...register('payment')} />
          </div>
          <div>
            <p>Тип посещения</p>
            <button className={type === 'До' ? c.active : ''}>До 12:00</button>
            <button className={type === 'После' ? c.active : ''}>После 12:00</button>
          </div>
          <div>
            <button type='submit'>Сохранить</button>
            <button>Удалить</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Add