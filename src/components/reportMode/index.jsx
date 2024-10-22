import React from 'react'
import c from './reportMode.module.scss'
import { Icons } from '../../assets/icons'
import { API } from '../../api'

const ReportMore = ({period, data, setActive}) => {
  const [ report, setReport ] = React.useState({
    before: 0,
    after: 0,
    cards: 0,
    closed: 0,
    skips: 0,
    beforeMore: 0,
    afterMore: 0,
    payment: 0
  })

  React.useEffect(() => {
    const result = data.filter(item => {
      if(period === '1 месяц/через день'){
        return item[1].aboutDay
      }else if(period === '1 месяц/каждый день'){
        return item[1].everyDay
      }else if(period === '3 месяца/через день'){
        return item[1].aboutDay3
      }else if(period === '3 месяца/каждый день'){
        return item[1].everyDay3
      }else if(period === 'Единоразовые занятия'){
        return item[1].once
      }else if(period === 'Спортзал'){
        return item[1].gym
      }
    })

    const price = result[0][1].payment

    const closedArr = []
    const sessionsArr = []
    result.filter(item => closedArr.push(item[1].attended))
    result.filter(item => sessionsArr.push(item[1].sessions))
    const closedData = closedArr.map(item => item.length).reduce((a,b) => a+b, 0)
    const sessionsData = sessionsArr.map(item => item.length).reduce((a,b) => a+b, 0)
    
    setReport({
      before: result.filter(item => item[1].type === "До").length,
      after: result.filter(item => item[1].type === "После").length,
      cards: result.length,
      closed: closedData,
      skips: sessionsData-closedData,
      beforeMore: `${result.filter(item => item[1].type === "До").length } * ${result.length > 0 ? result[0][1].payment : 0} = ${result.filter(item => item[1].type === "До").length * result.filter(item => item[1].type === "До")[1].payment }`,
      afterMore: `${result.filter(item => item[1].type === "После").length} * ${result.length > 0 ? result[0][1].payment : 0} = ${result.filter(item => item[1].type === "После").length * result[0][1].payment}`,
      payment: price
    })        
  }, [])

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
        {
          report.before !== 0 ?
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
          </div> :
          <div className={c.info}>
          <ul>
            <li>
              Доход за этот месяц <span>{report.cards} * {report.payment} = {report.cards * report.payment}</span>
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
          </ul>
        </div>
        }
      </div>
    </div>
  )
}

export default ReportMore