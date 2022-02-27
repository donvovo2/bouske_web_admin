import Grid from "@mui/material/Grid";
import { GetStaticProps } from "next";

import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import { JobPost } from "../../models/types";
import { getJobPost, supabase } from "../../utility/SupabaseClient";

interface IParams extends ParsedUrlQuery {
            jobPostId: string;
}
export async function getStaticPaths(){
  return {
    fallback : true,
    paths: [
      {
        params:{
          jobPostId: '1',
        }, 
      },
      {
        params:{
          jobPostId: '2',
        }, 
      },
    ]
  }
}

export const getStaticProps: GetStaticProps = async (
  context
) => {
  //   const router= useRouter();
  // const jobPostId  = parseInt(router.query.jobPostId as string, 10);
  const {jobPostId} = context.params as IParams;
  const jobPost = await getJobPost(Number.parseInt(jobPostId));
  console.log(jobPost);

  return {
    props: {
      jobPost,
    },
  };
};


function JobPostDetailPage({jobPost} : {jobPost: JobPost[]}) {
  const router= useRouter();
  const jobPostId = router.query.jobPostId

 const [deadline, setDeadline] = useState<string>("");
 const [publicationDate, setPublicationDate] = useState<string>("");
 const [jobTitle, setJobTitle] = useState<string>("");
 const [jobType, setJobType] = useState<string>("");
 const [industry, setIndustry] = useState<string>("");
 const [companyId, setCompanyId] = useState<number>(0);
 const [companyName, setCompanyName] = useState<string>("");
 const [city, setCity] = useState<string>("");
 const [country, setCountry] = useState<string>("");
 const [jobDescription, setJobDescription] = useState<string>("");
 const [state, setState] = useState<string>("");

   let currentjobPost: JobPost;
  useEffect(() => {
     currentjobPost = jobPost!.at(0)!;

      setJobTitle(currentjobPost.job_title);
      setJobType(currentjobPost.job_type);
      setIndustry(currentjobPost.industry);
      setCompanyId(currentjobPost.company_id);
      setCompanyName(currentjobPost.company_name!);
      setJobDescription(currentjobPost.job_description);
      setCity(currentjobPost.city);
      setState(currentjobPost.state!);
      setCountry(currentjobPost.country!);
      setPublicationDate(currentjobPost.publication_date!);
      setDeadline(currentjobPost.deadline!);
  }, []);

    return (
      <>
        <h1> Show job post {jobPostId} </h1>
        <Grid container spacing={1}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              {jobTitle}
            </Grid>
            <Grid item xs={4}>
              {companyName}
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              {jobType}
            </Grid>
            <Grid item xs={4}>
              {industry}
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              {publicationDate}
            </Grid>
            <Grid item xs={4}>
              {deadline}
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              {city}
            </Grid>
            <Grid item xs={4}>
              {state}
            </Grid>
            <Grid item xs={4}>
              {country!}
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              {jobDescription}
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
  
  export default JobPostDetailPage