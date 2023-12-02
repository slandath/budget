function Breakdown(props) {
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
            <td>$$$</td>
            <td>$$$</td>
          </tr>
          <tr>
            <td>Discretionary</td>
            <td>${props.discretionary}</td>
            <td>$$$</td>
            <td>$$$</td>
          </tr>
          <tr>
            <td>Savings</td>
            <td>${props.savings}</td>
            <td>$$$</td>
            <td>$$$</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Breakdown;
