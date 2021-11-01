import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider, alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import MainListItems from '../../components/listItems';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';

// component
import DashboardComp from "../../components/DashboardComp";
import Orders from "../Orders";
import Logout from '../Logout';
import SuccessFullOrders from "../SuccessFullOrders";


const drawerWidth = 240;

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

function DashboardContent() {
    const [isOpen, setIsOpen] = useState(false);
    const [open, setOpen] = useState(true);
    const [cart, setCart] = useState([]);
    const [sendAlert, setSendAlert] = useState();
    const [totalOrders, setTotalOrders] = useState(0);
    const [successOrders, setSuccessOrders] = useState(0);
    const [successOrdersData, setSuccessOrdersData] = useState();
    const [isEventTrigger, setIsEventTrigger] = useState(false);

    const [navigation, setNavigation] = useState("Dashboard");
    const [filteredMenu, serFilteredMenu] = useState("");
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const onClickNavigation = (e) => {
        setNavigation(e);
    };

    const HandleAddCart = (e) => {
        const found = cart.some(val => val.strCategory === e.strCategory);
        if (!found) setCart([...cart, e]);
    };

    const handleClickOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleRemoveItemCart = (e) => {
        setCart(cart.filter(val => val.strCategory !== e));
    }

    const handleSubmitOrders = () => {
        axios.post('http://localhost:3000/orders/sendcart', {
            cart: JSON.stringify(cart)
        })
            .then(function (response) {
                setSendAlert(response.data);
                setIsOpen(false);
                setCart([]);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const handleDeleteOrders = (e) => {
        axios.delete(`http://localhost:3000/orders/deleteorders/${e}`).then(function (response) {
            setIsEventTrigger(!isEventTrigger);
        }).catch(function (error) {
            console.log(error);
        });
    }

    const handlePurchaseOrders = (e) => {
        axios.put(`http://localhost:3000/orders/purchaseorders/${e}`).then(function (response) {
            setIsEventTrigger(!isEventTrigger);
        }).catch(function (error) {
            console.log(error);
        });
    }

    useEffect(async () => {
        const res = await axios('http://localhost:3000/orders/totalactiveorders');
        console.log(res.data);
        setTotalOrders(res.data.data);
        setSuccessOrders(res.data.successOrders);
        setSuccessOrdersData(res.data.successOrdersData);
    }, [
        cart, isEventTrigger
    ]);

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            {navigation}
                        </Typography>
                        {navigation == "Dashboard" ? (
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    onChange={(e) => serFilteredMenu(e.target.value)}
                                    placeholder="Search Menu"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                        ) : ""}
                        <IconButton color="inherit" onClick={cart.length !== 0 ? handleClickOpen : console.log("kosong")}>
                            <Badge badgeContent={cart.length} color="secondary">
                                <ShoppingBasketIcon />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List>
                        <MainListItems dataList={onClickNavigation} totalOrders={totalOrders} successOrders={successOrders} />
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                {navigation == "Dashboard" ? (
                                    <DashboardComp filtered={filteredMenu} HandleAddCart={HandleAddCart} sendAlert={sendAlert} />
                                ) : navigation == "Orders" ? (
                                    <Orders handleDeleteOrders={handleDeleteOrders} totalOrders={totalOrders} handlePurchaseOrders={handlePurchaseOrders} />
                                ) : navigation == "SuccessFullOrders" ? (
                                    <SuccessFullOrders handleDeleteOrders={handleDeleteOrders} totalOrders={successOrdersData} />
                                ) : (
                                    <Logout />
                                )
                                }
                            </Paper>
                        </Grid>
                    </Container>
                </Box>
            </Box>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    {cart.map((val, index) =>
                        <Typography style={{ fontWeight: "bold", color: "black" }} key={index}>{val.strCategory} Price : {val.idCategory + 10000}
                            <Button sx={{
                                margin: 2
                            }} variant="outlined" value={index} onClick={(e) => handleRemoveItemCart(val.strCategory)}><DeleteForeverIcon /></Button>
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={cart.length !== 0 ? handleSubmitOrders : handleClose}>Order</Button>
                    <Button variant="outlined" onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider >
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}