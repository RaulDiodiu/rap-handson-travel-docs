# Part 6a - Behavior Implementation

## Implementing the business object behavior

### Introduction
For the implementation of the business object behavior the RESTful Programming model has introduced the concept of behavior pools. One Behavior Definition can be implemented with a single or more of such special ABAP classes (e.g. one separate class per instance). The actual implementation is then defined within local classes in this behavior pool with itself just serving as basically empty container with the following syntax:
```abap
CLASS class_name DEFINITION PUBLIC ABSTRACT FINAL FOR BEHAVIOR OF MyRootBehavior.
ENDCLASS.
				
CLASS class_name IMPLEMENTATION.
ENDCLASS.
```

## Creating our Behavior Pool
Open the base behavior definition `ZRAPH_##_I_TravelWDTP`.

Here, the ADT `Quick Fix` feature can be used to generate the class. For this, set the cursor on the class name `zbp_raph_##_i_travelwdtp` in line 1 and press `Ctrl + 1` to start the Quick Fix dialog.  

Open the created class and click `Local Types` on the bottom.

**Solution**
- [ZRAPH_##_I_TravelWDTP](sources/Z_I_TravelWDTP_v3.txt) with draft.


## Introducing Actions
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


### Implementation Action `acceptTravel`:  
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
[6b. Determinations & Validations](6b.md)