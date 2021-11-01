import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { Alert, AlertTitle } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import { useRouter } from 'next/router'

import axios from "axios";
import Nextlink from 'next/link';

const theme = createTheme();

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SignUp() {
    const router = useRouter();
    const [alert, setAlert] = useState(false);
    const [open, setOpen] = useState(false);
    const [isCreateSuccess, setIsCreateSuccess] = useState("");

    const handleClose = () => {
        setOpen(false);
        if (isCreateSuccess.status == "success") {
            router.push("/");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const form = event.currentTarget;
        form.reportValidity() ?
            axios.post('http://localhost:3000/users/', {
                username: data.get("username"),
                email: data.get("email"),
                password: data.get("password")
            })
                .then(function (response) {
                    setAlert(false);
                    setOpen(true);
                    setIsCreateSuccess(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                })
            : setAlert(true);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        {alert === false ? "" : <Alert sx={{
                            marginBottom: 2
                        }}
                            severity="error">
                            <AlertTitle>Error</AlertTitle>
                            <strong>Missing some input field</strong>
                        </Alert>}

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoFocus
                                    required
                                    name="username"
                                    fullWidth
                                    label="Username"
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    name="email"
                                    fullWidth
                                    label="Email Address"
                                    type="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    name="password"
                                    fullWidth
                                    label="Password"
                                    type="password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Nextlink href="/containers/Login" as="/">
                                    <Link href="#" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Nextlink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {isCreateSuccess.text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Agree</Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>

    );
}