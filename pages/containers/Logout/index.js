import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useRouter } from 'next/router';

const CardContentComp = () => {
    const router = useRouter();
    const HandleLogout = () => {
        axios.get("http://localhost:3000/users/logout").then(function (response) {
            router.push("/");
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
            <CardContent>
                <Typography sx={{ fontSize: 24, fontWeight: "bold" }} gutterBottom>
                    Are you sure want to logout.?
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={HandleLogout} variant="contained">Logout</Button>
            </CardActions>
        </>
    )
};

export default function Logout() {
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <CardContentComp />
            </Card>
        </Box>
    );
}
