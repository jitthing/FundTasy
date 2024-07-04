const cron = require("node-cron");
import axios from "axios";

// Schedule a task to run at midnight every day
cron.schedule("0 0 * * *", updateBankBalance(), {
  scheduled: true,
  timezone: "Singapore",
});

function getDaysInCurrentMonth() {
  const now = new Date(); // Gets today's date
  const year = now.getFullYear(); // Extracts the year of today's date
  const month = now.getMonth(); // Extracts the month of today's date (0-indexed)

  // Get the last day of the current month
  const lastDayOfMonth = new Date(year, month + 1, 0);

  return lastDayOfMonth.getDate(); // Returns the day number of the last day
}

async function getDailyIncome() {
  const response = await axios.post(
    "http://localhost:8000/get_monthly_income",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }
  );
  const monthlyIncome = response.data;
  return monthlyIncome / getDaysInCurrentMonth();
}
async function updateBankBalance() {
  // Task logic here
  const response = await axios.post(
    "http://localhost:8000/update_bank_balance",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: {
        amount: getDailyIncome(),
      },
    }
  );
}
