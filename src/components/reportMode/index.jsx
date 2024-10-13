import React from 'react'
import c from './reportMode.module.scss'
import { Icons } from '../../assets/icons'

const ReportMore = ({period, item, setActive}) => {
  const [ report, setReport ] = React.useState({
    before: 0,
    after: 0,
    cards: 0,
    closed: 0,
    skips: 0,
    beforeMore: 0,
    afterMore: 0
  })

  return (
    <div className={c.container}>
      <div className={c.reportMore}>
        <div className={c.up}>
          <div className={c.left}>
            <h1>Полный отчет</h1>
            <span>{period}</span>
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
            <li>
              До 14:00 <span>{report.before}</span>
            </li>
            <li>
              После 14:00 <span>{report.after}</span>
            </li>
            <li>
              За этот месяц зарегистрировано карт <span>{report.cards}</span>
            </li>
            <li>
              Сколько посещений завершено <span>{report.closed}</span>
            </li>
            <li>
              Сколько посещений сгорело <span>{report.skips}</span>
            </li>
            <li>
              До 14:00 <span>{report.beforeMore}</span>
            </li>
            <li>
              После 14:00 <span>{report.afterMore}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ReportMore