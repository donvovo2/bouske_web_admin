import { Button } from "@mui/material";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowParams,
  GridValueGetterParams,
  MuiEvent,
} from "@mui/x-data-grid";
import Link from "next/link";
import { Company } from "../../models/types";
import { getCompanys, removeCompany } from "../../utility/company";
import {
  removeJobPost,
  getJobPosts,
  getCompanyList,
} from "../../utility/SupabaseClient";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", type: "number", width: 20 },
  { field: "company_name", headerName: "Company", width: 110 },
  { field: "phone_number", headerName: "Phone Number", width: 170 },
  {
    field: "action",
    width: 250,
    headerName: "Action",
    type: "action",
    sortable: false,
    renderCell: (cellValues: GridValueGetterParams) => {
      return (
        <>
          <Link href={`/employer/${cellValues.row.id}`} passHref>
            <Button variant="contained" color="success">
              view
            </Button>
          </Link>
          |
          <Link href={`/employer/add/${cellValues.row.id}`} passHref>
            <Button variant="contained" color="primary">
              Edit
            </Button>
          </Link>
          |
          <Button
            variant="contained"
            color="error"
            onClick={(event) => {
              handleDeleteClick(event, cellValues);
            }}
          >
            Delete
          </Button>
        </>
      );
    },
  },
];

const handleDeleteClick = (
  event: MuiEvent<React.MouseEvent>,
  cellValues: GridValueGetterParams
) => {
  if (window.confirm(`Delete the item? : ${cellValues.row.id} `)) {
    console.log("lsoie");
    removeCompany(cellValues.row.id);
  }
  console.log(`Are you Sure you want to delete : ${cellValues.row.id}`);
};

const handleCellClick = (
  param: GridCellParams,
  event: MuiEvent<React.MouseEvent>
) => {
  event.stopPropagation();
};

const handleRowClick = (
  param: GridRowParams,
  event: MuiEvent<React.MouseEvent>
) => {
  event.stopPropagation();
};

export async function getStaticProps() {
  const companys = await getCompanys();

  return {
    props: {
      companys,
    },
  };
}

function EmployerPage(props: { companys: Company[] }) {
  return (
    <>
      <Link href="/employer/add" passHref>
        <Button variant="contained">Add Company</Button>
      </Link>
      <h1> List Employer</h1>;
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={props.companys}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          onCellClick={handleCellClick}
          onRowClick={handleRowClick}
        />
      </div>
    </>
  );
}

export default EmployerPage;
