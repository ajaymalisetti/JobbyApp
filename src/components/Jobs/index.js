// const apiUrl = 'https://apis.ccbp.in/jobs?employment_type=FULLTIME,PARTTIME&minimum_package=1000000&search='
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import JobItem from '../JobItem'
import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const apiJobStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    searchInput: '',
    minimumPackage: [],
    profileDetails: '',
    jobDetails: '',
    employmentType: [],
    profileStatus: apiStatus.initial,
    jobsStatus: apiJobStatus.initial,
  }

  componentDidMount() {
    this.getProfileView()
    this.getJobDetails()
  }

  getProfileView = async () => {
    this.setState({profileStatus: apiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const apiUrl = 'https://apis.ccbp.in/profile'
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const profileDetails = data.profile_details
      const updatedData = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        profileStatus: apiStatus.success,
        profileDetails: updatedData,
      })
    } else {
      this.setState({
        profileStatus: apiStatus.failure,
      })
    }
  }

  getJobDetails = async () => {
    this.setState({jobsStatus: apiJobStatus.inProgress})
    const {minimumPackage, employmentType, searchInput} = this.state
    const employmentDetails = employmentType.join(',')
    const salaryDetails = minimumPackage.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentDetails}&minimum_package=${salaryDetails}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const formattedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobDetails: formattedData,
        jobsStatus: apiJobStatus.success,
      })
    } else {
      this.setState({jobsStatus: apiJobStatus.failure})
    }
  }

  renderProfileView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt=" profile" className="profile-img" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  updateEmploymentType = (checked, type) => {
    if (checked) {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, type],
        }),
        this.getJobDetails,
      )
    } else {
      this.setState(
        prevState => ({
          employmentType: prevState.employmentType.filter(
            eachItem => eachItem !== type,
          ),
        }),
        this.getJobDetails,
      )
    }
  }

  renderEmploymentTypeView = () => (
    <div className="type-employment-container">
      <h1 className="sub-heading">Type of Employment</h1>
      <ul className="options-container">
        {employmentTypesList.map(eachItem => {
          const onClickCheckBox = event => {
            this.updateEmploymentType(
              event.target.checked,
              eachItem.employmentTypeId,
            )
          }
          return (
            <li className="option" key={eachItem.employmentTypeId}>
              <input
                className="check-box"
                id={eachItem.employmentTypeId}
                type="checkbox"
                onClick={onClickCheckBox}
              />
              <label
                className="option-label"
                htmlFor={eachItem.employmentTypeId}
              >
                {eachItem.label}
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  reSearchProfileDetails = () => {
    this.getProfileView()
  }

  renderProfileFailureView = () => (
    <div className="btn-container">
      <button
        type="button"
        className="retry-btn"
        onClick={this.reSearchProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  updateSalaryRange = (checked, salaryRangeId) => {
    if (checked) {
      this.setState(
        prevState => ({
          minimumPackage: [...prevState.minimumPackage, salaryRangeId],
        }),
        this.getJobDetails,
      )
    } else {
      this.setState(
        prevState => ({
          minimumPackage: prevState.minimumPackage.filter(
            eachItem => eachItem !== salaryRangeId,
          ),
        }),
        this.getJobDetails,
      )
    }
  }

  renderSalaryListView = () => (
    <div className="type-employment-container">
      <h1 className="sub-heading">Salary Range</h1>
      <ul className="options-container">
        {salaryRangesList.map(eachItem => {
          const onClickCheckBox = event => {
            this.updateSalaryRange(event.target.checked, eachItem.salaryRangeId)
          }
          return (
            <li className="option" key={eachItem.salaryRangeId}>
              <input
                className="check-box"
                id={eachItem.salaryRangeId}
                type="radio"
                name="salary"
                onClick={onClickCheckBox}
              />
              <label className="option-label" htmlFor={eachItem.salaryRangeId}>
                {eachItem.label}
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )

  correspondingProfileView = () => {
    const {profileStatus} = this.state

    switch (profileStatus) {
      case apiStatus.inProgress:
        return this.renderLoaderView()
      case apiStatus.success:
        return this.renderProfileView()
      case apiStatus.failure:
        return this.renderProfileFailureView()
      default:
        return null
    }
  }

  updateSearchInputValue = event => {
    this.setState({searchInput: event.target.value})
  }

  getNoJobsView = () => (
    <div className="no-jobs-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-img"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobCardsView = () => {
    const {jobDetails} = this.state
    return (
      <div className="jobs-container">
        {jobDetails.length === 0 ? (
          this.getNoJobsView()
        ) : (
          <ul className="jobs-list-container">
            {jobDetails.map(eachItem => (
              <JobItem jobData={eachItem} key={eachItem.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  jobsFailureView = () => (
    <div className="jobs-api-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="api-failure-img"
      />
      <h1 className="api-failure-heading">Oops! Something Went Wrong</h1>
      <p className="api-failure-msg">
        We cannot seem to find the page you are looking for
      </p>
      <button className="retry-btn" onClick={this.getJobDetails} type="button">
        Retry
      </button>
    </div>
  )

  renderJobsDetailsView = () => {
    const {jobsStatus} = this.state
    switch (jobsStatus) {
      case apiJobStatus.inProgress:
        return this.renderLoaderView()
      case apiJobStatus.success:
        return this.renderJobCardsView()
      case apiJobStatus.failure:
        return this.jobsFailureView()
      default:
        return null
    }
  }

  onClickSearchBtn = () => {
    this.getJobDetails()
  }

  render() {
    const {searchInput} = this.state

    return (
      <div className="jobs-container">
        <Header />
        <div className="job-content-container">
          <div className="job-details-container">
            <div className="section-container">
              <div className="mobile-search-input-container">
                <input
                  type="search"
                  className="search-input"
                  value={searchInput}
                  placeholder="Search"
                  onChange={this.updateSearchInputValue}
                />
                <button
                  type="button"
                  data-testid="searchButton"
                  className="search-btn"
                  onClick={this.onClickSearchBtn}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>

              {this.correspondingProfileView()}

              <hr className="line" />
              {this.renderEmploymentTypeView()}
              <hr className="line" />
              {this.renderSalaryListView()}
            </div>
            <div className="job-details-section-container">
              <div className="desktop-search-input-container">
                <input
                  type="search"
                  className="search-input"
                  value={searchInput}
                  placeholder="Search"
                  onChange={this.updateSearchInputValue}
                />
                <button
                  type="button"
                  data-testid="searchButton"
                  className="search-btn"
                  onClick={this.onClickSearchBtn}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              <div className="job-cards-container">
                {this.renderJobsDetailsView()}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
