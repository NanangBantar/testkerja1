import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { Alert, AlertTitle } from '@mui/material';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import { useRouter } from 'next/router';

import Nextlink from 'next/link';

const theme = createTheme();

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Login() {
    const router = useRouter();
    const [alert, setAlert] = useState(false);
    const [open, setOpen] = useState(false);
    const [isCreateSuccess, setIsCreateSuccess] = useState("");

    const handleClose = () => {
        setOpen(false);
        if (isCreateSuccess.status == "success") {
            router.push({
                pathname: "/containers/Dashboard"
            }, "dashboard", { shallow: true });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const form = event.currentTarget;
        form.reportValidity() ? axios.post('http://localhost:3000/users/userlogin', {
            username: data.get("username"),
            password: data.get("password")
        })
            .then(function (response) {
                setIsCreateSuccess(response.data);
                setOpen(true);
                setAlert(false);
            })
            .catch(function (error) {
                console.log(error);
            }) :
            setAlert(true);
        ;
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        {!alert ? "" : <Alert
                            severity="error">
                            <AlertTitle>Error</AlertTitle>
                            <strong>Missing some input field</strong>
                        </Alert>}

                        <TextField
                            name="username"
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            type="text"
                            autoFocus
                        />
                        <TextField
                            name="password"
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Nextlink href="/containers/SignUp" as="/SignUp">
                                    <Link href="#" style={{ cursor: "pointer" }} variant="body2">
                                        {"Don't have an account? Sign Up"}
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