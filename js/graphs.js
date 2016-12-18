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
  					callback(response.data);
  				} else {
  					console.log('fail');
  				}
			}
		});
	},

	setBarGraphValues: function(data){
		var barChartData = {
	        labels: ["Discovery", "Packaging", "QA", "UAT", "Completed"],
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
		ctx.canvas.height = 240;
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
                scales: {
                	xAxes: [{ 
                		gridLines: { 
                			show: true, 
                			color: "rgba(255,255,255,0.1)", 
                		},
                		stacked: true,
                		ticks: {
			                fontSize: 10
			            }
                	}],
                	yAxes: [{ 
                		gridLines: { 
                			show: true, 
                			color: "rgba(255,255,255,0.1)", 
                		},
                		stacked: true,
                	}]
                },
                responsive: true,
                barValueSpacing: 2,
                legend: {
                    display: false,
                },
                title: {
                    display: false,
                    text: ''
                }
            }
        });
	},

	setLineGraphValues: function(data){
		var lineChartData = {
	        labels: ["Discovery", "Packaging", "QA", "UAT", "Completed"],
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
		var container = $('#lineGraph').height();
		ctx.canvas.height = 240;
        window.myBar = new Chart(ctx, {
            type: 'line',
            data: graphValues,
            options: {
                // Elements options apply to all of the options unless overridden in a dataset
                // In this case, we are setting the border of each bar to be 2px wide and green
                scales: {
                	xAxes: [{ 
	            		gridLines: { 
	            			show: true, 
	            			color: "rgba(255,255,255,0.1)", 
	            		},
	            		stacked: true,
	            		ticks: {
			                fontSize: 10
			            }
	            	}],
	            	yAxes: [{ 
	            		gridLines: { 
	            			show: true, 
	            			color: "rgba(255,255,255,0.1)", 
	            		},
	            		stacked: true,
	            	}],
                },
                responsive: true,
                legend: {
                    display: false,
                },
                title: {
                    display: false,
                    text: ''
                },
                lineTension: 0
            }
        });
	},

	setPieGraphValues: function(data){
		var lineChartData = {
	        labels: ["Discovery", "Packaging", "QA", "UAT", "Completed"],
	        datasets: [{
	        	fill: true,
	        	showLine: true,
	        	spanGaps: true,
	            label: '',
	            backgroundColor: [
	                "rgba(0,103,136,1)",
	                "rgba(0,103,136,0.8)",
	                "rgba(0,103,136,0.6)",
	                "rgba(0,103,136,0.4)",
	                "rgba(0,103,136,0.2)"
	            ],
	            borderColor: "rgba(0,103,136,1)",
	            borderWidth: 0,
	            data: [data.Discovery, data.Packaging, data['Quality Assurance'], data.UAT, data.Completed]
	        }]
	    };

	    return lineChartData;
	},

	generatePieGraph(graphValues){
		var ctx = document.getElementById("canvas3").getContext("2d");
		ctx.canvas.height = 240;
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
                    position: 'left',
                },
                title: {
                    display: false,
                    text: ''
                }
            }
        });
	}
};
