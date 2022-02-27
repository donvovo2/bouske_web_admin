import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { Company, Industry, JobPost, JobType } from "../../../models/types";
import {
  Box,
  Button,
  Card,
  Grid,
  MenuItem,
  Stack,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { useRef, useState } from "react";
import { addJobPost, getCompanyList, getIndustrys, getJobTypes } from "../../../utility/SupabaseClient";
import JobPostForm from "../../../components/jobPostForm";


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

export async function getStaticProps() {
 const companys = await getCompanyList();
 const industrys = await getIndustrys();
 const jobTypes = await getJobTypes();
 
 

  return {
    props: {
      companys,
      industrys,
      jobTypes
    },
  };
}

 function AddJobPostPage(props: {
   companys: Company[];
   industrys: Industry[];
   jobTypes: JobType[];
 }) {

   return (
     <>
       <h1> Add job posts</h1>
       <JobPostForm
         companys={props.companys}
         industrys={props.industrys}
         jobTypes={props.jobTypes}
       />
     </>
   );
 }

export default AddJobPostPage;
