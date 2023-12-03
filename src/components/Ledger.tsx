interface MyProps {
expenses: number,
discretionary: number,
savings: number,
}

import { useState } from 'react';
import Entry from './Entry';
import Breakdown from './Breakdown';

function Ledger(props: MyProps) {
  const [transactions, setTransactions] = useState([{
    category: "",
    amount: 0
  }]);
  const [expensesSpent, setExpensesSpent] = useState<number>(0);
  const [discretionarySpent, setDiscretionarySpent] = useState<number>(0);
  const [savingsSpent, setSavingsSpent] = useState<number>(0);

  function clickHandler() {
    const newTransaction = {
      category: "",
      amount: 0
    }
    setTransactions([...transactions, newTransaction]);
  }

  const spent = (transaction: {category: string; amount: number}) => {
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
  };

  return (
    <div>
      <Breakdown
        expenses={props.expenses}
        discretionary={props.discretionary}
        savings={props.savings}
        expensesSpent={expensesSpent}
        discretionarySpent={discretionarySpent}
        savingsSpent={savingsSpent}
      />
      <h2 className="title is-3 mt-3">Transactions</h2>
      <div className="block">
        <button className="button is-info" onClick={clickHandler}>
          Add
        </button>
      </div>
      <div className="block">
        {transactions.map(() => (
          <Entry callback={spent} />
        ))}
      </div>
    </div>
  );
}

export default Ledger;
