import React from 'react'
import MainRoutes from './routes'
import { Components } from './components'
import './App.scss'
import { Months } from './utils'
import axios from 'axios'
import { API } from './api'

axios.defaults.baseURL = 'https://crm-system-e5257-default-rtdb.asia-southeast1.firebasedatabase.app'

function App() {
  const lastMonth = localStorage.getItem('lastMonth')
  const month = localStorage.getItem('month')

  const date = new Date()
  React.useEffect(() => {
    const newMonthID =  date.getMonth() + 1
    
    const newMonth =  Months.find(item => item.id === date.getMonth() + 1 ? item.name : '').name
    
    localStorage.setItem('month', newMonth)
    if(newMonth > lastMonth && date.getDate() === 1 || !lastMonth){
      localStorage.setItem('lastMonth', JSON.stringify(newMonthID-1))
      const data = {
        dayAbout: {
          summa: 2000,
          cards: 300
        },
        everyDay: 3000,
        dayAbout3: 3000,
        everyDay3: 33
      }
      
      API.postReport(Months.find(item => item.id === Number(lastMonth))?.eng, data)
      API.postExpenses(Months.find(item => item.id === Number(lastMonth))?.eng, date.getDate(), {})

    }else{
      // API.getReport()
      //   .then(res => res.data())
    }
    API.getExpensesByDay(Months.find(item => item.name === month)?.eng, date.getDate())
      .then(res => {
        if(res.data === null){
          API.postExpenses(Months.find(item => item.name === month)?.eng, date.getDate(), {name: '', summa: 0})
        }
      })
  }, [])
  return (
    <div className='main'>
      <Components.Sidebar />
      <div className='content'>
        <MainRoutes />
      </div>
    </div>
  )
}

export default App