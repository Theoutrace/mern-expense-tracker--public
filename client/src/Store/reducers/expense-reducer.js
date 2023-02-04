import { createSlice } from "@reduxjs/toolkit";

const ExpenseSlice = createSlice({
  name: "expense",
  initialState: { expenses: [], leaderboard: [] },
  reducers: {
    addExpense(state, action) {
      state.expenses = action.payload;
    },
    addLeaderboard(state, action) {
      state.leaderboard = action.payload;
    },
  },
});

export const ExpenseActions = ExpenseSlice.actions;
export default ExpenseSlice.reducer;
