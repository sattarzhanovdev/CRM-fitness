import React from 'react'
import c from './style.module.scss'
import { Icons } from '../../assets/icons'
import { Months } from '../../utils'
import { API } from '../../api'
import ReportMore from '../../components/reportMode'
import { Components } from '../../components'

const Report = () => {
  const month = localStorage.getItem('month')
  const [ benefit, setBenefit ] = React.useState(0)
  const [ expenses, setExpenses ] = React.useState(0)
  const [ expensesData, setExpensesData ] = React.useState(null)
  const [ expensesDataMore, setExpensesDataMore ] = React.useState(null)
  const [ turnover, setTurnover ] = React.useState(0)
  const [ dateMore, setDateMore ] = React.useState('')
  
  const [ benefits, setBenefits ] = React.useState({
    aboutDay: 0,
    aboutDay3: 0,
    everyDay: 0,
    everyDay3: 0,
    once: 0,
    gym: 0,
    free: 0,
    aboutDayCards: 0,
    aboutDay3Cards: 0,
    everyDayCards: 0,
    everyDay3Cards: 0,
    gymCards: 0,
    onceCards: 0,
    freeCards: 0,
  })


  const [ monthRep, setMonthRep ] = React.useState(Months.find(item => item.name === month).id)
  const [ rep, setRep ] = React.useState(1)

  const [ active, setActive ] = React.useState(false)
  const [ activeExpenses, setActiveExpenses ] = React.useState(false)
  const [ activeExpensesMore, setActiveExpensesMore ] = React.useState(false)

  const [ period, setPeriod ] = React.useState('')

  React.useEffect(() => {
    API.getClients()
      .then(res => {
        if(res.data){
          const base = Object.entries(res.data).map((item, id) => {
            return {
              id: id+1, 
              ...item
            }
          })
  
          const baseAboutDay = base?.filter(item => item[1].aboutDay)
          const baseAboutDay3 = base?.filter(item => item[1].aboutDay3)
          const baseEveryDay = base?.filter(item => item[1].everyDay)
          const baseEveryDay3 = base?.filter(item => item[1].everyDay3)
          const baseOnce = base?.filter(item => item[1].once)
          const baseGym = base?.filter(item => item[1].gym)
          const baseFree = base?.filter(item => item[1].free)
  
          setBenefit(base.reduce((a, b) => a + Number(b[1]?.payment), 0))
          
          setBenefits({
            aboutDay: baseAboutDay.reduce((a, b) => a + Number(b[1]?.payment), 0),
            aboutDay3: baseAboutDay3.reduce((a, b) => a + Number(b[1]?.payment), 0),
            everyDay: baseEveryDay.reduce((a, b) => a + Number(b[1]?.payment), 0),
            everyDay3: baseEveryDay3.reduce((a, b) => a + Number(b[1]?.payment), 0),
            once: baseOnce.reduce((a, b) => a + Number(b[1]?.payment), 0),
            gym: baseGym.reduce((a, b) => a + Number(b[1]?.payment), 0),
            free: baseFree.reduce((a, b) => a + Number(b[1]?.payment), 0),
  
            aboutDayCards: baseAboutDay.length,
            aboutDay3Cards: baseAboutDay3.length,
            everyDayCards: baseEveryDay.length,
            everyDay3Cards: baseEveryDay3.length,
            gymCards: baseGym.length,
            onceCards: baseOnce.length,
            freeCards: baseFree.length
          })
  
          setTurnover(base.length)
        }
      })

    API.getExpenses(Months.find(item => item.id === monthRep).eng)
      .then(res => {
        if(res.data){
          const result = Object.entries(res.data).map(item => {
            return {
              ...item
            }
          })
          const totalSumma = result.reduce((sum, obj) => {
            return sum + Object.values(obj["1"]).reduce((subSum, item) => subSum + item.summa, 0);
          }, 0);
          setExpenses(totalSumma);
          
          setExpensesData(result);
        }else{
          setExpensesData([]);
        }
      })
  }, [monthRep])

  const date = new Date()
  const handleAddExpenses = () => {
    setActiveExpenses(true)
  }
  
  return (
    <div className={c.container}>
      <div className={c.nav}>
        <ul className={c.navlist}>
          <div>
            <button
              onClick={() => setRep(1)}
              className={rep === 1 ? c.active : ''}
            >
              Финансовый отчет
            </button>
            <button
              onClick={() => setRep(2)}
              className={rep === 2 ? c.active : ''}
            >
              Отчет по дням
            </button>
            <button
              onClick={() => setRep(3)}
              className={rep === 3 ? c.active : ''}
            >
              Day profit
            </button>
            <button
              onClick={() => setRep(4)}
              className={rep === 4 ? c.active : ''}
            >
              Расходы
            </button>
          </div>
          {
            rep === 1 || rep === 3 || rep === 4?
            <div className={c.months}>
              {
                Months.map(item => (
                  <button key={item.id} onClick={() => setMonthRep(item.id)} className={monthRep === item.id ? c.active : ''}>
                    {item.name}
                  </button>
                ))
              }
            </div> :
            <div className={c.period}>
              <span>12 сентября - 20 сентября</span>
              <p>Выберите период</p>
            </div>
          }
        </ul>
        {
          rep === 1 || rep === 2 ?
            <div className={c.tracking}>
            <div>
              <di className={c.icon}>
                <img src={Icons.users} alt=""/>
              </di>
              <ul>
                <li>
                  Итоги прибыли за {month.toLowerCase()}
                </li>
                <h1>{benefit}</h1>
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
                <h1>{expenses}</h1>
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
                  Активные карты в обороте 
                </li>
                <h1>{turnover}</h1>
                <p>
                  <span>
                    <img src={Icons.low} alt="" /> 1%
                  </span>
                  за этот месяц
                </p>
              </ul>
            </div>
          </div> :
          null
        }
      </div>
      <div className={c.report}>
        {
          rep === 1 || rep === 2 ?
          <table>
            <tr>
              <th>Тип абонемента</th>
              <th className={c.name}>Полученный доход</th>
              <th>Активные карты</th>
              <th>Период расчетов</th>
              <th>Дополнительно</th>
            </tr>

            <tr>
              <td>
                1 месяц/через день
              </td>
              <td>
                <span className={c.summa}>
                  {benefits.aboutDay}c
                </span>
              </td>
              <td>
                <span className={c.cards}>
                  {benefits.aboutDayCards}
                </span>
              </td>
              <td>
                <span className={c.period}>
                  1 cентября - 1 октября
                </span>
              </td>
              <td
                className={c.view}
                onClick={() => {
                  setActive(true)
                  setPeriod('1 месяц/через день')
                }}
              >
                Посмотреть полный отчет
              </td>
            </tr>

            <tr>
              <td>
                1 месяц/каждый день
              </td>
              <td>
                <span className={c.summa}>
                  {benefits.everyDay}c
                </span>
              </td>
              <td>
                <span className={c.cards}>
                  {benefits.everyDayCards}
                </span>
              </td>
              <td>
                <span className={c.period}>
                  1 cентября - 1 октября
                </span>
              </td>
              <td
                className={c.view}
                onClick={() => {
                  setActive(true)
                  setPeriod('1 месяц/каждый день')
                }}
              >
                Посмотреть полный отчет
              </td>
            </tr>

            <tr>
              <td>
                3 месяца/через день
              </td>
              <td>
                <span className={c.summa}>
                  {benefits.aboutDay3}c
                </span>
              </td>
              <td>
                <span className={c.cards}>
                  {benefits.aboutDay3Cards}
                </span>
              </td>
              <td>
                <span className={c.period}>
                  1 cентября - 1 октября
                </span>
              </td>
              <td
                className={c.view}
                onClick={() => {
                  setActive(true)
                  setPeriod('3 месяца/через день')
                }}
              >
                Посмотреть полный отчет
              </td>
            </tr>

            <tr>
              <td>
                3 месяца/каждый день
              </td>
              <td>
                <span className={c.summa}>
                  {benefits.everyDay3}с
                </span>
              </td>
              <td>
                <span className={c.cards}>
                  {benefits.everyDay3Cards}          
                </span>
              </td>
              <td>
                <span className={c.period}>
                  1 cентября - 1 октября
                </span>
              </td>
              <td
                className={c.view}
                onClick={() => {
                  setActive(true)
                  setPeriod('3 месяца/каждый день')
                }}
              >
                Посмотреть полный отчет
              </td>
            </tr>

            <tr>
              <td>
                12 месяцев/безлимит
              </td>
              <td>
                <span className={c.summa}>
                  {benefits.free}c
                </span>
              </td>
              <td>
                <span className={c.cards}>
                  {benefits.freeCards}
                </span>
              </td>
              <td>
                <span className={c.period}>
                  1 cентября - 1 октября
                </span>
              </td>
              <td
                className={c.view}
                onClick={() => {
                  setActive(true)
                  setPeriod('12 месяцев/безлимит')
                }}
              >
                Посмотреть полный отчет
              </td>
            </tr>

            <tr>
              <td>
                Единоразовые занятия
              </td>
              <td>
                <span className={c.summa}>
                  {benefits.once}c
                </span>
              </td>
              <td>
                <span className={c.cards}>
                  {benefits.onceCards}
                </span>
              </td>
              <td>
                <span className={c.period}>
                  1 cентября - 1 октября
                </span>
              </td>
              <td
                className={c.view}
                onClick={() => {
                  setActive(true)
                  setPeriod('Единоразовые занятия')
                }}
              >
                Посмотреть полный отчет
              </td>
            </tr>

            <tr>
              <td>
                Спортзал
              </td>
              <td>
                <span className={c.summa}>
                  {benefits.gym}c
                </span>
              </td>
              <td>
                <span className={c.cards}>
                  {benefits.gymCards}
                </span>
              </td>
              <td>
                <span className={c.period}>
                  1 cентября - 1 октября
                </span>
              </td>
              <td
                className={c.view}
                onClick={() => {
                  setActive(true)
                  setPeriod('Спортзал')
                }}
              >
                Посмотреть полный отчет
              </td>
            </tr>
          </table> :
          rep === 3 ?
          <table>
            <tr>
              <th>Тип абонемента</th>
              <th className={c.name}>Полученный доход</th>
              <th>Активные карты</th>
              <th>Дополнительно</th>
            </tr>

            <tr>
              <td>
                1 месяц/через день
              </td>
              <td>
                <span className={c.summa}>
                  190.000c
                </span>
              </td>
              <td>
                <span className={c.cards}>
                  120
                </span>
              </td>
              <td>
                Посмотреть полный отчет
              </td>
            </tr>
          </table> :
          rep === 4 ?
          <table>
            <tr>
              <th>Дата</th>
              <th className={c.name}>Расход</th>
              <th>Дополнительно</th>
            </tr>

            {
              expensesData?.length !== 0 ?
              expensesData?.map((item, key) => (
                <tr key={key}>
                  <td>
                    {item[0]} {Months.find(item => item.id === monthRep).name}
                  </td>
                  <td>
                    <span className={c.summa}>
                      {Object.values(item[1]).reduce((a, b) => a+b.summa, 0)} с
                    </span>
                  </td>
                  <td 
                    className={c.view} 
                    onClick={() => {
                      setExpensesDataMore(Object.values(item[1]))
                      setDateMore(`${item[0]} ${Months.find(item => item.id === monthRep).name}`)
                      setActiveExpensesMore(true)
                    }}
                  >
                    Посмотреть полный отчет
                  </td>
                  <td className={c.add}>
                    {
                      Number(item[0]) === date.getDate() ?
                      <button onClick={() => handleAddExpenses()}>
                        Добавить
                      </button> :
                      ''
                    }
                  </td>
                </tr>
              )) :
              <tr>
                <td>
                  Нету расходов
                </td>
             </tr>
            }
          </table> :
          ''
        }
      </div>

      {active ? <ReportMore period={period} item={null} setActive={setActive} /> : null}
      {activeExpenses ? <Components.AddExpenses setActive={setActiveExpenses} /> : null}
      {activeExpensesMore ? <Components.Expenses date={dateMore} item={expensesDataMore} setActive={setActiveExpensesMore} /> : null}
    </div>
  )
}

export default Report