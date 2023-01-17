# Part 2 - Creating and filling the Database Tables
## Table of Contents
* [Previous: 1. Introduction](../part1/README.md)
* **Current: 2. Creating and filling the Database Tables**  
   * [Requirement #1 - Create room reservation table](#markdown-header-requirement-1---create-room-reservation-table)  
   * [Requirement #2 - Duplicate /DMO/ tables](#markdown-header-requirement-2---duplicate-dmo-tables)  
   * [Requirement #3 - Fill database tables](#markdown-header-requirement-3---fill-database-tables)  
* [Next: 3. Creating the Virtual Data Model (VDM) via ABAP CDS Views](../part3/3a.md)


## Note for the ERP Praktikum
**If** you're taking part in the university course ERP Praktikum, you've already created these database tables before in the [ABAP Dictionary (DDIC) section](../ddic/Tables.md). Therefore, you can simply skip this part of the hands-on and please continue with [3. Creating the Virtual Data Model (VDM) via ABAP CDS Views](../part3/3a.md). Otherwise, please continue with creating the necessary tables like described below.

## Requirement #1 - Create room reservation table
You will now create the database table `ZRAPH_##_RoomRsv` (where `##` are the initials of your name), to store the room reservation data. This will be the only child node which must be created by you as extension of the existing Flight reference model from `/DMO/` namespace.

## Technical information
The structure of the database table should be as follow:

| Field Name    | Data Element | Is key field? |
| ----------- | ----------- | ----------- | 
| client     | abap.clnt | Yes |
| roomrsv_uuid     | sysuuid_x16 | Yes |
| parent_uuid     | sysuuid_x16 | No |
| roomrsv_id     | zraph_room_rsv_id | No |
| hotel_id    | zraph_hotel_id | No |
| begin_date     | /dmo/begin_date | No |
| end_date     | /dmo/end_date | No |
| room_type     | zraph_room_type | No |
| roomrsv_price     | zraph_room_rsv_price | No |
| currency_code     | /dmo/currency_code | No |
| local_last_changed_at     | abp_locinst_lastchange_tstmpl | No |

> **Hint**: The database tables are created from Eclipse ADT menu *New > Other ABAP Repository Object*. Please use the below code snippet for the new database table.

[^ Top of page](#)  
 Explanation:

* Some data elements from the ABAP Flight Reference Scenario (namespace `/DMO/`) are used and on the other side some already existing data elements from `ZRAPH` namespace from the previous hands-on
* The table key consists of the `CLIENT` field and the `ROOMRSV_UUID` field which is a technical key (16 byte UUID)
* A human-readable room reservation identifier: `ROOMRSV_ID`
* The field `CURRENCY_CODE` is specified as currency key for the amount field `ROOMRSV_PRICE`
* `LOCAL_LAST_CHANGED_AT` is used as standard administrative field

#### Solution
[zraph_##_roomrsv](sources/z_a_room_rsv.txt)

## Requirement #2 - Duplicate /DMO/ tables
[^ Top of page](#)  
Next, we have to duplicate some tables from the /DMO/ reference model to get a individual one. This allows us later when developing the RAP Fiori App to work with our own data instead of interfering with each other.

Please duplicate the following tables in your SAP system into your local package via right-clicking the source:

* Duplicate `/dmo/a_travel_d` as `ZRAPH_##_Travel`
* Duplicate `/dmo/a_booking_d` as `ZRAPH_##_Booking`
* Duplicate `/dmo/a_bksuppl_d` as `ZRAPH_##_BookSup`

## Requirement #3 - Fill database tables
[^ Top of page](#)  
@TODO

## Next step
[3. Creating the Virtual Data Model (VDM) via ABAP CDS Views](../part3/3a.md)
