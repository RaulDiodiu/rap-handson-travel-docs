# Part 6 - Behavior Implementation
# Part 6a - Behavior Pool & Action (short version)
## Table of Contents
* [Previous: 5. Business Service](../part5/README.md)  
* **Current: 6a. Behavior Pool & Action (short version)**  
    * [Implementing the business object behavior](#markdown-header-implementing-the-business-object-behavior)  
    * [Creating our Behavior Pool](#markdown-header-creating-our-behavior-pool)  
    * [Introducing Actions](#markdown-header-introducing-actions)  
    * [Implementating Action acceptTravel](#markdown-header-implementating-action-accepttravel)   
* [Next: 6b. Determination & Validation (short version)](6bSHORT.md)   
* [Next: 6d. Feature Control (optional)](6d.md) 
* [Next: 7. Business Application Studio](../part7/README.md) 

## Implementing the business object behavior
[^ Top of page](#)  
For the implementation of the business object behavior the RESTful Programming model has introduced the concept of behavior pools. One Behavior Definition can be implemented with a single or more of such special ABAP classes (e.g. one separate class per instance). The actual implementation is then defined within local classes in this behavior pool with itself just serving as basically empty container with the following syntax:
```abap
CLASS class_name DEFINITION PUBLIC ABSTRACT FINAL FOR BEHAVIOR OF MyRootBehavior.
ENDCLASS.
				
CLASS class_name IMPLEMENTATION.
ENDCLASS.
```

## Creating our Behavior Pool
[^ Top of page](#)  
Open the base behavior definition `ZRAPH_##_I_TravelWDTP`.

Here, the ADT `Quick Fix` feature can be used to generate the class.  
For this, set the cursor on the class name `zbp_raph_##_i_travelwdtp` in line 1 and press `Ctrl + 1` to start the Quick Fix dialog.  

Open the created class and click `Local Types` on the bottom. This is where we implement the logic for all validations, actions, determinations and feature control. Every time we add a new action, determination or validation use the quick fix in the behavior definition to adjust the associated behavior pool class with a new method. You don't have to change anything yet, just activate the behavior pool.

**Solution**  
[ZRAPH_##_I_TravelWDTP](sources/Z_I_TravelWDTP_v3.txt)


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


### Implementating Action `acceptTravel`  
[^ Top of page](#)  
The `acceptTravel` action sets the status of a chosen travel instance to Accepted (A).  
Technically speaking, this action is an instance action with return parameter $self. The value of the field OverallStatus is changed by executing a modify request to update this field with the corresponding value.  
For implementation you have to first add the action definition in the behavior definition and then use Quick Fix via `Ctrl + 1` - Eclipse will auomatically create a new method for the action in the previously created behavior pool. In the method implementation you'll want to use the EML Update syntax to set the status to accepted. **Don't forget** to `use` the action also in the behavior projection!  
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
    RESULT DATA(lt_travel).

  result = VALUE #( FOR travel IN lt_travel ( %tky   = travel-%tky
                                              %param = travel ) ).
```
**Solution**  
[ZBP_RAPH_##_I_TRAVELWDTP~AcceptTravel](sources/AcceptTravel.txt)

## Next step
[^ Top of page](#)  
[6b. Determinations & Validations (short version)](6bSHORT.md)