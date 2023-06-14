import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import AppModal from './appModal';
import AppTableFilterGroup from './AppTableFilterGroup';


const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'username',
        numeric: false,
        disablePadding: false,
        label: 'Username',
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'Email Address',
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'Status',
    },
    {
        id: 'Group',
        numeric: false,
        disablePadding: false,
        label: 'Group',
    },
    {
        id: 'CreatedOn',
        numeric: false,
        disablePadding: false,
        label: 'Created On',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Users
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable(props) {
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isModalEdit, setIsModalEdit] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState({});
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState("");
    const [userNameValue, setUserNameValue] = React.useState("");
    const [statusValue, setStatusValue] = React.useState("");
    const [statusInputValue, setStatusInputValue] = React.useState("");
    const [filteredRows, setFilteredRows] = React.useState([]);

    React.useEffect(() => {
        setRows(props.rows);

        if (props.isAddModalOpen) {
            setIsModalOpen(true);
            setIsModalEdit(false);
        }
    }, [props]);

    React.useEffect(()=>{
        setFilteredRows(getFilteredRows());
    }, [searchValue, userNameValue, statusValue, statusInputValue])


    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        debugger;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRowClick = (event, user) => {
        setSelectedUser(user);
        setIsModalEdit(true);
        setIsModalOpen(true);
    }

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;



    const isFiltersApplicableOnRow = (row) => {
        let result = false;
        if(userNameValue != ""){
            result = row.username.toLowerCase().includes(userNameValue.toLowerCase());
        } else if(searchValue != ""){
            result = row.name.toLowerCase().includes(searchValue.toLowerCase());
        } else if(statusValue){
            result = row.status == statusValue;
        }
        else{
            result = true;
        }

        return result;
    }

    const getFilteredRows = ()=>{
        const filteredRows = rows.filter((row)=>{
            return isFiltersApplicableOnRow(row); 
        });
        return filteredRows;
    }

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length} />
                    <TableContainer>
                        <AppTableFilterGroup
                            userNameValue={userNameValue}
                            searchValue={searchValue}
                            statusValue={statusValue}
                            statusInputValue={statusInputValue}
                            onUserNameChange={(value) => { setUserNameValue(value) }}
                            onSearchChange={(value) => { setSearchValue(value) }}
                            onStatusChange={(value) => { setStatusValue(value) }}
                            onStatusInputChange={(value) => { setStatusInputValue(value) }}
                        />
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                onSelectAllClick={handleSelectAllClick}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {filteredRows.map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    const rowStart = rowsPerPage * (page);
                                    const rowEnd = rowsPerPage * (page + 1);
                                    if (index >= rowStart && index < rowEnd) {
                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleRowClick(event, row)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.id}
                                                selected={isItemSelected}
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                        onClick={(event) => { handleClick(event, row.id) }}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="left">{row.username}</TableCell>
                                                <TableCell align="left">{row.email}</TableCell>
                                                <TableCell align="left">{row.status}</TableCell>
                                                <TableCell align="left">{row.group}</TableCell>
                                                <TableCell align="left">{row.createdOn}</TableCell>
                                            </TableRow>
                                        );
                                    } else {
                                        return "";
                                    }
                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredRows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
            <AppModal edit={isModalEdit} open={isModalOpen} user={selectedUser} handleClick={(user) => {
                let newRows;
                if (isModalEdit) {
                    newRows = rows.map((row) => {
                        if (user.id == row.id) {
                            return { ...user }
                        } else {
                            return row;
                        }
                    });
                } else {
                    newRows = [...rows, user];
                }
                setRows(newRows);
                setIsModalOpen(false);
                props.handleModalClose();
                props.setRows(newRows);
            }} handleClose={() => {
                if (isModalEdit) {
                    setIsModalOpen(false);
                } else {
                    props.handleModalClose();
                    setIsModalOpen(false);
                }
            }} />
        </>
    );
}