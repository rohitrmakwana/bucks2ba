document.addEventListener("DOMContentLoaded", () => {
  // Input with id "username" on change event
  const usernameInput = document.getElementById("username");
  usernameInput.addEventListener("input", () => {
    const username = usernameInput.value;
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    usernameInput.style.borderColor = regex.test(username) ? "green" : "red";
  });

  let chartInitialized = false;

  // Define months globally within the initializeChart function scope
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

  // Function to initialize the chart
  const initializeChart = () => {
    const ctx = document.getElementById("barChart").getContext("2d");

    // Function to retrieve income and expenses for each month
    const getMonthlyData = () => {
      const incomeData = months.map(month => {
        const incomeInput = document.getElementById(`${month}-income`);
        return incomeInput ? parseFloat(incomeInput.value) || 0 : 0;
      });

      const expensesData = months.map(month => {
        const expensesInput = document.getElementById(`${month}-expenses`);
        return expensesInput ? parseFloat(expensesInput.value) || 0 : 0;
      });

      return { incomeData, expensesData };
    };

    const { incomeData, expensesData } = getMonthlyData();

    const data = {
      labels: months.map(
        month => month.charAt(0).toUpperCase() + month.slice(1)
      ),
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

    const config = {
      type: "bar",
      data,
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
  };

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
    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = "chart.png";
    link.click();
  });
});
