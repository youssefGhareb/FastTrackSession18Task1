import { Autocomplete, InputAdornment, Stack, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React from 'react'

const AppTableFilterGroup = (props) => {

    return (
        <Stack padding={2} direction='row' spacing={2} sx={{margin:"20px 0"}}>
            <TextField
                sx={{width:400}}
                id="input-with-icon-textfield"
                label="Search"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon/>
                        </InputAdornment>
                    ),
                }}
                value={props.searchValue}
                onChange={(event) => {
                    props.onSearchChange(event.target.value);
                }}
                variant="outlined"
            />
            <TextField
                sx={{width:150}}
                id="input-username"
                label="Username"
                variant="outlined"
                value={props.userNameValue}
                onChange={(event) => {
                    props.onUserNameChange(event.target.value);
                }}
            />
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={["Locked","Active", "Inactive"]}
                sx={{ width: 150 }}
                renderInput={(params) => <TextField {...params} label="Status" />}
                value={props.statusValue}
                inputValue={props.statusInputValue}
                onChange={(_,value)=>{props.onStatusChange(value)}}
                onInputChange={(_, value) => { props.onStatusInputChange(value)}}
            />
        </Stack>
    )
}

export default AppTableFilterGroup