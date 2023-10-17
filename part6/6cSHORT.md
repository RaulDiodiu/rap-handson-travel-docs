# Part 6c - Validation (short version)
## Table of Contents
* [Previous: 5. Business Service](../part5/README.md)  
* [Previous: 6a. Behavior Pool & Action (short version)](6aSHORT.md)  
* [Previous: 6b. Determination (short version)](6bSHORT.md)  
* **Current: 6c. Validation (short version)**   
    * [Introducing Validations](#markdown-header-introducing-validations)  
    * [Implementing Validation validateCustomer](#markdown-header-implementing-validation-validatecustomer)  
* [Next: 6d. Feature Control (optional)](6d.md) 
* [Next: 7. Business Application Studio](../part7/README.md) 

## Introducing Validations
[^ Top of page](#)  
Validations are used to verify if the values added by the user are consistent, in case the values are wrong an error is raised with a relevant message, in this case the save is not done.   
For more informations see [Validations](https://help.sap.com/viewer/fc4c71aa50014fd1b43721701471913d/202009.000/en-US/abfbcd933c264fe4a4883d80d1e951d8.html). You can see the behavior definition syntax below:  
```abap
define behavior for ZRAPH_##_I_TravelWDTP alias Travel
...
{
...
  validation <doSomething> on save { create; field <trigger_field_name> ; }
...
}
```

>**Remark** Via a quick fix, you can generate the method declaration in the behavior pool directly from the behavior definition editor.

>**Important** Make sure you add the validation also to the `Prepare` framework action in the root behavior definition. This is necessary in draft scenarios to also run validations on draft entities and not only for final checks during activation. Please add the following statement to the travel root behavior definition - directly between the just created determination and the field mapping for ZRAPH_##_Travel:  
`draft determine action Prepare {`  
  `validation validateCustomer;`  
`}`


### Implementing Validation `validateCustomer` 
[^ Top of page](#)  
Our validation will check whether the customer chosen for this travel is actually existing and valid. Therefore you have to define a validation on save with trigger operation `create` using the trigger field `CustomerID`. Since there must always be a customer assigned to a certain travel, define the field `CustomerID` as mandatory in the behavior definition as well. This time, you **don't** have to `use` the validation in the behavior projection as validations will always run automatically. 

In the travel behavior pool you have to `READ` the `CustomerID` field for the created travels using the parameter `keys` in EML.  

Next we want to inner join the retrieved travel instances with the master data table `/DMO/Customer` into a new local table. Entries with invalid customer ids won't be included in this joined table telling us that missing travels have to have an invalid customer.  

Afterwards loop over the travels and check for every entry if the `CustomerID` has a value or if it `IS INITIAL`. If it has a value you have to check the validity of this (check if `line_exists( <local_table>[ customer_id = <current_travel>-customerid ])` results in `true`).

Once you implemented abovementioned logic you can check the solution to see how we have to react if the customer is either initial or invalid. In those cases we have to add the instance to the `failed` and `reported` tables and provide a error message (like shown in the solution).  

**Solution**  
[ZBP_RAPH_##_I_TRAVELWDTP~validateCustomer](sources/TravelValidateCustomer.txt)

## Next step
[^ Top of page](#)  
[6d. Feature Control (optional)](6d.md)  
[7. Business Application Studio](../part7/README.md)