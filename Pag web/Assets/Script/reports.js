(function ($) {
  "use strict"; // Start of use strict

  var SufeeAdmin = {
    cpuLoad: function () {
      var data = [],
        totalPoints = 300;

      function getRandomData() {
        if (data.length > 0) data = data.slice(1);

        // Do a random walk

        while (data.length < totalPoints) {
          var prev = data.length > 0 ? data[data.length - 1] : 50,
            y = prev + Math.random() * 10 - 5;

          if (y < 0) {
            y = 0;
          } else if (y > 100) {
            y = 100;
          }

          data.push(y);
        }

        // Zip the generated y values with the x values

        var res = [];
        for (var i = 0; i < data.length; ++i) {
          res.push([i, data[i]]);
        }

        return res;
      }

      // Set up the control widget

      var updateInterval = 30;
      $("#updateInterval")
        .val(updateInterval)
        .change(function () {
          var v = $(this).val();
          if (v && !isNaN(+v)) {
            updateInterval = +v;
            if (updateInterval < 1) {
              updateInterval = 1;
            } else if (updateInterval > 3000) {
              updateInterval = 3000;
            }
            $(this).val("" + updateInterval);
          }
        });

      var plot = $.plot("#cpu-load", [getRandomData()], {
        series: {
          shadowSize: 0, // Drawing is faster without shadows
        },
        yaxis: {
          min: 0,
          max: 100,
        },
        xaxis: {
          show: false,
        },
        colors: ["#00c292"],
        grid: {
          color: "transparent",
          hoverable: true,
          borderWidth: 0,
          backgroundColor: "transparent",
        },
        tooltip: true,
        tooltipOpts: {
          content: "Y: %y",
          defaultTheme: false,
        },
      });

      function update() {
        plot.setData([getRandomData()]);

        // Since the axes don't change, we don't need to call plot.setupGrid()

        plot.draw();
        setTimeout(update, updateInterval);
      }

      update();
    },

    lineFlot: function () {
      var sin = [],
        cos = [];

      for (var i = 0; i < 10; i += 0.1) {
        sin.push([i, Math.sin(i)]);
        cos.push([i, Math.cos(i)]);
      }

      var plot = $.plot(
        "#flot-line",
        [
          {
            data: sin,
            label: "sin(x)",
          },
          {
            data: cos,
            label: "cos(x)",
          },
        ],
        {
          series: {
            lines: {
              show: true,
            },
            points: {
              show: true,
            },
          },
          yaxis: {
            min: -1.2,
            max: 1.2,
          },
          colors: ["#00c292", "#F44336"],
          grid: {
            color: "#fff",
            hoverable: true,
            borderWidth: 0,
            backgroundColor: "transparent",
          },
          tooltip: true,
          tooltipOpts: {
            content: "'%s' of %x.1 is %y.4",
            shifts: {
              x: -65,
              y: 25,
            },
          },
        }
      );
    },

    

    pieFlot: function () {
      var data = [
        {
          label: " Machos",
          data: 13,
          color: "#8fc9fb",
        },
        {
          label: " Hembras",
          data: 20,
          color: "#F44336",
        },
      ];

      var plotObj = $.plot($("#flot-pie"), data, {
        series: {
          pie: {
            show: true,
            radius: 1,
            label: {
              show: false,
            },
          },
        },
        grid: {
          hoverable: true,
        },
        tooltip: {
          show: true,
          content: "%p.0%, %s, n=%n", // show percentages, rounding to 2 decimal places
          shifts: {
            x: 20,
            y: 0,
          },
          defaultTheme: false,
        },
      });
    },

    plotting: function () {
      var d1 = [
        [20, 20],
        [30, 34],
        [42, 60],
        [54, 20],
        [80, 90],
      ];

      //flot options
      var options = {
        legend: {
          show: false,
        },
        series: {
          label: "Curved Lines Test",
          curvedLines: {
            active: true,
            nrSplinePoints: 20,
          },
        },

        grid: {
          color: "#fff",
          hoverable: true,
          borderWidth: 0,
          backgroundColor: "transparent",
        },
        tooltip: {
          show: true,
          content: "%s | x: %x; y: %y",
        },
        yaxes: [
          {
            min: 10,
            max: 90,
          },
          {
            position: "right",
          },
        ],
      };

      //plotting
      $.plot(
        $("#flotCurve"),
        [
          {
            data: d1,
            lines: {
              show: true,
              fill: true,
              fillColor: "rgba(0,123,255,.15)",
              lineWidth: 3,
            },
            //curve the line  (old pre 1.0.0 plotting function)
            curvedLines: {
              apply: true,
              show: true,
              fill: true,
              fillColor: "rgba(0,123,255,.15)",
            },
          },
          {
            data: d1,
            points: {
              show: true,
              fill: true,
              fillColor: "rgba(0,123,255,.15)",
            },
          },
        ],
        options
      );
    },
  };

  $(document).ready(function () {
    SufeeAdmin.cpuLoad();
    SufeeAdmin.lineFlot();
    SufeeAdmin.pieFlot();
    SufeeAdmin.plotting();
  });
})(jQuery);


