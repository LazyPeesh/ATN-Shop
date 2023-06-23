import { LinkContainer } from "react-router-bootstrap";
import { ListGroup, Form, Row, Col, Table, Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Navbar, Container, NavDropdown } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";

const OrderListScreen = () => {
  const [date, setDate] = useState("");

  const { orderDate } = useParams();

  const {
    data: orders,
    isLoading,
    error,
  } = useGetOrdersQuery({
    orderDate,
  });

  return (
    <>
      <h1>Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Form.Group controlId="date" className="my-2">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter price"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <>
                  {date ? (
                    date === order.createdAt.substring(0, 10) && (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.user && order.user.name}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>{order.totalPrice}</td>
                        <td>
                          {order.isPaid ? (
                            order.paidAt.substring(0, 10)
                          ) : (
                            <FaTimes style={{ color: "red" }} />
                          )}
                        </td>
                        <td>
                          {order.isDelivered ? (
                            order.deliveredAt.substring(0, 10)
                          ) : (
                            <FaTimes style={{ color: "red" }} />
                          )}
                        </td>

                        <td>
                          <LinkContainer to={`/order/${order._id}`}>
                            <Button variant="light" className="btn-sm">
                              Details
                            </Button>
                          </LinkContainer>
                        </td>
                      </tr>
                    )
                  ) : (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.user && order.user.name}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <FaTimes style={{ color: "red" }} />
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <FaTimes style={{ color: "red" }} />
                        )}
                      </td>

                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button variant="light" className="btn-sm">
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default OrderListScreen;
