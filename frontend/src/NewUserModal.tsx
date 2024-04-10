import React, { useState } from "react";
import {Box,Modal, Fade, Typography, Backdrop, TextField, Button} from '@mui/material';

interface ModalProps {
    /** Modal Title */
    title: string;

    /** New user get state */
    newUserEmailAddress: string;

    /** New user set state */
    setNewUserEmailAddress: React.Dispatch<React.SetStateAction<any>>;

    /** openModal boolean */
    openModal: boolean;

    /** close modal function */
    handleClose: () => void;
}
  
function NewUserRegisterModal({ title,  newUserEmailAddress, setNewUserEmailAddress, openModal, handleClose}: ModalProps) {
    // error message state if user can't register
    const [errorMsg, setErrorMsg] = useState('');

    // user email address input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewUserEmailAddress(e.target.value);
    }

    // call mongodb api to register new user
    const handleRegister = async () => {
        try {
            const res = await fetch('/api/allowedUsers');
            const allowedUsers = await res.json();
            if (!res.ok) {
                setErrorMsg("Couldn't fetch allowed users!")
            } else { 
                // if user is found then error - can't register same users
                if(allowedUsers?.find((allowedUser: any) => allowedUser.emailAddress === newUserEmailAddress)) {
                    setErrorMsg("User already exists!")
                } else {
                    // if user is not found in database
                    await fetch(`/api/newUser`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        newUserEmail: newUserEmailAddress,
                      }),
                    });
                    setErrorMsg("");
                    handleClose();
                }
            }
          } catch (err: any) {
            setErrorMsg("Failed to register. Please try again.");
        }
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        height: 250,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openModal}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={openModal}>
            <Box sx={style}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                    {title}
                </Typography>
                <br/>
                    <TextField
                        sx={{width: '300px', marginBottom: '20px'}}
                        error={newUserEmailAddress?.length === 0}
                        id="outlined-error"
                        label="Email Address"
                        value={newUserEmailAddress}
                        onChange={handleChange}
                        helperText={newUserEmailAddress?.length === 0 && "Please enter email address to register"}
                    />
                <br/>
                <Button
                    type="button"
                    className="register-button"
                    onClick={handleRegister}
                    variant="contained"
                    sx={{backgroundColor: 'darksalmon'}}
                    disabled={newUserEmailAddress?.length === 0}
                >
                    Register
                </Button>
                <br/>
                <h4 style={{color: 'red', paddingTop: '10px', fontFamily:'monospace'}}>{errorMsg}</h4>
            </Box>
            </Fade>
        </Modal>
    );
}

export default NewUserRegisterModal;