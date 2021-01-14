import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import './style.css';


class Reportmodule extends Component {
    render(){
        return (
            <React.Fragment>
                <div className="Rprts_srch_holder">
                <Container fluid>
                    <Row>
                        <Col md={4}>
                            <span className="">Select Date Between</span>
                        </Col>
                        <Col md={4}>
                            <DateRangePicker>
                                <input type="text" className="form-control" />
                            </DateRangePicker>
                        </Col>
                        <Col md={4}>
                            <span className="ad_more_seach">Add More Fields</span>
                        </Col>
                    </Row>
                </Container>
                </div>
            </React.Fragment>
        )
    }
}

export default Reportmodule;