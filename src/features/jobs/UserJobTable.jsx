import React, { useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { filter } from 'lodash';
import {
    Table,
    Tooltip,
    TableRow,
    TableBody,
    TableCell,
    Typography,
    TableContainer,
    TablePagination,
    IconButton,
} from '@mui/material';

import { Iconify, Label } from '../../components';
import { fDate } from '../../utils/formatTime';
import { SimpleTableListHead } from '../../components/tables';

const TABLE_HEAD = [
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'price', label: 'Price', alignRight: false },
    { id: 'apply', label: 'Apply', alignRight: false },
    { id: 'createdAt', label: 'Post Date', alignRight: false },
    { id: '', label: '', alignRight: false }
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

const UserJobTable = ({ jobs, applies }) => {
    const navigate = useNavigate();

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [orderBy, setOrderBy] = useState('name');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [filterName, setFilterName] = useState('');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredJobs = applySortFilter(jobs, getComparator(order, orderBy), filterName);
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - jobs.length) : 0;

    return (
        <>
            <TableContainer sx={{ minWidth: 500 }}>
                <Table>
                    <SimpleTableListHead
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                    {filteredJobs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        const { _id, name, price, createdAt } = row;

                        return (
                        <TableRow
                            hover
                            key={_id}
                            tabIndex={-1}
                        >
                            <TableCell align="left" width={400}>
                                {name.length > 100 ? (
                                    <Tooltip title={name}>
                                        <Typography variant='body2'>
                                            {`${name.slice(0, 100)}...`}
                                        </Typography>
                                    </Tooltip>
                                    ) : (
                                        <Typography
                                            component={RouterLink}
                                            to={`/job-detail/${_id}`}
                                            variant='body2'
                                            color='text.primary'
                                            sx={{
                                                textDecoration: 'none',
                                                '&:hover': {
                                                    textDecoration: 'underline'
                                                }
                                            }}
                                        >
                                            {name}
                                        </Typography>
                                    )      
                                }
                            </TableCell>
                            <TableCell width={120} align="left">{`$${price}`}</TableCell>
                            <TableCell width={100} align="left">
                                <Label variant='ghost' color='success'>
                                    {applies?.[_id] ? applies[_id] : '0'}
                                </Label>
                            </TableCell>
                            <TableCell align="left">
                                {fDate(createdAt)}
                            </TableCell>
                            <TableCell align="right">
                                <Tooltip title='Details'>
                                    <IconButton
                                        onClick={() => (
                                            navigate(`/job-detail/${_id}`)
                                        )}
                                    >
                                        <Iconify icon='gg:details-more' width={24} height={24} />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                        );
                    })}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={jobs.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
    
};

export default UserJobTable;