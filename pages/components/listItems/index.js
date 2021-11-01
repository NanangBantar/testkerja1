import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import Badge from '@mui/material/Badge';
import useSWR from "swr";
import fetch from "isomorphic-unfetch";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function MainListItems({ dataList, totalOrders, successOrders }) {
    const { data, error } = useSWR("http://localhost:3000/orders/totalactiveorders", fetcher);
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    const initialsOrders = data.totalOrders;
    const initialsuccessOrders = data.successOrders;

    return (
        <div>
            <ListItem button onClick={(e) => dataList("Dashboard")}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={(e) => dataList("Orders")}>
                <ListItemIcon>
                    <Badge badgeContent={totalOrders !== 0 ? totalOrders.length : initialsOrders} color="primary">
                        <ShoppingCartIcon />
                    </Badge>
                </ListItemIcon>
                <ListItemText primary="Orders" />
            </ListItem>
            <ListItem button onClick={(e) => dataList("SuccessFullOrders")}>
                <ListItemIcon>
                    <Badge color="primary" badgeContent={initialsuccessOrders !== 0 ? initialsuccessOrders : successOrders}>
                        <ReceiptLongIcon />
                    </Badge>
                </ListItemIcon>
                <ListItemText primary="Success Oders" />
            </ListItem>
            <ListItem button onClick={(e) => dataList("Logout")}>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItem>
        </div >
    );
};