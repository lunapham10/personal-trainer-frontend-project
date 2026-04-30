import { useState } from "react";
import type { NewCustomer} from "../types";
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

type AddCustomerProps = {
    handleAdd: (customer: NewCustomer) => void;
}

export default function AddCustomer(props: AddCustomerProps) {

    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState<NewCustomer>({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: ""
    });

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        props.handleAdd(customer);
        setCustomer({
            firstname: "",
            lastname: "",
            streetaddress: "",
            postcode: "",
            city: "",
            email: "",
            phone: ""
        })
        handleClose();
    };

    return (<>
        <Button variant="outlined" onClick={handleClickOpen}>
            Add Customer
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New Customer</DialogTitle>
            <DialogContent>
                <TextField
                    required
                    margin="dense"
                    label="First Name"
                    value={customer.firstname}
                    onChange={e => setCustomer({ ...customer, firstname: e.target.value })}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    margin="dense"
                    label="Last Name"
                    value={customer.lastname}
                    onChange={e => setCustomer({ ...customer, lastname: e.target.value })}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    margin="dense"
                    label="Street Address"
                    value={customer.streetaddress}
                    onChange={e => setCustomer({ ...customer, streetaddress: e.target.value })}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    margin="dense"
                    label="Postcode"
                    value={customer.postcode}
                    onChange={e => setCustomer({ ...customer, postcode: e.target.value })}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    margin="dense"
                    label="City"
                    value={customer.city}
                    onChange={e => setCustomer({ ...customer, city: e.target.value })}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    margin="dense"
                    label="Email"
                    value={customer.email}
                    onChange={e => setCustomer({ ...customer, email:e.target.value })}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    margin="dense"
                    label="Phone"
                    value={customer.phone}
                    onChange={e => setCustomer({ ...customer, phone:e.target.value })}
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    </>
    );

}

