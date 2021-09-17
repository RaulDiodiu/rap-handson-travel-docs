# Installation Guide: SAP Trial, Eclipse and Business Application Studio

## Goal
For our course we will rely on SAP's Business Technology Platform Trial ABAP Environment. To get ready for developing we have to set up some things first:
1. Register for a SAP BTP Trial Account (~10min)
2. Create a ABAP Trial Environment (~5min)
3. Install Eclipse with ABAP Development Tools and the Git Plugin (~15min)
4. Add the BTP Trial as ABAP Project to Eclipse (~5min)
5. Import some required development objects from Git (~15min)
6. Install SAP Business Application Studio (~10min)

### 1. SAP BTP Trial Account
First, we will register for a BTP Trial Account. Therefore, go to
[SAP's website](https://www.sap.com/index.html) and register for an SAP account at the top right (you can provide 'University of Passau' as company, 'Training' as department and 'Student' as relationship). After confirming the mail you have to set a password and then log in.

Next, you have to register for the BTP Trial itself. Go to the [BTP Cockpit](https://account.hanatrial.ondemand.com/) and provide your phone number if requested. When asked, select Europe as your region - the generation of your account might take a minute.

Afterwards, click *Enter Your Trial Account* to get started - the opened Cockpit might be a useful browser bookmark!

### 2. ABAP Trial
With our SAP BTP Trial Account up and running we now want to oboard to the ABAP Environment Trial. Enter the [BTP Cockpit](https://account.hanatrial.ondemand.com/trial/) (or stay where you've ended the first substep).

Click *Boosters* on the left, use the search and start *Prepare an Account for ABAP Trial*. After a minute you should get a success message and store the *Service Key* on your computer - this will be needed to connect the ABAP Trial with Eclipse later on.

You can close the BTP Cockpit now.

### 3. Install Eclipse with ABAP Development Tools
Next, we have to install the local development environment. For this, SAP switched from their own solution to the Eclipse IDE with an ABAP Development Tool plugin.

Go to [Eclipse 2021-09](https://www.eclipse.org/downloads/packages/release/2021-09/r/eclipse-ide-java-developers) and download the installer fitting your operating system. Obviously, you'll have to install the downloaded file afterwards (Select *Eclipse IDE for Java Developers* if asked). The default installation settings should fit our needs and remain unchanged.

When the installation finished you can launch Eclipse. You will be asked for a workspace and can set this as default for the future.

Now we'll install the ABAP Development Tools: Click *Help* > *Install new Software...* in Eclipse and enter https://tools.hana.ondemand.com/2021-09/ into the field *Work with*. Click *Add...* and store the plugin URL under the name *ADT*. After adding, the available tools will be loaded. Active the checkbox for *ABAP Development Tools* and click on *Next >*. On the next page again *Next >*, then accept the license terms and click *Finish*. You'll see the installation progress in the lower right corner of Eclipse. In some cases you have to explicitly state that you're trusting the signers SAP and Eclipse. After the installation Eclipse has to be restarted. Close the welcome tab and open the ABAP perspective by clicking *Window* > *Perspective* > *Open Perspective* > *Other* > *ABAP*.

### 4. Add the BTP Trial as ABAP Project to Eclipse
Now we will add the previously created ABAP Trial instance as ABAP Project in Eclipse. If you have already opened the ABAP perspective before you are already good to go: Click on *Create an ABAP cloud project* in the *Project Explorer* on the left.

Here you have to select the option using a *Service Key* and continue with *Next >*. Click *Import...* on the next screen and select the service key file *default_key.json* which you've downloaded to your computer previously. Click *Next >* and then *Open Logon Page in Browser*. Here you might have to log into your new SAP Account again to verfiy the connection. When asked use *EN* as logon language and click *Finish*.

### 5. Import some required development objects from Git
>**Note** This step might be superfluos.

To finalise our Eclipse installation we'll need to install a Git plugin. Here you have follow the same steps as before using the URL https://eclipse.abapgit.org/updatesite/. Select *abapGit for ABAP Development Tools (ADT)* for installation. Again accept the terms, trust the signers and restart Eclipse afterwards.

### 6. Install SAP Business Application Studio 


