import React from 'react'
import c from './reportMode.module.scss'
import { Icons } from '../../assets/icons'

const Expenses = ({date, item, setActive}) => {
  return (
    <div className={c.container}>
      <div className={c.reportMore}>
        <div className={c.up}>
          <div className={c.left}>
            <h1>Отчет расходов</h1>
            <span>{date}</span>
          </div>
          <div className={c.right}>
              <li
                onClick={() => setActive(false)}
              >
                <img src={Icons.close} alt="" />
              </li>
          </div>
        </div>
        <div className={c.info}>
          <ul>
            {
              item.slice(1, item.length).reverse().map(value => (
                <li>
                  {value.name} <span>{value.summa}</span>
                </li>
            ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Expenses