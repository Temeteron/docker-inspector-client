# docker_inspector_client
The client part of a web based tool to interact and monitor docker containers

## Basic Info

- A web based client developed in Ionic 3, Angular 4
- Consumes REST API of [server](https://github.com/Temeteron/docker_inspector_server)

## Architecture

- Single Page Application

- Bottom right button that triggers modal
	- Contains list of available images to use to create a container
	- Pull a docker image by name
	- Delete docker image

- One list of components 'container'
	- Each component shows name of container, image name and Status
	- You can Start, Stop, Delete container from available buttons
	- Also there are buttons that will show the Stats and Logs of the containers
	- Those button doeasn't appear if container is not running
	- When an action takes place in the component an event is emitted to inform parent about changes and update list
	- The list is updated every TIME_TO_REFRESH from HomePage

- Component Stats
	- This component has as input a container and retrieves the statistics of the container every TIME_TO_REFRESH
	- One component 'Stats' can be active
	- If container has stopped component informs parent to deactivate it

- Component Logs
	- This component has as input a container and retrieves the logs of the container every TIME_TO_REFRESH
	- One component 'Logs' can be active
	- Log component prints out the last 10 logs

- Interface screenshot

![alt text](https://github.com/Temeteron/docker_inspector_client/blob/master/interaface.png)

## Get started
```
npm install -g ionic
npm i
ionic serve

// OR serve www folder, og:

cd www
python -m SimpleHTTPServer
```

## Improvements that could be done

- Create interfaces for all retrieved objects from the Docker SDK
- Add green color on icons of stats,logs of container that are active. Con: you will need a global state to sync properly.


