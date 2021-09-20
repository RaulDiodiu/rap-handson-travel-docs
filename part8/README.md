# Readme file for Part 8 - Extending the SAP Fiori List Report

## Requirement
We want to add a new button that is handled in the frontend.  
In this case, we do not want any backend calls, but just open a web page in a new tab/window.  
  
## Implementation
Open the guided development by pressing CTRL+SHIFT+P and choose "Fiori: Open Guided Development" or right click on the project and select the item "SAP Fiori tools - Open Guided Development.  
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
window.open("https://www.w3schools.com/jsref/met_win_open.asp");
```
  
Again test the button. Now the help page for the window.open function at w3schools will be opened.  
