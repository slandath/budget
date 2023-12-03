import { useState } from 'react';

function Entry({ callback }) {
  const [entryAmount, setEntryAmount] = useState<number>(0);
  const [entryDescription, setEntryDescription] = useState<string>('');
  const [entryCategory, setEntryCategory] = useState<string>('expense');
  const [lockEntry, setLockEntry] = useState<boolean>(false);
  const [hideEntry, setHideEntry] = useState<string>("")

  function amountHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setEntryAmount(Number(e.target.value));
  }
  function descriptionHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setEntryDescription(e.target.value);
  }
  function categoryHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setEntryCategory(e.target.value);
  }

  function enterTransaction() {
    setLockEntry(true);
    const transactionDetails = {
      category: entryCategory,
      amount: entryAmount,
    };
    callback(transactionDetails);
  }

  function deleteTransaction() {
    const transactionDetails = {
      category: entryCategory,
      amount: entryAmount * -1,
    };
    callback(transactionDetails);
    setHideEntry('none');
  }

  return (

    <div className="columns is-mobile has-background-grey-lighter" style={{ display: hideEntry }}>
      <div className="column">
        <div className="select is-small">
          <select
            onChange={categoryHandler}
            value={entryCategory}
            disabled={lockEntry}
          >
            <option value="expense">Expense</option>
            <option value="discretionary">Discretionary</option>
            <option value="savings">Savings</option>
          </select>
        </div>
      </div>
      <div className="column is-two-fifths is-hidden-mobile">
        <input
          className="input is-small"
          type="text"
          placeholder="Description"
          value={entryDescription}
          onChange={descriptionHandler}
          disabled={lockEntry}
        />
      </div>
      <div className="column">
        <input
          className="input is-small"
          type="number"
          placeholder="$$$"
          value={entryAmount}
          onChange={amountHandler}
          disabled={lockEntry}
        />
      </div>
      <div className="column">
        <button
          className="button is-small is-success mr-2"
          onClick={enterTransaction}
          disabled={lockEntry}
        >
          &#x2714;
        </button>
        <button className="button is-small is-danger" onClick={deleteTransaction}>&#x2718;</button>
      </div>
    </div>
  );
}

export default Entry;
