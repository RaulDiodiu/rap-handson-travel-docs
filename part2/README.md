# Readme file for Part 2 - Creating the Database Table for Room Reservation
## Requirement
You will now create the database table `Z##_A_ROOM_RSV` (where `##` are the initials of your name), to store the room reservation data. This will be the only child node which must be created by you as extension of the existing Flight reference model from `/DMO/` namespace.

## Technical information
The structure of the database table should be as follow:

| Field Name    | Data Element | Is key field? |
| ----------- | ----------- | ----------- | 
| client     | abap.clnt | Yes |
| room_resvn_uuid     | sysuuid_x16 | Yes |
| parent_uuid     | sysuuid_x16 | No |
| room_resvn_id     | zraph_room_rsv_id | No |
| hotel_id    | zraph_hotel_id | No |
| begin_date     | /dmo/begin_date | No |
| end_date     | /dmo/end_date | No |
| room_type     | zraph_room_type | No |
| room_resvn_price     | zraph_room_rsv_price | No |
| currency_code     | /dmo/currency_code | No |
| local_last_changed_at     | timestampl | No |

> **Hint**: The database tables are created from Eclipse ADT menu *New > Other ABAP Repository Object*. Please use the below code snippet for the new database table.


Explanation:

* Some data elements from the ABAP Flight Reference Scenario (namespace `/DMO/`) are used and on the other side some already existing data elements from `ZRAPH` namespace from the previous hands-on
* The table key consists of the `CLIENT` field and the `ROOM_RESVN_UUID` field which is a technical key (16 byte UUID)
* A human-readable room reservation identifier: `ROOM_RESVN_ID`
* The field `CURRENCY_CODE` is specified as currency key for the amount field `ROOM_RESVN_PRICE`
* `LOCAL_LAST_CHANGED_AT` is used as standard administrative field

#### Solution

* [DBTAB_z##_a_room_rsv](sources/z##_a_room_rsv.txt)

## Next step
[3. Creating the Virtual Data Model (VDM) via ABAP CDS Views](../part3/README.md)
