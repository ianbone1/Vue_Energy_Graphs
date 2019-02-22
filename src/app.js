import Vue from 'vue';
import { GChart } from 'vue-google-charts';

document.addEventListener("DOMContentLoaded", () => {
	new Vue({
		el: "#app",
		components: {
			"gchart": GChart
		},
		data: {
			dataFetched: false,
			generation: [],
			generationMix: [],
			chartData: [],
			selectedChartType: 'PieChart',
			chartTypes : ["ColumnChart", "PieChart", "BarChart", "LineChart", "AreaChart", "ScatterChart"],
			chartOptions: {
				title: 'UK Energy Generation Sources',
				width: 1000,
				height: 400,
				is3D: true
			},
			selectedFromDate: null,
			selectedToDate: null,
			oneDayAgo: '',
			twoDaysAgo: '',
			dateFrom: '',
			dateTo: ''
		},
		methods: {
			averageData: function(){
				const periods = this.generation.data;
				let data = [];
				const numPeriods=periods.length;
				for (let period of periods) {
					let currentPeriod = period.generationmix
					for (let fuel of currentPeriod){
						if (data[fuel.fuel]) {
							data[fuel.fuel] += fuel.perc;
						} else {
							data[fuel.fuel] = fuel.perc;
						}
					}
				}
				let element = ["Fuel", "Percentage"];
				this.chartData.push(element);
				for (let d in data){
					data[d]=(data[d]/numPeriods)
					element = [d, data[d]]
					this.chartData.push(element)
				}
				this.dataFetched=true;
			},

			workOutDates: function(){
				let d = new Date();
				let mm = d.getMonth() + 1;
				let dd1 = d.getDate() - 1;
				let dd2 = d.getDate() - 2;
				let yy = d.getFullYear();
				// 2019-02-18
				// var myDateString = yy + '-' + mm + '-' + dd;
				this.oneDayAgo = yy + '-' + mm.toString().padStart(2,'0') + '-' + dd1.toString().padStart(2,'0');
				this.twoDaysAgo = yy + '-' + mm.toString().padStart(2,'0') + '-' + dd2.toString().padStart(2,'0');
				if (!this.selectedFromDate) { this.selectedFromDate = this.twoDaysAgo;}
				if (!this.selectedToDate) { this.selectedToDate = this.oneDayAgo;}
				console.log(d);
				console.log(this.oneDayAgo);
				console.log(this.twoDaysAgo);
			},
			fetchData: function(){
				this.workOutDates();
				this.chartData=[];
				let url1 = "https://api.carbonintensity.org.uk/generation";
				let url2 = "https://api.carbonintensity.org.uk/generation" + "/" + this.selectedFromDate + "/" + this.selectedToDate;
				console.log(url2);
				fetch(url2)
					.then(response => response.json())
					.then(json => this.generation = json)
					.then(() => this.averageData())
			}

		},
		mounted: function() {
			this.fetchData();
		}
	});
});
