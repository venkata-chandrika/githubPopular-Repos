import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

// import Cookies from 'js-cookie'

import './index.css'
// import {compose} from 'msw'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const apiStatusConsonants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    reposList: [],
    apiStatus: apiStatusConsonants.initial,
    activeId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getPopularRepos()
  }

  getPopularRepos = async () => {
    const {activeId} = this.state
    this.setState({
      apiStatus: apiStatusConsonants.loading,
    })
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeId}`,
    )
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      //   const jwtToken = data.jwt_token
      //   Cookies.set('jwt_token', jwtToken, {
      //     expires: 4,
      //   })
      const formattedData = data.popular_repos.map(eachObj => ({
        avatarUrl: eachObj.avatar_url,
        forksCount: eachObj.forks_count,
        id: eachObj.id,
        issuesCount: eachObj.issues_count,
        name: eachObj.name,
        starsCount: eachObj.stars_count,
      }))
      this.setState({
        apiStatus: apiStatusConsonants.success,
        reposList: formattedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConsonants.failure})
    }
  }

  updateActiveBtn = id => {
    this.setState(
      {
        activeId: id,
      },
      this.getPopularRepos,
    )
  }

  renderRepos = () => {
    const {reposList} = this.state
    // console.log(reposList)
    return (
      <ul className="repos-container">
        {reposList.map(eachItem => (
          <RepositoryItem key={eachItem.id} itemDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="image"
      />
      <h1>Something Went Wrong</h1>
    </>
  )

  renderGithubRepos = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConsonants.success:
        return this.renderRepos()
      case apiStatusConsonants.loading:
        return this.renderLoader()
      case apiStatusConsonants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {activeId} = this.state
    return (
      <div className="container">
        <h1 className="popular-heading">Popular</h1>
        <ul className="button-container">
          {languageFiltersData.map(eachData => (
            <LanguageFilterItem
              filterDetails={eachData}
              key={eachData.id}
              updateActiveBtn={this.updateActiveBtn}
              isActive={eachData.id === activeId}
            />
          ))}
        </ul>
        {this.renderGithubRepos()}
      </div>
    )
  }
}

export default GithubPopularRepos
