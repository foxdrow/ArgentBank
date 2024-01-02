import "./Account.scss";

const Account = ({ accountName, accountAmount, accountAmountDescription }) => {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{accountName}</h3>
        <p className="account-amount">{accountAmount}</p>
        <p className="account-amount-description">{accountAmountDescription}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  );
};
export default Account;
