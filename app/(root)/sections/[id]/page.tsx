import CheckoutButton from '@/components/shared/CheckoutButton';
import Collection from '@/components/shared/Collection';
import { getSectionById, getRelatedSectionsByCategory } from '@/lib/actions/section.actions';
import { formatDateTime } from '@/lib/utils';
import { SearchParamProps } from '@/types';
import Image from 'next/image';

const SectionDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
  const section = await getSectionById(id);

  const relatedSections = await getRelatedSectionsByCategory({
    categoryId: section.category._id,
    sectionId: section._id,
    page: searchParams.page as string,
  })

  return (
    <>
    <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className='h2-bold'>{section.title}</h2>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                {/* <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                  {secto.isEnrolled ? 'FREE' : `$${event.price}`}
                </p> */}
                <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                  {section.category.name}
                </p>
              </div>

              <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                by{' '}
                <span className="text-primary-500">{section.admin.firstName} {section.admin.lastName}</span>
              </p>
            </div>
          </div>

          <CheckoutButton section={section} />

          <div className="flex flex-col gap-5">
            <div className='flex gap-2 md:gap-3'>
              <Image src="/assets/icons/calendar.svg" alt="calendar" width={32} height={32} />
              <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                <p>
                  {formatDateTime(section.startDateTime).dateOnly} - {' '}
                  {formatDateTime(section.startDateTime).timeOnly}
                </p>
                <p>
                  {formatDateTime(section.endDateTime).dateOnly} -  {' '}
                  {formatDateTime(section.endDateTime).timeOnly}
                </p>
              </div>
            </div>

            <div className="p-regular-20 flex items-center gap-3">
              <Image src="/assets/icons/location.svg" alt="location" width={32} height={32} />
              <p className="p-medium-16 lg:p-regular-20">{section.location}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="p-bold-20 text-grey-600">What You'll Learn:</p>
            <p className="p-medium-16 lg:p-regular-18">{section.description}</p>
            <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">{section.url}</p>
          </div>
        </div>
      </div>
    </section>

    {/* EVENTS with the same category */}
    <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
      <h2 className="h2-bold">Related Classes</h2>

      <Collection 
          data={relatedSections?.data}
          emptyTitle="No Classes Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Sections"
          limit={3}
          page={searchParams.page as string}
          totalPages={relatedSections?.totalPages}
        />
    </section>
    </>
  )
}

export default SectionDetails