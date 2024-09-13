import React from 'react'
import c from './style.module.scss'
import { Icons } from '../../assets/icons'

const Report = () => {
  const month = localStorage.getItem('month')
  return (
    <div className={c.container}>
      <div className={c.tracking}>
        <div>
          <di className={c.icon}>
            <img src={Icons.users} alt=""/>
          </di>
          <ul>
            <li>
              Итоги прибыли за {month.toLowerCase()}
            </li>
            <h1>1 200 000</h1>
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
              Расходы
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
              В обороте
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
      <div className={c.cards}>
        <div className={c.card}>
          <di className={c.icon}>
            <img src={Icons.users} alt=""/>
          </di>
          <ul>
            <li>
              1 месяц/через день
            </li>
            <h1>25 612 сом</h1>
            <p>
              <span>
                <img src={Icons.high} alt="" /> 16%
              </span>
              за этот месяц
            </p>
          </ul>
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
        <div className={c.card}>
          <di className={c.icon}>
            <img src={Icons.users} alt=""/>
          </di>
          <ul>
            <li>
              3 месяц/через день
            </li>
            <h1>67 122 сом</h1>
            <p>
              <span>
                <img src={Icons.high} alt="" /> 16%
              </span>
              за 3 месяца
            </p>
          </ul>
          <ul>
            <li>
              Активные карты
            </li>
            <h1>12121</h1>
            <p>
              <span>
                <img src={Icons.low} alt="" /> 1%
              </span>
              за 3 месяца
            </p>
          </ul>
        </div>
        <div className={c.card}>
          <di className={c.icon}>
            <img src={Icons.users} alt=""/>
          </di>
          <ul>
            <li>
              1 месяц/каждый день
            </li>
            <h1>44 001 сом</h1>
            <p>
              <span>
                <img src={Icons.high} alt="" /> 16%
              </span>
              за этот месяц
            </p>
          </ul>
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
        <div className={c.card}>
          <di className={c.icon}>
            <img src={Icons.users} alt=""/>
          </di>
          <ul>
            <li>
              1 месяц/каждый день
            </li>
            <h1>44 001 сом</h1>
            <p>
              <span>
                <img src={Icons.high} alt="" /> 16%
              </span>
              за этот месяц
            </p>
          </ul>
          <ul>
            <li>
              Активные карты
            </li>
            <h1>111</h1>
            <p>
              <span>
                <img src={Icons.low} alt="" /> 1%
              </span>
              за этот месяц
            </p>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Report