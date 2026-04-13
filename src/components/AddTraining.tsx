import { useState } from "react";
import type { NewTraining } from "../types";
import { Dialog, DialogActions, DialogTitle,Button } from "@mui/material";
import TrainingForm from "./TrainingForm";

type AddTrainingProps = {
    customerUrl: string;
    handleAddTraining: (training: NewTraining) => void;
}

export default function AddTraining(props: AddTrainingProps){
    const[open, setOpen] = useState(false);
    const[training, setTraining] = useState<NewTraining>({
        date: "",
        duration: "",
        activity: "",
        customer: props.customerUrl
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const handleSubmit = () => {
        props.handleAddTraining(training);
        setTraining({
            date: "",
            duration: "",
            activity: "",
            customer: props.customerUrl
        })
        handleClose();
    };

    return(
        <>
        <Button onClick={handleClickOpen}>Add Training</Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Training</DialogTitle>
            <TrainingForm training={training} setTraining={setTraining}/>
            <DialogActions>
                <Button onClick = {handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
        </>
    );
}