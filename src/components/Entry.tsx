function Entry() {
  return (
    <div className="container">
    <div className="columns is-mobile">
  <div className="column is-one-fifth">
    <div className="select">
      <select>
        <option>Expense</option>
        <option>Discretionary</option>
        <option>Savings</option>
      </select>
    </div>
  </div>
  <div className="column is-two-fifths">
    <input className="input" type="text" placeholder="Description" />
  </div>
  <div className="column is-one-fifth">
  <input className="input" type="number" placeholder="$$$" />
  </div>
  <button className="button is-success">Enter</button>
  <button className="button is-warning">Edit</button>
</div>
</div>
  )
}

export default Entry