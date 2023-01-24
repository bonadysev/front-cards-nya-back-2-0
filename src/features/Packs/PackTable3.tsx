import * as React from 'react';
import {alpha} from '@mui/material/styles';
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
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import {visuallyHidden} from '@mui/utils';
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {getPacksTC, setCurrentPage, setPageCount} from "../../bll/packReducer";
import Button from "@mui/material/Button";
import RangeSlider from "./RangeSlider";
import StateTextFields from "./StateTextFields";
import BasicSelect from "./BasicSelect";


const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'cardsCount',
        numeric: true,
        disablePadding: false,
        label: 'Cards',
    },
    {
        id: 'created',
        numeric: true,
        disablePadding: false,
        label: 'Last updated',
    },
    {
        id: 'user_name',
        numeric: true,
        disablePadding: false,
        label: 'Created by',
    },
    {
        id: 'actions',
        numeric: true,
        disablePadding: false,
        label: 'Actions',
    }
];

function EnhancedTableHead(props: any) {
    const {onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} =
        props;
    const createSortHandler =
        (property: any) => (event: React.MouseEvent<unknown>) => {
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
                            onClick={createSortHandler(headCell.id)}
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


interface EnhancedTableToolbarProps {
    numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const {numSelected} = props;

    return (
        <>
            <Toolbar>
                <BasicSelect/>
                <StateTextFields/>
                <RangeSlider/>
                <Button variant="contained" sx={{flexGrow: 0, marginLeft: "auto"}}>Add new pack</Button>
            </Toolbar>
            <Toolbar
                sx={{
                    pl: {sm: 2},
                    pr: {xs: 1, sm: 1},
                    ...(numSelected > 0 && {
                        bgcolor: (theme) =>
                            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                    }),
                }}
            >
                {numSelected > 0 ? (
                    <Typography
                        sx={{flex: '1 1 100%'}}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography
                        sx={{flex: '1 1 100%'}}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Pack Page
                    </Typography>
                )}
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton>
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton>
                            <FilterListIcon/>
                        </IconButton>
                    </Tooltip>

                )}
            </Toolbar>
        </>
    );
}

export default function PackTable3() {
    const dispatch = useAppDispatch()
    const packs = useAppSelector(state => state.pack.cardPacks)
    const pageCount = useAppSelector(state => state.pack.pageCount)
    const page = useAppSelector(state => state.pack.page)
    const cardsPacksTotalCount = useAppSelector(state => state.pack.cardPacksTotalCount)
    const user_id = useAppSelector(state => state.auth.data._id)
    const owner = useAppSelector(state => state.pack.owner)

    // const [rowsPerPage, setRowsPerPage] = React.useState(3);
    // const [page, setPage] = React.useState(0);

    const [order, setOrder] = React.useState<any>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof any>('name');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [dense, setDense] = React.useState(false);


    React.useEffect(() => {
        let variable;
        if (owner === "my") {
             variable = user_id
        } else variable = ''

        dispatch(getPacksTC(pageCount, page, variable))
        // dispatch(getPacksTC())
    }, [pageCount, page, owner])

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof any,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.checked)
        if (event.target.checked) {
            const newSelected = packs.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
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

//Pagination
    const handleChangePage = (event: unknown, newPage: number) => {
        dispatch(setCurrentPage(newPage + 1))
        // setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setRowsPerPage(parseInt(event.target.value, 10));
        // console.log(event.target.value)
        // setPage(0);
        dispatch(setPageCount(parseInt(event.target.value)))
    };

    // const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setDense(event.target.checked);
    //     console.log('handleChangeDense' + event.target.checked)
    // };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * pageCount - packs.length) : 0;

    return (
        <Box sx={{width: '100%'}}>
            <Paper sx={{width: '100%', mb: 2}}>
                <EnhancedTableToolbar numSelected={selected.length}/>
                {/*<FormControlLabel*/}
                {/*    control={<Switch checked={dense} onChange={handleChangeDense}/>}*/}
                {/*    label="Dense padding"*/}
                {/*/>*/}
                <TablePagination
                    rowsPerPageOptions={[3, 5, 10, 25]}
                    component="div"
                    count={cardsPacksTotalCount}
                    rowsPerPage={pageCount}
                    page={page - 1}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <TableContainer>
                    <Table
                        sx={{minWidth: 750}}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={packs.length}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.sort(getComparator(order, orderBy)).slice() */}
                            {packs.map((row, index) => {
                                const isItemSelected = isSelected(row.name);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <>

                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.name)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
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
                                            <TableCell align="right">{row.cardsCount}</TableCell>
                                            <TableCell align="right">{row.created}</TableCell>
                                            <TableCell align="right">{row.user_name}</TableCell>
                                            <Button>Edit</Button>
                                        </TableRow>

                                    </>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}
