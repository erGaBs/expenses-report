import axiosClient from "./axiosClient";

const expensesService = {
  addExpense: async (expense) => {
    const token = JSON.parse(sessionStorage.getItem("user")).token;
    const response = await axiosClient.post("/expenses", expense, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  getExpenses: async () => {
    const token = JSON.parse(sessionStorage.getItem("user")).token;
    const response = await axiosClient.get("/expenses", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default expensesService;