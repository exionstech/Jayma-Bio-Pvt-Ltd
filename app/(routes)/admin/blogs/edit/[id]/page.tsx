import { ContentLayout } from "@/components/admin-sidebar-layout/content-layout";
import EditBlogForm from "../../../_components/blogs/edit/blogs-edit-form";
// import { getBlog } from "@/lib/actions/blog"; 

const EditBlogPage = async ({ params }: { params: { id: string } }) => {
  // Optional: Fetch initial data server-side
  let initialBlog;
  try {
    // initialBlog = await getBlog(params.id);
  } catch (error) {
    // Handle error or let the client-side handle it
  }
  
  return (
    <ContentLayout title="Edit Blog">
      <EditBlogForm blogId={params.id} initialBlog={initialBlog} />
    </ContentLayout>
  );
};

export default EditBlogPage;
