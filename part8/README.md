# Part 8 - Deploying our app
## Table of Contents 
* [Previous: 7. Business Application Studio](../part7/7a.md)  
* **Current: 8. Deploying our app (optional)**   
* [Next: 9. Extending the SAP Fiori List Report](../part9/README.md)

For now, only we as a developer have access to our Fiori app. In order to provide it for other users as well, we have to deploy it to our SAP BTP ABAP Environment Trials. This will be our next step.

## Deploying Apps from SAP Business Application Studio to SAP BTP ABAP Environment Trial
In SAP Business Application Studio, for the SAP Fiori List Report project created previously, we will create a deploy configuration first and after that we will do the actual deployment to SAP BTP ABAP Environment Trial.

### Checking the deployment configuration
From the menu *Terminal>New Terminal* open a new terminal and in the terminal enter the command *npm run deploy*. In case that the file which contains the deployment configuration is not created yet, you will receive the following message *No deployment configuration has been detected. Run "npm run deploy-config" to add configuration first.*

### Creating the deployment configuration
In the terminal, enter the command *npm run deploy-config*. A wizard will then appear in the terminal. Enter the following information:

1. **Target**: ABAP
2. **Destination**: Use the default abap-cloud destination as used in the application generation.
3. **Name**: ZRAPH_##_TRVL (please keep in mind that the length is restricted to 15 characters)
4. **Package**: ZRAPH_UI_##_TRAVEL (please keep in mind that this package should be created in advance before performing the deployment itself, otherwise the deploy will fail)
5. **Transport Request**: TRLKXXXXXX (please keep in mind that this transport should already exist - you can reuse the one which you used for creating the other objects in SAP BTP ABAP Environment Trial) 
6. **Deployment Description**: Travel Management

After executing the last step from above, the *ui5-deploy.yaml* will be created into your repository with the provided information from above.

### Deploying the app to SAP BTP ABAP Environment Trial
Now we are ready to deploy the app. In order to do that, please run in the terminal the command *npm run deploy*.
During the deployment, first a build of the application will be triggered and then the build sources will be deployed to the SAP BTP ABAP Environment Trial with the build sources available in the *dist* folder.

In case that you subscribed to the *SAP Launchpad Service*, the application link provided in the deployment message, can be started and your app will be available at that link.

Congratulations! You have deployed your SAP Fiori List Report app to SAP BTP ABAP Environment Trial.

## Next step
[^ Top of page](#)  
[9. Extending the SAP Fiori List Report](../part9/README.md)