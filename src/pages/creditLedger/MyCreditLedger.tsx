import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/hooks";
import { fetchCreditLedger } from "../../store/creditLedgerSlice";
import { RootState } from "../../store/store"; // ✅ Correct Import for RootState

import Navbar from "../../globals/components/navbar/Navbar";
import Footer from "../../globals/components/Footer/Footer";

const MyCreditLedger: React.FC = () => {
  const dispatch = useAppDispatch();

  const { creditLedger, isLoading, error } = useSelector(
    (state: RootState) => state.creditLedger
  );

  useEffect(() => {
    dispatch(fetchCreditLedger());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <p className="text-lg font-medium">Loading your credit ledger...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">My Credit Ledger</h2>

        {/* Credit Ledger Table */}
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">#</th>
              <th className="border p-2">Total Credit</th>
              <th className="border p-2">Paid Amount</th>
              <th className="border p-2">Remaining Amount</th>
              <th className="border p-2">Due Date</th>
              <th className="border p-2">Payment History</th>
            </tr>
          </thead>
          <tbody>
            {creditLedger.length > 0 ? (
              creditLedger.map((ledger, index) => (
                <tr key={ledger._id} className="text-center">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">${ledger.total_credit}</td>
                  <td className="border p-2">${ledger.paidAmount}</td>
                  <td className="border p-2">${ledger.remainingAmount}</td>
                  <td className="border p-2">{new Date(ledger.dueDate).toLocaleDateString()}</td>
                  <td className="border p-2">
                    {ledger.paymentHistory.length > 0 ? (
                      <ul className="list-disc text-left pl-4">
                        {ledger.paymentHistory.map((payment: any, idx: number) => (
                          <li key={idx}>
                            ${payment.amount} on {new Date(payment.date).toLocaleDateString()}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "No payment history"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="border p-4 text-center">
                  No credit ledger found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default MyCreditLedger;
