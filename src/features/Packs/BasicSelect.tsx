import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {setOwnerAC} from "../../bll/packReducer";

export default function BasicSelect() {
    const dispatch = useAppDispatch()
    const owner = useAppSelector(state => state.pack.owner)
    const handleChange = (event: SelectChangeEvent) => {
        dispatch(setOwnerAC(event.target.value as 'all' | 'my'))
        // setOwner(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Cards</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={owner}
                    label="Cards"
                    onChange={handleChange}
                >
                    <MenuItem value={"all"}>All Cards</MenuItem>
                    <MenuItem value={"my"}>My Cards</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
