(function ($) {
  "use strict"; // Start of use strict

  //Team chart
  var ctx = document.getElementById( "team-chart" );
  ctx.height = 150;
  var myChart = new Chart( ctx, {
      type: 'line',
      data: {
          labels: [ "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022" ],
          type: 'line',
          defaultFontFamily: 'Montserrat',
          datasets: [ {
              data: [ 0, 7, 3, 5, 2, 8, 6, 10, 12, 9, 11 ],
              label: "Hembras",
              backgroundColor: 'rgba(255, 192, 203,0.40)',
              borderColor: 'rgba(255, 182, 193, 0.60)',
              borderWidth: 3.5,
              pointStyle: 'circle',
              pointRadius: 5,
              pointBorderColor: 'transparent',
              pointBackgroundColor: 'rgba(255, 182, 193, 0.60)',
                  },
                  {
              data: [ 0, 6, 3, 4, 3, 7, 10, 5, 2, 12, 20 ],
              label: "Machos",
              backgroundColor: 'rgba(0, 255, 255, 0.5)',
              borderColor: 'rgba(20, 255, 255,0.8)',
              borderWidth: 3.5,
              pointStyle: 'circle',
              pointRadius: 5,
              pointBorderColor: 'transparent',
              pointBackgroundColor: 'rgba(20, 255, 255, 0.8)',
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
                      labelString: 'Cantidad'
                  }
                      } ]
          },
          title: {
              display: false,
          }
      }
  } );

  var ctx = document.getElementById( "pieChart" );
    ctx.height = 300;
    var myChart = new Chart( ctx, {
        type: 'pie',
        data: {
            datasets: [ {
                data: [ 20, 11 ],
                backgroundColor: [
                                    "rgba(20, 255, 255,0.8)",
                                    "rgba(255, 182, 193, 0.60)"
                                ],
                hoverBackgroundColor: [
                                    "rgba(20, 255, 255,0.8)",
                                    "rgba(255, 182, 193, 0.60)"
                                ]

                            } ],
            labels: [
                            "Machos",
                            "Hembras"
                        ]
        },
        options: {
            responsive: true
        }
    } );
})(jQuery);


