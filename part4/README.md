# Readme file for Part 4 - Adding Transactional Behavior
## Behavior Definition
First, we have to create a behavior definition using the Behavior Definition Language (BDL) referring to a CDS data model’s root entity. This behavior definition is also handling all child entities being part of the composition tree. All supported transactional operations must be specified in a single behavior definition
### Introduction to BDL syntax
```abap
/*Header of behavior definition */  
[implementation] {unmanaged | managed | abstract};

/* Definition of entity behavior */  
define behavior for CDSEntity [alias AliasName]

/* Entity properties */\
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
Now let’s start implementing the transactional behavior for our scenario: We’ll begin by creating a behavior definition using the Behavior Definition Language (BDL) referring to a CDS data model. To create the behavior definition, right-click on the CDS View of our root entity ZINITIALS_I_TravelWDTP, select New Behavior Definition and implement it using the previously explained syntax.
As we’re using the managed approach, 
~~the implementation class for Travel instances which we’ll create later-on will be called ZINITIALS_BP_TRAVEL_U (the suffix referring to the unmanaged scenario). We’ll use LastChangedAt for ETag, declare TravelID as read-only and AgencyID, CustomerID, BeginDate, EndDate as mandatory. All three CUD operations should be allowed. Please also define the action set_status_booked which will return $self and allow creation for the associated instances Booking and RoomReservation (as child instances rely on their root Travel instance, they cannot be created inde-pendently but only through a Travel instance).~~



## Behavior Implementation