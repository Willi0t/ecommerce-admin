import React, { useEffect, useState } from "react";
import styles from "@/styles/orders.module.css";
import Layout from "@/components/layout";
import axios from "axios";
import Center from "@/components/Center";

function OrdersPage() {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        axios.get("/api/orders").then((response) => {
            setOrders(response.data);
        });
    }, []);

    console.log(orders);

    return (
        <Layout>
            <h1>Orders</h1>
            <table className="tableGlobal">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Payment status</th>
                        <th>Recipient</th>
                        <th>Products</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 &&
                        orders.map((order) => (
                            <tr key={order._id}>
                                <td>
                                    <Center>
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleString()}
                                    </Center>
                                </td>
                                <td>
                                    <Center>
                                        {order.paid ? (
                                            <p className={styles.paid}>Paid</p>
                                        ) : (
                                            <p className={styles.notPaid}>
                                                Not paid
                                            </p>
                                        )}
                                    </Center>
                                </td>
                                <td>
                                    <Center>
                                        {order.name} {order.email} <br />
                                        {order.city} {order.postCode}{" "}
                                        {order.country} <br />
                                    </Center>
                                    {order.streetAddress}
                                </td>
                                <td>
                                    <center>
                                        {order.line_items &&
                                            order.line_items.map((items) => (
                                                <>
                                                    {
                                                        items.price_data
                                                            ?.product_data.name
                                                    }
                                                    {items.quantity}
                                                    <br />

                                                    <br />
                                                </>
                                            ))}
                                    </center>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </Layout>
    );
}

export default OrdersPage;
