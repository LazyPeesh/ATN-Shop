import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const DateSort = ({ pages, page, orderDate = "" }) => {
  return (
    <Pagination>
      {[...Array(pages).keys()].map((i) => (
        <LinkContainer
          key={i + 1}
          to={orderDate ? `/orderDate/${orderDate}` : ``}
        >
          <Pagination.Item active={i + 1 === page}>{i + 1}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  );
};

export default DateSort;
