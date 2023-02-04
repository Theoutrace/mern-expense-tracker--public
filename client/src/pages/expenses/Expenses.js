import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleExpense from "../../components/expenses/SingleExpense";
import { AuthActions } from "../../Store/reducers/auth-reducer";
import { ExpenseActions } from "../../Store/reducers/expense-reducer";
import warrenImg from "./images/warren.png";
import "./Expenses.scss";
import Sidebar from "../../components/sidebar/Sidebar";

const Expenses = () => {
  const expenses = useSelector((state) => state.expense.expenses);
  const auth = useSelector((state) => state.auth);
  const amountInputRef = useRef();
  const categoryInputRef = useRef();
  const descriptionInputRef = useRef();
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  useEffect(() => {
    (async function fetchExpenses() {
      const response = await fetch(`http://localhost:3001/expense`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then((res) => res.json());
      dispatch(ExpenseActions.addExpense(response.expenses));
    })();
  }, [expenses.length, dispatch, token]);

  useEffect(() => {
    const email = localStorage.getItem("email");
    dispatch(AuthActions.login(email));
  }, [auth.email, dispatch]);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (categoryInputRef.current.value === "Category") {
      alert("Select a category");
    } else {
      const ExpObj = {
        amount: amountInputRef.current.value,
        category: categoryInputRef.current.value,
        description: descriptionInputRef.current.value,
      };

      (async function postExpense() {
        const response = await fetch(
          `http://localhost:3001/expense/add-expense`,
          {
            method: "POST",
            body: JSON.stringify({
              amount: ExpObj.amount,
              category: ExpObj.category,
              description: ExpObj.description,
            }),
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        ).then((res) => res.json());
        dispatch(
          ExpenseActions.addExpense([...expenses, { ...response.expense }])
        );
      })();

      amountInputRef.current.value = "";
      categoryInputRef.current.value = "";
      descriptionInputRef.current.value = "";
    }
  };
  return (
    <div className="expense-page-container">
      <div className="sidebar-component-container">
        <Sidebar />
      </div>
      <div className="expense-page-comp-container">
        <form onSubmit={formSubmitHandler} className="exp-pge-form-compone">
          <div className="pointer-to-form-cnt"></div>
          <input ref={amountInputRef} placeholder="Amount" type="number" />
          <input
            ref={descriptionInputRef}
            placeholder="Description"
            type="text"
          />
          <select
            ref={categoryInputRef}
            required
            className="category-cat-tag-select"
          >
            <option>Category</option>
            <option>Food</option>
            <option>Petrol</option>
            <option>Party</option>
            <option>Savings</option>
            <option>Lendings</option>
          </select>
          <button>+ Add to list</button>
        </form>
        <div className="exp-containr-outer">
          <div className="all-exp-cntnr">
            {expenses.length > 0 ? (
              expenses.map((item) => {
                return (
                  <SingleExpense key={item.id} item={item} token={token} />
                );
              })
            ) : (
              <div className="no-expense-case-container">
                <h2>Nothing to display!</h2>
                <p>
                  ~ Do not save what is left after spending, but spend what is
                  left after saving ~
                </p>
                <img src={warrenImg} alt="" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
