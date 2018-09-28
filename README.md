# Portable Azure Functions
The Azure Functions runtime can be run in many environments. As an open-source project, you can use the exact same Azure Functions runtime locally, on Kubernetes, and on Azure. 

This simple example project outlines an easy set of steps to run an Azure Function in multiple environments. Below are steps to run the Azure Function:
 - Locally as an Azure Function
 - Locally as a Docker image
 - On Kubernetes
 - On Azure Functions (fully serverless)

This project includes a basic HTTP-triggered `Hello World` function (under http/index.js). If you are new to the Azure Functions programming model, this [developers guide](https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference) is helpful for learning important concepts.

_The function itself is a very standard Azure Function._ The only difference is the simple Dockerfile at the root of the function app.

➡️ Before getting started, remove `-REMOVE` from `local.settings.json-REMOVE` ⬅️     
The file should be named `local.settings.json`. This will now not be committed to source control. `local.settings.json` should never be committed to source control as it often contains connection strings and secrets. 

## Running your function locally
You can run your Azure function locally using the `func` command line tool. Alternatively, you can create a docker image and run that image locally.

### Running as an Azure Function locally
Prerequisites:
 - `node` - [Node.js](https://nodejs.org) v8+
 - `func` - command line tool for Azure Functions
    - Install using `npm i -g azure-functions-core-tools`. `npm` comes installed with [Node.js](https://nodejs.org)
 - _Recommended:_ [Visual Studio Code](https://code.visualstudio.com/download) and the Visual Studio Code [Azure Functions extension](https://code.visualstudio.com/tutorials/functions-extension/getting-started)

To run and breakpoint debug this function with Visual Studio Code:
 - Press `F5` 
 - Navigate to [http://localhost:7071/api/sayhello/My-Input](http://localhost:7071/api/sayhello/My-Input)

To run this function otherwise:
 - Run `func host start`
 - Navigate to [http://localhost:7071/api/sayhello/My-Input](http://localhost:7071/api/sayhello/My-Input)

### Run as a docker image locally
Prerequisites:
 - `docker` - Install docker [for Mac](https://docs.docker.com/docker-for-mac/install) or [for Windows](https://docs.docker.com/docker-for-windows/install)

To run this function in this environment:
 - From project root, run `docker build -t IMAGENAME .`
   - For example, for IMAGENAME, I use mhoeger/func-test-docker
 - Run `docker run -p 8080:80 -d IMAGENAME`
 - Navigate to [http://localhost:8080/api/sayHello/My-Input](http://localhost:8080/api/sayHello/My-Input)
 - Stop with `docker stop [IMAGE ID]`

## Run image on Kubernetes
Prerequisites:
 - Follow the prerequisites and steps for running an image locally
 - `kubectl` - install [from here](https://kubernetes.io/docs/tasks/tools/install-kubectl)
 - It is assumed that you have already deployed a Kubernetes instance and connected with `kubectl`
   - Alternatively, you can follow this tutorial to [deploy an Azure Kubernetes Service](https://docs.microsoft.com/en-us/azure/aks/kubernetes-walkthrough)

To run this function in this environment:
 - Publish your image to a registry service such as [Docker Hub](https://hub.docker.com) using `docker push IMAGENAME`
   - [Azure Container Registry](https://docs.microsoft.com/azure/container-registry) is also an option for enterprises
 - Create a Kubernetes deployment with the published image
   - For example: `kubectl run DEPLOYMENTNAME --replicas=5 --image=IMAGENAME --port=80`
 - Expose Kubernetes deployment
   - For example: `kubectl expose deployment DEPLOYMENTNAME --type=LoadBalancer --name=SERVICENAME`

### Other helpful commands 
To update an image on a deployment:
 - `kubectl set image deployments SERVICENAME SERVICENAME=NEW_IMAGENAME`

To delete a deployment:
 - Run `kubectl delete services SERVICENAME`
 - Run `kubectl delete deployment DEPLOYMENTNAME`

## Run serverless on Azure
You can deploy your Azure Function in one of the following ways:
 - Deploy using the Visual Studio Code [Azure Functions extension](https://code.visualstudio.com/tutorials/functions-extension/getting-started)
 - Link to your GitHub repository and set up a [continuous deployment](https://docs.microsoft.com/azure/azure-functions/functions-continuous-deployment) from that repo 
 - Deploy with other methods like [run from package](https://docs.microsoft.com/azure/azure-functions/run-functions-from-deployment-package)

## Do more!
 - Try different trigger types and explore input/output bindings using [extensions](https://docs.microsoft.com/azure/azure-functions/functions-triggers-bindings) to integrate with other Azure services
 - Use [Durable Functions](https://docs.microsoft.com/azure/azure-functions/durable-functions-overview) to define complex orchestration patterns with Functions using code (ex: fan-out/fan-in and async HTTP APIs)
