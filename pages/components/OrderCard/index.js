import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import useSWR from "swr";
import fetch from "isomorphic-unfetch";

const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "24px"
}));

export default function OrderCard({ totalOrders, handleDeleteOrders, handlePurchaseOrders }) {
    const initialsOrders = totalOrders;
    return (
        <>
            <Div>{handlePurchaseOrders ? `Your Active Orders (${initialsOrders.length})` : `Your Success Orders (${initialsOrders.length})`}</Div>
            {
                initialsOrders.map((val, index) =>
                    <div key={index}>
                        <Card sx={{ margin: 1 }}>
                            <Typography sx={{ padding: 1, textAlign: "center" }} gutterBottom variant="h4" component="div">
                                {val.id}
                            </Typography>
                            <CardMedia
                                component="img"
                                height="140"
                                image={JSON.parse(val.cart)[0].strCategoryThumb}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Total Menu : {JSON.parse(val.cart).length}
                                </Typography>
                                {JSON.parse(val.cart).map((val, index) =>
                                    <Typography sx={{ display: "flex", alignItems: "center" }} key={index} gutterBottom component="div">
                                        <FoodBankIcon />{val.strCategory}
                                    </Typography>
                                )}
                                <Button sx={{ margin: 1 }} onClick={() => handleDeleteOrders(val.id)} variant="contained">Delete</Button>
                                {handlePurchaseOrders ?
                                    (<Button sx={{ margin: 1 }} onClick={() => handlePurchaseOrders(val.id)} variant="contained">Purchase</Button>)
                                    :
                                    ("")}

                            </CardContent>
                        </Card>
                    </div>
                )
            }
        </>
    );
}