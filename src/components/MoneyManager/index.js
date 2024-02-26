import {Component} from 'react'
import {v4} from 'uuid'

import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    transactionList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  deleteTransaction = id => {
    const {transactionList} = this.state
    const updatedTransactionDetails = transactionList.filter(
      eachItem => id !== eachItem.id,
    )

    this.setState({
      transactionList: updatedTransactionDetails,
    })
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachItem => eachItem.optionId === optionId,
    )
    const {displayText} = typeOption
    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onInputTitleChange = event => {
    this.setState({titleInput: event.target.value})
  }

  onInputAmountChange = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeOption = event => {
    this.setState({optionId: event.target.value})
  }

  getBalance = () => {
    const {transactionList} = this.state
    let balanceAmt = 0
    let incomeAmt = 0
    let expenseAmt = 0

    transactionList.forEach(eachItem => {
      if (eachItem.type === transactionTypeOptions[0].displayText) {
        incomeAmt += eachItem.amount
      } else {
        expenseAmt += eachItem.amount
      }
    })
    balanceAmt = incomeAmt - expenseAmt

    return balanceAmt
  }

  getIncome = () => {
    const {transactionList} = this.state
    let incomeAmt = 0
    transactionList.forEach(eachItem => {
      if (eachItem.type === transactionTypeOptions[0].displayText) {
        incomeAmt += eachItem.amount
      }
    })

    return incomeAmt
  }

  getExpense = () => {
    const {transactionList} = this.state
    let expensesAmt = 0

    transactionList.forEach(eachItem => {
      if (eachItem.type === transactionTypeOptions[1].displayText) {
        expensesAmt += eachItem.amount
      }
    })

    return expensesAmt
  }

  render() {
    const {transactionList, titleInput, amountInput, optionId} = this.state
    const balanceAmt = this.getBalance()
    const incomeAmt = this.getIncome()
    const expensesAmt = this.getExpense()

    return (
      <div className="bg-container">
        <div className="responsive-container">
          <div className="head-container">
            <h1 className="heading">Hi, Richard</h1>
            <p className="welcome-message">
              welcome back to your <span className="name">Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            balanceAmt={balanceAmt}
            incomeAmt={incomeAmt}
            expensesAmt={expensesAmt}
          />
          <div className="transaction-details">
            <form
              className="transaction-form"
              onSubmit={this.onChangeTransaction}
            >
              <h1 className="transaction-heading">Add Transaction</h1>
              <label className="label" htmlFor="title">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                className="input"
                value={titleInput}
                onChange={this.onInputTitleChange}
                placeholder="TITLE"
              />
              <label className="label" htmlFor="amount">
                AMOUNT
              </label>
              <input
                type="text"
                id="amount"
                value={amountInput}
                className="input"
                onChange={this.onInputAmountChange}
                placeholder="AMOUNT"
              />
              <label className="label" htmlFor="type">
                TYPE
              </label>
              <select
                id="select"
                className="input"
                value={optionId}
                onChange={this.onChangeOption}
              >
                {transactionTypeOptions.map(eachItem => (
                  <option key={eachItem.optionId} value={eachItem.optionId}>
                    {eachItem.displayText}
                  </option>
                ))}
              </select>
              <button
                className="button"
                type="button"
                onClick={this.onAddTransaction}
              >
                Add
              </button>
            </form>
            <div className="transactions-history">
              <h1 className="history">History</h1>
              <div className="table-container">
                <ul className="table">
                  <li className="table-header">
                    <p className="table-cell">Title</p>
                    <p className="table-cell">Amount</p>
                    <p className="table-cell">Type</p>
                  </li>
                  {transactionList.map(eachItem => (
                    <TransactionItem
                      key={eachItem.id}
                      transactionDetails={eachItem}
                      deleteTransaction={this.deleteTransaction}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
