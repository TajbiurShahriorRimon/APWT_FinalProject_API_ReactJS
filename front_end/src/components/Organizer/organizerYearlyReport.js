import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import Navbar from "../Admin/Navbar";
import { withRouter } from "react-router";
import CanvasJSReact from '../react-canvasjs-chart-samples/src/assets/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class OrganizerYearlyReport extends Component {
    state = {
        result: [],
        loading: true,
    }

    async componentDidMount() {
        var id = this.props.match.params.id;
        //alert(id);
        const resp = await axios.get(`http://localhost:8000/api/organizerReport/yearly/${id}`);
        console.log(resp.data);

        if (resp.data.status === 200){
            this.setState({
                result: resp.data.result,
                loading: false,
            })
        }
    }

    render() {
        var barChart = {
            title: {
                text: "Yearly Commission Column Chart"
            },
            animationEnabled: true,
            theme: "light2",
            data: [{
                type: "column",
                dataPoints: this.state.result.map((item) => {
                    return {label: item.date, y: item.totalAmount}
                })
            }]
        }

        var pieChart = {
            title: {
                text: "Yearly Commission Pie Chart"
            },
            animationEnabled: true,
            theme: "light2",
            data: [{
                type: "pie",
                indexLabelFontSize: 18,
                radius: 180,
                startAngle: 240,
                legendMarkerColor: "grey",
                indexLabel: "{label} - {y}",
                yValueFormatString: "###0.0\"\"",
                dataPoints: this.state.result.map((item) => {
                    return {label: item.date, y: item.totalAmount}
                })
            }]
        }

        var resultTable = "";

        if(this.state.loading){
            resultTable = <tr><td>Loading...</td></tr>
        }
        else {
            resultTable = this.state.result.map((item) => {
                return(
                    <tr key={item.date}>
                        <td align="center">{item.date}</td>
                        <td align="center">{item.totalAmount}</td>
                    </tr>
                )
            })
        }

        return (
            <body>
            <div align="center">
                <Navbar/> <br/><br/> <br/> <br/>
            </div>
            <div className="container">
                <table className="table">
                    <thead>
                    <tr>
                        <td align="center"><strong>Year</strong></td>
                        <td align="center"><strong>Total Raised Amount</strong></td>
                    </tr>
                    </thead>
                    <tbody>
                    {resultTable}
                    </tbody>
                </table>
            </div>
            <div className="container">
                <CanvasJSChart options = {barChart}
                    /* onRef = {ref => this.chart = ref} */
                />
            </div> <br/> <hr/>
            <div className="container">
                <CanvasJSChart options = {pieChart}/>
            </div>
            </body>
        );
    }
}

export default withRouter(OrganizerYearlyReport);