------------------------------------------------------------------

Hierarchy:


Components:

    - App: renders NavBar and routes

        - NavBar: provides different links for each route
                Links: /, /companies, /jobs, /profile, /companies/:handle
        
        - Routes: provide exact path to: /, /companies, /jobs, /profile, /companies/:handle
                as well as Redirect functionality.

            - / (Home): render a welcome message

            - /companies: 
                - Props: list of companies
                - render a search form
            
            - /companies/:handle
                - Props: name, description
                - calls helper component which uses params to render list of jobs
            
            - /jobs
                - Props: list of jobs
                - States: isApplied (useEffect after first render)
                - render a search form

            - /profile
                - render a form with initial value of current user's information

            - /login
                - render a form for login credential 
            
            - /signup
                - render a form for signing up an account
    
        - JoblyApp: 
            - State: isLoggedIn
            - function: handleLogin() 

            - Hompage:
                - render a welcome message if logged in, otherwise show login/signup 

            - SearchForm
                - Props: handleSearch()
                - State: formData
                - ({CompanyPage, JobPage} -> SearchForm)

            - CompaniesPage
                - States: List of companies
                - render SearchForm
                - render CompanyList
                - function handleSearch()
                - (CompaniesPage -> SearchForm, CompanyList)

            - CompanyList 
                - Props: List of companies
                - pass over a list of companies and render them
                - (CompaniesPage -> CompanyList -> Company)

            - JobsPage
                - States: List of jobs
                - render SearchForm
                - render JobList
                - function handleSearch()
                - (JobsPage -> SearchForm, JobList)

            - JobList
                - Props: List of jobs
                - pass over a list of jobs and render them
                - render searchForm
                - (JobsPage -> JobList -> Job)

            - Company
                - Props: name, description
                - useParams
                - render a company component 
                - (Company -> CompanyFilter -> CompanyDetail)

            - CompanyFilter
                - useParams 
                - helper component to find jobs associated with the company
                - (Company -> CompanyFilter -> CompanyDetail)

            - CompanyDetail
                - Props: name, description
                - render JobList
                - (Company -> CompanyFilter -> CompanyDetail)

            - Job
                - Props: title, companyInfo, salary, equity, 
                - States: isApplied
                - useEffect: everytime isApplied changes -> make ajax call to update database and DOM
                - function: handleApply()
                - render a job component 
                - (JobList -> Job)

            - ProfileOrSignupForm
                - Props: handleLogin() 
                - State: formData with initial value of user's info
                - function: handleChange() and handleSubmit()

            - LogInForm
                - Props: handleLogin() 
                - State: formData
                - function: handleChange() and handleSubmit()
 
                            

                    
        
