import { useState } from 'react';
import Entry from './Entry';
import Breakdown from './Breakdown';

function Ledger(props: any) {
  const [transactions, setTransactions] = useState<any>([]);
  const [entryCounter, setEntryCounter] = useState<number>(0);
  const [expensesSpent, setExpensesSpent] = useState<number>(0)
  const [discretionarySpent, setDiscretionarySpent] = useState<number>(0)
  const [savingsSpent, setSavingsSpent] = useState<number>(0)

  function clickHandler() {
    setEntryCounter(entryCounter + 1);
    const newTransaction = {
      id: entryCounter,
    };
    setTransactions([...transactions, newTransaction]);
  }

  const spent = (transaction) => {
    switch (true) {
      case transaction.category === 'expense':
        setExpensesSpent(expensesSpent + transaction.amount);
        break;
      case transaction.category === 'discretionary':
        setDiscretionarySpent(discretionarySpent + transaction.amount);
        break;
      case transaction.category === 'savings':
        setSavingsSpent(savingsSpent + transaction.amount);
        break;
        default:
    }
  }

  return (
    <div>
      <h2 className="title is-3">Transactions</h2>
      <div className="block">
        <button className="button is-info" onClick={clickHandler}>
          Add
        </button>
      </div>
      <div className="block">
        {transactions.map((transaction, index) => (
          <Entry key={index} id={transaction.id} callback={spent}/>
        ))}
      </div>
      <Breakdown
        expenses={props.expenses}
        discretionary={props.discretionary}
        savings={props.savings}
        expensesSpent={expensesSpent}
        discretionarySpent={discretionarySpent}
        savingsSpent={savingsSpent}
      />
    </div>
  );
}

export default Ledger;
