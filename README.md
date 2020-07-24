# Hiring Tracker

## Requirements
We are facing issues in tracking the hiring requests across the organization for the projects and the responses and status of the same from the hiring team. So, we need a digital platform where the people can request their need of the resources and the hiring team can work on the same while updating the status regularly.

## Solution
In the existing ERP product of the organization, we can build a new module named Hiring. Because the requests of resources are to the projects/teams, only Managers will have the access to create the hiring requests. Hiring team is notified of the requests and they can start working on them while updating the status every time there is an update. So, the hiring requests will be transparent across the organization and easy to track each of their status on demand.

## Installation and Downloads
### Git Commands
1. Clone git repository 
```bash
git clone <url>
```
2. Initailze git
```bash
git init
```
3. Check git status
```bash
git status
```
4. Add file to the repository
```bash
git add .
```
5. Add commit 
```bash
git commit -m 'write your commit statement'
```
6. Push code to git repository
```bash
git push
```

### Font Awesome
Use [Font Awesome](https://fontawesome.com/) for adding some icons for the application.
In this application [bars](https://fontawesome.com/icons/bars?style=solid), [times](https://fontawesome.com/icons/times?style=solid) and [plus](https://fontawesome.com/icons/plus?style=solid) icon is used.

### Node Js 
Install/ Download [Node.js](https://nodejs.org/en/download/) here.
1. Check Node.js
```bash
node -v
```
2. Check npm
```bash
npm -v
```
3. Initialize npm
```bash
npm init
```
### Express
Run following command to install express.
```bash
npm install express --save
```
### MySQL
Run following command to install MySQL.
```bash
install mysql --save
```
### MySQL Workbench
Download [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) here.
### Apache Tomcat
Downlaod [Apache Tomcat](https://tomcat.apache.org/download-80.cgi) here.
### Putty 
Download [Putty](https://www.putty.org/) for working on Ubuntu instance created on AWS EC2 instance.
### WinSCP
Download [WinSCP](https://winscp.net/eng/download.php) for transfering files from windows machine to Ubuntu instance.

## Workflow
-	Hiring module will be a new module added to ERP to which can be navigated through the left side nav bar to the modules.
-	Users (Managers/HRs) can see a table with the list of all hiring requests (none if no requests). Provision to add a new hiring request through an Add (+) button which navigates to the form.
-	Only the managers can add a new hiring request and hence the button should be visible/enabled only to the Managers.
-	On clicking the Add (+) button, a form requesting to fill the required fields will open. 
-	Once the request is submitted, a notification email triggers to the hiring team of the same with the unique request ID.
-	One of the persons from hiring team based on the request details will take it up and mention their name as the Point of Contact.
-	Managers & Hiring team personnel can update the request details based on the requirement changes and status. An edit action button is provided to do the same where the form with the prefilled values will be displayed.
-	Once the required positions are hired, the request status will be updated to Closed.

## Project Development Process
-	We use GitHub for the version management of the code and for the team collaboration.
-	The basic tech stack we could use for this module are:
-	__Frontend:__ HTML5, CSS3, JavaScript, jQuery, Bootstrap, Font Awesome.
-	__Backend:__ NodeJS, Apache Tomcat.
-	__Database:__ MySQL.
-	Team will have the development platform setup on their local machines while contributing their codes through pull requests on GitHub.
-	A final deployment will be done on a cloud/shared server.
-	Frontend will be deployed on a web server
-	Backend will be deployed on the node server itself which exposes the API end points.
-	Final project is deployed on AWS EC2 instance and RDS instance is connected to MySQL workbench.

## Design 
