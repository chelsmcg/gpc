var Graphs = {

	

	init: function(){
		Graphs.getGraphData(function(data){
			var barGraphValues = Graphs.setBarGraphValues(data);
			var lineGraphValues = Graphs.setLineGraphValues(data);
			var pieGraphValues = Graphs.setPieGraphValues(data);

			Graphs.generateBarGraph(barGraphValues);
			Graphs.generateLineGraph(lineGraphValues);
			Graphs.generatePieGraph(pieGraphValues);
		});
	},

	events: function(){

	},

	getGraphData: function(callback){
		$.ajax({
			url: "php/getGraphData.php",
			data: {
				packageStats: true,
			},
			dataType: 'jsonp',
			success: function(response) {
				if(response.success) {
					console.log(response.data)
  					callback(response.data);
  				} else {
  					console.log('fail');
  				}
			}
		});
	},

	setBarGraphValues: function(data){
		console.log(data)
		var barChartData = {
	        labels: ["Discovery", "Packaging", "Quality Assurance", "UAT", "Completed"],
	        datasets: [{
	            label: '',
	            backgroundColor: "rgba(0,103,136,1)",
	            data: [data.Discovery, data.Packaging, data['Quality Assurance'], data.UAT, data.Completed]
	        }]
	    };

	    return barChartData;
	},

	generateBarGraph(graphValues){
		var ctx = document.getElementById("canvas1").getContext("2d");
        window.myBar = new Chart(ctx, {
            type: 'bar',
            data: graphValues,
            options: {
                // Elements options apply to all of the options unless overridden in a dataset
                // In this case, we are setting the border of each bar to be 2px wide and green
                elements: {
                    rectangle: {
                        borderWidth: 0,
                        borderColor: 'rgb(0, 255, 0)',
                        borderSkipped: 'bottom'
                    }
                },
                responsive: true,
                legend: {
                    position: 'top',
                },
                title: {
                    display: false,
                    text: ''
                }
            }
        });
	},

	setLineGraphValues: function(data){
		console.log(data)
		var lineChartData = {
	        labels: ["Discovery", "Packaging", "Quality Assurance", "UAT", "Completed"],
	        datasets: [{
	        	fill: true,
	        	showLine: true,
	        	spanGaps: true,
	            label: '',
	            backgroundColor: false,
	            borderColor: "rgba(0,103,136,1)",
	            data: [data.Discovery, data.Packaging, data['Quality Assurance'], data.UAT, data.Completed]
	        }]
	    };

	    return lineChartData;
	},

	generateLineGraph(graphValues){
		var ctx = document.getElementById("canvas2").getContext("2d");
        window.myBar = new Chart(ctx, {
            type: 'line',
            data: graphValues,
            options: {
                // Elements options apply to all of the options unless overridden in a dataset
                // In this case, we are setting the border of each bar to be 2px wide and green
                elements: {
                    
                },
                responsive: true,
                legend: {
                    position: 'top',
                },
                title: {
                    display: false,
                    text: ''
                }
            }
        });
	},

	setPieGraphValues: function(data){
		console.log(data)
		var lineChartData = {
	        labels: ["Discovery", "Packaging", "Quality Assurance", "UAT", "Completed"],
	        datasets: [{
	        	fill: true,
	        	showLine: true,
	        	spanGaps: true,
	            label: '',
	            backgroundColor: false,
	            borderColor: "rgba(0,103,136,1)",
	            data: [data.Discovery, data.Packaging, data['Quality Assurance'], data.UAT, data.Completed]
	        }]
	    };

	    return lineChartData;
	},

	generatePieGraph(graphValues){
		var ctx = document.getElementById("canvas3").getContext("2d");
        window.myBar = new Chart(ctx, {
            type: 'pie',
            data: graphValues,
            options: {
                // Elements options apply to all of the options unless overridden in a dataset
                // In this case, we are setting the border of each bar to be 2px wide and green
                elements: {
                    
                },
                responsive: true,
                legend: {
                    position: 'top',
                },
                title: {
                    display: false,
                    text: ''
                }
            }
        });
	}
};
