import { GetStaticProps } from "next";
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring";
import JobPostForm from "../../../components/jobPostForm";
import { Company, Industry, JobPost, JobType } from "../../../models/types";
import { getCompanyList, getIndustrys, getJobPost, getJobTypes } from "../../../utility/SupabaseClient";



interface IParams extends ParsedUrlQuery {
  jobPostId: string;
}
const city = [
  {
    value: "Port-au-Prince",
    label: "Port-au-Prince",
  },
  {
    value: "Jacmel",
    label: "Jacmel",
  },
  {
    value: "Cap Haitien",
    label: "Cap Haitien",
  },
  {
    value: "Gonaives",
    label: "Gonaives",
  },
];

export async function getStaticPaths() {
  return {
    fallback: true,
    paths: [
      {
        params: {
          jobPostId: "1",
        },
      },
      {
        params: {
          jobPostId: "2",
        },
      },
    ],
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
 const { jobPostId } = context.params as IParams;
  const companys = await getCompanyList();
  const industrys = await getIndustrys();
  const jobTypes = await getJobTypes();
  const jobPost = await getJobPost(Number.parseInt(jobPostId));

  return {
    props: {
      companys,
      industrys,
      jobTypes,
      jobPost,
    },
  };
};

function EditJobPostPage(props: {
  companys: Company[];
  industrys: Industry[];
  jobTypes: JobType[];
  jobPost: JobPost[];
}) {
  const router = useRouter();
  const jobPostId = router.query.jobPostId;

   return (
     <>
       <h1> Edit {jobPostId} job posts</h1>
       <JobPostForm
         companys={props.companys}
         industrys={props.industrys}
         jobTypes={props.jobTypes}
         jobPost = {props.jobPost}
       />
     </>
   );
 
}
  
  export default EditJobPostPage