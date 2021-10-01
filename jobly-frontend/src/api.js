import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 * 
 * @category API
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  /** This function return an json data returned from axios request
   * within this function.
   * 
   * @param {String} endpoint endpoint of an api.
   * @param {Object} data JSON body in Javascript object sending to server.
   * @param {String} method method for http request.
   * @returns data from axios calls
   */
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /*************** User Routes ***************/

  /** Get details on a user. 
   *
   * @param {String} username username that exist in database.
   * @returns {Object} User information from response 
   */
  
  static async getUserInfo(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }
  
  /** Registers a user and returns a token. 
   * 
   * @param {Object} userInfo Information about a newly created user.
   * @returns {String} A newly created token for this user. 
   */

  static async signUp(userInfo) {
    let res = await this.request(`auth/register`, userInfo, "post");
    this.token = res.token;
    return res.token;
  }

  /** Authenticates user credentials and returns a token.
   * 
   * @param {Object} credentials Object containing username and matching password.
   * @returns {String} An existing token for this user.
   */

  static async logIn(credentials) {
    let res = await this.request(`auth/token`, credentials, "post");
    this.token = res.token;
    return res.token;
  }
  
  /** Authenticates user credentials and returns a token.
   * 
   * @param {Object} userInfo User information used for updating provided user.
   * @param {String} username 
   * @returns {Object} Updated user information.
   */

  static async updateUser(userInfo, username) {
    let res = await this.request(`users/${username}`, userInfo, "patch");
    return res.user;
  }
  
  /** Apply to a job.
   * 
   * @param {String} username 
   * @param {Number} id Job id that will be applied on.
   * @returns {Object} Http response, the return value is not important in this function. 
   *                   But can be useful later on.
   */

  static async applyToJob(username, id) {
    let res = await this.request(`users/${username}/jobs/${id}`, {}, "post");
    return res;
  }

  /** Unapply to a job.
   * 
   * @param {String} username 
   * @param {Number} id Job id that will be applied on.
   * @returns {Object} Http response, the return value is not important in this function. 
   *                   But can be useful later on.
   */

  static async unApplyToJob(username, id) {
    let res = await this.request(`users/${username}/jobs/${id}`, {}, "delete");
    return res;
  }
  
  /** Gets user's list of applied jobs.
   * 
   * @param {String} username 
   * @returns {Object} An object containing list of jobs.
   */

  static async getAppliedJobs(username) {
    let res = await this.request(`users/${username}/jobs`);
    return res.jobs;
  }

  /*************** Company Routes ***************/
  
  /** Get details on all companies of filtered companies if there is a search term.
   * 
   * @param {String} term Search Term
   * @returns {Array} A list of companies in database.
   */

  static async getAllCompanies(term) {
    if (!term){
      let res = await this.request(`companies`);
      return res.companies;
    } else {
      let res = await this.request(`companies?name=${term}`);
      return res.companies;
    }
  }
  
  
  /** Get details on a company by handle.
   * 
   * @param {String} handle company handle(id)
   * @returns {Object} Ab object of company information.
   */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /*************** Job Routes ***************/

  /** Get details on all jobs.
   * 
   * @param {String} term Search term
   * @returns {Array} A list of jobs based on search term.
   */

  static async getAllJobs(term) {
    if (!term){
      let res = await this.request(`jobs`);
      return res.jobs;
    } else {
      let res = await this.request(`jobs?title=${term}`);
      return res.jobs;
    }
  }
  
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";


export default JoblyApi