import {Link} from 'react-router-dom'
import {AiTwotoneStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobItem = props => {
  const {jobData} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
    location,
    title,
    rating,
  } = jobData
  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-card">
        <div className="logo-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
              <MdLocationOn className="icon" />
              <p className="icon-line">{location}</p>
            </div>
            <div className="icon-container">
              <BsBriefcaseFill className="icon" />
              <p className="icon-line">{employmentType}</p>
            </div>
          </div>
          <p className="salary-range">{packagePerAnnum}</p>
        </div>
        <hr className="h-line" />
        <h1 className="description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobItem
