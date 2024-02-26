export const headerLinks = [
    {
      label: 'Search',
      route: '/',
    },
    {
      label: 'Create Sections',
      route: '/sections/create',
    },
    {
      label: 'Profile',
      route: '/profile',
    },
  ]
  
  export const sectionDefaultValues = {
    title: '',
    description: '',
    room: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    categoryId: '',
    isEnrolled: false,
  }