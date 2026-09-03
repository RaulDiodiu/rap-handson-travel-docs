# CDS View Entities
  
For komfort you can give aliases to the data sources and the association itself.  
This is done with the key word "as".  
Associations should by convention start with an underscore.  
While this is not technically needed, you will find this technique being used in the solutions.  
Here is an example of what this can look like:  
  
```abap
define view entity ZCDSV_TZ_TEST2 
as
select from zta_tz_test2 as test2
association[1..1] to /dmo/agency as _agency on _agency.agency_id = test2.agency_id
{
    key test2.agency_id as AgencyID,
    _agency.city        as City
}
```
  

### 1. Create CDS View Entity ZRAPH_##_RESERVATION
Use ZRAPH_##_ROOMRSV as the primary source.  
Change the generated authorization check to not required:  

```abap
@AccessControl.authorizationCheck: #NOT_REQUIRED
```

To comply with the naming convention to have each first letter of a word capitalized and make some field names more readable, rename the following fields:
  
| Field                 | New name             | Is key | Reference                                       |
| --------------------- | -------------------- | ------ | ----------------------------------------------- |
| ROOMRSV_UUID          | RoomReservationUUID  | yes    |                                                 |
| PARENT_UUID           | TravelUUID           | no     |                                                 |
| ROOMRSV_ID            | RoomReservationID    | no     |                                                 |
| HOTEL_ID              | HotelID              | no     |                                                 |
| BEGIN_DATE            | BeginDate            | no     |                                                 |
| END_DATE              | EndDate              | no     |                                                 |
| ROOM_TYPE             | RoomType             | no     |                                                 |
| ROOMRSV_PRICE         | RoomReservationPrice | no     | @Semantics.amount.currencyCode : 'CurrencyCode' |
| CURRENCY_CODE         | CurrencyCode         | no     |                                                 |
| LOCAL_LAST_CHANGED_AT | LocalLastChangedAt   | no     |                                                 |
  
[Solution](./solutions/ZRAPH_%23%23_RESERVATION-1.txt)
  
### 2. Enhance the CDS View Entity ZRAPH_##_RESERVATION
Add an association to ZRAPH_##_HOTEL.  
As connection use the field HOTEL_ID of both tables.  
A cardinality to the association should be set to `[1..1]` as we expect exactly one hotel for every room reservation.  

Include the fields NAME, CITY and COUNTRY of ZRAPH_##_HOTEL.  
These fields shall also comply with the naming convention to have each first letter of a word capitalized.
  
[Solution](./solutions/ZRAPH_%23%23_RESERVATION-2.txt)
  