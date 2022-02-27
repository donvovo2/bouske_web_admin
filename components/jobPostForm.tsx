import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Company, Industry, JobPost, JobType } from "../models/types";
import { addJobPost, updateJobPost } from "../utility/SupabaseClient";

const citys = [
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

export default function JobPostForm(props: {
  companys: Company[];
  industrys: Industry[];
  jobTypes: JobType[];
  jobPost?: JobPost[];
}) {
  const [deadline, setDeadline] = useState<string>("");
  const [publicationDate, setPublicationDate] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [jobType, setJobType] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [companyId, setCompanyId] = useState<number>(0);
  const [city, setCity] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [state, setState] = useState<string>("");
  let currentjobPost: JobPost;

  useEffect(() => {
    if (props.jobPost != null) {
      currentjobPost = props.jobPost!.at(0)!;


      setJobTitle(currentjobPost.job_title);
      setJobType(currentjobPost.job_type);
      setIndustry(currentjobPost.industry);
      setCompanyId(currentjobPost.company_id);
      setJobDescription(currentjobPost.job_description);
      setState(currentjobPost.state!);
      setPublicationDate(currentjobPost.publication_date!);
      setDeadline(currentjobPost.deadline!);
    }
  }, []);

  function getFormData(): JobPost {
    let jobPost = {
      job_type: jobType,
      company_id: companyId,
      industry: industry,
      job_title: jobTitle,
      city: city,
      country: "Haiti",
      publication_date: publicationDate,
      deadline: deadline,
      job_description: jobDescription,
    };
    console.log(jobPost);
    return jobPost;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const jobPost = getFormData();
    if (props.jobPost != null) {
      jobPost.id = props.jobPost!.at(0)!.id;
      console.log('about to update')
         updateJobPost(jobPost);
    } else {
      addJobPost(jobPost);
    }
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <TextField
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                fullWidth
                id="job_title"
                label="Job Title"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="job_type"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                select
                fullWidth
                label="Job Type"
              >
                {props.jobTypes.map((option) => (
                  <MenuItem
                    key={option.job_type_name}
                    value={option.job_type_name}
                  >
                    {option.job_type_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="industry"
                select
                fullWidth
                label="Industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              >
                {props.industrys.map((option) => (
                  <MenuItem
                    key={option.industry_name}
                    value={option.industry_name}
                  >
                    {option.industry_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="companyId"
                value={companyId}
                onChange={(e) => setCompanyId(Number.parseInt(e.target.value))}
                select
                fullWidth
                label="Company"
              >
                {props.companys.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.company_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="city"
                select
                fullWidth
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                {citys.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Publication Date"
                  value={publicationDate}
                  onChange={(newValue) => {
                    setPublicationDate(newValue!);
                  }}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Deadline"
                  value={deadline}
                  onChange={(newValue) => {
                    setDeadline(newValue!);
                  }}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <TextareaAutosize
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                aria-label="minimum height"
                minRows={3}
                placeholder="Job Description"
                style={{ width: "100%" }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            margin={2}
            rowSpacing={4}
            justifyContent="center"
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" href="#contained-buttons">
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
