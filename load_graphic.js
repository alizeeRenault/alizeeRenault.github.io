		Chart.pluginService.register({
			beforeDraw: function (chart, easing) {
				if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
					var helpers = Chart.helpers;
					var ctx = chart.chart.ctx;
					var chartArea = chart.chartArea;

					ctx.save();
					ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
					ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
					ctx.restore();
				}
			}
		});

function load_vaccine_generic(country) {
		if (window.myLine_vac_generic)
			window.myLine_vac_generic.destroy();

		var length = country.data.length;
		var sliced_arr = country.data.slice(length - 40);
		var total_vaccinations = [];
		var tot = 0;
		for (var item in sliced_arr) {
			if (sliced_arr[item].total_vaccinations) {
				total_vaccinations.push(sliced_arr[item].total_vaccinations);
				tot = sliced_arr[item].total_vaccinations;
			}
			else
				total_vaccinations.push(tot);

		}
		var new_vaccinations = sliced_arr.map(x => x.new_vaccinations ? x.new_vaccinations : 0);
		var length = sliced_arr.length;
		var origin = tot;

		
		var moy_3_d = (new_vaccinations[length - 3] + new_vaccinations[length - 2] + new_vaccinations[length - 1]) / 3;
		var moy_7_d = (new_vaccinations[length - 7] + new_vaccinations[length - 6] + new_vaccinations[length - 5] + new_vaccinations[length - 4] + new_vaccinations[length - 3] + new_vaccinations[length - 2] + new_vaccinations[length - 1]) / 7;

		var labels = sliced_arr.map(x => x.date);
		var project_3_d = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map( x => origin + (moy_3_d * x))
		var project_7_d = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map( x => origin + (moy_7_d * x))
		var config = {
			type: 'line',
			data: {
				labels: labels.concat(["+1", "+2", "+3", "+4", "+5", "+6", "+7", "+8", "+9", "+10", "+11", "+12", "+13", "+14", "+15", "+16", "+17", "+18", "+19", "+20", "+21", "+22", "+23", "+24", "+25", "+26", "+27", "+28", "+29", "+30", "+31"]),
				datasets: [{
					label: 'Vaccination quotidienne',
					backgroundColor: window.chartColors.red,
					borderColor: window.chartColors.red,
					data: new_vaccinations,
					fill: false,
				}, {
					label: 'Vaccination cumulées',
					backgroundColor: window.chartColors.green,
					borderColor: window.chartColors.green,
					data: total_vaccinations,
					fill: true,
				}, {
					label: 'Projection suivant la moyenne des 3 derniers jours',
					backgroundColor: window.chartColors.blue,
					borderColor: window.chartColors.blue,
					borderDash: [1, 10],
					fill: false,
					// data: [516, 516, 516, 2000, 7000, 19500, 45695, 80000, 93000, 93000, 138477, 189834,247166, origin,
					// origin + moy_3_d, origin + (moy_3_d * 2), origin + (moy_3_d * 3), origin + (moy_3_d * 4), origin + (moy_3_d * 5), origin + (moy_3_d * 6), origin + (moy_3_d * 7), origin + (moy_3_d * 8), origin + (moy_3_d * 9), origin + (moy_3_d * 10), origin + (moy_3_d * 11),
					// origin + (moy_3_d * 12), origin + (moy_3_d * 13), origin + (moy_3_d * 14), origin + (moy_3_d * 15), origin + (moy_3_d * 16), origin + (moy_3_d * 17)],
					data: total_vaccinations.concat(project_3_d),
				}, {
					label: 'Projection suivant la moyenne des 7 derniers jours',
					backgroundColor: window.chartColors.yellow,
					borderColor: window.chartColors.yellow,
					borderDash: [1, 10],
					data: total_vaccinations.concat(project_7_d),
					// data: [516, 516, 516, 2000, 7000, 19500, 45695, 80000, 93000, 93000, 138477, 189834, 247166, origin,
					// origin + moy_7_d, origin + (moy_7_d * 2), origin + (moy_7_d * 3), origin + (moy_7_d * 4), origin + (moy_7_d * 5), origin + (moy_7_d * 6), origin + (moy_7_d * 7), origin + (moy_7_d * 8), origin + (moy_7_d * 9), origin + (moy_7_d * 10), origin + (moy_7_d * 11),
					// origin + (moy_7_d * 12), origin + (moy_7_d * 13), origin + (moy_7_d * 14), origin + (moy_7_d * 15), origin + (moy_7_d * 16), origin + (moy_7_d * 17)],
					fill: false,
				}]
			},
			options: {
				legend: {
	                labels: {
	                    fontColor: "rgb(23, 191, 99)",
	                    // fontSize: 18
	                }
	            },
				responsive: true,
				title: {
					display: true,
					text: 'Vaccination quotidiennes et cumulées'
				},
				scales: {
					yAxes: [{
						ticks: {
							fontColor: "rgb(23, 191, 99)",
							min: 0,
							max: Math.max(...total_vaccinations) * 3
						}
					}],
					xAxes: [{
	                    ticks: {
	                        fontColor: "rgb(23, 191, 99)",
	                    }
	                }]
				},
		    	chartArea: {
					backgroundColor: 'rgb(25, 39, 52)'
				}
			}
		};

	var ctx = document.getElementById('canvas_generic').getContext('2d');
	window.myLine_vac_generic = new Chart(ctx, config);
}


