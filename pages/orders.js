import React, { useEffect, useState } from "react";
import styles from "@/styles/orders.module.css";
import Layout from "@/components/layout";
import axios from "axios";

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
                        <th>Created AT</th>
                        <th>Recipient</th>
                        <th>Products</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 &&
                        orders.map((order) => (
                            <tr>
                                <td>{order.createdAt}</td>
                                <td>
                                    {order.name} {order.email} <br />
                                    {order.city} {order.postCode}{" "}
                                    {order.country} <br />
                                    {order.streetAddress}
                                </td>
                                <td>
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
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </Layout>
    );
}

export default OrdersPage;
