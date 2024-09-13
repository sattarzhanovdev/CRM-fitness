import React from 'react'
import MainRoutes from './routes'
import { Components } from './components'
import './App.scss'
import { Months } from './utils'
import axios from 'axios'

axios.defaults.baseURL = 'https://crm-system-e5257-default-rtdb.asia-southeast1.firebasedatabase.app'

function App() {
  React.useEffect(() => {
    const date = new Date()
    const month = Months.find(item => item.id == date.getMonth() + 1 ? item.name : '').name
    localStorage.setItem('month', month)
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