function load_vaccine(FRA) {
		var sliced_arr = FRA.data.slice(347);
		var total_vaccinations = [516, 516, 516, 2000].concat(sliced_arr.map(x => x.total_vaccinations));
		var new_vaccinations = [164, 0, 0, 1484].concat(sliced_arr.map(x => x.new_vaccinations));
		var length = sliced_arr.length;
		var origin = sliced_arr[length - 1].total_vaccinations;
		
		var moy_3_d = (sliced_arr[length - 3].new_vaccinations + sliced_arr[length - 2].new_vaccinations + sliced_arr[length - 1].new_vaccinations) / 3;
		var moy_7_d = (sliced_arr[length - 7].new_vaccinations + sliced_arr[length - 6].new_vaccinations + sliced_arr[length - 5].new_vaccinations + sliced_arr[length - 4].new_vaccinations + sliced_arr[length - 3].new_vaccinations + sliced_arr[length - 2].new_vaccinations + sliced_arr[length - 1].new_vaccinations) / 7;

		var length_projection = 31 - sliced_arr.length;
		var project_3_d = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map( x => origin + (moy_3_d * x))
		var project_7_d = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map( x => origin + (moy_7_d * x))
		var config = {
			type: 'line',
			data: {
				labels: ['1 janvier','2 janvier','3 janvier','4 janvier','5 janvier','6 janvier','7 janvier','8 janvier','9 janvier','10 janvier',
					'11 janvier', '12 janvier', '13 janvier', '14 janvier', '15 janvier', '16 janvier', '17 janvier', '18 janvier',
					'19 janvier', '20 janvier', '21 janvier', '22 janvier', '23 janvier', '24 janvier', '25 janvier', '26 janvier', '27 janvier',
					'28 janvier', '29 janvier', '30 janvier', '31 janvier'],
				datasets: [{
					label: 'Vaccination quotidienne',
					backgroundColor: window.chartColors.red,
					borderColor: window.chartColors.red,
					data: new_vaccinations,
					fill: false,
				}, {
					label: 'Vaccination cumulées',
					backgroundColor: window.chartColors.green,
					borderColor: window.chartColors.green,
					data: total_vaccinations,
					fill: true,
				}, {
					label: 'Projection suivant la moyenne des 3 derniers jours',
					backgroundColor: window.chartColors.blue,
					borderColor: window.chartColors.blue,
					borderDash: [1, 10],
					fill: false,
					// data: [516, 516, 516, 2000, 7000, 19500, 45695, 80000, 93000, 93000, 138477, 189834,247166, origin,
					// origin + moy_3_d, origin + (moy_3_d * 2), origin + (moy_3_d * 3), origin + (moy_3_d * 4), origin + (moy_3_d * 5), origin + (moy_3_d * 6), origin + (moy_3_d * 7), origin + (moy_3_d * 8), origin + (moy_3_d * 9), origin + (moy_3_d * 10), origin + (moy_3_d * 11),
					// origin + (moy_3_d * 12), origin + (moy_3_d * 13), origin + (moy_3_d * 14), origin + (moy_3_d * 15), origin + (moy_3_d * 16), origin + (moy_3_d * 17)],
					data: total_vaccinations.concat(project_3_d),
				}, {
					label: 'Projection suivant la moyenne des 7 derniers jours',
					backgroundColor: window.chartColors.yellow,
					borderColor: window.chartColors.yellow,
					borderDash: [1, 10],
					data: total_vaccinations.concat(project_7_d),
					// data: [516, 516, 516, 2000, 7000, 19500, 45695, 80000, 93000, 93000, 138477, 189834, 247166, origin,
					// origin + moy_7_d, origin + (moy_7_d * 2), origin + (moy_7_d * 3), origin + (moy_7_d * 4), origin + (moy_7_d * 5), origin + (moy_7_d * 6), origin + (moy_7_d * 7), origin + (moy_7_d * 8), origin + (moy_7_d * 9), origin + (moy_7_d * 10), origin + (moy_7_d * 11),
					// origin + (moy_7_d * 12), origin + (moy_7_d * 13), origin + (moy_7_d * 14), origin + (moy_7_d * 15), origin + (moy_7_d * 16), origin + (moy_7_d * 17)],
					fill: false,
				}]
			},
			options: {
				legend: {
	                labels: {
	                    fontColor: "rgb(23, 191, 99)",
	                    // fontSize: 18
	                }
	            },
				responsive: true,
				title: {
					display: true,
					text: 'Vaccination quotidiennes et cumulées'
				},
				scales: {
					yAxes: [{
						ticks: {
							fontColor: "rgb(23, 191, 99)",
							min: 0,
							max: Math.max(...total_vaccinations) * 3
						}
					}],
					xAxes: [{
	                    ticks: {
	                        fontColor: "rgb(23, 191, 99)",
	                    }
	                }]
				},
		    	chartArea: {
					backgroundColor: 'rgb(25, 39, 52)'
				}
			}
		};

	var ctx = document.getElementById('canvas').getContext('2d');
	window.myLine_vac_fra = new Chart(ctx, config);
}


