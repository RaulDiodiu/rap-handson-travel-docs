# Part 2 - Creating and filling the Database Tables
## Table of Contents
* [Previous: 1. Introduction](../part1/README.md)
* **Current: 2. Creating and filling the Database Tables**  
    * [Requirement #1 - Create room reservation table](#markdown-header-requirement-1-create-a-personal-development-package)  
    * [Requirement #2 - Create room reservation table](#markdown-header-requirement-2-create-room-reservation-table)  
    * [Requirement #3 - Duplicate /DMO/ tables](#markdown-header-requirement-3-duplicate-dmo-tables)  
    * [Requirement #4 - Fill database tables](#markdown-header-requirement-4-fill-database-tables)  
* [Next: 3. Creating the Virtual Data Model (VDM) via ABAP CDS Views](../part3/3a.md)

## Requirement #1 - Create a personal development package
You will now create the development package `ZRAPH_##_Travel` on the **sandbox system `CRS`** (where `##` are the initials of your name), to store the RAP development objects of this training. Please use the superpackage `ZRAPH_TRAINING` (i.e. transport Layer `ZCRT` and software component `HOME`).  

> **Hint**: The package is created from Eclipse ADT menu *New > ABAP Package*.  


## Requirement #2 - Create room reservation table
You will now create the database table `ZRAPH_##_RoomRsv`, to store the room reservation data. This will be the only child node which must be created by you as extension of the existing Flight reference model from `/DMO/` namespace.

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


> **Hint**: The DDIC tables are created from Eclipse ADT menu *New > Other ABAP Repository Object*.  


[^ Top of page](#)  
 Explanation:

* Some data elements from the ABAP Flight Reference Scenario (namespace `/DMO/`) are used and on the other side some already existing data elements from `ZRAPH` namespace from the previous hands-on
* The table key consists of the `CLIENT` field and the `ROOMRSV_UUID` field which is a technical key (16 byte UUID)
* A human-readable room reservation identifier: `ROOMRSV_ID`
* The field `CURRENCY_CODE` is specified as currency key for the amount field `ROOMRSV_PRICE`
* `LOCAL_LAST_CHANGED_AT` is used as standard administrative field

#### Solution
[zraph_##_roomrsv](sources/z_a_room_rsv.txt)

## Requirement #3 - Duplicate /DMO/ tables
[^ Top of page](#)  
Next, we have to duplicate some tables from the /DMO/ reference model to get a individual one. This allows us later when developing the RAP Fiori App to work with our own data instead of interfering with each other.

Please duplicate the following tables in your SAP system into your local package via right-clicking the source:

* Duplicate `/dmo/a_travel_d` as `ZRAPH_##_Travel`
* Duplicate `/dmo/a_booking_d` as `ZRAPH_##_Booking`
* Duplicate `/dmo/a_bksuppl_d` as `ZRAPH_##_BookSup`

## Requirement #4 - Fill database tables
[^ Top of page](#)  
Your newly created tables have no data, yet. Therefore, we'll write a small program which will automatically fill them based on SAP's /DMO/ tables and some additionaly generated data for our room reservation table.

1. Create the executable report `zraph_##_data_generator` in you ABAP package. You'll have to use the INTERFACE `if_oo_adt_classrun` to achieve this.

2. It should always be possible to run the report to reset the existing data entries.  
   To ensure this, you'll initially have to clear the data from `ZRAPH_##_Travel`, `ZRAPH_##_Booking`, `ZRAPH_##_BookSup` and `ZRAPH_##_RoomRsv` when executing the report.  
   Do this by using a `DELETE` statement per table.

3. Fill your personal Travel, Booking and BookingSupplement tables with the same data existing in the respective `/DMO/` reference tables: `/DMO/A_TRAVEL_D`, `/DMO/A_BOOKING_D` and `/DMO/A_BKSUPPL_D`.  
   Firstly, select data from each `/DMO/` reference table and secondly, fill the data into your personal table by using the `INSERT` statement.

4. For RoomReservations, no `/DMO/` table exists and we will have to dynamically generate entries based on data in the other tables.  
   Please use the following code snippet to do this:

        " Clear personal room reservation table and fill it from data generated
        " based on existing travels and hotels
        DATA roomreservations TYPE STANDARD TABLE OF zraph_##_roomrsv WITH DEFAULT KEY.
        SELECT COUNT( * ) FROM zraph_hotel INTO @DATA(hotel_count).
        IF hotel_count = 0.
          out->write( 'Aborted: No hotels found!' ).
          RETURN.
        ENDIF.
        DELETE FROM zraph_##_roomrsv.
    
        SELECT travel_uuid, begin_date, end_date, total_price, currency_code
          FROM zraph_##_travel INTO TABLE @DATA(travels).
        SELECT hotel_id FROM zraph_hotel INTO TABLE @DATA(hotels).
        LOOP AT travels ASSIGNING FIELD-SYMBOL(<travel>).
          TRY.
            DATA(index) = sy-tabix.
            READ TABLE hotels INDEX index MOD hotel_count + 1 INTO DATA(hotel).
            IF index MOD 4 <= 2.
              APPEND VALUE #( parent_uuid   = <travel>-travel_uuid
                              roomrsv_uuid  = cl_system_uuid=>create_uuid_x16_static( )
                              roomrsv_id    = '000001'
                              hotel_id      = hotel-hotel_id
                              begin_date    = <travel>-begin_date
                              end_date      = <travel>-end_date
                              room_type     = 'S'
                              roomrsv_price = <travel>-total_price * '0.15'
                              currency_code = <travel>-currency_code ) TO roomreservations.
              IF index MOD 4 = 1.
                APPEND VALUE #( parent_uuid   = <travel>-travel_uuid
                                roomrsv_uuid  = cl_system_uuid=>create_uuid_x16_static( )
                                roomrsv_id    = '000002'
                                hotel_id      = hotel-hotel_id
                                begin_date    = <travel>-begin_date
                                end_date      = <travel>-end_date
                                room_type     = 'D'
                                roomrsv_price = <travel>-total_price * '0.25'
                                currency_code = <travel>-currency_code ) TO roomreservations.
              ELSEIF index MOD 4 = 2.
                APPEND VALUE #( parent_uuid   = <travel>-travel_uuid
                                roomrsv_uuid  = cl_system_uuid=>create_uuid_x16_static( )
                                roomrsv_id    = '000002'
                                hotel_id      = hotel-hotel_id
                                begin_date    = <travel>-begin_date
                                end_date      = <travel>-end_date
                                room_type     = 'F'
                                roomrsv_price = <travel>-total_price * '0.4'
                                currency_code = <travel>-currency_code ) TO roomreservations.
              ENDIF.
            ENDIF.
            IF index MOD 4 = 3.
              APPEND VALUE #( parent_uuid   = <travel>-travel_uuid
                              roomrsv_uuid  = cl_system_uuid=>create_uuid_x16_static( )
                              roomrsv_id    = '000001'
                              hotel_id      = hotel-hotel_id
                              begin_date    = <travel>-begin_date
                              end_date      = <travel>-end_date
                              room_type     = 'E'
                              roomrsv_price = <travel>-total_price * '0.7'
                              currency_code = <travel>-currency_code ) TO roomreservations.
            ENDIF.
          CATCH cx_uuid_error.
          ENDTY.
        ENDLOOP.
        INSERT zraph_##_roomrsv FROM TABLE @roomreservations.
        out->write( 'Room reservation data generated.' ).


5. Activate your finished program and execute it. Afterwards, check your tables `ZRAPH_##_Travel`, `ZRAPH_##_Booking`, `ZRAPH_##_BookSup` and `ZRAPH_##_RoomRsv` via Data Preview for existing entries.  

[^ Top of page](#)  

#### Solution
[zraph_##_data_generator](sources/zraph_data_generator.txt)

## Next step
[3. Creating the Virtual Data Model (VDM) via ABAP CDS Views](../part3/3a.md)
