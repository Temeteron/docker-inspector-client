# docker_inspector_client
The client part of a web based tool to interact and monitor docker containers

## Basic Info

- A web based client developed in Ionic 3, Angular 4
- Consumes REST API of [server](https://github.com/Temeteron/docker_inspector_server)

## Architecture

- Single Page Application

- Bottom right button that triggers modal
	- Contains list of available images to use to create a container
	- Input to Pull an image

- One list of components 'container'
	- Each component shows name of container, image name and Status
	- You can Start, Stop, Delete container from available buttons
	- Also there are buttons that will show the Stats and Logs of the containers
	- Those button doeasn't appear if container is not
	- When an action takes place in the component an event is emitted to inform parent about changea

- Component Stats
	- This component has as input a container and retrieves the statistics of the container every 5 seconds
	- One component 'Stats' can be active

- Component Logs
	- This component has as input a container and retrieves the logs of the container every 5 seconds
	- One component 'Logs' can be active
	- Log component prints out the last 10 logs

- Interface screenshot

![alt text](https://github.com/Temeteron/docker_inspector_client/blob/master/interaface.png)

## Get started
```
npm install -g ionic
npm i
ionic serve

// OR serve build folder, og:

cd build
python -m SimpleHTTPServer
```


## Improvements that could be done

- Create interfaces for all retrieved objects from the Docker SDK
- Additional CSS for component 'container', use flexbox
- Add green color on icons of stats,logs of container that are active. Currently there is a title on stats and logs to show which container's data are shown.
- Currently the list of the containers is updated when a change occurs inside one of the 'container' components.
	- A setInterval function was implemented to get list and update state of containers every 2 seconds.
	- This was a problem because of the lifecycle of the event emitters.
	- For example if a container is stopped it may not trigger the event to update the state of containers.
	- Nevertheless no problem occurs about the 'Stats' or 'Logs' section, that sections will remain freezed until another container triggers them.
	- The state will be updated in by the setIntrerval function.

