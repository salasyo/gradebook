import SectionForm from "@/components/shared/SectionForm"
import { getSectionById } from "@/lib/actions/section.actions"
import { auth } from "@clerk/nextjs";

type UpdateSectionProps = {
  params: {
    id: string
  }
}

const UpdateSection = async ({ params: { id } }: UpdateSectionProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const section = await getSectionById(id)

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Update Section</h3>
      </section>

      <div className="wrapper my-8">
        <SectionForm 
          type="Update" 
          section={section} 
          sectionId={section._id} 
          userId={userId} 
        />
      </div>
    </>
  )
}

export default UpdateSection