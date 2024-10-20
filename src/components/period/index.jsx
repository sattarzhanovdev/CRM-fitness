import React from 'react'
import c from './reportMode.module.scss'
import { Icons } from '../../assets/icons'

const Period = ({setActive, setStartDate, setEndDate, setDep}) => {
  const [ start, setStart ] = React.useState('')
  const [ end, setEnd ] = React.useState('')

  return (
    <div className={c.container}>
      <div className={c.reportMore}>
        <div className={c.up}>
          <div className={c.left}>
            <h1>Отчет по дням | Период</h1>
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
          
          <div>
            <p>От:</p>
            <input type="date" onChange={e => setStart(e.target.value)}/>
          </div>
          <div>
            <p>До:</p>
            <input type="date" onChange={e => setEnd(e.target.value)}/>
          </div>
        </div>

        <button
          onClick={() => {
            setStartDate(start)
            setEndDate(end)
            setDep(Math.random())
            setActive(false)
          }}
        >
          Готово
        </button>
      </div>
    </div>
  )
}

export default Period