import DialogContent from "@mui/material/DialogContent"
import TextField from "@mui/material/TextField"
import type { NewTraining } from "../types"
import dayjs from "dayjs"

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from "@mui/x-date-pickers";

type TrainingFormType = {
    training: NewTraining;
    setTraining: React.Dispatch<React.SetStateAction<NewTraining>>;
}

export default function TrainingForm(props: TrainingFormType) {
    return (
        <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    format="DD.MM.YYYY HH:mm"
                    label="Date & Time"
                    value={props.training.date? dayjs(props.training.date) : null}
                    onChange={(newValue) => {
                        if (newValue) {
                            props.setTraining({ ...props.training, date: newValue.toISOString() });
                        }
                    }}
                />
            </LocalizationProvider>
            <TextField
                required
                margin="dense"
                label="Duration"
                value={props.training.duration}
                onChange={e => props.setTraining({ ...props.training, duration: e.target.value })}
                fullWidth
                variant="standard"
            />
            <TextField
                required
                margin="dense"
                label="Activity"
                value={props.training.activity}
                onChange={e => props.setTraining({ ...props.training, activity: e.target.value })}
                fullWidth
                variant="standard"
            />
        </DialogContent>
    )
}