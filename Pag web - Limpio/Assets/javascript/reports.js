( function ( $ ) {
    "use strict";

    //pie chart
    var ctx = document.getElementById( "pieChart" );
    ctx.height = 300;
    var myChart = new Chart( ctx, {
        type: 'pie',
        data: {
            datasets: [ {
                data: [ 45, 25, 20, 10 ],
                backgroundColor: [
                                    "rgba(0, 194, 146,0.9)",
                                    "rgba(0, 194, 146,0.7)",
                                    "rgba(0, 194, 146,0.5)",
                                    "rgba(0,0,0,0.07)"
                                ],
                hoverBackgroundColor: [
                                    "rgba(0, 194, 146,0.9)",
                                    "rgba(0, 194, 146,0.7)",
                                    "rgba(0, 194, 146,0.5)",
                                    "rgba(0,0,0,0.07)"
                                ]

                            } ],
            labels: [
                            "green",
                            "green",
                            "green"
                        ]
        },
        options: {
            responsive: true
        }
    } );

    //polar chart
    var ctx = document.getElementById( "polarChart" );
    ctx.height = 150;
    var myChart = new Chart( ctx, {
        type: 'polarArea',
        data: {
            datasets: [ {
                data: [ 15, 18, 10, 7, 19],
                backgroundColor: [
                                    "rgba(0, 194, 146,0.9)",
                                    "rgba(0, 194, 146,0.8)",
                                    "rgba(0, 194, 146,0.7)",
                                    "rgba(0,0,0,0.2)",
                                    "rgba(0, 194, 146,0.5)"
                                ]

                            } ],
            labels: [
                            "green",
                            "green",
                            "green",
                            "green"
                        ]
        },
        options: {
            responsive: true
        }
    } );

       // single bar chart
       var ctx = document.getElementById( "singelBarChart" );
       ctx.height = 150;
       var myChart = new Chart( ctx, {
           type: 'bar',
           data: {
               labels: [ "Sun", "Mon", "Tu", "Wed", "Th", "Fri", "Sat" ],
               datasets: [
                   {
                       label: "My First dataset",
                       data: [ 55, 50, 75, 80, 56, 55, 60 ],
                       borderColor: "rgba(0, 194, 146, 0.9)",
                       borderWidth: "0",
                       backgroundColor: "rgba(0, 194, 146, 0.5)"
                               }
                           ]
           },
           options: {
               scales: {
                   yAxes: [ {
                       ticks: {
                           beginAtZero: true
                       }
                                   } ]
               }
           }
       } );

          //line chart
    var ctx = document.getElementById( "lineChart" );
    ctx.height = 150;
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: [ "January", "February", "March", "April", "May", "June", "July" ],
            datasets: [
                {
                    label: "My First dataset",
                    borderColor: "rgba(0,0,0,.09)",
                    borderWidth: "1",
                    backgroundColor: "rgba(0,0,0,.07)",
                    data: [ 20, 47, 35, 43, 65, 45, 35 ]
                            },
                {
                    label: "My Second dataset",
                    borderColor: "rgba(0, 194, 146, 0.9)",
                    borderWidth: "1",
                    backgroundColor: "rgba(0, 194, 146, 0.5)",
                    pointHighlightStroke: "rgba(26,179,148,1)",
                    data: [ 16, 32, 18, 27, 42, 33, 44 ]
                            }
                        ]
        },
        options: {
            responsive: true,
            tooltips: {
                mode: 'index',
                intersect: false
            },
            hover: {
                mode: 'nearest',
                intersect: true
            }

        }
    } );

       //Sales chart
       var ctx = document.getElementById( "sales-chart" );
       ctx.height = 150;
       var myChart = new Chart( ctx, {
           type: 'line',
           data: {
               labels: [ "2012", "2013", "2014", "2015", "2016", "2017", "2018" ],
               type: 'line',
               defaultFontFamily: 'Montserrat',
               datasets: [ {
                   label: "Foods",
                   data: [ 0, 30, 15, 110, 50, 63, 120 ],
                   backgroundColor: 'transparent',
                   borderColor: 'rgba(220,53,69,0.75)',
                   borderWidth: 3,
                   pointStyle: 'circle',
                   pointRadius: 5,
                   pointBorderColor: 'transparent',
                   pointBackgroundColor: 'rgba(220,53,69,0.75)',
                       }, {
                   label: "Electronics",
                   data: [ 0, 50, 40, 80, 35, 99, 80 ],
                   backgroundColor: 'transparent',
                   borderColor: 'rgba(40,167,69,0.75)',
                   borderWidth: 3,
                   pointStyle: 'circle',
                   pointRadius: 5,
                   pointBorderColor: 'transparent',
                   pointBackgroundColor: 'rgba(40,167,69,0.75)',
                       } ]
           },
           options: {
               responsive: true,
   
               tooltips: {
                   mode: 'index',
                   titleFontSize: 12,
                   titleFontColor: '#000',
                   bodyFontColor: '#000',
                   backgroundColor: '#fff',
                   titleFontFamily: 'Montserrat',
                   bodyFontFamily: 'Montserrat',
                   cornerRadius: 3,
                   intersect: false,
               },
               legend: {
                   display: false,
                   labels: {
                       usePointStyle: true,
                       fontFamily: 'Montserrat',
                   },
               },
               scales: {
                   xAxes: [ {
                       display: true,
                       gridLines: {
                           display: false,
                           drawBorder: false
                       },
                       scaleLabel: {
                           display: false,
                           labelString: 'Month'
                       }
                           } ],
                   yAxes: [ {
                       display: true,
                       gridLines: {
                           display: false,
                           drawBorder: false
                       },
                       scaleLabel: {
                           display: true,
                           labelString: 'Value'
                       }
                           } ]
               },
               title: {
                   display: false,
                   text: 'Normal Legend'
               }
           }
       } );

          //Team chart
    var ctx = document.getElementById( "team-chart" );
    ctx.height = 150;
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: [ "2012", "2013", "2014", "2015", "2016", "2017", "2018" ],
            type: 'line',
            defaultFontFamily: 'Montserrat',
            datasets: [ {
                data: [ 0, 7, 3, 5, 2, 8, 6 ],
                label: "Expense",
                backgroundColor: 'rgba(0,200,155,.35)',
                borderColor: 'rgba(0,200,155,0.60)',
                borderWidth: 3.5,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'rgba(0,200,155,0.60)',
                    },
                    {
                data: [ 0, 6, 3, 4, 3, 7, 10 ],
                label: "Profit",
                backgroundColor: 'rgba(0,194,146,.25)',
                borderColor: 'rgba(0,194,146,0.5)',
                borderWidth: 3.5,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'rgba(0,194,146,0.5)',
                    }, ]
        },
        options: {
            responsive: true,
            tooltips: {
                mode: 'index',
                titleFontSize: 12,
                titleFontColor: '#000',
                bodyFontColor: '#000',
                backgroundColor: '#fff',
                titleFontFamily: 'Montserrat',
                bodyFontFamily: 'Montserrat',
                cornerRadius: 3,
                intersect: false,
            },
            legend: {
                display: false,
                position: 'top',
                labels: {
                    usePointStyle: true,
                    fontFamily: 'Montserrat',
                },


            },
            scales: {
                xAxes: [ {
                    display: true,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: false,
                        labelString: 'Month'
                    }
                        } ],
                yAxes: [ {
                    display: true,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                        } ]
            },
            title: {
                display: false,
            }
        }
    } );

} )( jQuery );