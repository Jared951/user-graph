document.addEventListener("DOMContentLoaded", function() {
    // Check if on the index.html or graph.html page
    const isIndexPage = document.getElementById("graphForm") !== null;
    const isGraphPage = document.getElementById("graphContainer") !== null;
  
    if (isIndexPage) {
      // Code for index.html

      // Get the graph form element
      const graphForm = document.getElementById("graphForm");
      
      // Add event listener to the form submission
      graphForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        // Get the input values
        const fuckAroundValue = parseInt(document.getElementById("fuckAroundInput").value);
        const findOutValue = parseInt(document.getElementById("findOutInput").value);
        
        // Store the input values in localStorage
        localStorage.setItem("fuckAroundValue", fuckAroundValue);
        localStorage.setItem("findOutValue", findOutValue);
        
        // Redirect to graph.html
        window.location.href = "graph.html";
      });
    } else if (isGraphPage) {
      // Code for graph.html

      // Retrieve the stored values from localStorage
      const fuckAroundValue = parseInt(localStorage.getItem("fuckAroundValue"));
      const findOutValue = parseInt(localStorage.getItem("findOutValue"));
      
      // Function to generate the graph data
      const generateGraphData = (fuckAroundValues, findOutValues) => {
        const dataPoints = fuckAroundValues.length;
  
        const graphData = {
          datasets: [
            {
              label: "Find Out vs. Fuck Around",
              data: [],
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
              fill: false,
            },
          ],
        };
  
        // Populate the graph data with x and y values
        for (let i = 0; i < dataPoints; i++) {
          graphData.datasets[0].data.push({
            x: fuckAroundValues[i],
            y: findOutValues[i],
          });
        }
  
        return graphData;
      };
  
      // Function to determine the appropriate message based on the values
      const determineMessage = (fuckAroundValue, findOutValue) => {
        if (fuckAroundValue >= 0 && fuckAroundValue <= 3 && findOutValue >= 0 && findOutValue <= 3) {
          return "You should be okay.";
        } else if (fuckAroundValue >= 4 && fuckAroundValue <= 6 && findOutValue >= 4 && findOutValue <= 6) {
          return "You should recover from this, but we will see.";
        } else if (fuckAroundValue >= 7 && fuckAroundValue <= 10 && findOutValue >= 7 && findOutValue <= 10) {
          return "This will cripple you physically and emotionally. Likelihood of recovery from this is 1%.";
        } else {
          return "Unknown message";
        }
      };
  
      // Generate the graph data using the stored values
      const graphData = generateGraphData([0, fuckAroundValue], [0, findOutValue]);
  
      // Define the options for the graph
      const graphOptions = {
        scales: {
          x: {
            type: "linear",
            position: "bottom",
            title: {
              display: true,
              text: "Fuck Around",
            },
            min: 0, // Set the minimum value of the x-axis to 0
            max: 10, // Set the maximum value of the x-axis to 10
            ticks: {
              stepSize: 1, // Set the step size between ticks to 1
              precision: 0, // Set the precision of tick labels to 0 (no decimal points)
            },
          },
          y: {
            type: "linear",
            title: {
              display: true,
              text: "Find Out",
            },
            min: 0, // Set the minimum value of the y-axis to 0
            max: 10, // Set the maximum value of the y-axis to 10
            ticks: {
              stepSize: 1, // Set the step size between ticks to 1
              precision: 0, // Set the precision of tick labels to 0 (no decimal points)
            },
          },
        },
      };

      // Get the graph container element
      const graphContainer = document.getElementById("graphContainer");
      
      // Get the canvas element for the graph
      const graphCanvas = document.getElementById("myChart").getContext("2d");
      
      // Create the graph using Chart.js
      const graph = new Chart(graphCanvas, {
        type: "line",
        data: graphData,
        options: graphOptions,
      });
  
      // Display the result message
      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = `You fucked around: ${fuckAroundValue}. You found out: ${findOutValue}. ${determineMessage(fuckAroundValue, findOutValue)}`;
  
      // Remove the stored values from localStorage
      localStorage.removeItem("fuckAroundValue");
      localStorage.removeItem("findOutValue");
    }
  });   