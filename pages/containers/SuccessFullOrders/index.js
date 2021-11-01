import OrderCard from "../../components/OrderCard";

export default function SuccessFullOrders({ handleDeleteOrders, totalOrders }) {
    return (
        <>
            <OrderCard handleDeleteOrders={handleDeleteOrders} totalOrders={totalOrders} />
        </>
    );
}

