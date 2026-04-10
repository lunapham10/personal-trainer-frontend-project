import { useState, useEffect } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { Training } from "../types";
import dayjs from "dayjs";

function TrainingList() {
    const [trainings, setTrainings] = useState<Training[]>([]);

    const columns: GridColDef[] = [
        {
            field: "date",
            headerName: "Date",
            width: 300,
            valueFormatter: (value) => {
                return value ? dayjs(value as string).format('DD.MM.YYYY HH:mm') : '';
            }
        },
        { field: "duration", headerName: "Duration", width: 150 },
        { field: "activity", headerName: "Activity", width: 150 },
        {   
            field: "customer", 
            headerName: "Customer", 
            width: 300,
            valueGetter : (_, row) => {
                if (row.customer) {
                    return row.customer.firstname + " " + row.customer.lastname;
                }

                return '';
            }
        }
    ]

    const getTrainings = () => {
        fetch(import.meta.env.VITE_API_URL + "/gettrainings")
            .then(response => {
                if (!response.ok)
                    throw new Error("Error when fetching trainings");
                return response.json();
            })
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        getTrainings();
    }, [])

    return (
        <>
            <div style={{ width: "100%", height: 500 }}>
                <DataGrid
                    rows={trainings}
                    columns={columns}
                    //getRowId={row => row._links.training.href}
                    autoPageSize
                    rowSelection={false}
                    showToolbar
                />
            </div>
        </>
    )
}

export default TrainingList;