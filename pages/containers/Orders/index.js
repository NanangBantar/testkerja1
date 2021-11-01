import OrderCard from "../../components/OrderCard";

export default function Orders({ totalOrders, handleDeleteOrders, handlePurchaseOrders }) {
    return (
        <>
            <OrderCard handleDeleteOrders={handleDeleteOrders} totalOrders={totalOrders} handlePurchaseOrders={handlePurchaseOrders}/>
        </>
    );
}

