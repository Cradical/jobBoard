import React, { Component } from 'react'
import { fetchCompanyById } from './functions/requests'

export class CompanyDetail extends Component {
  constructor(props) {
    super(props)
    this.state = { company: null }
  }

  async componentDidMount() {
    const { companyId } = this.props.match.params
    const company = await fetchCompanyById(companyId)
    this.setState({ company })
  }

  render() {
    const { company } = this.state
    return company ? (
      <div>
        <h1 className='title'>{company.name}</h1>
        <div className='box'>{company.description}</div>
      </div>
    ) : (
      <h1>Loading...</h1>
    )
  }
}
