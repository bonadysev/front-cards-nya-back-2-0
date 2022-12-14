import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppDispatch, useAppSelector} from "../../bll/store";
import Button from "@mui/material/Button";



const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function PacksTable2() {
    const dispatch = useAppDispatch()
    const cardPacks = useAppSelector(state => state.pack.cardPacks)


    // React.useEffect(() => {
    //     dispatch(getPacksTC())
    // }, [])

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="right">Cards</StyledTableCell>
                            <StyledTableCell align="right">Last Updated</StyledTableCell>
                            <StyledTableCell align="right">Created by</StyledTableCell>
                            <StyledTableCell align="right">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cardPacks.map((cardPack) => (
                            <StyledTableRow key={cardPack.name}>
                                <StyledTableCell component="th" scope="row">
                                    {cardPack.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{cardPack.cardsCount}</StyledTableCell>
                                <StyledTableCell align="right">{cardPack.updated}</StyledTableCell>
                                <StyledTableCell align="right">{cardPack.user_name}</StyledTableCell>
                                <Button color="secondary">Add</Button>
                                <Button variant="contained" color="success">Update</Button>
                                <Button variant="outlined" color="error">Delete</Button>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    )
        ;
}


