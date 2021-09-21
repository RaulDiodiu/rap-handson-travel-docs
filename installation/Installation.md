# Installation Guide: SAP Trial, Eclipse and Business Application Studio

## Preparing for the ERP Praktikum
For our course we will rely on SAP's Business Technology Platform Trial ABAP Environment. To get ready for developing we have to set up some things first:  
1. Register for a SAP BTP Trial Account (~10min)  
2. Create a ABAP Trial Environment (~5min)  
3. Install Eclipse with ABAP Development Tools and the Git Plugin (~15min)  
4. Add the BTP Trial as ABAP Project to Eclipse and create a package (~10min)  
5. Import some required development objects from Git (~15min, may be optional)  
6. Install SAP Business Application Studio (~10min)

### 1. SAP BTP Trial Account
First, we will register for a BTP Trial Account. Therefore, go to
[SAP's website](https://www.sap.com/index.html) and register for an SAP account at the top right (you can provide 'University of Passau' as company, 'Training' as department and 'Student' as relationship). After confirming the mail you have to set a password and then log in.

Next, you have to register for the BTP Trial itself. Go to the [BTP Cockpit](https://account.hanatrial.ondemand.com/trial/). If you close this tab after logging in and being asked for a phone number you might be lucky and won't be asked for a phone number when opening the link a second time - otherwise please provide your phone number. Select *Europe (Frankfurt) - AWS* as your region and continue - the generation of your account might take roughly two minutes.

Afterwards, click *Go To Your Trial Account* to get started - the opened Cockpit might be a useful browser bookmark!

### 2. ABAP Trial
With our SAP BTP Trial Account up and running we now want to oboard to the ABAP Environment Trial. Enter the [BTP Cockpit](https://account.hanatrial.ondemand.com/trial/) (or stay where you've ended the first substep).

Click *Boosters* on the left, use the search and start *Prepare an Account for ABAP Trial*. After a minute you should get a success message and store the *Service Key* on your computer - this will be needed to connect the ABAP Trial with Eclipse later on.

You can close the BTP Cockpit now.

### 3. Install Eclipse with ABAP Development Tools
Next, we have to install the local development environment. For this, SAP switched from their own solution to the Eclipse IDE with an ABAP Development Tool plugin.

Go to [Eclipse 2021-09](https://www.eclipse.org/downloads/packages/release/2021-09/r/eclipse-ide-java-developers) and download the installer fitting your operating system. Obviously, you'll have to install the downloaded file afterwards (Select *Eclipse IDE for Java Developers* if asked). The default installation settings should fit our needs and remain unchanged.

When the installation finished you can launch Eclipse. You will be asked for a workspace and can set this as default for the future.

Now we'll install the ABAP Development Tools: Click *Help* > *Install new Software...* in Eclipse and enter https://tools.hana.ondemand.com/2021-09/ into the field *Work with*. Click *Add...* and store the plugin URL under the name *ADT*. After adding, the available tools will be loaded. Active the checkbox for *ABAP Development Tools* and click on *Next >*. On the following page again *Next >*, then accept the license terms and click *Finish*. You'll see the installation progress in the lower right corner of Eclipse. In some cases you have to explicitly state that you're trusting the signers SAP and Eclipse. After the installation Eclipse has to be restarted. Close the welcome tab and open the ABAP perspective by clicking *Window* > *Perspective* > *Open Perspective* > *Other* > *ABAP*.

### 4. Add the BTP Trial as ABAP Project to Eclipse and create a package
#### Connecting Eclipse with BTP
Now we will add the previously created ABAP Trial instance as ABAP Project in Eclipse. If you have already opened the ABAP perspective before you are already good to go: Click on *Create an ABAP cloud project* in the *Project Explorer* on the left.

Here you have to select the option using a *Service Key* and continue with *Next >*. Click *Import...* on the next screen and select the service key file *default_key.json* which you've downloaded to your computer previously. Click *Next >* and then *Open Logon Page in Browser*. Here you might have to log into your new SAP Account again to verfiy the connection. When asked use *EN* as logon language and click *Finish*.

#### Creating a development package
You've successfully connected your development IDE with the ABAP Environment in the Business Technology Platform. Next, we will create a package and associated transport request. This package will be used to store all your development objects which we'll create during this course. To do so, right click on your new ABAP Project and select *New* > *ABAP Package*.

![alt](images/image0_1.png)  

On the *Next >* wizard page, assign the Name `ZRAPH_##_TRAVEL` where the `##` has to be replaced with your personal *initials*. This ensures that everybody has his own package and we don't interfere with each others - we'll use the `##` throughout the course! The superpackage will stay ZLOCAL and you can check the box to save this as favorite package for easier access.

![alt](images/image0_2.png)

Continue with *Next >* and select the radio button *Create a new request* where you should provide some meaningful *Request Description* and can complete the wizard by pressing *Finish*. This transport request is required as you would normally e.g. transport such packaged changes from a development to a test system. In our case this won't happen but is necessary nontheless.

![alt](images/image0_3.png)

With this, you've completed the fourth preparation step.

### 5. Import some required development objects from Git
>**Note** This step might be superfluos. BTP Accounts are automatically distributed across different instances. So it could be that our required objects have already been imported from Git by another student. To check, if those objects are already available, please do the following: Mark the ABAP Project in Eclipse on the left and click `Ctrl + Shift + A`. Type `ZRAPH_HOTEL_NAME`. If you find two matches, you can skip this subchapter and continue with subchpater 6 to configure BAS. **If no files are found, you'll have to do the following steps!**

As you'll have to import a Git project to your ABAP system we'll need to install the abapGit plugin. Here you have follow the same steps as with the ADT installation - this time using the URL https://eclipse.abapgit.org/updatesite/. Select *abapGit for ABAP Development Tools (ADT)* for installation. Again accept the terms, trust the signers and restart Eclipse after the installation has finished.

### 6. Install SAP Business Application Studio 
Our final step is to configure the Business Application Studio (BAS) which is the development environment for the FrontEnd. Here, our browser applications will be implemented later on. To get started, open the [BTP Cockpit](https://account.hanatrial.ondemand.com/trial/) again. Here, click on you *trial* subaccount, select *Services*, then *Instances and Subscriptions* on the left. Now click the *Go to Application* link for the *SAP Business Application Studio* and accept the legal disclaimer.

Once the BAS has opened, you'll have to *Create Dev Space*: Select the name *Fiori* and the application type *SAP Fiori* and click on *Create Dev Space*. Your Dev Space will automatically be started - this takes some minutes. Meanwhile you can store a browser bookmark for the BAS. Once it's *running*, open the Dev Space.

Click *View* > *Find Command...* or *Ctrl + Shift + P* and search for the command *CF: Login to Cloud Foundry* and select it with enter. Click enter again to confirm the preset Cloud Foundry endpoint, enter your BTP Trial user's mail, confirm it with enter and do the same for the password.  
Once you see the info message *You have been logged in.* you've finished necessary installations for our course!

Basically, everything is ready now - congratulations!  
**We're looking forward to see you** on October 4th **:)**
