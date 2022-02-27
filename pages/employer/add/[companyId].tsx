import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import CompanyForm from "../../../components/companyForm";
import { Company } from "../../../models/types";
import { getCompany } from "../../../utility/company";

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

function EditCompanyPage(props: { company: Company }) {
  const router = useRouter();
  const companyId = router.query.companyId;

  return (
    <>
      <h1> Edit {companyId} job posts</h1>
      <CompanyForm company={props.company} />
    </>
  );
}

export default EditCompanyPage;
