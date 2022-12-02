import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {GetPacksTC} from "../../bll/packReducer";


export default function PacksTable() {
    const dispatch = useAppDispatch()
    const cardPacks = useAppSelector(state => state.pack.cardPacks)

    React.useEffect(() => {
        dispatch(GetPacksTC())
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Cards</TableCell>
                        <TableCell align="right">Last Updated</TableCell>
                        <TableCell align="right">Created by</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cardPacks.map((cardPack) => (
                        <TableRow
                            key={cardPack.name}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {cardPack.name}
                            </TableCell>
                            <TableCell align="right">{cardPack.cardsCount}</TableCell>
                            <TableCell align="right">{cardPack.updated}</TableCell>
                            <TableCell align="right">{cardPack.user_name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
