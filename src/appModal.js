import { Box, Button, ButtonGroup, Modal, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

const AppModal = (props) => {
    let defaultValues = {
        name: "",
        username: "",
        email: "",
        status: "",
        group: ""
    };
    const form = useForm(defaultValues);
    const { register, control, handleSubmit, formState, reset, setValue } = form;
    const { errors } = formState;
    const onSubmit = (data) => {
        if (props.edit) {
            props.handleClick({ ...props.user, name: data.name, username: data.username, group: data.group, email: data.email, status: data.status });
        } else {
            props.handleClick({ id: Math.floor(Math.random() * (1000 - 100 + 1) + 100), name: data.name, username: data.username, group: data.group, email: data.email, status: data.status, createdOn: new Date().toLocaleDateString() });
        }
        console.log(data);
    }
    useEffect(() => {
        if (props.edit) {
            setValue("username", props.user.username);
            setValue("name", props.user.name);
            setValue("status", props.user.status);
            setValue("email", props.user.email);
            setValue("group", props.user.group);
        } else {
            setValue("username", "");
            setValue("name", "");
            setValue("status", "");
            setValue("email", "");
            setValue("group", "");
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
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Box sx={{ background: "#efefef", padding: "30px 20px", borderBottom: "1px solid #00000029" }}>
                        <TextField
                            sx={{ width: "100%", marginTop: "0px", background: "#fff" }}
                            label={"Name"}
                            id="name"
                            inputProps={{ ...register("name", { required: "Name is required" }) }}
                            error={errors.name?.message}
                            helperText={errors.name?.message}
                        />
                        <TextField
                            sx={{ width: "100%", marginTop: "20px", background: "#fff" }}
                            id="demo-helper-text-aligned"
                            label="Username"
                            inputProps={{ ...register("username", { required: "Username is required" }) }}
                            error={errors.username?.message}
                            helperText={errors.username?.message}
                        />
                        <TextField
                            sx={{ width: "100%", marginTop: "20px", background: "#fff" }}
                            id="demo-helper-text-aligned"
                            label="Email"
                            error={errors.email?.message}
                            helperText={errors.email?.message}
                            inputProps={{
                                ...register("email", {
                                    pattern: {
                                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                        message: "Email format invalid"
                                    }, required: "Email is required"
                                })
                            }}
                        />
                        <TextField
                            sx={{ width: "100%", marginTop: "20px", background: "#fff" }}
                            id="demo-helper-text-aligned"
                            label="Status"
                            error={errors.status?.message}
                            helperText={errors.status?.message}
                            inputProps={{ ...register("status", { required: "Status is required" }) }}
                        />
                        <TextField
                            sx={{ width: "100%", marginTop: "20px", background: "#fff" }}
                            id="demo-helper-text-aligned"
                            label="Group"
                            inputProps={{ ...register("group", { required: "Group is required" }) }}
                            error={errors.group?.message}
                            helperText={errors.group?.message}
                        />
                    </Box>
                    <Box sx={{ background: "#efefef", display: "flex", justifyContent: "space-between", padding: "30px 20px" }}>
                        <Button variant='text' onClick={() => reset()}>Reset Fields</Button>
                        <ButtonGroup
                            disableElevation
                            variant="contained"
                            aria-label="Disabled elevation buttons"
                        >
                            <Button onClick={() => {
                                props.handleClose();
                                reset();
                            }}>Cancel</Button>
                            <Button type="submit">{props.edit ? "Edit User" : "Add User"}</Button>
                        </ButtonGroup>
                    </Box>
                </form>
                <DevTool control={control} />
            </Box>
        </Modal >
    )
}

export default AppModal;