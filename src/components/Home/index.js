import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="content-container">
      <div className="content">
        <h1 className="heading">Find The Job That Fits Your Life</h1>
        <p className="description">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job thats fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="submit" className="find-jobs-btn">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home
