import { useState, useEffect } from "react";
import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import type { Training } from "../types";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import { fetchTraining, deleteTraining} from "./api";

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
            valueGetter: (_, row) => {
                if (row.customer) {
                    return row.customer.firstname + " " + row.customer.lastname;
                }

                return '';
            }
        },
        {
            field: "id",
            headerName: "Actions",
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

    const getTrainings = () => {
        fetchTraining()
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
    }

    const handleDelete = (id: number | string) => {
        if (window.confirm("Are you sure?")) {
            deleteTraining(id)
                .then(() => getTrainings())
                .catch(err => console.error(err));
        }
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
                    getRowId={row => row.id}
                    autoPageSize
                    rowSelection={false}
                    slotProps={{ toolbar: { csvOptions: { fields: ['date', 'duration', 'activity', 'customer' ] } } }}
                    showToolbar
                />
            </div>
        </>
    )
}

export default TrainingList;


