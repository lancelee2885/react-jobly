import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

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

  /** Get details on a user. */
  
  static async getUserInfo(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }
  
  /** Registers a user and returns a token. */

  static async signUp(userInfo) {
    let res = await this.request(`auth/register`, userInfo, "post");
    return res.token;
  }

  /** Authenticates user credentials and returns a token. */

  static async logIn(credentials) {
    let res = await this.request(`auth/token`, credentials, "post");
    return res.token;
  }
  
  /** Apply to a job. */

  static async applyToJob(username, id) {
    let res = await this.request(`${username}/jobs/${id}`, {}, "post");
    return res;
  }

  /*************** Company Routes ***************/
  
  /** Get details on all companies. */

  static async getAllCompanies() {
    let res = await this.request(`companies`);
    return res.companies;
  }
  
  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /*************** Job Routes ***************/

  /** Get details on all jobs. */

  static async getAllJobs() {
    let res = await this.request(`jobs`);
    return res.jobs;
  }
  

}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";
