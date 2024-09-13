import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { PUBLIC_ROUTES } from '../utils'

const MainRoutes = () => {
  return (
    <div>
      <Routes>
        {
          PUBLIC_ROUTES.map((item, i) => (
            <Route 
              key={i}
              path={item.path}
              element={item.page}
            />
          ))
        }
      </Routes>
    </div>
  )
}

export default MainRoutes