function load_vaccine_BEL(country) {
		var sliced_arr = country.data.slice(332);
		var total_vaccinations = [];
		var tot = 0;
		for (var item in sliced_arr) {
			if (sliced_arr[item].total_vaccinations) {
				total_vaccinations.push(sliced_arr[item].total_vaccinations);
				tot = sliced_arr[item].total_vaccinations;
			}
			else
				total_vaccinations.push(tot);

		}
		var length = sliced_arr.length;
		var origin = total_vaccinations[total_vaccinations.length - 1];
		var new_vaccinations = [];//sliced_arr.map(x => (x.new_vaccinations ? x.new_vaccinations : 0));

		for (var item in sliced_arr) {
			var new_v = 0;
			if (item == 0) {
				new_vaccinations.push(total_vaccinations[item]);
			}
			else {
				new_v = total_vaccinations[item] - total_vaccinations[item - 1]
				new_vaccinations.push(new_v);
			}

		}
		var moy_3_d = (new_vaccinations[length - 3] + new_vaccinations[length - 2] + new_vaccinations[length - 1]) / 3;
		var moy_7_d = (new_vaccinations[length - 7] + new_vaccinations[length - 6] + new_vaccinations[length - 5] + new_vaccinations[length - 4] + new_vaccinations[length - 3] + new_vaccinations[length - 2] + new_vaccinations[length - 1]) / 7;

		var length_projection = 31 - sliced_arr.length;
		var project_3_d = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map( x => origin + (moy_3_d * x))
		var project_7_d = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map( x => origin + (moy_7_d * x))
		var config = {
			type: 'line',
			data: {
				labels: ['1 janvier','2 janvier','3 janvier','4 janvier','5 janvier','6 janvier','7 janvier','8 janvier','9 janvier','10 janvier',
					'11 janvier', '12 janvier', '13 janvier', '14 janvier', '15 janvier', '16 janvier', '17 janvier', '18 janvier',
					'19 janvier', '20 janvier', '21 janvier', '22 janvier', '23 janvier', '24 janvier', '25 janvier', '26 janvier', '27 janvier',
					'28 janvier', '29 janvier', '30 janvier', '31 janvier'],
				datasets: [{
					label: 'Vaccination quotidienne',
					backgroundColor: window.chartColors.red,
					borderColor: window.chartColors.red,
					data: new_vaccinations,
					fill: false,
				}, {
					label: 'Vaccination cumulées',
					backgroundColor: window.chartColors.green,
					borderColor: window.chartColors.green,
					data: total_vaccinations,
					fill: true,
				}, {
					label: 'Projection suivant la moyenne des 3 derniers jours',
					backgroundColor: window.chartColors.blue,
					borderColor: window.chartColors.blue,
					borderDash: [1, 10],
					fill: false,
					// data: [516, 516, 516, 2000, 7000, 19500, 45695, 80000, 93000, 93000, 138477, 189834,247166, origin,
					// origin + moy_3_d, origin + (moy_3_d * 2), origin + (moy_3_d * 3), origin + (moy_3_d * 4), origin + (moy_3_d * 5), origin + (moy_3_d * 6), origin + (moy_3_d * 7), origin + (moy_3_d * 8), origin + (moy_3_d * 9), origin + (moy_3_d * 10), origin + (moy_3_d * 11),
					// origin + (moy_3_d * 12), origin + (moy_3_d * 13), origin + (moy_3_d * 14), origin + (moy_3_d * 15), origin + (moy_3_d * 16), origin + (moy_3_d * 17)],
					data: total_vaccinations.concat(project_3_d),
				}, {
					label: 'Projection suivant la moyenne des 7 derniers jours',
					backgroundColor: window.chartColors.yellow,
					borderColor: window.chartColors.yellow,
					borderDash: [1, 10],
					data: total_vaccinations.concat(project_7_d),
					// data: [516, 516, 516, 2000, 7000, 19500, 45695, 80000, 93000, 93000, 138477, 189834, 247166, origin,
					// origin + moy_7_d, origin + (moy_7_d * 2), origin + (moy_7_d * 3), origin + (moy_7_d * 4), origin + (moy_7_d * 5), origin + (moy_7_d * 6), origin + (moy_7_d * 7), origin + (moy_7_d * 8), origin + (moy_7_d * 9), origin + (moy_7_d * 10), origin + (moy_7_d * 11),
					// origin + (moy_7_d * 12), origin + (moy_7_d * 13), origin + (moy_7_d * 14), origin + (moy_7_d * 15), origin + (moy_7_d * 16), origin + (moy_7_d * 17)],
					fill: false,
				}]
			},
			options: {
				legend: {
	                labels: {
	                    fontColor: "rgb(23, 191, 99)",
	                    // fontSize: 18
	                }
	            },
				responsive: true,
				title: {
					display: true,
					text: 'Vaccination quotidiennes et cumulées en Belgique'
				},
				scales: {
					yAxes: [{
						ticks: {
							fontColor: "rgb(23, 191, 99)",
							min: 0,
							max: Math.max(...total_vaccinations) * 3
						}
					}],
					xAxes: [{
	                    ticks: {
	                        fontColor: "rgb(23, 191, 99)",
	                    }
	                }]
				},
		    	chartArea: {
					backgroundColor: 'rgb(25, 39, 52)'
				}
			}
		};
	var ctx = document.getElementById('canvas_bel').getContext('2d');
	window.myLine_vac_bel = new Chart(ctx, config);
}


