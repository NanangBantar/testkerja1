import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import useSWR from "swr";
import fetch from "isomorphic-unfetch";
import RecipeReviewCard from "../Card";
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "24px"
}));

const fetcher = (url) => fetch(url).then((r) => r.json());

function DashboardComp({ filtered, HandleAddCart, sendAlert }) {
    const [open, setOpen] = useState(true);
    const { data, error } = useSWR('https://www.themealdb.com/api/json/v1/1/categories.php', fetcher);
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    const menu = data?.categories.filter(val => val.strCategory.toLowerCase().includes(filtered.toLowerCase()));

    return (
        <>
            <Grid item xs={12} md={12}>
                <Div>{"Our Menu"} {`( ${menu.length} )`}</Div>
                <Collapse in={open}>
                    {!sendAlert ? "" :
                        sendAlert.status == "success" ?
                            (
                                <Alert
                                    severity="success"
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setOpen(false);
                                            }}
                                        >
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                    sx={{ mb: 2 }}
                                >
                                    {sendAlert.text}
                                </Alert>
                            ) :
                            (
                                <Alert
                                    severity="error"
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setOpen(false);
                                            }}
                                        >
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                    sx={{ mb: 2 }}
                                >
                                    {sendAlert.text}
                                </Alert>
                            )
                    }
                </Collapse>
                <RecipeReviewCard data={menu} HandleAddCart={HandleAddCart} />
            </Grid>
        </>
    );
}
export default DashboardComp;