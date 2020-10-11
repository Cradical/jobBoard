const apiEndpoint = 'http://localhost:9090/graphql'

async function gqlRequest(query, variables = {}) {
  const response = await fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const responseBody = await response.json()

  if (responseBody.errors) {
    console.log('body: ', responseBody)
    const message = responseBody.errors.map((error) => error.message).join('/n')
    throw new Error(message)
  }
  return responseBody.data
}

export async function fetchJobs() {
  const query = `query {
    jobs {
      id
      title
      company {
        id
        name
      }
    }
  }`
  const { jobs } = await gqlRequest(query)
  return jobs
}

export async function fetchJobById(id) {
  const query = `query JobQuery($id: ID!){
    job(id: $id) {
      id
      title
      company {
        id
        name 
      }
      description
    }
  }
`

  const { job } = await gqlRequest(query, { id })
  return job
}

export async function fetchCompanyById(id) {
  const query = `query CompanyQuery($id: ID!) {
    company(id: $id) {
      id
      name
      description
    }  
  }`

  const { company } = await gqlRequest(query, { id })
  return company
}
