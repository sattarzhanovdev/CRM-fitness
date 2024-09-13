import { Icons } from "../assets/icons";
import { Pages } from "../pages";

export const PUBLIC_ROUTES = [
  {
    id: 1, 
    path: '/',
    title: '1 месяц/через день',
    page: <Pages.MonthDayAbout />,
    icon: Icons.user,
    active: Icons.userActive
  },
  {
    id: 2, 
    title: '1 месяц/каждый день',
    path: '/month/everyDay/',
    page: <Pages.MonthEveryDay />,
    icon: Icons.user,
    active: Icons.userActive
  },
  {
    id: 3,
    title: '3 месяца/через день',
    path: '/3months/dayAbout/',
    page: <Pages.Month3DayAbout />,
    icon: Icons.user ,
    active: Icons.userActive
  },
  {
    id: 4,
    title: 'Финансовый учет',
    path: '/financial-report/',
    page: <Pages.Report />,
    icon: Icons.wallet ,
    active: Icons.walletActive
  }
]


export const Months = [
  {id: 1, name: 'Январь'},
  {id: 2, name: 'Февраль'},
  {id: 3, name: 'Март'},
  {id: 4, name: 'Апрель'},
  {id: 5, name: 'Май'},
  {id: 6, name: 'Июнь'},
  {id: 7, name: 'Июль'},
  {id: 8, name: 'Август'},
  {id: 9, name: 'Сентябрь'},
  {id: 10, name: 'Октябрь'},
  {id: 11, name: 'Ноябрь'},
  {id: 12, name: 'Декабрь'},
]