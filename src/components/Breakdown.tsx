function Breakdown(props: any) {

  return (
    <div>
      <h2 className="title is-3 mt-3">Breakdown</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Category</th>
            <th>To Spend</th>
            <th>Spent</th>
            <th>Remaining</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Expenses</td>
            <td>${props.expenses}</td>
            <td>${props.expensesSpent}</td>
            <td>${props.expenses - props.expensesSpent}</td>
          </tr>
          <tr>
            <td>Discretionary</td>
            <td>${props.discretionary}</td>
            <td>${props.discretionarySpent}</td>
            <td>${props.discretionary - props.discretionarySpent}</td>
          </tr>
          <tr>
            <td>Savings</td>
            <td>${props.savings}</td>
            <td>${props.savingsSpent}</td>
            <td>${props.savings - props.savingsSpent}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Breakdown;
