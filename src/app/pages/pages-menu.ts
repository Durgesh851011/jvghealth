import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'Appointment',
    icon: 'phone-outline',
    link: '/pages/appointment/list'
  },
  {
    title: 'Lab Report',
    icon: 'thermometer-plus-outline',
    link: '/pages/labreport/list'
  },
  {
    title: 'Orders',
    icon: 'shopping-cart-outline',
    children: [
      {
        title: 'Medicine Orders',
        link: '/pages/order/medicineorder',
      },
      {
        title: 'Lab Test Orders',
        link: '/pages/order/labtestorder',
      },
    ],
  },
  {
    title: 'Payments',
    icon: 'credit-card-outline',
    children: [
      {
        title: 'Orders',
        link: '/pages/payment/order',
      },
      {
        title: 'Appointment',
        link: '/pages/payment/appointment',
      },
    ],
  },
  {
    title: 'Users',
    icon: 'people-outline',
    link: '/pages/users/list'
  },
  {
    title: 'Doctors',
    icon: 'person-add-outline',
    children: [
      {
        title: 'Doctors List',
        link: '/pages/doctor/list',
      },
      {
        title: 'Add Doctor',
        link: '/pages/doctor/input',
      },
    ],
  },
  {
    title: 'Medicine',
    icon: 'plus-square-outline',
    children: [
      {
        title: 'Medicine List',
        link: '/pages/medicine/list',
      },
      {
        title: 'Add Medicine',
        link: '/pages/medicine/input',
      },
    ],
  },
  {
    title: 'Location',
    icon: 'pin-outline',
    children: [
      {
        title: 'Country',
        link: '/pages/location/country',
      },
      {
        title: 'State',
        link: '/pages/location/state',
      },
      {
        title: 'City',
        link: '/pages/location/city',
      },
    ],
  },
  {
    title: 'Hospitals',
    icon: 'home-outline',
    link: '/pages/hospital/list'
  },
  {
    title: 'Speciality',
    icon: 'bulb-outline',
    link: '/pages/speciality/list'
  },
  {
    title: 'Plan',
    icon: 'activity-outline',
    link: '/pages/plan/list'
  },
  {
    title: 'Question Answer',
    icon: 'question-mark-outline',
    link: '/pages/question/list'
  },

  {
    title: 'Disease',
    icon: 'thermometer-outline',
    link: '/pages/disease/list'
  },
  {
    title: 'Sub Disease',
    icon: 'thermometer-outline',
    link: '/pages/subdisease/list'
  },
];
