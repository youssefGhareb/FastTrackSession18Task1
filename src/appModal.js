import { Box, Button, ButtonGroup, Modal, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'

const AppModal = (props) => {
    const [nameFieldValue, setNameFieldValue] = useState("");
    const [UserNameFieldValue, setUserNameFieldValue] = useState("");
    const [emailFieldValue, setEmailFieldValue] = useState("");
    const [statusFieldValue, setStatusFieldValue] = useState("");
    const [groupFieldValue, setGroupFieldValue] = useState("");
    useEffect(() => {
        if (props.edit) {
            setNameFieldValue(props.user.name);
            setUserNameFieldValue(props.user.username);
            setEmailFieldValue(props.user.email);
            setStatusFieldValue(props.user.status);
            setGroupFieldValue(props.user.group);
        } else {
            setNameFieldValue("");
            setUserNameFieldValue("");
            setEmailFieldValue("");
            setStatusFieldValue("");
            setGroupFieldValue("");
        }
    }, [props.open]);
    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ background: "#fff", width: "800px", margin: "300px auto 0 auto", borderRadius: "20px", padding: "0px 0px" }}>
                <Box sx={{ background: "navy", borderTopLeftRadius: "20px", borderTopRightRadius: "20px", padding: "20px 30px" }}>
                    <Typography sx={{ color: "#fff" }} id="modal-modal-title" variant="h6" component="h2" >{props.edit ? "Edit User" : "Add user"}</Typography>
                </Box>
                <Box sx={{ background: "#efefef", padding: "30px 20px", borderBottom: "1px solid #00000029" }}>
                    <TextField
                        sx={{ width: "100%", marginTop: "0px", background: "#fff" }}
                        id="demo-helper-text-aligned"
                        label="Name"
                        value={nameFieldValue}
                        onChange={(event) => {
                            setNameFieldValue(event.target.value);
                        }}
                    />
                    <TextField
                        sx={{ width: "100%", marginTop: "20px", background: "#fff" }}
                        id="demo-helper-text-aligned"
                        label="Username"
                        value={UserNameFieldValue}
                        onChange={(event) => {
                            setUserNameFieldValue(event.target.value);
                        }}
                    />
                    <TextField
                        sx={{ width: "100%", marginTop: "20px", background: "#fff" }}
                        id="demo-helper-text-aligned"
                        label="Email"
                        value={emailFieldValue}
                        onChange={(event) => {
                            setEmailFieldValue(event.target.value);
                        }}
                    />
                    <TextField
                        sx={{ width: "100%", marginTop: "20px", background: "#fff" }}
                        id="demo-helper-text-aligned"
                        label="Status"
                        value={statusFieldValue}
                        onChange={(event) => {
                            setStatusFieldValue(event.target.value);
                        }}
                    />
                    <TextField
                        sx={{ width: "100%", marginTop: "20px", background: "#fff" }}
                        id="demo-helper-text-aligned"
                        label="Group"
                        value={groupFieldValue}
                        onChange={(event) => {
                            setGroupFieldValue(event.target.value);
                        }}
                    />
                </Box>
                <Box sx={{ background: "#efefef", display: "flex", justifyContent: "space-between", padding: "30px 20px" }}>
                    <Button variant="text" onClick={() => {
                        setNameFieldValue("");
                        setUserNameFieldValue("");
                        setEmailFieldValue("");
                        setGroupFieldValue("");
                        setStatusFieldValue("");
                    }}>Reset Fields</Button>
                    <ButtonGroup
                        disableElevation
                        variant="contained"
                        aria-label="Disabled elevation buttons"
                    >
                        <Button onClick={props.handleClose}>Cancel</Button>
                        <Button onClick={() => {
                            if (props.edit) {
                                props.handleClick({ ...props.user, name: nameFieldValue, username: UserNameFieldValue, group: groupFieldValue, email: emailFieldValue, status: statusFieldValue });
                            } else {
                                props.handleClick({ id: Math.floor(Math.random() * (1000 - 100 + 1) + 100), name: nameFieldValue, username: UserNameFieldValue, group: groupFieldValue, email: emailFieldValue, status: statusFieldValue, createdOn: new Date().toLocaleDateString() });
                            }
                        }}>
                            {props.edit ? "Edit User" : "Add User"}
                        </Button>
                    </ButtonGroup>
                </Box>
            </Box>
        </Modal>
    )
}

export default AppModal;