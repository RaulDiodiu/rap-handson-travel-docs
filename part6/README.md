# Part 6 - Creating the SAP Fiori List Report app


## Requirement 
As our FrontEnd team is not able to provide something in time, we will simply create a quick application on our own as this can be achieved pretty easy – even for a BackEnd developer with no UI5 skills. Basically, we want to implement exactly what we’ve just seen in the Fiori App Preview of the Service Binding. This is using the SAP Fiori Elements floorplan “List Report Object Page" which we’ll create ourselves now. 

## Implementation

### Create the SAP Fiori List Report in the FrontEnd
Before starting creating the SAP Fiori List Report application, make sure that the *Step 6 - Install SAP Business Application Studio* from the [Installation Guide](../installation/Installation.md) is succesfully completed and your SAP Business Application Studio is connected to Cloud Foundry.

**Important:** Seemingly, the SAP Business Application Studio is not running as expected in some browsers, specifically in Mozilla's _Firefox_. Therefore, **please use Google Chrome** (which is recommended by SAP) for all future modifications with the BAS!

As our Service Bindings/OData service is working fine, let’s use it within a SAP Fiori app. As the app doesn’t even exist yet, let’s create (or more precisely generate) it. Therefore, access the SAP Business Application Studio via your browser and from the main screen select the tile *Start from template - Create a new project*:

![Web IDE](images/image6_1.png)

Now choose the *SAP Fiori Application* in the *Select Template and Target Location* step of the Application Wizard provided by SAP Fiori Tools and press *Start*.

![alt](images/image6_2.png)

As part of the *Florplan Selection* step, we will pick the *List Report Object Page* floorplan and finally press *Next*.

![alt](images/image6_3.png)

In the next step, the *Data Source* (your SAP BTP ABAP Environment Trial) and *Service* will be selected. The Data Source type in our case will be *Connect to a System*.

![alt](images/image6_4.png)

Please provide now your default connection to your SAP BTP ABAP Environment Trial (it follows the naming convention *abap-cloud-default_abap_trial-accountid-space*) and your Service Binding created previously in the part [5. Publishing the Business Service](../part5/README.md) and finally press *Next*.

![alt](images/image6_5.png)

In the *Entity Selection* step, we have to provide as *Main entity* the *Travel* entity and in *Navigation entity* please provide *None* since related navigation from the main entity to the child entities will be provided from backend via UI annotations.

![alt](images/image6_6.png)

As final step, the project attributes will be provided as follow:

![alt](images/image6_7.png)

Now press Finish and wait for the magic to happen. After few seconds your first SAP Fiori List Report app was generated and can be opened by using *Open Folder* in SAP Business Application Studio and finally the project will be available as part of a new workspace.

![alt](images/image6_8.png)

Let's preview the just generated SAP Fiori List report app, by right clicking on the *webapp* folder and using the option *Preview Application*.

![alt](images/image6_9.png)

In the appearing pop-up select the npm script *start* and now your freshly created app will start. This may take few minutes until it starts, but finally your app will appear in an additional browser section. You have to know that you have to disable the popup blocker (if necesarry) and preview the app again.

The app is opening and looking exactly as we saw it previously when testing the Service Binding. As we didn’t change any code, this is quite obvious. Anyways we’re e.g. able able to change the selected columns manually by clicking on Settings and selecting them. Those settings allows some out-of-the-box functionality for the user without us having to code anything at all. For example, changing selected fields or arranging their order, sorting, grouping and filtering. 

![alt](images/image6_10.png)



## Next step
[6b. Defining Object Page Sections for Child Entities](6b.md)