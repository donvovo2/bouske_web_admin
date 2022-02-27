import Grid from "@mui/material/Grid";
import { GetStaticProps } from "next";

import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import { Company } from "../../models/types";
import { getCompany } from "../../utility/company";

interface IParams extends ParsedUrlQuery {
  companyId: string;
}
export async function getStaticPaths() {
  return {
    fallback: true,
    paths: [
      {
        params: {
          companyId: "1",
        },
      },
      {
        params: {
          companyId: "2",
        },
      },
    ],
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { companyId } = context.params as IParams;
  const company = await getCompany(Number.parseInt(companyId));

  return {
    props: {
      company,
    },
  };
};

function CompanyDetailPage({ company }: { company: Company }) {
  const router = useRouter();
  const companyId = router.query.companyId;
  const [phoneNumber, setPhoneNumber] = useState<string>(company.phone_number);
  const [companyName, setCompanyName] = useState<string>(company.company_name);

  // let currentcompany: Company;
  // // useEffect(() => {
  // console.log(company);
  //  currentcompany = company!;
  //  setPhoneNumber(currentcompany.phone_number);
  //  setCompanyName(currentcompany.company_name!);
  // // }, []);

  return (
    <>
      <h1> Show job post {companyId} </h1>
      <Grid container spacing={1}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            {phoneNumber}
          </Grid>
          <Grid item xs={4}>
            {companyName}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default CompanyDetailPage;
