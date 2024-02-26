// Write your code here
import './index.css'

const Transaction = props => {
  const {transactionDetails, deleteTransaction} = props
  const {id, title, amount, type} = transactionDetails

  const onDeleteTransaction = () => {
    deleteTransaction(id)
  }

  return (
    <li className="transactions-details">
      <p className="item">{title}</p>
      <p className="item">Rs {amount}</p>
      <p className="item">{type}</p>
      <button
        className="delete-button"
        type="button"
        onClick={onDeleteTransaction}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-image"
        />
      </button>
    </li>
  )
}

export default Transaction
