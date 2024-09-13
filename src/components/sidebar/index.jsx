import React from 'react'
import { PUBLIC_ROUTES } from '../../utils'
import { Link, useLocation } from 'react-router-dom'
import c from './sidebar.module.scss'
import { Icons } from '../../assets/icons'


const Sidebar = () => {
  const path = useLocation().pathname
  
  return (
    <div className={c.sidebar}>
      <ul>
        {
          PUBLIC_ROUTES.map(item => (
            <li key={item.id} className={path === item.path ? c.active : ''}>
              <Link to={item.path}>
                {path === item.path ? <img src={item.active} alt={item.title}/> : <img src={item.icon} alt={item.title}/>}
                {item.title}
                {path === item.path ? <img src={Icons.rightActive} alt={''} className={c.right}/> : <img src={Icons.right} alt={''} className={c.right}/>}
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Sidebar