import { Col, Row } from "reactstrap";
import ProjectTables from "./ui/ProjectTable";
const Starter = () => {
  return (
    <div>
      {/***Table ***/}
      <Row>
        <Col xxl="12">
          <ProjectTables />
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
