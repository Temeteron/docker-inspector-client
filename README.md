# docker_inspector_client
The client part of a web based tool to interact and monitor docker containers

## Basic Info

1) A web based client developed in Ionic 3, Angular 4
2) Consumes REST API of [server](https://github.com/Temeteron/docker_inspector_server)

## Architecture

1) Single Page Application

2) Bottom right button that triggers modal

	Contains list of available images to use to create a container

	Input to Pull an image

3) One list of components 'container'

	Each component shows name of container, image name and Status

	You can Start, Stop, Delete container from available buttons

	Also there are buttons that will show the Stats and Logs of the containers

	Those button doeasn't appear if container is not 

	When an action takes place in the component an event is emitted to inform parent about changea

4) Component Stats

	This component has as input a container and retrieves the statistics of the container every 5 seconds

	One component 'Stats' can be active

5) Component Logs

	This component has as input a container and retrieves the logs of the container every 5 seconds

	One component 'Logs' can be active

	Log component prints out the last 10 logs

6) Interface screenshot

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

1) Create interfaces for all retrieved objects from the Docker SDK
2) Additional CSS for component 'container', use flexbox
3) 