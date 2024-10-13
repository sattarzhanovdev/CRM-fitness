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
    title: '3 месяца/каждый день',
    path: '/3months/everyDay/',
    page: <Pages.Month3EveryDay />,
    icon: Icons.user ,
    active: Icons.userActive
  },
  {
    id: 5,
    title: '12 месяцев/безлимит',
    path: '/12months/free/',
    page: <Pages.Free />,
    icon: Icons.user ,
    active: Icons.userActive
  },
  {
    id: 6,
    title: 'Единоразовые занятия',
    path: '/once-lessons/',
    page: <Pages.Once />,
    icon: Icons.user ,
    active: Icons.user
  },
  {
    id: 7,
    title: 'Финансы',
    path: '/finances/',
    page: <Pages.Finances />,
    icon: Icons.user ,
    active: Icons.userActive
  },
  {
    id: 8,
    title: 'Спортзал',
    path: '/gym/',
    page: <Pages.Gym />,
    icon: Icons.user ,
    active: Icons.userActive
  }
]


export const Months = [
  {id: 1, name: 'Январь', eng: 'January'},
  {id: 2, name: 'Февраль', eng: 'February'},
  {id: 3, name: 'Март', eng: 'March'},
  {id: 4, name: 'Апрель', eng: 'April'},
  {id: 5, name: 'Май', eng: 'May'},
  {id: 6, name: 'Июнь', eng: 'June'},
  {id: 7, name: 'Июль', eng: 'July'},
  {id: 8, name: 'Август', eng: 'August'},
  {id: 9, name: 'Сентябрь', eng: 'September'},
  {id: 10, name: 'Октябрь', eng: 'October'},
  {id: 11, name: 'Ноябрь', eng: 'November'},
  {id: 12, name: 'Декабрь', eng: 'December'},
]