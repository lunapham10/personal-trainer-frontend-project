import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { Customer, NewCustomer, NewTraining } from "../types";
import AddCustomer from "../components/AddCustomer"
import { Stack } from "@mui/material";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import { addCustomer, addTraining, deleteCustomer, fetchCustomer, updateCustomer } from "./api";

function CustomerList() {
    const [customers, setCustomers] = useState<Customer[]>([]);

    const columns: GridColDef[] = [
        { field: "firstname", headerName: "First Name", width: 100 },
        { field: "lastname", headerName: "Last Names", width: 100 },
        { field: "streetaddress", headerName: "Address", width: 150 },
        { field: "postcode", headerName: "Postcode", width: 100 },
        { field: "city", headerName: "City", width: 100 },
        { field: "email", headerName: "Email", width: 150 },
        { field: "phone", headerName: "Phone Number", width: 100 },
        {
            field: "addTraining",
            headerName: "",
            sortable: false,
            filterable: false,
            width: 150,
            renderCell: (params: GridRenderCellParams) =>
                <AddTraining customerUrl={params.row._links.self.href} handleAddTraining={handleAddTraining} />
        },
        {
            field: "_links.customer.href",
            headerName: "",
            sortable: false,
            filterable: false,
            width: 50,
            renderCell: (params: GridRenderCellParams) =>
                <EditCustomer url={params.id as string} customer={params.row} handleUpdate={handleUpdate} />
        },
        {
            field: "_links.self.href",
            headerName: "",
            sortable: false,
            filterable: false,
            width: 50,
            renderCell: (params: GridRenderCellParams) =>
                <Grid
                    onClick={() => handleDelete(params.id as string)}>
                    <DeleteIcon />
                </Grid>
        }

    ]

    const getCustomers = () => {
        fetchCustomer()
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.error(err))

    }

    const handleDelete = (url: string) => {
        if (window.confirm("Are you sure?")) {
            deleteCustomer(url)
                .then(() => getCustomers())
                .catch(err => console.error(err));
        }
    }

    const handleAdd = (customer: NewCustomer) => {
        addCustomer(customer)
            .then(() => getCustomers())
            .catch(err => console.error(err));
    }

    const handleUpdate = (url: string, customerData: NewCustomer) => {
        updateCustomer(url, customerData)
            .then(() => getCustomers())
            .catch(err => console.error(err))
    }

    const handleAddTraining = (training: NewTraining) => {
        addTraining(training)
            .catch(err => console.error(err));
    }


    useEffect(() => {
        getCustomers();
    }, []);


    return (
        <>
            <Stack direction="row" sx={{ mt: 2, mb: 2 }}>
                <AddCustomer handleAdd={handleAdd} />
            </Stack>
            <div style={{ width: "100%", height: 500 }}>
                <DataGrid
                    rows={customers}
                    columns={columns}
                    getRowId={row => row._links.self.href}
                    autoPageSize
                    rowSelection={false}
                    slotProps={{ toolbar: { csvOptions: { fields: ['firstname', 'lastname', 'streetaddress', 'postcode', 'city', 'email', 'phone'] } } }}
                    showToolbar
                />
            </div>
        </>
    );
}

export default CustomerList;