import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Badge, Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import Paginate from "../Paginate";
import DateSort from "../DateSort";

const OrderListScreen = () => {
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
          <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
              <NavDropdown title="Order Date" id="basic-nav-dropdown">
                {orders.map((order) => (
                  <LinkContainer
                    to={`/admin/orderlist/orderDate/${order.createdAt.substring(
                      0,
                      10
                    )}`}
                  >
                    <NavDropdown.Item>
                      {order.createdAt.substring(0, 10)}
                    </NavDropdown.Item>
                  </LinkContainer>
                ))}
              </NavDropdown>
            </Container>
          </Navbar>

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
                // orderDate == order.createdAt.substring(0, 10) &&
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
              ))}
            </tbody>
          </Table>

          <DateSort
            pages={orders.pages}
            page={orders.page}
            orderDate={orderDate ? orderDate : ""}
          />
        </>
      )}
    </>
  );
};

export default OrderListScreen;
