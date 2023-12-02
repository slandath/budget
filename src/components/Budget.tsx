function Budget() {
  return (
<div className="container">
        <div className="column">
          <h2 className="title is-3">Budget</h2>
          <div className="field">
            <label htmlFor="expensesPercent" className="label">
              Expenses %
            </label>
            <div className="control">
              <input type="number" className="input" id="expensesPercent" />
            </div>
          </div>
          <div className="field">
            <label htmlFor="discretionaryPercent" className="label">
              Discretionary %
            </label>
            <div className="control">
              <input
                type="number"
                className="input"
                id="discretionaryPercent"
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="savingsPercent" className="label">
              Savings %
            </label>
            <div className="control">
              <input type="number" className="input" id="savingsPercent" />
            </div>
          </div>
          <h3 className="title is-4">Breakdown</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Expenses</td>
                <td>$$$</td>
              </tr>
              <tr>
                <td>Discretionary</td>
                <td>$$$</td>
              </tr>
              <tr>
                <td>Savings</td>
                <td>$$$</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  )
}

export default Budget