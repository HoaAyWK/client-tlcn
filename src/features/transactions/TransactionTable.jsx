import React, { useState } from 'react';
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
    Avatar,
} from '@mui/material';

import { Iconify, Label, Loading } from '../../components';
import { fDate } from '../../utils/formatTime';
import { SimpleTableListHead } from '../../components/tables';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import { ACTION_STATUS } from '../../constants';

const TABLE_HEAD = [
    { id: 'package', label: 'Package', alignRight: false },
    { id: 'price', label: 'Price', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: 'createdAt', label: 'Commented At', alignRight: false },
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

const TransactionTable = ({ transactions }) => {

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [orderBy, setOrderBy] = useState('createdAt');

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

    const filterdTransactions = applySortFilter(transactions, getComparator(order, orderBy), filterName);
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - transactions.length) : 0;

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
                    {filterdTransactions?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row) => {
                        const { _id, package: pkg, createdAt } = row;

                        return (
                        <TableRow
                            hover
                            key={_id}
                            tabIndex={-1}
                        >
                            <TableCell align="left" width={300}>
                                {pkg?.description}
                            </TableCell>
                            <TableCell width={100} align="left">
                                {`$${pkg?.price}`}
                            </TableCell>
                            <TableCell width={100} align="left">
                                <Label
                                    variant='ghost'
                                    color='success'
                                >
                                    Succeeded
                                </Label>
                            </TableCell>
                            <TableCell width={200} align="left">
                                {fDate(createdAt)}
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
                count={transactions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
    
};

export default TransactionTable;
