import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import { layouts } from "chart.js";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";
function Barcharts() {
  const [employee_name, setemployee_name] = useState("");
  const [year, setyear] = useState("");
  const [url, seturl] = useState(
    "http://localhost:8000/employerevenue?year=2021"
  );
  const [employedata, setemployedata] = useState([]);
  const [getdata, setdata] = useState([]);
  // const d = useDumpdata(url);
  useEffect(() => {
    fetchalldata(url);
  }, []);
  const fetchalldata = (url) => {
    fetch(url).then(async (response) => {
      const data = await response.json();
      console.log("r" + url);
      // check for error response
      if (!response.ok) {
        // get error message from body or default to response statusText
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }

      setemployedata(data);
    }, []);
  };
  const formsubmit = (e) => {
    e.preventDefault();
    const url =
      "http://localhost:8000/employerevenue?empid=" +
      employee_name +
      "&year=" +
      year;

    fetchalldata(url);
  };
  const handleemployee_name = (e) => {
    setemployee_name(e.target.value);
  };
  const handleemployee_year = (e) => {
    setyear(e.target.value);
  };

  const Months = ["January", "February", "March", "April", "May"];

  const datasetvals = [];

  const filterdata = () => {
    employedata.map((list, index) => (
      <>
        {datasetvals.push({
          label: list.Name,
          borderWidth: 2,
          lineTension: 0,
          fill: false,
          pointBorderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: "rgba(75, 192, 192, 1)",
          borderColor: " rgba(0, 0, 0, 1)",
          data: list.MonthlyRevnue,
        })}
      </>
    ));
    return datasetvals;
  };

  const state = {
    labels: Months,
    datasets: filterdata(),
  };

  return (
    <div>
      {/* <Userform onSubmit={formsubmit} /> */}
      <Form onSubmit={formsubmit}>
        <FormGroup row>
          <Label for="exampleSelect" md={2}>
            Employee Name
          </Label>
          <Col md={4}>
            <Input
              type="select"
              name="select"
              id="exampleSelect"
              onChange={handleemployee_name}
            >
              <option>Select </option>

              <option value="1">Jagadish</option>
              <option value="2">Sunny</option>
              <option value="4">Krithika</option>
              <option value="5">Tanya</option>
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleSelect" md={2}>
            Year
          </Label>
          <Col sm={4}>
            <Input
              type="select"
              name="select"
              id="exampleSelect"
              onChange={handleemployee_year}
            >
              <option>Select </option>
              <option value="2021">2021 </option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
              <option value="2016">2016</option>
            </Input>
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
      <Bar
        data={state}
        options={{
          title: {
            display: true,
            text: "Average Rainfall per month",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
}

export default Barcharts;
