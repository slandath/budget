import { useState } from "react"
import Budget from "./Budget"

function Earnings() {
const [gross, setGross] = useState(0)

function earningsHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setGross(Number(e.target.value))
}

  return (
    <>
      <div className="column">
      <div className="field">
        <label htmlFor="earnings" className="label title is-3">Earnings</label>
        <div className="control">
        <input type="number" className="input" placeholder="$$$" id="earnings" onChange={earningsHandler} value={gross}/>
        </div>
      </div>
      </div>
      <Budget gross={gross}/>
      </>
  )
}

export default Earnings