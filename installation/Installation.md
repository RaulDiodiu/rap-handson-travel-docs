# Installation Guide: SAP Trial, Eclipse and BAS

## Preparing for the ERP Praktikum
For our course we will rely on SAP's Business Technology Platform Trial ABAP Environment. To get ready for developing we have to set up some things first:  
1. [Activate msg ABAP Environment User (~5min)](#markdown-header-1-sap-btp-trial-account)  
2. [Install Eclipse with necessary plugins (~20min)](#markdown-header-3-install-eclipse-with-necessary-plugins)  
3. [Add the ABAP Instance as ABAP Project to Eclipse (~5min)](#markdown-header-4-add-the-abap-instance-as-abap-project-to-eclipse)   
4. [Install SAP Business Application Studio (~10min)](#markdown-header-6-install-sap-business-application-studio)

### 1. Activate msg ABAP Environment User
[^ Top of page](#)  
You'll get an activation link via mail and simply have to click it:

![alt](images/image_sap.png)

Afterwards, you'll have to set a password for your SAP user.  
Please remember it (:

### 2. Install Eclipse with necessary plugins
[^ Top of page](#)  
Next, we have to install the local development environment. For this, SAP switched from their own solution to the Eclipse IDE with an ABAP Development Tool plugin.

>**Note** Even if you already happen to have Eclipse installed we urge you to install it again due to compatibility reasons with the Eclipse and ADT versions together with BTP Trial. Even if you have older Eclipse + ADT Installations, setup a new one as only the latest state is expected to work properly over the course.

>**Note** You'll have to **leave your company's / university's VPN**! The connection to Eclipse's plugin repository may fail otherwise.

Go to [Eclipse 2022-12](https://www.eclipse.org/downloads/packages/release/2022-12/r) and download the *Eclipse IDE for Java Developers* version fitting your operating system.  

>**Note** There are two different options: At the center top, the blue box offers a version with a **guided installer**. Further below (under *Packages*) you can choose to download an **archive** which simply has to be unpacked on your computer. This might be the easier option based on your liking and includes the ready-to-use Eclipse app. But you can choose your preferred option yourself.

>**IMPORTANT NOTE for Mac users** Eclipse will self-modify its own info.plist file with some preferences during the first startup. This will lead to Eclipse not starting again afterwards. The built-in [macOS Gatekeeper XProtect](https://support.apple.com/guide/security/protecting-against-malware-sec469d47bd8/web) prevents starting Eclipse after its self-modification (as this is considered as security threat). Therefore we have to define an [exception](https://stackoverflow.com/questions/70262544/eclipse-quit-unexpectedly-on-macos) in the Terminal: Please open the Terminal **directly after installing Eclipse and before running it** and execute the following command (adapted to the path from your current (probably user) directory to Eclipse.app): `xattr -r -d com.apple.quarantine /Applications/Eclipse.app`

When the installation finished you can launch Eclipse.  
You will be asked for a workspace and can set this as default for the future.

>**Note** You may have to **run Eclipse as administrator** on Windows in order to install add-ons.

Now we'll install the ABAP Development Tools (ADT): Click *Help* > *Install new Software...* in Eclipse and enter https://tools.hana.ondemand.com/2022-12/ into the field *Work with*. Click *Add...* and store the plugin URL under the name *ADT*. After adding, the available tools will be loaded. Active the checkbox for *ABAP Development Tools* and click on *Next >*. On the following page again *Next >*, then accept the license terms and click *Finish*. You'll see the installation progress in the lower right corner of Eclipse. In some cases you have to explicitly state that you're trusting the signers SAP and Eclipse. After the installation Eclipse has to be restarted. Close the welcome tab and open the ABAP perspective by clicking *Window* > *Perspective* > *Open Perspective* > *Other* > *ABAP*.

Now we'll install the abapGit AddOn: Click *Help* > *Install new Software...* in Eclipse and enter https://eclipse.abapgit.org/updatesite/ this time. Select *abapGit for ABAP Development Tools (ADT)* for installation. Continue the installation wizard like you did for ADT. After the installation Eclipse has to be restarted. Now you can access the abapGit View by clicking *Window* > *Show View* > *Other...* > *abapGit Repositories*.

### 3. Add the ABAP Instance as ABAP Project to Eclipse
#### Connecting Eclipse with BTP
[^ Top of page](#)  
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

### 5. Install SAP Business Application Studio 
[^ Top of page](#)  
Our final step is to configure the Business Application Studio (BAS) which is the development environment for the FrontEnd. Here, our browser applications will be implemented later on.  

To get started, open the [Business Application Stutio](https://sose-2023-uni-passau-sb-tdd.eu10cf.applicationstudio.cloud.sap/index.html). Once the BAS has opened, you'll have to *Create Dev Space*: Select the name *Fiori* and the application type *SAP Fiori* and click on *Create Dev Space*. Your Dev Space will automatically be started - this takes some minutes. Meanwhile you can store a browser bookmark for the BAS. Once it's *running*, open the Dev Space.

Click on *Terminal* > *New Terminal...* in the toolbar and type `cf login --sso` into the opened editor. Paste the API endpoint `https://api.cf.eu10-004.hana.ondemand.com` and confirm via Enter.

You'll get a link in order to retrieve a temporary passcode for logging in - open this URL from the BAS Terminal via `Ctrl + Click`. You might have to select the *Default Identity Provider* in the browser window and will get a passcode afterwards. Copy this passcode, paste it back into the BAS Terminal and click `Enter`.  
You won't see that the passcode was pasted, the input field will remain empty. Just be confident of yourself and press `Enter` anyways! You should get an *OK* message in the Terminal and are finally good to go.

Basically, everything is ready now - congratulations!  
**We're looking forward to see you** on March 20th **:)**

## Further Links
- [Eclipse Keyboard Shortcuts](Shortcuts.md)  
- [RAP HandsOn: Introduction](../part1/README.md)
