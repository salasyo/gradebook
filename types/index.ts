// ====== USER PARAMS
export type CreateUserParams = {
    clerkId: string
    firstName: string
    lastName: string
    email: string
  }
  
  export type UpdateUserParams = {
    firstName: string
    lastName: string
  }
  
  // ====== EVENT PARAMS
  export type CreateSectionParams = {
    userId: string
    section: {
      title: string
      description: string
      room: string
      startDateTime: Date
      endDateTime: Date
      categoryId: string
      // isEnrolled: boolean
    }
    path: string
  }
  
  export type UpdateSectionParams = {
    userId: string
    section: {
      _id: string
      title: string
      description: string
      room: string
      startDateTime: Date
      endDateTime: Date
      categoryId: string
      // isEnrolled: boolean
    }
    path: string
  }
  
  export type DeleteSectionParams = {
    sectionId: string
    path: string
  }
  
  export type GetAllSectionsParams = {
    query: string
    category: string
    limit: number
    page: number
  }
  
  export type GetSectionsByUserParams = {
    userId: string
    limit?: number
    page: number
  }
  
  export type GetRelatedSectionsByCategoryParams = {
    categoryId: string
    sectionId: string
    limit?: number
    page: number | string
  }
  
  export type Section = {
    _id: string
    title: string
    description: string
    // isEnrolled: boolean
    room: string
    startDateTime: Date
    endDateTime: Date
    admin: {
      _id: string
      firstName: string
      lastName: string
    }
    category: {
      _id: string
      name: string
    }
  }
  
  // ====== CATEGORY PARAMS
  export type CreateCategoryParams = {
    categoryName: string
  }
  
  // ====== ORDER PARAMS
  export type CheckoutOrderParams = {
    eventTitle: string
    sectionId: string
    price: string
    isFree: boolean
    buyerId: string
  }
  
  export type CreateOrderParams = {
    stripeId: string
    eventId: string
    buyerId: string
    totalAmount: string
    createdAt: Date
  }
  
  export type GetOrdersByEventParams = {
    eventId: string
    searchString: string
  }
  
  export type GetOrdersByUserParams = {
    userId: string | null
    limit?: number
    page: string | number | null
  }
  
  // ====== URL QUERY PARAMS
  export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
  }
  
  export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
  }
  
  export type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }