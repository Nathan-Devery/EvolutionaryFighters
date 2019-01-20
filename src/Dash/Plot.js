import React, { Component } from 'react';
import Chart from 'chart.js'

class Plot extends Component{
    constructor(props){
		super(props);
		this.state = {
			mounted: false
		}
    }

    componentDidMount() {
		//generations
		//max gen values
		//mean gen values
		this.setState({
			mounted: true
		})
	}

	renderPlot(){
		console.log("REDENDER")
		let fitnessScores = this.props.fitnessScores,
			labels = this.getLabels(fitnessScores),
			maxGenValues = this.getMaxGenValues(fitnessScores);
        this.renderPlot(labels, maxGenValues);
	}

	getLabels(fitnessScores){
		let genLabels = [];
		for(let i = 0; i < fitnessScores.length; i++){
			genLabels[i] = i.toString();
		}
		return genLabels;
	}

	getMaxGenValues(fitnessScores){
		let maxGenValues = [];
		for(let i = 0; i < fitnessScores.length; i++){
			let max = 0;
			for(let j = 0; j < fitnessScores[i].length; j++){
				max = fitnessScores[i][j] > max ? fitnessScores[i][j] : max;
			}
			maxGenValues[i] = max;
		}
		return maxGenValues;
	}
	
	renderPlot(labels, maxGenValues){
		var config = {
			type: 'line',
			data: {
				labels: labels,
				datasets: [{
					label: 'Max Fitness',
					backgroundColor: "#f50057",
					borderColor: "#f50057",
					data: maxGenValues,
					fill: false,
				}, {
					label: 'Mean Fitness',
					fill: false,
					backgroundColor: "#3f51b5",
					borderColor: "#3f51b5",
					data: maxGenValues,
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
							labelString: 'Generation'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Fitness'
						}
					}]
				}
			}
		};

        
        var ctx = document.getElementById('myChart').getContext('2d');
		new Chart(ctx, config);
	}

	/*
    renderPlot(){
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
		new Chart(ctx, config);
	}
	*/

    render(){
		if(this.state.mounted){
			let fitnessScores = this.props.fitnessScores,
			labels = this.getLabels(fitnessScores),
			maxGenValues = this.getMaxGenValues(fitnessScores);
        	this.renderPlot(labels, maxGenValues);
		}
        return <canvas id="myChart" width="100%" height="100%"></canvas>
    }
}

export default Plot;