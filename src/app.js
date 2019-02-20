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
			dateFrom: null,
			dateTo: null,
			selectedChartType: 'PieChart',
			chartTypes : ["ColumnChart", "PieChart", "BarChart", "LineChart", "AreaChart", "ScatterChart"],
			chartOptions: {
          title: 'UK Energy Generation Sources',
					width: 1000,
					height: 400,
					is3D: true
				}
		},
		methods: {
			getMix: function(){
				this.generationMix=this.generation.data.generationmix;
				this.chartData = [["Fuel", "Percentage"]];
				for (let fuel of this.generationMix){
					this.chartData.push([fuel.fuel, fuel.perc]);
				}
				this.dateFrom = new Date(this.generation.data.from);
				this.dateTo = new Date(this.generation.data.to);
				this.dataFetched=true;
				console.log(this.chartData);
				console.log(this.dateFrom);
				console.log(this.dateTo);
			},
			fetchData: function(){
				fetch("https://api.carbonintensity.org.uk/generation")
				  .then(response => response.json())
					.then(json => this.generation = json)
					.then(() => this.getMix())
			}

		},
		mounted: function() {
			this.fetchData();
		}
	});
});
