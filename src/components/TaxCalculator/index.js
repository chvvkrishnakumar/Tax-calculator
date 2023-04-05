/* eslint-disable no-lonely-if */
import {Component} from 'react'
import Result from '../ResultGenerator'
import './index.css'

const income = {
  BS: 0,
  HRA: 0,
  SP: 0,
  TA: 0,
  OA: 0,
  LTA: 0,
  reimburse: 0,
  PF: 0,
  TDS: 0,
  GARR: 0,
  MTP: 0,
  SD: 0,
  IPHL: 0,
  STCG: 0,
  LTCG: 0,
  II: 0,
  DI: 0,
  IFB: 0,
  AI: 0,
  OMI: 0,
}

const exemptions = {
  LIC: 0,
  PPF: 0,
  EPF: 0,
  NSC: 0,
  TSFD: 0,
  ELSS: 0,
  PRHL: 0,
  CTF: 0,
}

const personalDetails = {
  name: '',
  Age: '',
  Gender: 'Male',
  ResidentialStatus: 'Resident',
}

const exKeys = Object.keys(exemptions)
const keys = Object.keys(income)
console.log(keys)

class TaxCalculator extends Component {
  state = {taxbleTotal: 0, isButtonClicked: true}

  onBs = event => {
    income[event.target.id] = parseInt(event.target.value)
    // console.log(income.AI)
  }

  onEx = event => {
    exemptions[event.target.id] = parseInt(event.target.value)
    // console.log(income.AI)
  }

  onCalculate = () => {
    let sum = 0
    let allowances = 0
    keys.forEach(k => {
      if (k === 'HRA' || k === 'LTA' || k === 'MTP' || k === 'IPHL') {
        allowances += income[k]
      } else {
        if (k === 'GARR') {
          sum += (income[k] / 100) * 70
        } else {
          sum += income[k]
        }
      }
    })

    let ex = 0
    exKeys.forEach(e => {
      ex += exemptions[e]
    })

    this.setState({taxbleTotal: sum - allowances - ex})
    this.setState(prevState => ({isButtonClicked: false}))
  }

  onCal = () => {
    this.setState(prevState => ({isButtonClicked: true}))
  }

  person = event => {
    personalDetails[event.target.id] = event.target.value
    console.log(event.target.value)
  }

