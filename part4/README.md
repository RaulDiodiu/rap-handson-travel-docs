# Readme file for Part 4 - Adding Transactional Behavior
## Behavior Definition
First, we have to create a behavior definition using the Behavior Definition Language (BDL) referring to a CDS data model’s root entity. This behavior definition is also handling all child entities that are part of the composition tree. All supported transactional operations must be specified in a single behavior definition.

### Introduction to BDL syntax

```abap
/*Header of behavior definition */  
[implementation] {unmanaged | managed | abstract};
with draft;

/* Definition of entity behavior */  
define behavior for CDSEntity [alias AliasName]

/* Entity properties */
[implementation in class ClASS_NAME unique]  
[persistent table DB_TABLE] 
[draft table DB_TABLE_D] 
[late numbering]  
[etag (field)]  
[lock {master | dependent (PropertyDependent = PropertyMaster)}]

{
 /* Static field control */  
 [field (readonly | mandatory) field1[, field2, ..., fieldn];]

 /* Standard operations */  
 [internal] create;                  
 [internal] update;   
 [internal] delete; 

 /* Actions */   
 [static] action ActionName   
                 [parameter {InputParameterEntity | $self)}]   
                 [result [cardinality] {OutputParameterEntity | $self}]; 
      
/* Associations */   
 association AssociationName [abbreviation AbbreviationName] {[create; with draft;]}
```

### Implementing the behavior definition
Now let’s start implementing the transactional behavior for our scenario: We’ll begin by creating a behavior definition using the Behavior Definition Language (BDL).
Behavior definitions are created only from the root cds view and define the behavior for all contains entities.
To create the behavior definition you have to do the following:
- Right-click on the CDS View of our root entity `Z##_I_TravelWDTP` in the Project Explorer and choose New Behavior Definition.  
- Project, Package and Root Entity have been assigned automatically. The name of the behavior definition has to be the same as the root CDS view, that's why it is readonly. 
- Make sure the implementation type is `Managed`, you can change the default description if you like then choose Next.
- Assign a transport request and choose Finish.
The behavior definition is created and defaulted based on the implementation type( e.g Managed).

