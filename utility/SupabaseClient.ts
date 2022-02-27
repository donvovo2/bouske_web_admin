import { createClient } from '@supabase/supabase-js'
import { Company, Industry, JobPost, JobType } from '../models/types';
import JobPostDetailPage from '../pages/job-post/[jobPostId]';
// export interface ProcessEnv {
//     [key: string]: string | undefined
// }
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL??''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY??''

export const supabase = createClient(supabaseUrl?.toString(), supabaseAnonKey);


export const addJobPost =async (jobPost:JobPost) => {
  const { data, error } = await supabase
  .from('job_post')
  .insert([
    { company_id: jobPost.company_id,
      job_title: jobPost.job_title,
      job_type: jobPost.job_type,
      industry: jobPost.industry,
      country: jobPost.country,
      city: jobPost.city,
      state: jobPost.state,
      deadline: jobPost.deadline,
      publication_date: jobPost.publication_date,
      job_description: jobPost.job_description,    
    },
  ]);

    if (error) {
    console.log(error.message);
    throw error;
  }else{
     console.log(data);
  }


}

export const getJobPosts =async () : Promise<JobPost[]>=> {
      const { data, error } =await supabase.rpc<JobPost>('get_job_posts');

  if (error) {
    console.log(error.message);
    throw error;
  }

    return data || [];
}

export const getJobPost =async (id: number) : Promise<JobPost[]>=> {
    
 const { data, error } =await supabase.rpc('get_job_post',{job_post_id:id});
  if (error) {
    console.log(error.message);
    throw error;
  }

    return data||[];
}

export const updateJobPost = async (jobPost : JobPost)  => {
      const { data, error } =await supabase
        .from('job_post').update(
          {
           'job_title': jobPost.job_title,
           'company_id': jobPost.company_id,
           'industry': jobPost.industry,
           'job_type': jobPost.job_type,
           'job_description': jobPost.job_description,
           'country': jobPost.country,
           'state': jobPost.state,
           'city': jobPost.city,
           'deadline': jobPost.deadline,
           'publication_date': jobPost.publication_date,
          }
          ).eq('id', jobPost.id);
  
         if (error) {
    console.log(error.message);
    throw error;
  }
      return data||[];
}

export const removeJobPost =async (id: number) : Promise<JobPost[]>=> {
    
 const { data, error } =await supabase.from('job_post').delete().eq('id', id);
  if (error) {
    console.log(error.message);
    throw error;
  }

    return data||[];
}





export const getIndustrys = async (): Promise<Industry[]>  => {
      const { data, error } =await supabase
        .from('industry')
  .select('industry_name');
  
         if (error) {
    console.log(error.message);
    throw error;
  }

    return data||[];
}

export const getCompanyList = async ():Promise<Company[]>  => {
      const { data, error } =await supabase
        .from('company')
  .select('id, company_name');
  
         if (error) {
    console.log(error.message);
    throw error;
  }
    return data||[];
}

export const getJobTypes = async ():Promise<JobType[]>  => {
      const { data, error } =await supabase
        .from('job_type')
  .select('job_type_name');
  
         if (error) {
    console.log(error.message);
    throw error;
  }
      return data||[];
}

export const getJobLocations = async ()  => {
      const { data, error } =await supabase
        .from('job_location')
  .select('id, country, city, state');
  
         if (error) {
    console.log(error.message);
    throw error;
  }
      return data||[];
}



export const signIn =async ( email:string ,  password: string) => {
 let { user, error } = await supabase.auth.signIn({email,password}) 
   if (error) {
    console.log(error.message);
    throw error;
  }

  return user
}

export const singOut =async ( ) => {
 let {  error } = await supabase.auth.signOut() 
   
 if (error) {
    console.log(error.message);
    throw error;
  }
}







// export const AddJobPost =async (jobPost: JobPost) : Promise<JobPost>=> {
//       const { data, error } =await supabase.rpc<JobPost>('getalljobpost');

//   if (error) {
//     console.log(error.message);
//     throw error;
//   }

//     return data[0];
// }

// export const updateJobPost =async (jobPost: JobPost) : Promise<JobPost>=> {
//       const { data, error } =await supabase.rpc<JobPost>('getalljobpost');

//   if (error) {
//     console.log(error.message);
//     throw error;
//   }

//     return data[0];
// }



//   const { data, error } =await supabase
    //     .from('job_post')
    //     .select(`
    //         job_title,   company(company_name),
   
    // job_type(job_type_name),
   
    // publication_date,
    // deadline,
    // job_description,
    //         industry (
    //         industry_name
    //         )
    //     `)
    //     .eq('id', id);