  render() {
    const {taxbleTotal, isButtonClicked} = this.state
    console.log(taxbleTotal)

    return isButtonClicked ? (
      <div>
        <h1 className="main-heading">INCOME TAX CALCULATOR</h1>

        <div className="sub">
          <div className="salary">
            <h1>Personal Details</h1>
            <div className="">
              <label htmlFor="name">Name</label>
              <input onChange={this.person} type="text" id="name" />
            </div>
            <div className="">
              <label htmlFor="Age">Age</label>
              <input id="Age" onChange={this.person} type="number" />
            </div>
            <div className="">
              <label htmlFor="Gender">Gender</label>
              <select onChange={this.person} id="Gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="">
              <label htmlFor="ResidentialStatus">Residential Status</label>
              <select onChange={this.person} id="ResidentialStatus">
                <option value="resident">Resident</option>
                <option value="non-resident">Non-Resident</option>
                <option value="resident but not-ordinary-resident">
                  Resident but not-ordinary resident
                </option>
              </select>
            </div>
          </div>

          <p className="err">
            *If you leave any field empty, By default it takes `0`
          </p>
          <div className="main">
            <div className="salary">
              <h1>Income from Salary</h1>
              <label htmlFor="BS">Basic Salary</label>
              <input onChange={this.onBs} id="BS" type="number" />
              <label htmlFor="HRA">House Rent Allowance (HRA)</label>
              <input onChange={this.onBs} id="HRA" type="number" />
              <label htmlFor="SP">Special Allowance</label>
              <input onChange={this.onBs} id="SP" type="number" />
              <label htmlFor="TA">Transport Allowance</label>
              <input onChange={this.onBs} id="TA" type="number" />
              <label htmlFor="OA">Other Allowances</label>
              <input onChange={this.onBs} id="OA" type="number" />
              <label htmlFor="LTA">Leave Travel Allowance (LTA)</label>
              <input onChange={this.onBs} id="LTA" type="number" />
              <label htmlFor="reimburse">
                Reimbursements (Medical, Fuel, etc.)
              </label>
              <input onChange={this.onBs} id="reimburse" type="number" />
              <label htmlFor="PF">
                Employer's Contribution to Provident Fund
              </label>
              <input onChange={this.onBs} id="PF" type="number" />
              <label htmlFor="TDS">Income Tax Deducted at Source (TDS)</label>
              <input onChange={this.onBs} id="TDS" type="number" />
            </div>
            <div className="salary">
              <h1>Income from House Property</h1>
              <label htmlFor="GARR">Gross Annual Rent Received</label>
              <input onChange={this.onBs} id="GARR" type="number" />
              <label htmlFor="MTP">Municipal Taxes Paid</label>
              <input onChange={this.onBs} id="MTP" type="number" />

              {/* <label htmlFor="SD">
                Standard Deduction (30% of Net Annual Value)
              </label>
              <input onChange={this.onBs} id="SD" type="number" /> */}
              <label htmlFor="IPHL">
                Interest Paid on Home Loan (if applicable)
              </label>
              <input onChange={this.onBs} id="IPHL" type="number" />
            </div>
            <div className="salary">
              <h1>Capital Gains</h1>
              <label htmlFor="STCG">Short-Term Capital Gains</label>
              <input onChange={this.onBs} id="STCG" type="number" />
              <label htmlFor="LTCG">Long-Term Capital Gains</label>
              <input onChange={this.onBs} id="LTCG" type="number" />
            </div>
            <div className="salary">
              <h1>Other Income</h1>
              <label htmlFor="II">
                Interest Income (Savings Account, Fixed Deposits, etc.)
              </label>
              <input onChange={this.onBs} id="II" type="number" />
              <label htmlFor="DI">
                Dividend Income - Rental Income (other than House Property)
              </label>
              <input onChange={this.onBs} id="DI" type="number" />
              <label htmlFor="IFB">Income from Business / Profession</label>
              <input onChange={this.onBs} id="IFB" type="number" />
              <label htmlFor="AI">Agricultural Income</label>
              <input onChange={this.onBs} id="AI" type="number" />
              <label htmlFor="OMI">Other Miscellaneous Income</label>
              <input onChange={this.onBs} id="OMI" type="number" />
            </div>

            <div className="salary">
              <br />
              <hr />
              <h1>Deductions and Exemptions</h1>
              <label htmlFor="LIC">Life Insurance Premium</label>
              <input onChange={this.onEx} id="LIC" type="number" />
              <label htmlFor="PPF">Public Provident Fund (PPF)</label>
              <input onChange={this.onEx} id="PPF" type="number" />
              <label htmlFor="EPF">Employee Provident Fund (EPF)</label>
              <input onChange={this.onEx} id="EPF" type="number" />
              <label htmlFor="NSC">National Savings Certificates (NSC)</label>
              <input onChange={this.onEx} id="NSC" type="number" />
              <label htmlFor="TSFD">Tax Saving Fixed Deposits</label>
              <input onChange={this.onEx} id="TSFD" type="number" />
              <label htmlFor="ELSS">Equity Linked Saving Scheme (ELSS)</label>
              <input onChange={this.onEx} id="ELSS" type="number" />
              <label htmlFor="PRHM">Principal Repayment on Home Loan</label>
              <input onChange={this.onEx} id="PRHM" type="number" />
              <label htmlFor="CTF">Children's Tuition Fees</label>
              <input onChange={this.onEx} id="CTF" type="number" />
            </div>
          </div>
          <button onClick={this.onCalculate} type="button">
            Calculate Tax
          </button>
        </div>
      </div>
    ) : (
      <Result
        onCal={this.onCal}
        taxbleTotal={taxbleTotal}
        personalDetails={personalDetails}
        income={income}
      />
    )
  }
}

export default TaxCalculator