**Remark** When using the implementation type managed, for some features, you only need to define behavior characteristics and standard operations in the behavior definition. The RAP managed runtime framework provides a generic solution for
`create` , `update`, `delete`, `create by association`, `lock handling`, `ETag handling`.  
For a managed business object with draft, the following considerations are relevant.
- The behavior of each entity is implemented in a separate behavior class pool. Hence, the implementation class must be created for each entity separately. For more information, see  [Best Practives for Modularization and Performance](https://help.sap.com/viewer/fc4c71aa50014fd1b43721701471913d/202009.000/en-US/eb24e3f641df4dd99975f6155dcc6dfb.html#loioeb24e3f641df4dd99975f6155dcc6dfb__best_practices_mod).
- The managed implementation type requires the specification of lock master or lock dependent on each entity. For more information, see [Pessimistic Concurrency Control (Locking)](https://help.sap.com/viewer/fc4c71aa50014fd1b43721701471913d/202009.000/en-US/99d8162b8d7d4a83ae65320d2a03b8ab.html).
- In managed business objects, it is best practice to define a local ETag master on each entity. With an ETag master on every entity, you ensure that the ETag check is done for every entity independently. For more information, see [Optimistic Concurrency Control](https://help.sap.com/viewer/fc4c71aa50014fd1b43721701471913d/202009.000/en-US/41d72e9f31964082a7e7189f832010c3.html).
- The RAP managed runtime framework is able to automatically draw primary key values in UUID scenarios. You use this functionality by defining early managed numbering in the behavior definition. Setting the primary key field to read only defines strict internal numbering. An external BO consumer is not allowed to provide the primary key values in this case. For more detailed information, see [Automatically Drawing Primary Key Values in Managed BOs](https://help.sap.com/viewer/fc4c71aa50014fd1b43721701471913d/202009.000/en-US/82ce57d6d2014007944a667dcdb830bf.html).
- If different names are used on the database table and in the CDS data model, you need to define the mapping for these fields. This is done via the mapping operator in the behavior definition. 


#### Adjust behavior of `Travel` root entity.
1. Add an alias to Travel entity, uncomment `alias <alias_name>`, add `Travel` as alias.
2. Specify the database table name, uncomment `persistent table <db travel name>` and add the travel database here.
3. Enable the lock handling for the Travel entity which is the root node of the composition, to do that uncomment the line `lock master`.  
> **Remark** In managed scenarios the lock is handled automatically by the RAP framework.  
4. Etag handling for the travel entity ( optimistic lock). etag master statement and replace the `<field_name>` to `LocalLastChangedAt` in it.
```abap
etag master LocalLastChangedAt
```
5. Generate UUID: we want to have automatically generated UUIDs (Travel UUID field) every time new instances are created.  
To achieve this, specify the key field `TravelUUID` to be fully managed by the runtime and not editable from outside using the keywords `numbering:managed` and `readonly`.     
Add the new statement provided below after the statement `association _Booking { create; }`.
```abap
  field ( numbering : managed, readonly ) TravelUUID;
```
6. Define a mapping between the persistency table fields and the CDS view fields for the Travel entity.  
> **Remark** Because we have provided aliases in the interface CDS views, we need to tell the framework how to map the element names in the CDS data model to the corresponding table fields.
```abap
  mapping for <travel db name>
  {
    <cds_field_name> = <db_field_name>
    ...
  }
```

#### Adjust behavior of sub-entities.
First we will adjust the booking entity. The same aproach would be for each sub-entities.

1. Maintain the alias for Booking, uncomment  `alias <alias_name>` replace `<alias_name>` with Booking.
2. Specify the database table as persistency by uncommenting the line `persistent table <db_name>` and add the correct database table name.
3. Enable the lock handling for the Booking entity which is a child node in the composition model – Travel being the lock master as the root entity. For this reason, the booking entity is lock dependent and makes use of the `_Travel` association defined in the appropriate CDS view.
For that, uncomment the statement `line lock dependent by` and replace the entry `<association>` with `_Travel`.
```abap
 lock dependent by _Travel
```
4. Enable the so-called optimistic lock for the Booking entity.
For that, uncomment the etag master statement and replace the `<field_name>` to LocalLastChangedAt in it.
```abap
etag master LocalLastChangedAt
```
> **Remark**
> Defining two ETag masters happens on purpose. The recommended approach is to have a local etag for each entity. This is achieved by specifying an etag master on each node.
5. In order to transactional enable the `_Travel` association explicitly add it in the list between the curly brackets. You can add it at the top.
```abap
  association _Travel; 
```
6. Generate UUID: we want to have automatically generated UUIDs (Booking UUID field) every time new instances are created.
To achieve this, specify the key field `BookingUUID` to be fully managed by the runtime and not editable from outside using the keywords `numbering:managed` and `readonly`.  
Add the new statement provided below after the statement association `_Booking { create; }`.
7. Make `TravelUUID` field readonly `field( readonly ) TravelUUID`.
8. Define a mapping between the persistency table fields and the CDS view fields for the Booking entity.  
 Because we have provided aliases in the interface CDS views, we need to tell the framework how to map the element names in the CDS data model to the corresponding table fields.
```abap
  mapping for <booking db name>
  {
    <cds field name>         = <db_field_name>;
    ...
  }
```
>Repeat the steps from above for BookingSupplement and RoomReservation.

**Solution** 
- [DDLS_Z##_I_TravelWDTP](/part4/sources/Z##_I_TravelWDTP.txt) without draft.

#### Enable the draft.
- Add the addition "with draft;" after the managed; keyword in the header section to enable draft handling for your business object.
- Specify the draft table for the travel entity, where the draft travel data will be persisted.
Add the following line under persistent table syntax and do not forget to replace the '####'.
```abap
"draft table z##_d_travel_d"
``` 
- At the end we have to create the draft table z##_d_travel_d, to store the draft data for the travel entity.  
**Remark**: The ADT Quick Fix feature can be used to generate the draft table.  
For this, set the cursor on the table name, and press Ctrl+1 to star the Quick Fix dialog.  
- Add necesary information to create the table, save and activate.  
- **Do the same for the remaining entities to create all draft tables.**  
 ( `z##_d_book`, `z##_d_bksup` , `z##_d_room_rsv` )
- Replace the association definition in the base behavior definition to solve the warnings indicating that the associations are implicitly draft enabled as this is a draft enabled business object.  
```abap
  association _Booking { create; with draft; } ...
  association _Travel { with draft; }
```

**Remark**: As already mentioned, whenever you change the BO data model, you can again use the ADT `Quick Fix `(Ctrl+1) to generate again the draft table definition. This will update the table definition.

- Specify a total etag field in the root entity of your BO. This is required to identify changes to active instances in cases where the durable lock has expired. The field LastChangedAt will be used for the purpose in the present scenario.
```abap
  total etag LastChangedAt
```
- When a draft instance is going to be activated, the SAP Fiori elements UI calls the draft determine action `prepare` in the backend. This call takes place in a separate OData changeset to allow for saving the state messages even in case the activation fails due to failing validations.
In order to execute the validations during prepare, you need to assign them to the draft determine action prepare trigger.
```abap
  draft determine action Prepare  {
    validation <validation_name>;
  }
```

**Solution**
- [DDLS_Z##_I_TravelWDTP](/part4/sources/Z##_I_TravelWDTP_v2.txt) with draft.


### Projecting the Behavior Definition
As we’ve previously seen, you could define several CDS projection views for a single interface view (e.g. to create different apps for a single data model). For now, we have defined the behavior only for our four interface views for Travel, Booking, BookingSupplement and RoomReservation instances. But the CDS view which the generated OData service will be based on is the respective projection view, not the interface view. Therefore, we have to project the behavior definition to the projection view as well. Here, the BDL syntax simply directs allowed usages to the actual behavior definition, we cannot add behavior which isn’t existing there already. Also, we can define additional static field controls but not overwrite the existing ones from the interface view’s behavior definition.   
Check the syntax below and create the behavior projection `Z##_C_TravelWDTP` reusing everything we have defined before:

```abap
projection; 
use draft;

  define behavior for ProjectionView alias ProjectionViewAlias 
    use etag 
  { 
    field ( read only ) ProjViewElem1;
    field ( mandatory ) ProjViewElem2;
  
    use create; 
    use update;
    use delete;

    use action|function ActionName [as ProjAction] [external ExtProjname];

    use association _Assoc { create; with draft }
}
```

Create the behavior projection `Z##_C_TravelWDTP` for the projected composition model, by doing the following steps:
- Right-click on the root CDS view `Z##_C_TravelWDTP` in the Project Explorer and choose New Behavior Definition.
- The New Behavior Definition wizard is shown. The Name of the behavior definition has to be the identical name as the root CDS view. That’s the reason why the name can’t be changed.
Adjust the proposed Description if you like, ensure that the Implementation Type is set to Projection and choose Next to continue.
Project, Package and Root Entity have been assigned automatically.
- Assign a a transport request and choose Finish.
The behavior projection is created and defaulted based on the implementation type( e.g Projection).

**Remark** projection is specified at the top since the proper implementation type is specified in the underlying behavior definition.
All operations and associations defined in the underlying behavior definition at the creation time are automatically exposed in the projection using the keyword `use`.

#### Adjust the BO Behavior Projection
1. Add an alias.
2. Enable etag handling.
3. Enable draft.
4. Save and activate the behavior projection

**Solution** 
- [DDLS_Z##_C_TravelWDTP](/part4/sources/Z##_C_TravelWDTP.txt)



## Behavior Implementation

### Introduction
For the implementation of the business object behavior the RESTful Programming model has introduced the concept of behavior pools. One Behavior Definition can be implemented with a single or more of such special ABAP classes (e.g. one separate class per instance). The actual implementation is then defined within local classes in this behavior pool with itself just serving as basically empty container with the following syntax:
```abap
CLASS class_name DEFINITION PUBLIC ABSTRACT FINAL FOR BEHAVIOR OF MyRootBehavior.
ENDCLASS.
				
CLASS class_name IMPLEMENTATION.
ENDCLASS.
```
Nontheless, common or public aspects of the implementation may be defined in static methods if necessary (CLASS-DATA, CONSTANTS, TYPES). A common scenario is one behavior pool per business object node (in our case Travel, Booking, BookingSupplement and RoomReservation), but this is not mandatory. But it is a good practice to additionally define at least one separate auxiliary class for helper methods (like mapping of table fields to the corresponding CDS fields or message handling). 

### Enhance the behavior definition
- Open the base behavior definition `Z##_I_TravelWDTP`
- Provide the behavior implementation for each entity in a separate ABAP class.
For that, specify a behavior implementation class (aka behavior pool) using the statement `implementation in class…` for each entity.

```abap
 implementation in class zbp_##_i_travelwdtp unique
```

>**Remark** The ADT `Quick Fix` feature can be used to generate the class, do this for each entity class. For this, set the cursor on the table name, and press `Ctrl+1` to start the Quick Fix dialog.      
Open the created class and click `Local Type` here we should have the local class, here we implement the logic for all validations, actions, determinations and feature control. Make sure the framework is generating `get_feature` method, otherwise we would have errors.  
Every time we add a new action,determination or validation use the quick fix in behavior definition to adjust the class with new method.

![alt](images/image4_1.png)

**Solution**
- [DDLS_Z##_I_TravelWDTP](/part4/sources/Z##_I_TravelWDTP_v3.txt) with draft.


### Creating Behavior Pool 

#### Actions
Actions are used to manifest business logic specific workflows in one operation. You can implement simple status changes or a complete creation workflow in one operation. For the UI, you can define action buttons that execute the action directly when the consumer chooses the button. For more detailed information, see [Actions](https://help.sap.com/viewer/fc4c71aa50014fd1b43721701471913d/202009.000/en-US/83bad707a5a241a2ae93953d81d17a6b.html).

1. Travel
- Action `acceptTravel` and `rejectTravel`.
The `acceptTravel` action set the status to Accepted(A), and `rejectTravel` to rejected(X).  
Technically speaking, both actions are instance actions with return parameter $self. The value of the field OverallStatus is changed by executing a modify request to update this field the corresponding value.

```abap
define behavior for Z##_I_TravelWDTP alias Travel
...
{
...
  action <action_name> result [1] $self;
...
}
```

- Action `reCalcTotalPrice`: the action calculates the total price for one travel instance. It adds up the prices of all bookings, including their supplements, room reservations and the booking fee of the travel instance. If different currencies are used, the prices are converted to the currency of the travel instance.
Technically speaking, the action is an internal instance action. This action is invoked by determinations that are triggered when one of the involved fields is changed: BookingFee (travel entity), FlightPrice (booking entity), Price (booking supplement entity) and Price (Room Reservation entity).

```abap
define behavior for Z##_I_TravelWDTP alias Travel
...
{
...
  internal action ReCalcTotalPrice;
...
}
```


#### Determinations
Determinations are used to determine, derive or calculate the fields of the instance in used. The determination is called based on some triggers conditions, for example it can be create/update/delete or when a field is being changed.
For more informations see [Determinations](https://help.sap.com/viewer/fc4c71aa50014fd1b43721701471913d/202009.000/en-US/c0a547a10ca04b1492945e9d8dc3e836.html).

>**Remark**  You can only define trigger fields for a determination from the same entity the determination is assigned to. A determination that is defined for the travel entity cannot have trigger fields from the booking entity.

1. Travel

- Determination `setInitialStatus`: define a determination on modify with trigger operation `create`. When creating a new instance the travel status should be set on `open`.
The overall status of the travel is only changed by the actions `rejectTravel` and `acceptTravel`, the two actions that we just created, therefore the field is read only for the external consumer.

- Determination `calculateTotalPrice`: The determination adds the prices of the travel (BookingFee), the booking (FlightPrice), booking supplement entity (Price) and room reservation (Price). 
The sum of these values is the total price of the travel. The determination is triggered whenever one of the fields or the corresponding currency field is changed, and when a travel instance is created. Since the recalculation should be triggered whenever one of the mentioned fields is changed, the calculation of the total price is outsourced to an action. This action is triggered by a determination on each entity.

```abap
define behavior for Z##_I_TravelWDTP alias Travel
...
{
...
  determination <doSomething> on modify { create; field <trigger_field_name> ; }
...
}
```

2. Booking
- Determination `calculateTotalPrice`:  
- Determination `setBookingDate`: the `BookingDate` is set when the instance is saved, the value should not be changed afterwards. Therefore, set the field to readonly.  

3. Booking Supplement
- Determination `calculateTotalPrice`  

4. Room Reservation
- Determination `calculateTotalPrice`


#### **Validations**.  
Validations are used to verify if the values added by the user are consistent, in case the values are wrong an erorr is raised with a relevant message, in this case the save is not done.   
For more informations see [Validations](https://help.sap.com/viewer/fc4c71aa50014fd1b43721701471913d/202009.000/en-US/abfbcd933c264fe4a4883d80d1e951d8.html).

>**Remark** Via a quick fix, you can generate the method declaration in the behavior pool directly from the behavior definition editor.

>**Important** Make sure you add the validation to the section
`draft determine action Prepare ` of root entity, otherwise even if the validation is done correctly the erorr message would not be shown.


1. Travel Entity
- `validateCustomer`: Define a validation on save with trigger operation `create` and trigger field `CustomerID`.  
The validation should check if the customer field has a value and the value inserted is correct (exists in `/DMO/Customer` ).  
Since there must always be a customer assigned to a certain travel, define the field `CustomerID` as mandatory.

- `validateAgency`: Define a validation on save with trigger operation `create` and trigger field `AgencyID`.    
The validation should check if the agency field has a value and the value inserted is correct (exists in `/DMO/Agency` ).    
Since there must always be an agency assigned to a certain travel, define the field `AgencyID` as mandatory.

- `validateDates`: Define a validation on save with trigger operation `create` and trigger fields `BeginDate` and `EndDate`.  
The validation should check if `BeginDate` and `Enddate` are not be initial, the `BeginDate` is not  in the past and the `Enddate` is not be before `BeginDate`.
Since the travel dates are an essential part of the travel data, define the fields `BeginDate` and `EndDate` as mandatory.


2. Booking
- `validateCustomer`: Define a validation on save with trigger operation `create` and trigger field `CustomerID`.  
The validation should check if the customer field has a value and the value inserted is correct ( Exists in `/DMO/Customer` ).  
Since there must always be a customer assigned to a certain travel, define the field `CustomerID` as mandatory.

3. Booking Supplement
- `validateSupplement`: Define a validation on save with trigger operation create and trigger field `SupplementID`.
The Validation should check the the `SupplementID` field has an entry and check it against `/DMO/I_supplement`.
Since there must always be a booking supplement instance always needs a supplement, define the field `SupplementID` as mandatory.


#### Feature Control.

Feature control is used to make fields, actions and operations(CRUD): readonly or mandatory.
You can implement feature control in a static or dynamic way. 
- In a **static** case, you define which operations are available for each business object entity or which fields have specific access restrictions like being mandatory or readonly. 
- In a **dynamic** case, the access restrictions for fields or the enabling/disabling of methods depends on the state of the business object, for example on the value of a specific field.

For more informations see [Feature Control](https://help.sap.com/viewer/fc4c71aa50014fd1b43721701471913d/202009.000/en-US/a5055eef86fa492d99a29b3a9c7c2b88.html). 

Dynamic feature control must be implemented in the behavior implementation in the method FOR FEATURES. You can use the quick fix on one of the dynamic feature control features in the behavior definition for the method declaration.

1. Travel.
- Action control: `acceptTravel` and `rejectTravel`: if the status of the travel instance is accepted disabled the two actions.
- Operation control:  You can only `create` new booking instance for a travel if the overall status is not rejected. The feature control condition must be implemented in the behavior class.
```abap
association _<assoc_name> { create (features : instance); }
```
- Field Control: 
  `BookingFee`: if the status of the travel instance is accepted make the field readonly.
  

2. Additional settings for all entities.  
 All the uuid field should be put on readonly.  
 All the ##ID fields should be mandatory.  
 All the system fields should be readonly (for e.g LocalLastChangedBy ...).


--final txt solution of travel behavior def--

## Next step
[5. Publishing the Business Service](../part5/README.md)