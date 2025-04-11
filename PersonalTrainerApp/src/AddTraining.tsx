import { ChangeEvent, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { TTraining } from './TrainingList';

type TAddTrainingProps = {
    addTraining: (training: TTraining) => void;
}

export default function AddTraining({ addTraining }: TAddTrainingProps) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: "",
        duration: 0,
        activity: "",
        customer: "",
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTraining({ ...training, [event.target.name]: event.target.value })
    }

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add training
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            addTraining({
                                ...training
                            })
                            handleClose();
                        },
                    },
                }}
            >
                <DialogTitle>Add Training</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="date"
                        name="date"
                        label="Date"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={training.date}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="duration"
                        name="duration"
                        label="Duration"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={training.duration}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="activity"
                        name="activity"
                        label="activity"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={training.activity}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="customer"
                        name="customer"
                        label="Customer"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={training.customer}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Add</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}