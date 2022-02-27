import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridApi,
  GridCellValue,
  GridValueGetterParams,
  MuiEvent,
  GridCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import {
  getCompanyList,
  getJobLocations,
  getJobPost,
  getJobPosts,
  removeJobPost,
  signIn,
  supabase,
} from "../../utility/SupabaseClient";
import { JobPost } from "../../models/types";
import { useUser } from "../../context/user";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", type: "number", width: 20 },
  { field: "job_title", headerName: "Job Title", width: 150 },
  { field: "company_name", headerName: "Company", width: 110 },
  { field: "industry", headerName: "Industry", width: 170 },
  { field: "job_type", headerName: "Job Type", width: 90 },
  { field: "city", headerName: "City", width: 120 },
  { field: "state", headerName: "State", width: 90 },
  { field: "country", headerName: "Country", width: 90 },
  {
    field: "publication_date",
    headerName: "Publication",
    type: "date",
    width: 130,
  },
  { field: "deadline", headerName: "Deadline", type: "date", width: 130 },
  {
    field: "action",
    width: 250,
    headerName: "Action",
    type: "action",
    sortable: false,
    renderCell: (cellValues: GridValueGetterParams) => {
      return (
        <>
          <Link href={`/job-post/${cellValues.row.id}`} passHref>
            <Button variant="contained" color="success">
              view
            </Button>
          </Link>
          |
          <Link href={`/job-post/add/${cellValues.row.id}`} passHref>
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
  if (window.confirm("Delete the item?")) {
    removeJobPost(cellValues.row.id);
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
  const posts = await getJobPosts();
  return {
    props: {
      posts,
    },
  };
}

function JobPostPage({ posts }: { posts: JobPost[] })  {
// const auth  = useUser();
// console.log( auth!.user);
//console.log()
  return (
    <>
      <Link href="/job-post/add" passHref>
        <Button variant="contained">Add Job Post</Button>
      </Link>
      <h1> List job posts</h1>
      <div style={{ height: 550, width: "100%" }}>
        <DataGrid
          rows={posts}
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

export default JobPostPage;
