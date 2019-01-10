import React, { Component } from 'react';
import Chart from 'chart.js'

class Plot extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {
        //this.renderPlot();
        this.renderPlot2();
    }

    renderPlot2(){
        var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var config = {
			type: 'line',
			data: {
				labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
				datasets: [{
					label: 'Max Fitness',
					backgroundColor: "#f50057",
					borderColor: "#f50057",
					data: [
						1,
						2,
						3,
						4,
						5,
						6,
						7
					],
					fill: false,
				}, {
					label: 'Mean Fitness',
					fill: false,
					backgroundColor: "#3f51b5",
					borderColor: "#3f51b5",
					data: [
						1,
						6,
						4,
						8,
						9,
						10,
						12
					],
				}]
			},
			options: {
				responsive: true,
				title: {
					display: false,
					text: 'Chart.js Line Chart'
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Month'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Value'
						}
					}]
				}
			}
		};

        
        var ctx = document.getElementById('myChart').getContext('2d');
		var myChart = new Chart(ctx, config);
    }

    renderPlot(){
        var ctx = document.getElementById("myChart");

        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["0", "1", "2", "3", "4", "5"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    }

    render(){
        const gridStyle = {
            margin: "0px"
        };
        return <canvas id="myChart" width="100%" height="100%"></canvas>
    }
}

export default Plot;