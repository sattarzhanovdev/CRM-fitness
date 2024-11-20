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
  const [ data, setData ] = React.useState(null)
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

  const [ dayProfit, setDayProfit ] = React.useState(null)

  const [ monthRep, setMonthRep ] = React.useState(Months.find(item => item.name === month).id)
  const [ rep, setRep ] = React.useState(1)

  const [ active, setActive ] = React.useState(false)
  const [ activeExpenses, setActiveExpenses ] = React.useState(false)
  const [ activeExpensesMore, setActiveExpensesMore ] = React.useState(false)

  const [ period, setPeriod ] = React.useState('')
  const [ activePeriod, setActivePeriod ] = React.useState(false)

  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');

  const [dep, setDep] = React.useState('');

  const convertToDate = (day, month, year) => {
    return new Date(year, month - 1, day); 
  };

  const filteredData = data?.filter(item => {
    const { day, month, year } = item["1"];
    const itemDate = convertToDate(day, month, year);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    return (!start || itemDate >= start) && (!end || itemDate <= end);
  });

  const monthMap = {
    "January": 1, "February": 2, "March": 3, "April": 4, "May": 5,
    "June": 6, "July": 7, "August": 8, "September": 9, "October": 10,
    "November": 11, "December": 12
  };

  const more = () => {
    const result = data.filter(item => {
      if(period === '1 месяц/через день'){
        return item[1].aboutDay
      }else if(period === '1 месяц/каждый день'){
        return item[1].everyDay
      }else if(period === '3 месяца/через день'){
        return item[1].aboutDay3
      }else if(period === '12 месяцев/безлимит'){
        return item[1].everyDay3
      }else if(period === '3 месяца/каждый день'){
        return item[1].everyDay3
      }else if(period === 'Единоразовые занятия'){
        return item[1].once
      }else if(period === 'Спортзал'){
        return item[1].gym
      }
    })

      const [startYear, startMonth, startDay] = startDate.split('-').map(Number);
      const [endYear, endMonth, endDay] = endDate.split('-').map(Number);

      result.forEach(monthObj => {
      const monthName = monthObj["0"];
      const monthNumber = monthMap[monthName]; // Преобразование названия месяца в номер

      if (
        (startYear === endYear && monthNumber >= startMonth && monthNumber <= endMonth) // Оба года одинаковы, но проверяются месяцы
      ) {
        const days = monthObj["1"];

        Object.keys(days).forEach(day => {
          const dayNumber = parseInt(day); // Преобразование дня в число

          if (
            (monthNumber >= startMonth && dayNumber >= startDay) || // В пределах начального месяца
            (monthNumber <= endMonth && dayNumber <= endDay) // В пределах конечного месяца
            (monthNumber > startMonth && monthNumber < endMonth) // Между начальным и конечным месяцами
          ) {
            // Суммирование всех транзакций за указанный день
            const monthExp = [];
            for (let i = startDay; i <= endDay; i++) {
              if (days[i] !== undefined) {
                monthExp.push(days[i]);
              }
            }

            // Используем map для создания нового массива
            const database = monthExp.map(item => {
              return Object.values(item);
            });

            const totalSum = database.reduce((acc, group) => {
              const groupSum = group.reduce((sum, item) => sum + item.summa, 0);
              return acc + groupSum;
            }, 0);
            
            setExpenses(totalSum);
          }
        });
      }
    });

    setData(result);
    
  }

  React.useEffect(() => {
    if(rep === 1){
      setStartDate('')
      setEndDate('')
    }

    API.getBenefit(Months.find(item => item.id === monthRep).eng)
      .then(res => {
        if(res.data){
          const result = Object.entries(res.data).map((item, id) => {
            return {
              id, 
              ...item
            }
          })
          setDayProfit(result);
        }else{
          setDayProfit([]);
        }
      })

    API.getClients()
      .then(res => {
        if(res.data){
          const base = Object.entries(res.data).map((item, id) => {
            return {
              id: id+1, 
              ...item
            }
          }).filter(item => item[1].month === monthRep)
          setData(base)
  
          const baseAboutDay = filteredData ? filteredData?.filter(item => item[1].aboutDay) : base?.filter(item => item[1].aboutDay)
          const baseAboutDay3 = filteredData ? filteredData?.filter(item => item[1].aboutDay3) : base?.filter(item => item[1].aboutDay3)
          const baseEveryDay = filteredData ? filteredData?.filter(item => item[1].everyDay) : base?.filter(item => item[1].everyDay)
          const baseEveryDay3 = filteredData ? filteredData?.filter(item => item[1].everyDay3) : base?.filter(item => item[1].everyDay3)
          const baseOnce = filteredData ? filteredData?.filter(item => item[1].once) : base?.filter(item => item[1].once)
          const baseGym = filteredData ? filteredData?.filter(item => item[1].gym) : base?.filter(item => item[1].gym)
          const baseFree = filteredData ? filteredData?.filter(item => item[1].free) : base?.filter(item => item[1].free)
  
          setBenefit(filteredData ? filteredData.reduce((a, b) => a + Number(b[1]?.payment), 0) : base.reduce((a, b) => a + Number(b[1]?.payment), 0))
          
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
  
          setTurnover(filteredData ? filteredData.length : base.length)
        }
      })
    
    if (startDate.length !== 0 && endDate.length !== 0) {
      API.getAllExpenses()
        .then(res => {
          if (res.data) {
            const result = Object.entries(res.data).map(item => {
              return {
                ...item
              };
            });
    
            const [startYear, startMonth, startDay] = startDate.split('-').map(Number);
            const [endYear, endMonth, endDay] = endDate.split('-').map(Number);
    
            result.forEach(monthObj => {
              const monthName = monthObj["0"];
              const monthNumber = monthMap[monthName]; // Преобразование названия месяца в номер
    
              if (
                (startYear === endYear && monthNumber >= startMonth && monthNumber <= endMonth) // Оба года одинаковы, но проверяются месяцы
              ) {
                const days = monthObj["1"];
    
                Object.keys(days).forEach(day => {
                  const dayNumber = parseInt(day); // Преобразование дня в число
    
                  if (
                    (monthNumber >= startMonth && dayNumber >= startDay) || // В пределах начального месяца
                    (monthNumber <= endMonth && dayNumber <= endDay) // В пределах конечного месяца
                    (monthNumber > startMonth && monthNumber < endMonth) // Между начальным и конечным месяцами
                  ) {
                    // Суммирование всех транзакций за указанный день
                    const monthExp = [];
                    for (let i = startDay; i <= endDay; i++) {
                      if (days[i] !== undefined) {
                        monthExp.push(days[i]);
                      }
                    }

                    // Используем map для создания нового массива
                    const database = monthExp.map(item => {
                      return Object.values(item);
                    });

                    const totalSum = database.reduce((acc, group) => {
                      const groupSum = group.reduce((sum, item) => sum + item.summa, 0);
                      return acc + groupSum;
                    }, 0);
                    
                    setExpenses(totalSum);
                  }
                });
              }
            });
          }
        });
    } else {
      API.getExpenses(Months.find(item => item.id === monthRep).eng)
        .then(res => {
          if (res.data) {
            const result = Object.entries(res.data).map(item => {
              return {
                ...item
              };
            });
    
            const totalSumma = result.reduce((sum, obj) => {
              return sum + Object.values(obj["1"]).reduce((subSum, item) => subSum + item.summa, 0);
            }, 0);
    
            setExpensesData(result); // Установка данных о расходах
            setExpenses(totalSumma); // Установка итоговой суммы
          }else{
            setExpenses(0)
          }
        }
      );
    }

    
  }, [startDate, endDate, dep, rep, period])

  const date = new Date()
  const handleAddExpenses = () => {
    setActiveExpenses(true)
  }

  const splittedStartDate = startDate.split('-')
  const splittedEndDate = endDate.split('-')  
  
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
                Months.slice(0, 12).map(item => (
                  <button key={item.id} onClick={() => {
                    setMonthRep(item.id)
                    setDep(Math.random())
                    localStorage.setItem('monthId', item.id)
                  }} className={monthRep === item.id ? c.active : ''}>
                    {item.name}
                  </button>
                ))
              }
            </div> :
            <div className={c.period}>
              <span>
                {
                startDate ? 
                `${splittedStartDate[2]} ${Months.find(item => item.id === Number(splittedStartDate[1])).name}` 
                :
                `1 ${Months.find(item => item.id == monthRep).name}`} - {
                  endDate ? 
                  `${splittedEndDate[2]} ${Months.find(item => item.id === Number(splittedEndDate[1])).name}` :
                  `1 ${Months.find(item => item.id == monthRep+1).name}`
                }
              </span>
              <p onClick={() => setActivePeriod(true)}>Выберите период</p>
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
                    Итоги прибыли за {Months.find(item => item.id === Number(monthRep)).name.toLowerCase()}
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
                  {benefits.aboutDay} c
                </span>
              </td>
              <td>
                <span className={c.cards}>
                  {benefits.aboutDayCards}
                </span>
              </td>
              <td>
                <span className={c.period}>
                  {
                    rep === 2 && startDate && endDate ?
                    `${splittedStartDate[2]} ${Months.find(item => item.id === Number(splittedStartDate[1])).name} - ${splittedEndDate[2]} ${Months.find(item => item.id === Number(splittedEndDate[1])).name}` 
                    :
                    `1 ${Months.find(item => item.id === monthRep).name.toLowerCase()} - 1 ${Months.find(item => item.id === monthRep+1).name.toLowerCase()}`
                  }
                  
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
                  {
                    rep === 2 && startDate && endDate ?
                    `${splittedStartDate[2]} ${Months.find(item => item.id === Number(splittedStartDate[1])).name} - ${splittedEndDate[2]} ${Months.find(item => item.id === Number(splittedEndDate[1])).name}` 
                    :
                    `1 ${Months.find(item => item.id === monthRep).name.toLowerCase()} - 1 ${Months.find(item => item.id === monthRep+1).name.toLowerCase()}`
                  }
                </span>
              </td>
              <td
                className={c.view}
                onClick={() => {
                  setActive(true)
                  setPeriod('1 месяц/каждый день')
                  if(rep === 2){
                    more()
                  }
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
                  {
                    rep === 2 && startDate && endDate ?
                      `${splittedStartDate[2]} ${Months.find(item => item.id === Number(splittedStartDate[1])).name} - ${splittedEndDate[2]} ${Months.find(item => item.id === Number(splittedEndDate[1])).name}` 
                    :
                    `1 ${Months.find(item => item.id === monthRep).name.toLowerCase()} - 1 ${monthRep === 12 ? Months.find(item => item.id === 1).name.toLowerCase() : Months.find(item => item.id === monthRep + 1).name.toLowerCase()}`
                  }
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
                  {
                    rep === 2 && startDate && endDate ?
                    `${splittedStartDate[2]} ${Months.find(item => item.id === Number(splittedStartDate[1])).name} - ${splittedEndDate[2]} ${Months.find(item => item.id === Number(splittedEndDate[1])).name}` 
                    :
                    `1 ${Months.find(item => item.id === monthRep).name.toLowerCase()} - 1 ${Months.find(item => item.id === monthRep+1).name.toLowerCase()}`
                  }                </span>
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
                  {
                    rep === 2 && startDate && endDate ?
                    `${splittedStartDate[2]} ${Months.find(item => item.id === Number(splittedStartDate[1])).name} - ${splittedEndDate[2]} ${Months.find(item => item.id === Number(splittedEndDate[1])).name}` 
                    :
                    `1 ${Months.find(item => item.id === monthRep).name.toLowerCase()} - 1 ${Months.find(item => item.id === monthRep+1).name.toLowerCase()}`
                  }
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
                  {
                    rep === 2 && startDate && endDate ?
                    `${splittedStartDate[2]} ${Months.find(item => item.id === Number(splittedStartDate[1])).name} - ${splittedEndDate[2]} ${Months.find(item => item.id === Number(splittedEndDate[1])).name}` 
                    :
                    `1 ${Months.find(item => item.id === monthRep).name.toLowerCase()} - 1 ${Months.find(item => item.id === monthRep+1).name.toLowerCase()}`
                  }
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
                  {
                    rep === 2 && startDate && endDate ?
                    `${splittedStartDate[2]} ${Months.find(item => item.id === Number(splittedStartDate[1])).name} - ${splittedEndDate[2]} ${Months.find(item => item.id === Number(splittedEndDate[1])).name}` 
                    :
                    `1 ${Months.find(item => item.id === monthRep).name.toLowerCase()} - 1 ${Months.find(item => item.id === monthRep+1).name.toLowerCase()}`
                  }
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

            {
              dayProfit ?
              dayProfit?.map(item => (
                <tr>
                  <td>
                    {item[0]} {Months.find(item => item.id === monthRep).name}
                  </td>
                  <td>
                    <span className={c.summa}>
                      {Object.values(item[1]).reduce((a,b) => a+b.summa, 0)} c
                    </span>
                  </td>
                  <td>
                    <span className={c.cards}>
                      {Object.values(item[1]).reduce((a,b) => a+b.cards, 0)}
                    </span>
                  </td>
                  <td>
                    Посмотреть полный отчет
                  </td>
                </tr>
              )) :
              <tr>
                <td>
                  Нету дохода
                </td>
                <td>
                </td>
                <td>
                </td>
                <td>
                </td>
              </tr>
            }
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

      {active ? <ReportMore period={period} data={data} setActive={setActive} /> : null}
      {activeExpenses ? <Components.AddExpenses setActive={setActiveExpenses} /> : null}
      {activeExpensesMore ? <Components.Expenses date={dateMore} item={expensesDataMore} setActive={setActiveExpensesMore} /> : null}
      {activePeriod ? <Components.Period setActive={setActivePeriod} setStartDate={setStartDate} setEndDate={setEndDate} setDep={setDep}/> : null}
    </div>
  )
}

export default Report