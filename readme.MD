
# Prerequisites
- Install Node (v16.13.0)
- Update the .env file with correct DB connection string.

# Building The App
Within the Mindstrong directory
- Open a terminal and run `npm run build-server`
- Open another new terminal and run `npm run build-client`

Your browser should open automatically. But if it doesn't check out **localhost:4200**.
Simply refreshing the page will reset the app.

<br/>
<br/>
<br/>

# Testing
Within the Mindstrong directory
- Open a terminal and run `npm run test`

<br/>
<br/>
<br/>

## Notes
- To save time I've used the same database for tests and the application. Normally I would use a test specific database.
- Authentication and Authorization requires ground work, so i've left that out for now.
- I've included the 'case' on the EHR model as this seems one to one. But the requirements specify saving a caseID. It wouldn't be hard to create a separate collection for cases and setting it that way, but this made sense to me.
- The Mindstrong/common/ folder would make sense as a separate NPM package, but leaving it for time.
- I've include the conditions and codes as a [code table file](./common/constants/conditions.ts).  If there were a requirement about those needing to be changed dynamically I would have made it part of the database. 