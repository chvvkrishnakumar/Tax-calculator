/* eslint-disable prefer-template */
import './index.css'

const Result = props => {
  const {onCal, taxbleTotal, income, personalDetails} = props

  const {Age, name, ResidentialStatus, Gender} = personalDetails
  let ITR = 'ITR-1'
  if (income.IFB === 0 && income.STCG !== 0 && income.LTCG !== 0) {
    ITR = 'ITR-2'
  } else if (income.IFB !== 0 && income.STCG !== 0 && income.LTCG !== 0) {
    ITR = 'ITR-3'
  } else if (taxbleTotal > 5000000 && income.IFB <= 20000000) {
    ITR = 'ITR-4'
  } else if (income.IFB > 20000000) {
    ITR = 'Refer ITR document (Not in our limits)'
  } else {
    ITR = 'ITR-1'
  }

  let tax = 0
  if (taxbleTotal <= 250000) {
    tax = ' No Tax'
  } else if (taxbleTotal <= 500000) {
    tax = ((taxbleTotal - 250000) / 100) * 5
  } else if (taxbleTotal <= 750000) {
    tax = ((taxbleTotal - 500000) / 100) * 10
  } else if (taxbleTotal <= 1000000) {
    tax = ((taxbleTotal - 750000) / 100) * 15
  } else if (taxbleTotal <= 1250000) {
    tax = ((taxbleTotal - 1000000) / 100) * 20
  } else if (taxbleTotal <= 1500000) {
    tax = ((taxbleTotal - 1250000) / 100) * 25
  } else {
    tax = ((taxbleTotal - 1500000) / 100) * 30
  }
  console.log(typeof tax)
  if (typeof tax !== 'string') {
    tax = 'Rs. ' + tax.toString()
  }

  const onHome = () => {
    onCal()
  }
  const suc =
    Age <= 60 ? (
      <div className="result">
        <p>
          Hello,<span>{name}</span>
        </p>
        <p>
          Age: <span>{Age}</span>
        </p>
        <p>
          Gender:<span>{Gender}</span>
        </p>
        <p>
          ResidentialStatus:<span> {ResidentialStatus}</span>
        </p>
        <p>
          Total Taxable Income Rs: <span>{taxbleTotal}</span>
        </p>
        <p>
          According to the Details you provided, You need to pay
          <span>{tax}</span>
        </p>
        <h3>
          ITR Form: <span>{ITR}</span>
        </h3>

        <button onClick={onHome} type="button">
          Back to Home
        </button>
      </div>
    ) : (
      <h1>This is only for age below 60 years</h1>
    )

  return suc
}

export default Result
