import {AiTwotoneStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {similarJobItem} = props
  const {
    companyLogoUrl,
    rating,
    jobDescription,
    location,
    employmentType,
    title,
  } = similarJobItem
  return (
    <li className="similar-job-card">
      <div className="company-logo-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo"
        />
        <div className="company-rating-container">
          <h1 className="job-title">{title}</h1>
          <div className="company-rating">
            <AiTwotoneStar className="star-icon" />
            <p className="company-rating-line">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="description-heading">Description</h1>
      <p className="company-job-description">{jobDescription}</p>
      <div className="location-rating-container">
        <div className="icon-container">
          <MdLocationOn className="icon" color="#f1f5f9" />
          <p className="company-details">{location}</p>
        </div>
        <div className="icon-container">
          <BsBriefcaseFill className="icon" color="#f1f5f9" />
          <p className="company-details">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