function load_vaccine_ISR(country) {
		var sliced_arr = country.data.slice(341);
		var total_vaccinations = [];
		var tot = 0;
		for (var item in sliced_arr) {
			if (sliced_arr[item].total_vaccinations) {
				total_vaccinations.push(sliced_arr[item].total_vaccinations);
				tot = sliced_arr[item].total_vaccinations;
			}
			else
				total_vaccinations.push(tot);

		}
		var length = sliced_arr.length;
		var origin = total_vaccinations[total_vaccinations.length - 1];
		var new_vaccinations = sliced_arr.map(x => x.new_vaccinations);

		// var new_vaccinations = [];//sliced_arr.map(x => (x.new_vaccinations ? x.new_vaccinations : 0));

		// for (var item in sliced_arr) {
		// 	var new_v = 0;
		// 	if (item == 0) {
		// 		new_vaccinations.push(total_vaccinations[item]);
		// 	}
		// 	else {
		// 		new_v = total_vaccinations[item] - total_vaccinations[item - 1]
		// 		new_vaccinations.push(new_v);
		// 	}

		// }
		var moy_3_d = (new_vaccinations[length - 3] + new_vaccinations[length - 2] + new_vaccinations[length - 1]) / 3;
		var moy_7_d = (new_vaccinations[length - 7] + new_vaccinations[length - 6] + new_vaccinations[length - 5] + new_vaccinations[length - 4] + new_vaccinations[length - 3] + new_vaccinations[length - 2] + new_vaccinations[length - 1]) / 7;

		var length_projection = 31 - sliced_arr.length;
		var project_3_d = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map( x => origin + (moy_3_d * x))
		var project_7_d = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map( x => origin + (moy_7_d * x))
		var config = {
			type: 'line',
			data: {
				labels: ['1 janvier','2 janvier','3 janvier','4 janvier','5 janvier','6 janvier','7 janvier','8 janvier','9 janvier','10 janvier',
					'11 janvier', '12 janvier', '13 janvier', '14 janvier', '15 janvier', '16 janvier', '17 janvier', '18 janvier',
					'19 janvier', '20 janvier', '21 janvier', '22 janvier', '23 janvier', '24 janvier', '25 janvier', '26 janvier', '27 janvier',
					'28 janvier', '29 janvier', '30 janvier', '31 janvier'],
				datasets: [{
					label: 'Vaccination quotidienne',
					backgroundColor: window.chartColors.red,
					borderColor: window.chartColors.red,
					data: new_vaccinations,
					fill: false,
				}, {
					label: 'Vaccination cumulées',
					backgroundColor: window.chartColors.green,
					borderColor: window.chartColors.green,
					data: total_vaccinations,
					fill: true,
				}, {
					label: 'Projection suivant la moyenne des 3 derniers jours',
					backgroundColor: window.chartColors.blue,
					borderColor: window.chartColors.blue,
					borderDash: [1, 10],
					fill: false,
					// data: [516, 516, 516, 2000, 7000, 19500, 45695, 80000, 93000, 93000, 138477, 189834,247166, origin,
					// origin + moy_3_d, origin + (moy_3_d * 2), origin + (moy_3_d * 3), origin + (moy_3_d * 4), origin + (moy_3_d * 5), origin + (moy_3_d * 6), origin + (moy_3_d * 7), origin + (moy_3_d * 8), origin + (moy_3_d * 9), origin + (moy_3_d * 10), origin + (moy_3_d * 11),
					// origin + (moy_3_d * 12), origin + (moy_3_d * 13), origin + (moy_3_d * 14), origin + (moy_3_d * 15), origin + (moy_3_d * 16), origin + (moy_3_d * 17)],
					data: total_vaccinations.concat(project_3_d),
				}, {
					label: 'Projection suivant la moyenne des 7 derniers jours',
					backgroundColor: window.chartColors.yellow,
					borderColor: window.chartColors.yellow,
					borderDash: [1, 10],
					data: total_vaccinations.concat(project_7_d),
					// data: [516, 516, 516, 2000, 7000, 19500, 45695, 80000, 93000, 93000, 138477, 189834, 247166, origin,
					// origin + moy_7_d, origin + (moy_7_d * 2), origin + (moy_7_d * 3), origin + (moy_7_d * 4), origin + (moy_7_d * 5), origin + (moy_7_d * 6), origin + (moy_7_d * 7), origin + (moy_7_d * 8), origin + (moy_7_d * 9), origin + (moy_7_d * 10), origin + (moy_7_d * 11),
					// origin + (moy_7_d * 12), origin + (moy_7_d * 13), origin + (moy_7_d * 14), origin + (moy_7_d * 15), origin + (moy_7_d * 16), origin + (moy_7_d * 17)],
					fill: false,
				}]
			},
			options: {
				legend: {
	                labels: {
	                    fontColor: "rgb(23, 191, 99)",
	                    // fontSize: 18
	                }
	            },
				responsive: true,
				title: {
					display: true,
					text: 'Vaccination quotidiennes et cumulées en Israël'
				},
				scales: {
					yAxes: [{
						ticks: {
							fontColor: "rgb(23, 191, 99)",
							min: 0,
							max: Math.max(...total_vaccinations) * 3
						}
					}],
					xAxes: [{
	                    ticks: {
	                        fontColor: "rgb(23, 191, 99)",
	                    }
	                }]
				},
		    	chartArea: {
					backgroundColor: 'rgb(25, 39, 52)'
				}
			}
		};
	var ctx = document.getElementById('canvas_israel').getContext('2d');
	window.myLine_vac_isr = new Chart(ctx, config);
}

