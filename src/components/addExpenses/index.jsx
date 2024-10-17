import React from 'react'
import c from './add.module.scss'
import { Icons } from '../../assets/icons'
import { useForm } from 'react-hook-form'
import { API } from '../../api';
import { Months } from '../../utils';

const AddExpenses = ({setActive}) => {
  const {
    handleSubmit,
    register,
    reset
  } = useForm()

  const month = localStorage.getItem('month')
  const date = new Date()

  const addExpense = (value) => {
    API.postExpenses(Months.find(item => item.name === month).eng, date.getDate(), {name: value.name, summa: Number(value.summa)})
      .then(() => {
        setActive(false)
        window.location.reload()
      })
    reset()
  }

  return (
    <div className={c.container}>
      <div className={c.add}>
        <div className={c.up}>
          <div className={c.left}>
            <h1>Добавление расхода</h1>
          </div>
          <div className={c.right} onClick={() => setActive(false)}>
            <li>
              <img src={Icons.close} alt="" />
            </li>
          </div>
        </div>
        <form className={c.main} onSubmit={(handleSubmit(value => addExpense(value)))}>
          <div>
            <p>Наименование</p>
            <input type="text" placeholder='На что ушло?' {...register('name')}  />
          </div>
          <div>
            <p>Сумма траты</p>
            <input type='number' min={1} placeholder='Введите сумму?' {...register('summa')}  />
          </div>
          <div>
            <button type='submit'>Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddExpenses