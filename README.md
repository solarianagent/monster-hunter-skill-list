# Monster Hunter Skill List
This project is for learning how to use web components and is not a fully featured application.

## Prerequisites
* You must have [Docker](https://docs.docker.com/get-docker) installed to use this

## How to Start
1. Clone the Repo
2. Run "npm install" from the application folder
3. Run "docker-compose up -d"
4. Go to localhost:8000 in your browser

## Configuration
If you need to change the port of the application server you can do so the "ports" section of "monster-hunter-ui" in the docker-compose.yml.
Just make sure when you bring up the browser you use the port you switched to so if you did

```yaml
 monster-hunter-ui:
    image: node:10
    working_dir: /home/node/app
    volumes: 
      - ./application/:/home/node/app
    ports: 
      - "4200:4200"
    command: npm start
```

You should open up "localhost:4200" instead to access the application.

## Tasks
- [ ] Create Skill Selector Component
- [ ] Add Base Component to index.html
- [ ] Capture Input from Skill Search Component and Update Suggestions
- [ ] Handle "Add" button from Skill Search Component
- [ ] Check added skill to see if it's valid before adding it to list
- [ ] Print out list in Skill List Component

## Notes:
* This application is not secure and is just made to show off web components
* You might usually use typescript with the ui and the node server for bigger applications
* This doesn't reflect best practices for any of the technologies used or application design in general
* This code will be modified until Sept 1st but how [How to Start](#how-to-start) should work regardless
* Code reflects a "finished" state at the moment and will be updated to allow you to do the work by Sept 1st
* Task List is Subject to Change