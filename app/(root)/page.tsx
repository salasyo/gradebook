import CategoryFilter from '@/components/shared/CategoryFilter';
import Collection from '@/components/shared/Collection'
import Search from '@/components/shared/Search';
import { Button } from '@/components/ui/button'
import { getAllSections } from '@/lib/actions/section.actions';
import { SearchParamProps } from '@/types';
import Image from 'next/image'
import Link from 'next/link'

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';

  const sections = await getAllSections({
    query: searchText,
    category,
    page,
    limit: 6
  })

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Find your next course on GradeBook! </h3>
      </section>

      <section id="sections" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>

        <Collection
          data={sections?.data}
          emptyTitle="No Sections Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Sections"
          limit={6}
          page={page}
          totalPages={sections?.totalPages}
        />
      </section>
    </>
  )
}