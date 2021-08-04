# Readme file for Part 2 - Creating the Database Table for Room Reservation
In this hands-on part, you will create the database table for storing the room reservation data. 

## Create the Room Reservation Database Table
You will now create the database table `Z##_A_ROOM_RSV` (where `##` are the initials of your name), to store the room reservation data. 

The database tables are created from Eclipse ADT menu *New > Other ABAP Repository Object*
```abap
@EndUserText.label : 'RAP HandsOn: Hotel Room Reservation'
@AbapCatalog.enhancementCategory : #NOT_EXTENSIBLE
@AbapCatalog.tableCategory : #TRANSPARENT
@AbapCatalog.deliveryClass : #A
@AbapCatalog.dataMaintenance : #RESTRICTED
define table z##_a_room_rsv {
  key client            : abap.clnt not null;
  key room_resvn_uuid   : sysuuid_x16 not null;
  parent_uuid           : sysuuid_x16;
  room_resvn_id         : zraph_room_rsv_id not null;
  hotel_id              : zraph_hotel_id;
  begin_date            : /dmo/begin_date;
  end_date              : /dmo/end_date;
  room_type             : zraph_room_type;
  @Semantics.amount.currencyCode : 'zraph_a_room_rsv.currency_code'
  room_resvn_price      : zraph_room_rsv_price;
  currency_code         : /dmo/currency_code;
  local_last_changed_at : timestampl;
}
```
Explanation:
* Some data elements from the ABAP Flight Reference Scenario (namespace `/DMO/`) are used and on the other side some already existing data elements from `ZRAPH` namespace from the previous hands-on
* The table key consists of the `CLIENT` field and the `ROOM_RESVN_UUID` field which is a technical key (16 byte UUID)
* A human-readable room reservation identifier: `ROOM_RESVN_ID`
* The field `CURRENCY_CODE` is specified as currency key for the amount field `ROOM_RESVN_PRICE`
* `LOCAL_LAST_CHANGED_AT` is used as standard administrative field