function load_month_view(country) {
	if (window.myLine_case)
		window.myLine_case.destroy();
	if (window.myLine_death)
		window.myLine_death.destroy();
	var length = country.data.length;
	var sliced_arr = country.data.slice(length - 62);

	var labels = sliced_arr.map(x => x.date);
	var new_deaths = sliced_arr.map(x => x.new_deaths);
	var new_cases = sliced_arr.map(x => x.new_cases);
	var new_deaths_sm = sliced_arr.map(x => x.new_deaths_smoothed);
	var new_cases_sm = sliced_arr.map(x => x.new_cases_smoothed);

	var config = {
			type: 'line',
			data: {
				labels: labels,//.concat(["+1", "+2", "+3", "+4", "+5", "+6", "+7", "+8", "+9", "+10", "+11", "+12", "+13", "+14", "+15", "+16", "+17", "+18", "+19", "+20", "+21", "+22", "+23", "+24", "+25", "+26", "+27", "+28", "+29", "+30", "+31"]),
				datasets: [{
					label: 'cas quotidiens',
					backgroundColor: window.chartColors.yellow,
					borderColor: window.chartColors.yellow,
					data: new_cases,
					borderDash: [1, 1],
					fill: false,
				}, {
					label: 'Moyenne cas quotidiens',
					backgroundColor: window.chartColors.red,
					borderColor: window.chartColors.red,
					data: new_cases_sm,
					fill: false,
				}
				]
			},
			options: {
				legend: {
	                labels: {
	                    fontColor: "rgb(23, 191, 99)",
	                    // fontSize: 18
	                }
	            },
				responsive: true,
				title: {
					display: true,
					text: 'décès et cas COVID-19'
				},
				scales: {
					yAxes: [{
						ticks: {
							fontColor: "rgb(23, 191, 99)",
							min: 0,
							max: Math.max(...new_cases) * 3 / 2
						}
					}],
					xAxes: [{
	                    ticks: {
	                        fontColor: "rgb(23, 191, 99)",
	                    }
	                }]
				},
		    	chartArea: {
					backgroundColor: 'rgb(25, 39, 52)'
				}
			}
		};
		var config2 = {
			type: 'line',
			data: {
				labels: labels,//.concat(["+1", "+2", "+3", "+4", "+5", "+6", "+7", "+8", "+9", "+10", "+11", "+12", "+13", "+14", "+15", "+16", "+17", "+18", "+19", "+20", "+21", "+22", "+23", "+24", "+25", "+26", "+27", "+28", "+29", "+30", "+31"]),
				datasets: [{
					label: 'Décès quotidiens',
					backgroundColor: window.chartColors.orange,
					borderColor: window.chartColors.orange,
					data: new_deaths,
					borderDash: [1, 1],
					fill: false,
				}, {
					label: 'Moyenne décès quotidiens',
					backgroundColor: window.chartColors.red,
					borderColor: window.chartColors.red,
					data: new_deaths_sm,
					fill: false,
				}
				]
			},
			options: {
				legend: {
	                labels: {
	                    fontColor: "rgb(23, 191, 99)",
	                    // fontSize: 18
	                }
	            },
				responsive: true,
				title: {
					display: true,
					text: 'décès et cas COVID-19'
				},
				scales: {
					yAxes: [{
						ticks: {
							fontColor: "rgb(23, 191, 99)",
							min: 0,
							max: Math.max(...new_deaths) * 3 / 2
						}
					}],
					xAxes: [{
	                    ticks: {
	                        fontColor: "rgb(23, 191, 99)",
	                    }
	                }]
				},
		    	chartArea: {
					backgroundColor: 'rgb(25, 39, 52)'
				}
			}
		};
	var ctx = document.getElementById('canvas_month_FRA_cases').getContext('2d');
	window.myLine_case = new Chart(ctx, config);
	var ctx = document.getElementById('canvas_month_FRA_deaths').getContext('2d');
	window.myLine_death = new Chart(ctx, config2);

}

