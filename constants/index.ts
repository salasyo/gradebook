export const headerLinks = [
    {
      label: 'Search',
      route: '/',
    },
    {
      label: 'Create Sections',
      route: '/events/create',
    },
    {
      label: 'Profile',
      route: '/profile',
    },
  ]
  
  export const eventDefaultValues = {
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    categoryId: '',
    price: '',
    isFree: false,
    url: '',
  }