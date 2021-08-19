# Readme file for Part 4 - Adding Transactional Behavior
## Behavior Definition
First, we have to create a behavior definition using the Behavior Definition Language (BDL) referring to a CDS data model’s root entity. This behavior definition is also handling all child entities that are part of the composition tree. All supported transactional operations must be specified in a single behavior definition
### Introduction to BDL syntax

```abap
/*Header of behavior definition */  
[implementation] {unmanaged | managed | abstract};

/* Definition of entity behavior */  
define behavior for CDSEntity [alias AliasName]

/* Entity properties */
[implementation in class ClASS_NAME unique]  
[persistent table DB_TABLE]  
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
 association AssociationName [abbreviation AbbreviationName] {[create;]}
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


<Solution to be added or picture !!>

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
    TravelUUID         = travel_uuid;
    TravelID           = travel_id;
    AgencyID           = agency_id;
    CustomerID         = customer_id;
    BeginDate          = begin_date;
    EndDate            = end_date;
    BookingFee         = booking_fee;
    TotalPrice         = total_price;
    CurrencyCode       = currency_code;
    Description        = description;
    TravelStatus       = overall_status;
    CreatedBy          = created_by;
    CreatedAt          = created_at;
    LastChangedBy      = last_changed_by;
    LastChangedAt      = last_changed_at;
    LocalLastChangedAt = local_last_changed_at;
  }
```
![alt](images/image4_1.png)  

LINK TO SOLUTION


#### Adjust behavior of sub-entities.
First we will adjust the booking entity. The same aproach would be for each sub-entities.

1. Maintain the alias for Booking, uncomment  `alias <alias_name>` replace `<alias_name>` with Booking.
2. Specify the database table as persistency by uncommenting the line `persistent table <db_name>` and add the correct database table name.
3. Enable the lock handling for the Booking entity which is a child node in the composition model – Travel being the lock master as the root entity. For this reason, the booking entity is lock dependent and makes use of the `_Travel` association defined in the appropriate CDS view.
For that, uncomment the statement `line lock dependent by` and replace the entry <association> with _Travel.
```abap
 lock dependent by _Travel
```
4. Enable the so-called optimistic lock for the Booking entity.
For that, uncomment the etag master statement and replace the <field_name> to LocalLastChangedAt in it.
```abap
etag master LocalLastChangedAt
```
> **Remark**
> Defining two ETag masters happens on purpose. The recommended approach is to have a local > etag for each entity. This is achieved by specifying an etag master on each node.

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
    TravelUUID         = travel_uuid;
    TravelID           = travel_id;
    AgencyID           = agency_id;
    CustomerID         = customer_id;
    BeginDate          = begin_date;
    EndDate            = end_date;
    BookingFee         = booking_fee;
    TotalPrice         = total_price;
    CurrencyCode       = currency_code;
    Description        = description;
    TravelStatus       = overall_status;
    CreatedBy          = created_by;
    CreatedAt          = created_at;
    LastChangedBy      = last_changed_by;
    LastChangedAt      = last_changed_at;
    LocalLastChangedAt = local_last_changed_at;
  }
```

> Repeat the steps from above for BookingSupplement and RoomReservation.

#### Enable the draft.
- Add the addition "with draft;" after the managed; keyword in the header section to enable draft handling for your business object.
- Specify the draft table for the travel entity, where the draft travel data will be persisted.
Add the following line under persistent table syntax and do not forget to replace the '####'.
```abap
"draft table z##_d_travel_d"
``` 

<add screenshot>

- Specify a draft table for all remaining entities.

- At the end we have to create the draft table z##_d_travel_d, to store the draft data for the travel entity.  
The ADT Quick Fix feature can be used to generate the draft table.  
For this, set the cursor on the table name, and press Ctrl+1 to star the Quick Fix dialog.  
Add necesary information to create the table, save and activate.
- Do the same for the remaining entities to create all draft tables.
- Replace the association definition in the base behavior definition to solve the warnings indicating that the associations are implicitly draft enabled as this is a draft enabled business object.
```abap
  association _Booking { create; with draft; }
  ...
  association _Travel { with draft; }
```
**Remark**: As already mentioned, whenever you change the BO data model, you can again use the ADT Quick Fix (Ctrl+1) to generate again the draft table definition. This will update the table definition.

- Specify a total etag field in the root entity of your BO. This is required to identify changes to active instances in cases where the durable lock has expired. The field LastChangedAt will be used for the purpose in the present scenario.
```abap
  lock master total etag LastChangedAt
```
add pic + solution !!

- When a draft instance is going to be activated, the SAP Fiori elements UI calls the draft determine action prepare in the backend. This call takes place in a separate OData changeset to allow for saving the state messages even in case the activation fails due to failing validations.
In order to execute the validations during prepare, you need to assign them to the draft determine action prepare trigger.
```abap
  draft determine action Prepare  {
    validation validateAgency;
    validation validateCustomer;
    validation validateDates;
  }
```

add pic + solution !!!

### Projecting the Behavior Definition



## Behavior Implementation