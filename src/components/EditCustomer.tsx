import { useState } from "react"
import type { NewCustomer } from "../types"
import { Button, Dialog, DialogTitle, DialogActions} from "@mui/material";
import CustomerForm from "./CustomerForm";
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';


type EditCustomerProps = {
    url: string,
    customer: NewCustomer,
    handleUpdate: (url: string, updateCustomer: NewCustomer) => void
}

export default function EditCustomer(props: EditCustomerProps) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState<NewCustomer>({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: ""
    })

    const handleClickOpen = () => {
        setCustomer({
            firstname: props.customer.firstname,
            lastname: props.customer.lastname,
            streetaddress: props.customer.streetaddress,
            postcode: props.customer.postcode,
            city: props.customer.city,
            email: props.customer.email,
            phone: props.customer.phone
        })
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        props.handleUpdate(props.url, customer);
        handleClose();
    };

    return (
        <>  
            <Grid onClick={handleClickOpen}><EditIcon /></Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Customer</DialogTitle>
                <CustomerForm customer={customer} setCustomer={setCustomer} />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}