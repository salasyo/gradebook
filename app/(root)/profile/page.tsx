import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getSectionsByUser } from '@/lib/actions/section.actions'
// import { getOrdersByUser } from '@/lib/actions/order.actions'
import { IOrder } from '@/lib/database/models/order.model'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  // const ordersPage = Number(searchParams?.ordersPage) || 1;
  const sectionsPage = Number(searchParams?.sectionsPage) || 1;

  // const orders = await getOrdersByUser({ userId, page: ordersPage})

  // const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];
  const organizedSections = await getSectionsByUser({ userId, page: sectionsPage })

  return (
    <>
      {/* My Tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>My Tickets</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#sections">
              Explore More Sections
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        {/* <Collection 
          data={orderedEvents}
          emptyTitle="No event tickets purchased yet"
          emptyStateSubtext="No worries - plenty of exciting events to explore!"
          collectionType="My_Tickets"
          limit={3}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orders?.totalPages}
        /> */}
      </section>

      {/* Events Organized */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>Sections Organized</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/sections/create">
              Create New Section
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection 
          data={organizedSections?.data}
          emptyTitle="No class sections have been created yet"
          emptyStateSubtext="Go create some now"
          collectionType="Sections_Organized"
          limit={3}
          page={sectionsPage}
          urlParamName="sectionsPage"
          totalPages={organizedSections?.totalPages}
        />
      </section>
    </>
  )
}

export default ProfilePage