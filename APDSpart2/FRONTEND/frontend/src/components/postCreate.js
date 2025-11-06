// We will also need to update the login.js file.
import { useState } from "react";
import { useNavigate } from "react-router";
export default function () {
  const [form, setForm] = useState({
    name: "",
    password: "",
    amount:"",
    currency:"",
    provider:"",
    bank:"",
    branchcode:"",
    accountnumber:"",
    swiftcode:"",
  });
  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    // Pass along the form data to the API on our backend.
    const newpayment = { ...form };

     await fetch("/api/payment/makepayment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newpayment),
    }).catch(error => {
      window.alert(error);
      return;
    });

   // const data = await response.json();
  //  const { token, name } = data;
  //  console.log(name, token);

    // Save the JWT to localstorage
  //  localStorage.setItem("jwt", token);

    // Optionally, save the username if needed
  //  localStorage.setItem("user", name);

    setForm({ amount:"",currency:"",provider:"",bank:"",branchcode:"",accountnumber:"",swiftcode:"" });
    navigate("/");
  }

  return (
   
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Enter Amount</label>
          <input
            type="text"
            className="form-control"
            id="amount"
            value={form.amount}
            onChange={(e) => updateForm({ amount: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Select Currency</label>
          <input
            type="password"
            className="form-control"
            id="currency"
            value={form.currency}
            onChange={(e) => updateForm({ currency: e.target.value })}
          />
        </div>
         <div className="form-group">
          <label htmlFor="name">Enter Provider</label>
          <input
            type="text"
            className="form-control"
            id="provider"
            value={form.provider}
            onChange={(e) => updateForm({ provider: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Enter Bank</label>
          <input
            type="password"
            className="form-control"
            id="bank"
            value={form.bank}
            onChange={(e) => updateForm({ bank: e.target.value })}
          />
        </div>
         <div className="form-group">
          <label htmlFor="name">Enter Branch Code</label>
          <input
            type="text"
            className="form-control"
            id="branchcode"
            value={form.branchcode}
            onChange={(e) => updateForm({ branchcode: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Enter Account Number</label>
          <input
            type="password"
            className="form-control"
            id="accountnumber"
            value={form.accountnumber}
            onChange={(e) => updateForm({ accountnumber: e.target.value })}
          />
        </div>
         <div className="form-group">
          <label htmlFor="name">Enter Swiftcode</label>
          <input
            type="text"
            className="form-control"
            id="swiftcode"
            value={form.swiftcode}
            onChange={(e) => updateForm({swiftcode: e.target.value })}
          />
        </div>

        <br></br><br></br><br></br>
        <div className="form-group">
          <input
            type="submit"
            value="Make Payment"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
