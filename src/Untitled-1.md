
## User creates IAM account
User is redirected to signup up, no redirectUrl
The account is created with label iam.
The user is redirected to IAM dashboard.

## Owner logs in to IAM dasborad
The user is redirected to singin page
The redirectUrl is empty
Enters email password
The backend checks if user has label iam
The user is redirected to dashboard

## IAM user adds company
The user adds company, provides: domain, name
The backend creates team and adds user as owner

## Owner adds singup button to his page
User click singup button on compan's page
User is redirect to IAM singup page with redirectUrl equal to company page

## User signs up to a company
User providers email and password
Domain name is read from redirectUrl and passed to backned
Backend searches team by domain name
Backned creates user account and adds user to a team as member

## User logs in to company page
The user is redirected to sign in page and logs in
The user is redirected back to company's page with session in url
The company's page save sesson with cookies
The page now can get user data from IAM to show protected content

## Member is added to company
The user is redirected to signup page
The redirectUrl contains comapny address
The account is created
The user is added to company's team as member
The user is redirected to signup page
User logs in
User is redirected to company's page

## Member tries to signup to not existing company
User is redirected to signup page
The redirectUrl contains company
The the team for company not found
The user gets error: company not exits.