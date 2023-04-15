import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiTwotoneStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {RiShareBoxLine} from 'react-icons/ri'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    status: apiStatus.initial,
    jobItemDetailsData: [],
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({status: apiStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        jobDetails: {
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteUrl: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          id: data.job_details.id,
          jobDescription: data.job_details.job_description,
          lifeAtCompany: {
            description: data.job_details.life_at_company.description,
            imageUrl: data.job_details.life_at_company.image_url,
          },
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          rating: data.job_details.rating,
          skills: data.job_details.skills.map(eachSkill => ({
            name: eachSkill.name,
            imageUrl: eachSkill.image_url,
          })),
          title: data.job_details.title,
        },
        similarJobs: data.similar_jobs.map(eachItem => ({
          companyLogoUrl: eachItem.company_logo_url,
          employmentType: eachItem.employment_type,
          id: eachItem.id,
          jobDescription: eachItem.job_description,
          location: eachItem.location,
          rating: eachItem.rating,
          title: eachItem.title,
        })),
      }
      this.setState({
        jobItemDetailsData: updatedData,
        status: apiStatus.success,
      })
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSkillsView = () => {
    const {jobItemDetailsData} = this.state
    const {jobDetails} = jobItemDetailsData
    const {skills} = jobDetails
    return (
      <>
        <h1 className="skills-heading">Skills</h1>
        <ul className="skills-list-container">
          {skills.map(eachItem => (
            <li className="skill-container" key={eachItem.name}>
              <img
                src={eachItem.imageUrl}
                alt={eachItem.name}
                className="skill-img"
              />
              <p className="skill-name">{eachItem.name}</p>
            </li>
          ))}
        </ul>
      </>
    )
  }

  renderLifeAtCompanyView = () => {
    const {jobItemDetailsData} = this.state
    const {jobDetails} = jobItemDetailsData
    const {lifeAtCompany} = jobDetails
    const {description, imageUrl} = lifeAtCompany
    return (
      <div className="life-at-company-container">
        <div className="life-at-company-description-container">
          <h1 className="life-at-company-heading">Life at Company</h1>
          <p className="life-at-company-description">{description}</p>
        </div>
        <img
          src={imageUrl}
          alt="life at company"
          className="life-at-company-img"
        />
      </div>
    )
  }

  renderJobItemDetailsView = () => {
    const {jobItemDetailsData} = this.state
    const {jobDetails, similarJobs} = jobItemDetailsData
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      packagePerAnnum,
      employmentType,
      jobDescription,
      companyWebsiteUrl,
    } = jobDetails
    return (
      <>
        <div className="job-item-container">
          <div className="logo-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="title-container">
              <h1 className="job-title">{title}</h1>
              <div className="rating-container">
                <AiTwotoneStar className="star-icon" />
                <p className="job-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="salary-details-container">
            <div className="location-and-job-type-container">
              <div className="icon-container">
                <MdLocationOn className="icon-style" />
                <p className="icon-name">{location}</p>
              </div>
              <div className="icon-container">
                <BsBriefcaseFill className="icon-style" />
                <p className="icon-name">{employmentType}</p>
              </div>
            </div>
            <p className="salary">{packagePerAnnum}</p>
          </div>
          <hr className="h-line" />
          <div className="description-container">
            <h1 className="description">Description</h1>
            <a href={companyWebsiteUrl} className="website-link">
              Visit
              <RiShareBoxLine className="share-icon" color="#6366f1" />
            </a>
          </div>
          <p className="job-item-description">{jobDescription}</p>
          {this.renderSkillsView()}
          {this.renderLifeAtCompanyView()}
        </div>
        <div className="similar-jobs-container">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-list-container">
            {similarJobs.map(eachItem => (
              <SimilarJobs similarJobItem={eachItem} key={eachItem.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-msg">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="retry-btn"
        onClick={this.getJobItemDetails}
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderCorrespondingJobDetailsView = () => {
    const {status} = this.state
    switch (status) {
      case apiStatus.inProgress:
        return this.renderLoadingView()
      case apiStatus.success:
        return this.renderJobItemDetailsView()
      case apiStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-item-details-container">
        <Header />
        {this.renderCorrespondingJobDetailsView()}
      </div>
    )
  }
}

export default JobItemDetails
