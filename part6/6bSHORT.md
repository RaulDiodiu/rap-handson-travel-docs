# Part 6b - Determination (short version)
## Table of Contents
* [Previous: 5. Business Service](../part5/README.md)  
* [Previous: 6a. Behavior Pool & Action (short version)](6aSHORT.md)  
* **Current: 6b. Determination (short version)**  
    * [Introducing Determinations](#markdown-header-introducing-determinations)  
    * [Implementing Determination setInitialStatus](#markdown-header-implementing-determination-setinitialstatus)  
* [Next: 6c. Validation (short version)](6cSHORT.md) 
* [Next: 6d. Feature Control (optional)](6d.md) 
* [Next: 7. Business Application Studio](../part7/README.md) 

## Introducing Determinations
[^ Top of page](#)  
Determinations are used to determine, derive or calculate the fields of the instance in use. A determination is called based on some triggers conditions, for example it can be automatically executed when a create, update or delete of an instance is happening.
For more informations see [Determinations](https://help.sap.com/viewer/fc4c71aa50014fd1b43721701471913d/202009.000/en-US/c0a547a10ca04b1492945e9d8dc3e836.html). You can see the behavior definition syntax below:  
```abap
define behavior for ZRAPH_##_I_TravelWDTP alias Travel
...
{
...
  determination <doSomething> on modify { create; | field <trigger_field_name>; }
...
}
```

>**Remark**  You can only define trigger fields for a determination from the same entity the determination is assigned to. A determination that is defined for the travel entity cannot have trigger fields from e.g. the booking entity.

### Implementing Determination `setInitialStatus`
[^ Top of page](#)  
We want to set the initial status of newly created travel instances to _Open (O)_. To achieve this, we'll need to add a determination on modify with trigger operation `create` to the behavior definition. This time, you **don't** have to `use` the determination in the behavior projection as determinations will always run automatically.

After creation, the overall status of the travel should only be changed by the action `acceptTravel`, which we previously created, therefore the field should be read-only for the external consumer.  

To implement this action you have to first add it to the behavior definition and then create a new method in the travel behavior pool via the Quick Fix. Use the EML like before to `MODIFY` the travel instance and update the overall status field to the value `O` for Open. This time, we don't have to return any data after our EML modification.  

**Solution**  
[ZBP_RAPH_##_I_TRAVELWDTP~setInitialStatus](sources/SetInitialStatus.txt)

## Next step
[^ Top of page](#)  
[6c. Validation (short version)](6cSHORT.md)  
[7. Business Application Studio](../part7/README.md)