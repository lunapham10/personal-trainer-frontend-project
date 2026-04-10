import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { DataGrid} from "@mui/x-data-grid";
import type { Customer, NewCustomer } from "../types";
import AddCustomer from "../components/AddCustomer"
import { Button, Stack } from "@mui/material";
import EditCustomer from "./EditCustomer";

function CustomerList() {
    const [customers, setCustomers] = useState<Customer[]>([]);

    const columns: GridColDef[] = [
        { field: "firstname", headerName: "First Name", width: 100 },
        { field: "lastname", headerName: "Last Names", width: 100 },
        { field: "streetaddress", headerName: "Address", width: 170 },
        { field: "postcode", headerName: "Postcode", width: 100 },
        { field: "city", headerName: "City", width: 100 },
        { field: "email", headerName: "Email", width: 200 },
        { field: "phone", headerName: "Phone Number", width: 100 },
        {
            field: "_links.customer.href",
            headerName: "",
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams) =>
                <EditCustomer url={params.id as string} customer={params.row} handleUpdate={handleUpdate} />
        },
        {
            field: "_links.self.href",
            headerName: "",
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams) =>
                <Button
                    color="error"
                    size="small"
                    onClick={() => handleDelete(params.id as string)}>
                    Delete
                </Button>
        }

    ]

    const getCustomers = () => {
        fetch(import.meta.env.VITE_API_URL + "/customers")
            .then(response => {
                if (!response.ok)
                    throw new Error("Error when fetching customers")
                return response.json()
            })
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.error(err))

    }

    const handleDelete = (url: string) => {
        if (window.confirm("Are you sure?")) {
            fetch(url, {
                method: "DELETE"
            })
                .then(response => {
                    if (!response.ok)
                        throw new Error("Error when deleting a customer");

                    return response.json();
                })
                .then(() => getCustomers())
                .catch(err => console.error(err));
        }
    }

    const handleAdd = (customer: NewCustomer) => {
        fetch(import.meta.env.VITE_API_URL + "/customers", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (!response.ok)
                    throw new Error("Error when adding a customer");
                return response.json();
            })
            .then(() => getCustomers())
            .catch(err => console.error(err));
    }

    const handleUpdate = (url: string, updateCustomer: NewCustomer) => {
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(updateCustomer)
        })
            .then(response => {
                if (!response.ok)
                    throw new Error("Error when updating a customer")
                return response.json();
            })
            .then(() => getCustomers())
            .catch(err => console.error(err))
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
                    showToolbar
                />
            </div>
        </>
    );
}

export default CustomerList;