import React, { useEffect, useState } from "react";

// Modal component
const PaymentModal = ({ payment, onClose, onApprove }) => {
  if (!payment) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "50px",
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose} // close when clicking outside
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          width: "400px",
          textAlign: "center",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()} // prevent background close
      >
        <h4>Payment Details</h4>
        <p><strong>Amount:</strong> {payment.amount}</p>
        <p><strong>Currency:</strong> {payment.currency}</p>
        <p><strong>Provider:</strong> {payment.provider}</p>
        <p><strong>Bank:</strong> {payment.bank}</p>
        <p><strong>Swiftcode:</strong> {payment.swiftcode}</p>
        <p><strong>Account Number:</strong> {payment.accountnumber}</p>
   <p><strong>Status:</strong> {payment.status}</p>

        {payment.status === "Pending" && (
          <button
            className="btn btn-success"
            style={{ marginTop: "10px" }}
            onClick={() => onApprove(payment._id)}
          >
            Approve
          </button>
        )}
      <button
          className="btn btn-secondary"
          style={{ marginTop: "10px", marginLeft: "10px" }}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Child component to display a single payment row
const PaymentRow = ({ payment, onView, onDelete }) => {
  return (
    <tr>
      <td>{payment._id}</td>
      <td>{payment.amount}</td>
      <td>{payment.currency}</td>
      <td>{payment.provider}</td>
      <td>{payment.bank}</td>
      <td>{payment.swiftcode}</td>
      <td>{payment.accountnumber}</td>
      <td>{payment.status}</td>
      <td>
        <button
          className="btn btn-info btn-sm"
          onClick={() => onView(payment)}
        >
          View
        </button>
        <button
          className="btn btn-link text-danger"
          onClick={() => onDelete(payment._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default function PaymentList() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Fetch all payments
  // Fetch all payments - simplified
useEffect(() => {
  async function getPayments() {
    try {
      const response = await fetch("/api/payment");
      if (!response.ok)
        throw new Error(`An error occurred: ${response.statusText}`);
      const data = await response.json();
      
      setPayments(data); // Backend already ensures status exists
    } catch (error) {
      window.alert(error.message);
    } finally {
      setLoading(false);
    }
  }
  getPayments();
}, []);

  // Delete payment
  async function deletePayment(id) {
    const token = localStorage.getItem("jwt");
    if (!window.confirm("Are you sure you want to delete this payment?")) return;

    try {
      const res = await fetch(`/api/payment/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error(`Failed to delete payment: ${res.statusText}`);

      setPayments(payments.filter((p) => p._id !== id));
    } catch (error) {
      window.alert(error.message);
    }
  }

  // View modal
  function handleViewClick(payment) {
    setSelectedPayment(payment);
  }

  // Close modal
  function handleCloseModal() {
    setSelectedPayment(null);
  }

  // Approve payment (change status)
// Approve payment (change status in both frontend and backend)
// Approve payment (change status in both frontend and backend)
async function handleApprove(id) {
  const token = localStorage.getItem("jwt");
  
  try {
    const response = await fetch(`/api/payment/${id}`, {
      method: "PATCH", // Changed from PUT to PATCH
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status: "Submitted" })
    });

    if (!response.ok) throw new Error("Failed to update payment status");

    // Update frontend state only after successful backend update
    setPayments(prev =>
      prev.map(p => (p._id === id ? { ...p, status: "Submitted" } : p))
    );

    // Update modal immediately if open
    if (selectedPayment && selectedPayment._id === id) {
      setSelectedPayment(prev => ({ ...prev, status: "Submitted" }));
    }
  } catch (error) {
    window.alert(error.message);
  }
}
  if (loading) {
    return (
      <div className="container">
        <p>Loading payments…</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h3 className="header">Payments</h3>

      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Provider</th>
            <th>Bank</th>
            <th>Swiftcode</th>
            <th>Account Number</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 ? (
            <tr>
              <td colSpan={9}>No payments found.</td>
            </tr>
          ) : (
            payments.map((payment) => (
              <PaymentRow
                key={payment._id}
                payment={payment}
                onView={handleViewClick}
                onDelete={deletePayment}
              />
            ))
          )}
        </tbody>
      </table>

      {selectedPayment && (
        <PaymentModal
          payment={selectedPayment}
          onClose={handleCloseModal}
          onApprove={handleApprove}
        />
      )}
    </div>
  );
}