function load_year_view(country) {
	if (window.myLine_year_case)
		window.myLine_year_case.destroy();
	if (window.myLine_year_death)
		window.myLine_year_death.destroy();
	var length = country.data.length;
	var sliced_arr = country.data;

	var labels = sliced_arr.map(x => x.date);
	var new_deaths = sliced_arr.map(x => x.new_deaths);
	var new_cases = sliced_arr.map(x => x.new_cases);
	var new_deaths_sm = sliced_arr.map(x => x.new_deaths_smoothed);
	var new_cases_sm = sliced_arr.map(x => x.new_cases_smoothed);
	new_cases = new_cases.map( x => x ? x : 0);

	var config = {
			type: 'line',
			data: {
				labels: labels,//.concat(["+1", "+2", "+3", "+4", "+5", "+6", "+7", "+8", "+9", "+10", "+11", "+12", "+13", "+14", "+15", "+16", "+17", "+18", "+19", "+20", "+21", "+22", "+23", "+24", "+25", "+26", "+27", "+28", "+29", "+30", "+31"]),
				datasets: [{
					label: 'Moyenne cas quotidiens',
					backgroundColor: window.chartColors.red,
					borderColor: window.chartColors.red,
					data: new_cases_sm,
					fill: false,
				}, {
					label: 'cas quotidiens',
					backgroundColor: window.chartColors.blue,
					borderColor: window.chartColors.blue,
					data: new_cases,
					borderDash: [1, 1],
					fill: false,
				}]
			},
			options: {
				legend: {
	                labels: {
	                    fontColor: "rgb(23, 191, 99)",
	                    // fontSize: 18
	                }
	            },
				responsive: true,
				title: {
					display: true,
					text: 'décès et cas COVID-19'
				},
				scales: {
					yAxes: [{
						ticks: {
							fontColor: "rgb(23, 191, 99)",
							min: 0,
							max: Math.max(...new_cases) * 3 / 2
						}
					}],
					xAxes: [{
	                    ticks: {
	                        fontColor: "rgb(23, 191, 99)",
	                    }
	                }]
				},
		    	chartArea: {
					backgroundColor: 'rgb(25, 39, 52)'
				}
			}
		};
		new_deaths = new_deaths.map( x => x ? x : 0);
		var config2 = {
			type: 'line',
			data: {
				labels: labels,//.concat(["+1", "+2", "+3", "+4", "+5", "+6", "+7", "+8", "+9", "+10", "+11", "+12", "+13", "+14", "+15", "+16", "+17", "+18", "+19", "+20", "+21", "+22", "+23", "+24", "+25", "+26", "+27", "+28", "+29", "+30", "+31"]),
				datasets: [{
					label: 'Moyenne décès quotidiens',
					backgroundColor: window.chartColors.red,
					borderColor: window.chartColors.red,
					data: new_deaths_sm,
					fill: false,
				}, {
					label: 'Décès quotidiens',
					backgroundColor: window.chartColors.blue,
					borderColor: window.chartColors.blue,
					data: new_deaths,
					borderDash: [1, 1],
					fill: false,
				}]
			},
			options: {
				legend: {
	                labels: {
	                    fontColor: "rgb(23, 191, 99)",
	                    // fontSize: 18
	                }
	            },
				responsive: true,
				title: {
					display: true,
					text: 'décès et cas COVID-19'
				},
				scales: {
					yAxes: [{
						ticks: {
							fontColor: "rgb(23, 191, 99)",
							min: 0,
							max: Math.max(...new_deaths) * 3 / 2
						}
					}],
					xAxes: [{
	                    ticks: {
	                        fontColor: "rgb(23, 191, 99)",
	                    }
	                }]
				},
		    	chartArea: {
					backgroundColor: 'rgb(25, 39, 52)'
				}
			}
		};
	var ctx = document.getElementById('canvas_month_complete_cases').getContext('2d');
	window.myLine_year_case = new Chart(ctx, config);
	var ctx = document.getElementById('canvas_month_complete_deaths').getContext('2d');
	window.myLine_year_death = new Chart(ctx, config2);

}

		// var deaths = [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,3,2,7,3,11,3,15,13,18,12,36,21,27,89,108,78,112,112,186,240,231,365,299,319,292,418,498,508,1354,1119,1052,517,832,1416,540,1339,986,634,561,574,761,1437,752,760,641,395,546,530,543,515,389,369,242,436,367,426,289,218,166,135,306,330,278,178,243,80,70,263,348,83,351,104,96,482,131,-217,110,83,74,43,35,65,98,66,66,52,57,31,31,107,81,44,46,31,13,54,87,23,27,28,24,9,29,111,28,28,14,16,7,23,57,11,21,26,8,9,18,30,18,14,18,7,7,13,13,32,14,25,4,3,18,71,20,18,14,9,8,8,13,7,10,10,4,4,9,14,15,16,11,3,4,22,2,9,7,12,1,1,14,14,17,17,17,4,1,24,17,17,12,23,9,1,15,16,0,32,20,6,4,29,26,25,0,0,12,3,25,38,30,19,80,17,6,34,49,46,50,153,26,11,53,78,43,52,150,39,27,81,85,63,63,130,49,32,69,66,80,76,109,54,46,95,108,104,88,178,89,85,146,262,163,162,298,137,116,257,523,244,235,545,223,231,467,906,437,415,880,356,322,548,857,328,425,932,552,500,704,625,677,681,634,390,352,638,592,569,527,581,316,301,509,466,425,439,397,327,287,480,491,403,400,412,314,271,492,428,407,376,374,294,236,456,487,359,373,242,230,257,447,468,377,325,207,231,191,453,420,387,381,381,264,248,407,452];
		// var deaths_3_d = [0,-4,-3,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,1,2,4,4,7,5,10,10,16,14,22,23,28,46,74,92,99,101,137,179,219,279,298,328,303,343,403,474,787,994,1175,896,800,922,929,1098,955,987,727,589,632,924,984,983,717,599,527,491,539,530,482,424,334,349,348,410,360,311,225,173,202,257,305,262,233,167,131,137,227,232,260,180,183,228,236,132,8,-8,89,67,50,48,66,76,77,61,59,46,40,56,73,78,57,40,30,33,51,55,45,26,27,20,21,49,56,56,23,20,12,15,29,31,29,20,18,14,12,19,22,21,16,13,11,9,11,19,20,24,14,11,8,31,36,36,18,13,11,8,10,9,10,9,8,6,6,9,12,15,14,10,6,10,9,11,6,10,6,5,5,10,15,16,17,13,7,10,14,19,15,18,14,11,9,10,11,16,17,19,10,13,20,27,17,8,4,5,13,22,31,29,43,39,34,19,30,43,48,83,77,63,30,47,58,58,82,80,72,49,64,77,70,85,81,70,50,56,72,74,88,80,69,65,83,103,100,123,118,118,106,165,190,196,207,199,184,170,299,341,334,341,335,333,307,534,604,586,577,550,520,408,576,578,536,562,636,662,585,610,668,661,664,569,458,460,528,599,563,559,475,399,375,426,466,444,420,388,337,364,420,458,431,405,375,333,359,397,442,404,385,348,302,328,393,434,407,324,282,243,311,391,431,390,303,254,210,291,355,420,396,383,342,298,306,369];
		// var deaths_7_d = [0,-2,-1,-2,-1,-2,-1,0,0,0,0,0,0,0,1,0,0,0,1,0,1,2,3,4,4,6,8,10,11,15,17,20,31,44,53,68,78,102,132,152,189,221,250,276,309,346,386,527,644,749,780,840,972,975,974,954,895,901,865,770,899,815,783,784,760,756,723,595,561,509,469,448,432,409,392,360,335,306,291,273,267,246,230,234,221,212,206,209,180,206,185,188,247,228,147,151,113,108,101,37,28,72,66,64,61,63,62,57,59,60,58,57,53,50,54,51,42,40,38,37,36,32,36,36,37,35,33,34,32,25,22,21,23,22,22,22,17,19,18,16,16,16,16,12,15,15,16,15,15,16,24,22,23,21,22,22,21,13,11,10,9,9,8,8,8,10,10,10,11,10,12,11,9,8,9,8,8,6,9,9,11,11,12,12,14,14,14,13,14,14,15,14,13,11,13,14,13,13,15,17,20,16,13,13,14,13,15,15,18,30,30,31,32,33,36,41,50,52,53,55,60,59,60,59,60,64,67,68,71,72,70,71,72,70,68,70,71,69,69,72,75,81,85,86,96,101,107,114,136,144,155,173,179,183,199,237,248,259,293,307,322,353,407,435,460,509,527,541,552,545,529,531,538,567,591,614,581,631,667,625,601,581,571,566,551,529,521,511,503,485,467,447,434,407,409,407,403,407,403,398,400,398,396,398,388,390,385,381,377,372,368,375,369,369,349,341,343,342,340,342,335,330,330,321,322,315,316,324,349,354,362,356,360];

		// var cases = [0,0,0,0,0,0,0,0,0,0,2,4,20,19,43,30,61,21,73,138,230,296,260,203,372,497,595,785,838,924,1210,1097,1404,1861,1617,1847,1559,3838,2448,2929,3922,3809,4611,2599,4376,7578,4861,2116,5233,4267,1873,3912,3777,3881,4286,4342,3114,1613,2673,5497,2633,2641,405,2569,785,2051,2667,1827,1653,1773,1537,461,3764,1520,-1417,1139,604,794,308,576,1104,4183,629,642,433,209,456,708,507,622,563,372,120,492,524,418,318,393,250,115,358,276,191,3325,597,1828,257,338,-766,352,767,611,579,343,211,403,545,425,726,526,407,152,344,458,467,811,641,284,373,517,81,0,1588,522,522,280,541,918,659,582,560,639,176,475,663,621,658,669,668,288,511,416,534,836,865,865,350,584,998,1062,1130,1019,1018,514,725,1392,1377,1346,0,2820,556,1039,1695,1604,2288,2035,2034,785,1397,2524,2669,2846,3310,3015,493,2238,3776,4771,4586,3602,4897,1955,3304,5429,6111,7379,5453,5413,3082,4982,7017,7157,8975,8550,7071,4203,6544,8577,9843,9406,10561,7183,6158,7852,9784,10593,13215,13498,10569,5298,10008,13072,16096,15797,14412,11123,4070,8051,12845,13970,12148,16972,12565,5084,10489,18746,18129,20339,26896,16101,8505,12993,22591,30621,25086,32427,29837,13243,20468,26676,41622,42032,45422,52010,26771,33417,36437,47637,49215,35641,48227,54456,38268,42496,59984,62424,88790,40556,22092,24117,37816,35109,25731,34032,29165,11343,14524,28383,21150,22882,17881,13157,4452,9155,16282,13563,12459,12580,9784,4005,8083,14064,12696,11221,12923,11022,3411,13713,14595,13750,13406,13947,11533,3063,11532,17615,18254,15674,17565,12799,5797,11795,14929,21634,20262,3093,8822,2960,11395,26457,19927,19348,3466,12489,4022,20489,25379,21703,19814,20177,15944,3582,19752];
		// var cases_3_d = [0,1,0,0,0,0,0,0,0,0,1,2,8,15,27,31,44,38,51,78,147,221,262,253,278,358,488,625,740,849,990,1077,1237,1454,1628,1775,1674,2415,2615,3071,3100,3553,4114,3673,3862,4851,5605,4852,4070,3872,3791,3351,3187,3857,3981,4170,3914,3023,2466,3261,3601,3591,1893,1871,1253,1802,1834,2182,2049,1751,1654,1257,1921,1915,1289,414,109,845,569,559,663,1954,1972,1818,568,428,366,458,557,612,564,519,352,328,379,478,420,376,320,253,241,250,275,1264,1371,1916,894,808,-57,-25,117,577,652,511,378,319,386,458,565,559,553,362,301,318,423,579,639,579,433,391,324,199,556,704,877,441,448,580,706,719,601,593,459,430,438,586,647,650,665,541,489,405,487,596,745,855,693,600,644,881,1064,1070,1056,850,752,877,1165,1372,907,1389,1125,1472,1097,1446,1862,1976,2119,1618,1405,1569,2196,2680,2942,3057,2272,1916,2169,3595,4377,4320,4362,3484,3386,3562,4948,6307,6314,6082,4649,4492,5027,6386,7716,8227,8199,6608,5939,6442,8321,9275,9937,9050,7967,7065,7931,9410,11197,12435,12428,9788,8625,9459,13059,14988,15435,13778,9868,7748,8322,11622,12988,14363,13895,11540,9380,11439,15788,19072,21788,21112,17167,12533,14696,22069,26099,29378,29117,25169,21182,20129,29589,36777,43025,46488,41401,37399,32209,39163,44430,44164,44361,46108,46984,45073,46916,54968,70400,63923,50479,28922,28008,32348,32885,31624,29643,24846,18344,18084,21352,24138,20638,17973,11830,8922,9963,13000,14101,12867,11608,8790,7290,8718,11614,12660,12280,11722,9119,9382,10573,14019,13917,13701,12962,9515,8709,10737,15800,17181,17164,15346,12054,10130,10841,16119,18942,14996,10726,4958,7726,13604,19259,21911,14247,11768,6659,12333,16630,22524,22298,20565,18645,13234,13093];
		// var cases_7_d = [0,0,0,1,0,0,0,0,0,0,0,1,4,6,13,17,25,29,38,55,85,121,154,175,224,285,351,430,507,602,746,849,979,1160,1279,1422,1514,1889,2082,2300,2594,2908,3302,3451,3527,4261,4537,4278,4482,4433,4329,4263,3720,3580,3890,3762,3598,3561,3383,3630,3451,3216,2654,2576,2457,2369,1964,1850,1708,1903,1757,1709,1955,1791,1327,1254,1087,980,959,504,444,1244,1171,1176,1125,1111,1094,1037,512,511,500,491,478,484,457,444,401,377,359,359,339,304,272,701,730,956,976,973,824,848,481,484,306,317,300,467,494,445,462,454,463,455,446,434,440,453,468,451,483,507,453,387,498,481,514,502,505,624,719,574,581,597,582,573,536,531,541,558,561,578,582,547,535,561,588,616,626,635,719,794,837,858,880,904,923,980,1025,1056,911,1167,1174,1219,1261,1295,1429,1719,1607,1640,1692,1809,1962,2041,2224,2364,2322,2442,2621,2921,3170,3211,3481,3689,3842,4077,4270,4668,4932,5007,5167,5407,5634,5783,6011,6454,6691,6850,7074,7297,7680,7742,8030,8045,8324,8512,8684,8791,9335,9755,10238,10116,10423,10893,11680,12048,12179,12258,12083,11803,11770,11467,10946,11311,11517,11662,12011,12853,13448,14617,16036,16540,17030,17387,17936,19721,20399,21189,23151,23829,24896,25480,27051,29472,31329,34496,36428,38279,39673,40532,41559,40161,39621,43575,44269,45134,46898,48786,56377,55282,50659,48637,47968,44415,39173,31351,29723,28187,26818,25469,23476,23068,20761,18474,17490,16723,14994,13911,12421,11664,11182,11118,10965,10649,10524,10348,10396,10574,10488,11293,11369,11519,11832,11977,12051,12001,11689,12121,12765,13088,13605,13786,14177,14214,13830,14313,14969,12901,12334,11927,11871,13518,13273,13144,13196,13720,13872,15171,15018,15270,15338,17725,18218,18155,18050];


		// var config_deaths = {
		// 	type: 'line',
		// 	data: {
		// 		labels: ['15 février 2020', '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', '', '12 Janvier 2021'],
		// 		datasets: [{
		// 			label: 'moyenne 7 jours',
		// 			backgroundColor: window.chartColors.red,
		// 			borderColor: window.chartColors.red,
		// 			data: deaths_7_d,
		// 			pointRadius: 0,
		// 			fill: false,
		// 		}, {
		// 			label: 'moyenne 3 jours',
		// 			backgroundColor: window.chartColors.green,
		// 			borderColor: window.chartColors.green,
		// 			data: deaths_3_d,
		// 			borderDash: [1, 1],
		// 			pointRadius: 0,
		// 			fill: false,
		// 			showLine: false,
		// 		}, {
		// 			label: 'Décès',
		// 			backgroundColor: window.chartColors.blue,
		// 			borderColor: window.chartColors.blue,
		// 			borderDash: [1, 1],
		// 			pointRadius: 0,
		// 			data: deaths,
		// 			fill: false,
		// 		}]
		// 	},
		// 	options: {
		// 		legend: {
	 //                labels: {
	 //                    fontColor: "rgb(23, 191, 99)",
	 //                    // fontSize: 18
	 //                }
	 //            },
		// 		responsive: true,
		// 		tooltips: {
		// 			mode: 'index',
		// 			intersect: false,
		// 		},
		// 		hover: {
		// 			mode: 'nearest',
		// 			intersect: true
		// 		},
		// 		title: {
		// 			display: true,
		// 			text: 'Décès en France'
		// 		},
		// 		scales: {
		// 			yAxes: [{
		// 				ticks: {
		// 					fontColor: "rgb(23, 191, 99)",
		// 					min: 0,
		// 					max: 3000
		// 				}
		// 			}],
		// 			xAxes: [{
	 //                    ticks: {
	 //                        fontColor: "rgb(23, 191, 99)",
	 //                    }
	 //                }]
		// 		},
		//     	chartArea: {
		// 			backgroundColor: 'rgb(25, 39, 52)'
		// 		}
		// 	}
		// };

		// var config_cases = {
		// 	type: 'line',
		// 	data: {
		// 		labels: ['15 février 2020', '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', ''
		// 				, '', '', '', '', '', '', '', '', '', '', '12 Janvier 2021'],
		// 		datasets: [{
		// 			label: 'moyenne 7 jours',
		// 			backgroundColor: window.chartColors.red,
		// 			borderColor: window.chartColors.red,
		// 			data: cases_7_d,
		// 			pointRadius: 0,
		// 			fill: false,
		// 		}, {
		// 			label: 'moyenne 3 jours',
		// 			backgroundColor: window.chartColors.green,
		// 			borderColor: window.chartColors.green,
		// 			borderDash: [1, 1],
		// 			data: cases_3_d,
		// 			pointRadius: 0,
		// 			showLine: false,
		// 			fill: false,
		// 		}, {
		// 			label: 'Cas COVID-19',
		// 			backgroundColor: window.chartColors.blue,
		// 			borderColor: window.chartColors.blue,
		// 			borderDash: [1, 1],
		// 			pointRadius: 0,
		// 			data: cases,
		// 			fill: false,
		// 		}]
		// 	},
		// 	options: {
		// 		legend: {
	 //                labels: {
	 //                    fontColor: "rgb(23, 191, 99)",
	 //                    // fontSize: 18
	 //                }
	 //            },
		// 		responsive: true,
		// 		tooltips: {
		// 			mode: 'index',
		// 			intersect: false,
		// 		},
		// 		hover: {
		// 			mode: 'nearest',
		// 			intersect: true
		// 		},
		// 		title: {
		// 			display: true,
		// 			text: 'Cas en France'
		// 		},
		// 		scales: {
		// 			yAxes: [{
		// 				ticks: {
		// 					fontColor: "rgb(23, 191, 99)",
		// 					min: 0,
		// 					max: 100000
		// 				}
		// 			}],
		// 			xAxes: [{
	 //                    ticks: {
	 //                        fontColor: "rgb(23, 191, 99)",
	 //                    }
	 //                }]
		// 		},
		//     	chartArea: {
		// 			backgroundColor: 'rgb(25, 39, 52)'
		// 		}
		// 	}
		// };
