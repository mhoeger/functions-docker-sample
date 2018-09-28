FROM mcr.microsoft.com/azure-functions/node:2.0
COPY . /home/site/wwwroot
ENV AzureWebJobsScriptRoot=/home/site/wwwroot
ENV EnvironmentVariableExample シークレット