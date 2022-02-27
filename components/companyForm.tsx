import {
  Box,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Company } from "../models/types";
import { addCompany, updateCompany } from "../utility/company";

export default function CompanyForm(props: { company: Company }) {
  const [companyName, setCompanyName] = useState<string>(
    props.company.company_name
  );
  const [phoneNumber, setPhoneNumber] = useState<string>(
    props.company.phone_number
  );

  // let currentCompany: Company;

  // useEffect(() => {
  //   if (props.company != null) {
  //     currentCompany = props.company!.at(0)!;
  //     //console.log(currentCompany);

  //     setCompanyName(currentCompany.company_name);
  //     setPhoneNumber(currentCompany.phone_number);
  //   }
  // }, []);

  function getFormData(): Company {
    let company = {
      company_name: phoneNumber,
      phone_number: companyName,
    };
    console.log(company);
    return company;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const company = getFormData();
    if (props.company != null) {
      company.id = props.company.id;
      console.log("about to update");
      updateCompany(company);
    } else {
      addCompany(company);
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
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                fullWidth
                id="company_name"
                label="Company Name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="phone_number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                fullWidth
                label="Phone Number"
                variant="outlined"
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
