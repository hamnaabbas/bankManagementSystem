import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import BusinessAccount from "./components/BusinessAccount/BusinessAccount";
import AccountDetails from "./components/BusinessAccount/AccountDetails";
import RoleManagement from "./components/Permissions/RoleManagement";
import UserPermissions from "./components/Permissions/UserPermissions";
import PayrollManagement from "./components/Payroll/PayrollManagement";
import PayrollHistory from "./components/Payroll/PayrollHistory";
import TransactionList from "./components/Transactions/TransactionList";
import BulkTransactions from "./components/Transactions/BulkTransactions";
import InvoiceManagement from "./components/Invoices/InvoiceManagement";
import InvoiceDetails from "./components/Invoices/InvoiceDetails";
import LoanApplication from "./components/Loans/LoanApplication";
import LoanRepayment from "./components/Loans/LoanRepayment";
import Reports from "./components/Analytics/Reports";
import AnalyticsDashboard from "./components/Analytics/AnalyticsDashboard";
import Alerts from "./components/Notifications/Alerts";
import NotificationSettings from "./components/Notifications/NotificationSettings";
import AuthProvider  from "./context/AuthContext";
import  BusinessProvider  from "./context/BusinessContext";

const App = () => {
  return (
    <AuthProvider>
      <BusinessProvider>
        <Router>
          <Navbar />
          <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ flex: 1, padding: "20px" }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/business-accounts" element={<BusinessAccount />} />
                <Route path="/account-details/:id" element={<AccountDetails />} />
                <Route path="/role-management" element={<RoleManagement />} />
                <Route path="/user-permissions" element={<UserPermissions />} />
                <Route path="/payroll-management" element={<PayrollManagement />} />
                <Route path="/payroll-history" element={<PayrollHistory />} />
                <Route path="/transactions" element={<TransactionList />} />
                <Route path="/bulk-transactions" element={<BulkTransactions />} />
                <Route path="/invoices" element={<InvoiceManagement />} />
                <Route path="/invoice-details/:id" element={<InvoiceDetails />} />
                <Route path="/loan-application" element={<LoanApplication />} />
                <Route path="/loan-repayment" element={<LoanRepayment />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/analytics" element={<AnalyticsDashboard />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/notification-settings" element={<NotificationSettings />} />
              </Routes>
            </div>
          </div>
        </Router>
      </BusinessProvider>
    </AuthProvider>
  );
};

export default App;
