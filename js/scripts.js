document.addEventListener("DOMContentLoaded", () => {
  //input with id "username" on change event
  document.getElementById("username").addEventListener("input", function () {
    // Get the value of the input field
    var username = document.getElementById("username").value;
    //regex to check if username has at lease 1 capital letter, 1 special character, 1 number, and is at lease 8 characters long
    var regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Check if the value matches the regex
    if (regex.test(username)) {
      // If it matches, set the border color to green
      document.getElementById("username").style.borderColor = "green";
    } else {
      // If it doesn't match, set the border color to red
      document.getElementById("username").style.borderColor = "red";
    }
  });

  let chartInitialized = false;

  // Function to initialize the chart
  function initializeChart() {
    const ctx = document.getElementById("barChart").getContext("2d");

    // Function to retrieve income and expenses for each month
    function getMonthlyData() {
      const months = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
      ];

      const incomeData = [];
      const expensesData = [];

      months.forEach(month => {
        const incomeInput = document.getElementById(`${month}-income`);
        const expensesInput = document.getElementById(`${month}-expenses`);

        const income = incomeInput ? parseFloat(incomeInput.value) || 0 : 0;
        const expenses = expensesInput
          ? parseFloat(expensesInput.value) || 0
          : 0;

        incomeData.push(income);
        expensesData.push(expenses);
      });

      return { incomeData, expensesData };
    }

    // Sample data for the bar chart
    const { incomeData, expensesData } = getMonthlyData();

    const data = {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Income",
          data: incomeData,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Expenses",
          data: expensesData,
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    };

    // Chart configuration
    const config = {
      type: "bar",
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Monthly Income vs Expenses",
          },
        },
      },
    };

    // Render the chart
    const chart = new Chart(ctx, config);

    // Update chart data dynamically when inputs change
    document.querySelectorAll("input").forEach(input => {
      input.addEventListener("input", () => {
        const { incomeData, expensesData } = getMonthlyData();
        data.datasets[0].data = incomeData;
        data.datasets[1].data = expensesData;
        chart.update();
      });
    });
  }

  // Listen for clicks on the "Chart" tab
  document.getElementById("chart-tab").addEventListener("click", () => {
    if (!chartInitialized) {
      initializeChart();
      chartInitialized = true; // Ensure the chart is initialized only once
    }
  });

  // Download the canvas as an image
  document.getElementById("download").addEventListener("click", () => {
    const canvas = document.getElementById("barChart");
    const image = canvas.toDataURL("image/png"); // Convert canvas to image data URL

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = image;
    link.download = "chart.png"; // Set the default file name
    link.click(); // Trigger the download
  });
});
