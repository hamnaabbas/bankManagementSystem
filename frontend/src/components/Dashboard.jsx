import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAccounts } from "../store/businessSlice";
import apiClient from "../services/apiClient";

const Dashboard = () => {
  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.business.accounts);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await apiClient.get("/business-accounts");
        dispatch(setAccounts(response.data));
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, [dispatch]);

  return (
    <div>
      <h2>Business Dashboard</h2>
      {accounts.length > 0 ? (
        <ul>
          {accounts.map((account) => (
            <li key={account.id}>
              {account.name}: ${account.balance}
            </li>
          ))}
        </ul>
      ) : (
        <p>No accounts available</p>
      )}
    </div>
  );
};

export default Dashboard;
