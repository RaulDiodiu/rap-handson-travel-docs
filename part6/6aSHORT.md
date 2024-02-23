# Part 6 - Behavior Implementation
# Part 6a - Behavior Pool & Action (short version)
## Table of Contents
* [Previous: 5. Business Service](../part5/README.md)  
* **Current: 6a. Behavior Pool & Action (short version)**  
    * [Implementing the business object behavior](#markdown-header-implementing-the-business-object-behavior)    
    * [Introducing Actions](#markdown-header-introducing-actions)  
    * [Implementing Action acceptTravel](#markdown-header-implementing-action-accepttravel)  
    * [BO Action Annotation](#markdown-header-bo-action-annotation)  
* [Next: 6b. Determination (short version)](6bSHORT.md)  
* [Next: 6c. Validation (short version)](6cSHORT.md)  
* [Next: 6d. Feature Control (optional)](6d.md) 
* [Next: 7. Business Application Studio](../part7/7a.md) 

## Implementing the business object behavior
[^ Top of page](#)  
For the implementation of the business object behavior the RESTful Programming model has introduced the concept of behavior pools. One Behavior Definition can be implemented with a single or more of such special ABAP classes (e.g. one separate class per instance). The actual implementation is then defined within local classes in this behavior pool with itself just serving as basically empty container with the following syntax:
```abap
CLASS class_name DEFINITION PUBLIC ABSTRACT FINAL FOR BEHAVIOR OF MyRootBehavior.
ENDCLASS.
				
CLASS class_name IMPLEMENTATION.
ENDCLASS.
```

## Introducing Actions
[^ Top of page](#)  
Actions are used to manifest business logic specific workflows in one operation. You can implement simple status changes or a complete creation workflow in one operation. For the UI, you can define action buttons that execute the action directly when the consumer chooses the button. Below, you can find the syntax for the behavior definition. For more detailed information, see [Actions](https://help.sap.com/viewer/fc4c71aa50014fd1b43721701471913d/202009.000/en-US/83bad707a5a241a2ae93953d81d17a6b.html).

```abap
define behavior for ZRAPH_##_I_TravelWDTP alias Travel
...
{
...
  action <action_name> result [1] $self;
  internal action <action_name>;
...
}
```


### Implementing Action `acceptTravel`  
[^ Top of page](#)  
The `acceptTravel` action sets the status of a chosen travel instance to Accepted (A).  
Technically speaking, this action is an instance action with return parameter $self. The value of the field OverallStatus is changed by executing a modify request to update this field with the corresponding value.  
For implementation you have to first add the action definition in the behavior definition and then use Quick Fix via `Ctrl + 1`. Eclipse will automatically create a new method for the action in the previously created behavior pool. In the method implementation you'll want to use the EML Update syntax to set the status to accepted. **Don't forget** to `use` the action also in the behavior projection!  
For more information on EML, check the course slides or visit [SAP Help for EML](https://help.sap.com/viewer/923180ddb98240829d935862025004d6/Cloud/en-US/af7782de6b9140e29a24eae607bf4138.html).  
```abap
MODIFY ENTITIES OF zraph_##_i_travelwdtp IN LOCAL MODE  
  ENTITY travel
    UPDATE FIELDS ( overallstatus )
    WITH VALUE #( FOR key IN keys ( %tky          = key-%tky
                                    overallstatus = 'A' ) )
```
Afterwards you'll have to return the modified instances to update them on the application by filling the `result` parameter.
```abap
READ ENTITIES OF zraph_##_i_travelwdtp IN LOCAL MODE
     ENTITY travel
      ALL FIELDS WITH
      CORRESPONDING #( keys )
    RESULT DATA(travels).

  result = VALUE #( FOR travel IN travels ( %tky   = travel-%tky
                                            %param = travel ) ).
```
**Solution**  
[ZBP_RAPH_##_I_TRAVELWDTP~AcceptTravel](sources/AcceptTravel.txt)

### BO Action Annotation
In order to show the BO action which we've just created we have to annotate any field (like, e.g. `TravelID`) with a special `@UI.lineItem` annotation. Check the relevant syntax below and add this annotation to the Metadata Extension of your Travel entity:  

```abap
@UI: { lineItem: [ { type: #FOR_ACTION,
                     dataAction: '<action_name>',
                     label: 'Button Label' } ] }
TravelID;
```
**Solution**  
[ZRAPH_##_C_TravelWDTP](sources/Z_C_TravelWDTP_MDE.txt)

## Next step
[^ Top of page](#)  
[6b. Determination (short version)](6bSHORT.md)  
[7. Business Application Studio](../part7/7a.md)