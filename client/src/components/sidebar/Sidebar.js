import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Sidebar.scss";
import userImg from "./images/user.png";
import Leaderboard from "../leaderboard/Leaderboard";
import { ExpenseActions } from "../../Store/reducers/expense-reducer";

const Sidebar = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const auth = useSelector((state) => state.auth);
  const expense = useSelector((state) => state.expense);
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  useEffect(() => {
    (async function fetchLeaderboard() {
      const response = await fetch(`http://localhost:3001/user/leaderboard`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: token },
      });
      const res = await response.json();
      // console.log(res);
      dispatch(ExpenseActions.addLeaderboard(res.data));
    })();
  }, [expense.expenses.length, token, showLeaderboard, dispatch]);

  //leaderboard toggle
  const showLeaderBoardHandler = () => {
    setShowLeaderboard((p) => !p);
  };
  return (
    <div className="sidebar-outer-div-containing-leader-sidebar">
      <div className="Sidebar-container">
        <div className="user-img-txt-contnr">
          <img src={userImg} alt="" />
          <h4>{auth.email}</h4>
        </div>
        <ul>
          <li>Change Password</li>
          {auth.ispremiumuser && (
            <li onClick={showLeaderBoardHandler}>Leaderboard</li>
          )}
        </ul>
      </div>
      {showLeaderboard && (
        <div className="leaderboardContainer">
          <h3>Leaderboard</h3>
          <Leaderboard />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
