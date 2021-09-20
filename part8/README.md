# Readme file for Part 8 - Extending the SAP Fiori List Report

## Requirement
We want to add the absolutely useful function to open 3 predefined web pages by selecting them in a dropdown box and pressing a button.  
For this, we will need to implement 2 extensions to the list report.  
  
## Implementation
Open the guided development by pressing CTRL+SHIFT+P and choose "Fiori: Open Guided Development" or right click on the project and select the item "SAP Fiori tools - Open Guided Development.  

### Add custom filter

Select item "Add a custom filter to the filter bar".  
Press "Start Guide".  
In the wizard select/enter the following information:  

| Field              | Value         |
| ------------------ | ------------- |
| Fragment File Name | CustomFilter  |
| Custom Filter key  | customFilter  |
| Custom Filter name | Custom Filter |
| Control ID         | customFilter  |
  
Press "Insert Snippet".  
Press "Next".  
Press "Next" again to skip step 2.  
  
In the next step enter the following information:  

| Field      | Value   |
| ---------- | ------- |
| Entity Set | Travel  |
  
Press "Insert Snippet".  
Press "Exit Guide".  
  
In webapp/ext/fragments find the file CustomFilter.fragment.xml.  
Change the texts of the the 3 items within the ComboBox to 3 non-suspicious web pages.  
Example:  

| Item key | Item text                                                                           |
| -------- | ----------------------------------------------------------------------------------- |
| 0        | https://www.msg.group/en                                                            |
| 1        | https://www.uni-passau.de/en/                                                       |
| 2        | https://sapui5.hana.ondemand.com/sdk/#/api/sap.fe.templates.ListReport.ExtensionAPI |
  
Test the app and see the new filter "Custom Filter" that looks like this:  
![Custom Action Button](images/image2.png)
  
### Add custom action

Select item "Add a custom action to a page using extension".  
Press "Start Guide".  
In the wizard select/enter the following information:  

| Field         | Value                    |
| ------------- | ------------------------ |
| Page          | List Report Page         |
| Function Name | onExtensionButtonPressed |
  
Press "Insert Snippet".  
Press "Next".  
  
In the next step select/enter the following information:  

| Field           | Value         |
| --------------- | ------------- |
| Entity Set      | Travel        |
| Action Position | Table Toolbar |
| Action ID       | customAction  |
| Button Text     | Custom Action |
| Row Selection   | no            |
  
Press "Insert Snippet".  
Press "Exit Guide".  

### Test the App
Find the new button in the toolbar:  
![Custom Action Button](images/image1.png)
  
If you press on it, just a pop up appears with "onExtensionButtonPressed".  
This is the generated default behaviour and will be overwritten in the next step.  
  
## Add own coding to open an external web page
Find the generated controller "ListReportExt.controller.js" in webapp/ext/controller.  
Within this file, the function "onExtensionButtonPressed" exists, which we will now change.  

Replace the functions content with:  
```js
var sExternalPage = this.getView().byId("customFilter").getValue();
window.open(sExternalPage);
```
  
Again test the button. Now the help page for the window.open function at w3schools will be opened.  
