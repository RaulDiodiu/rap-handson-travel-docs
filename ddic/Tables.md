# Tables

References need to be placed before the field definition.  
In the following example the field PRICE of type /DMO/SUPPLEMENT_PRICE is defined in table /DMO/BOOKSUPPL_M.  
It references the field CURRENCY_CODE of the same table as unit for the PRICE.  

> define table /DMO/BOOKSUPPL_M {  
> `[...]`  
>  CURRENCY_CODE         : /DMO/CURRENCY_CODE;  
> `[...]`  
>  **@Semantics.amount.currencyCode : '/DMO/BOOKSUPPL_M.CURRENCY_CODE'**  
>  PRICE                 : /DMO/SUPPLEMENT_PRICE;  
> `[...]`  
> }  

### 1. Create table ZRAPH_##_RoomRsv

Give the table the description: 'RAP HandsOn: Hotel Room Reservations'  
Define the following fields:

| Field name            | Kind of type         | Type                    | Is key | Nullable | Reference                                                        |
| --------------------- | -------------------- | ----------------------- | ------ | -------- | ---------------------------------------------------------------- |
| client                | Predefined DDIC type | CLNT                    | yes    | no       |                                                                  |
| room_rsv_uuid         | Data Element         | SYSUUID_X16             | yes    | no       |                                                                  |
| parent_uuid           | Data Element         | SYSUUID_X16             | no     | yes      |                                                                  |
| roomrsv_id            | Data Element         | ZRAPH_##_ROOM_RSV_ID    | no     | no       |                                                                  |
| hotel_id              | Data Element         | ZRAPH_##_HOTEL_ID       | no     | yes      |                                                                  |
| bgein_date            | Data Element         | /DMO/BEGIN_DATE         | no     | yes      |                                                                  |
| end_Date              | Data Element         | /DMO/END_DATE           | no     | yes      |                                                                  |
| room_type             | Data Element         | ZRAPH_##_ROOM_TYPE      | no     | yes      |                                                                  |
| roomrsv_price         | Data Element         | ZRAPH_##_ROOM_RSV_PRICE | no     | yes      | @Semantics.amount.currencyCode: 'ZRAPH_##_ROOMRSV.CURRENCY_CODE' |
| currency_code         | Data Element         | /DMO/CURRENCY_CODE      | no     | yes      |                                                                  |
| local_last_changed_at | Data Element         | abp_locinst_lastchange_tstmpl              | no     | yes      |                                                                  |
  
[Solution](./solutions/ZRAPH_%23%23_ROOMRSV.txt)
  
### 2. Duplicate /DMO/ tables
Next, we have to duplicate some tables from the /DMO/ reference model to get a individual one. This allows us later when developing the RAP Fiori App to work with our own data instead of interfering with each other.

Please duplicate the following tables in your SAP system to your local package via right-clicking:

* Duplicate `/dmo/a_travel_d` as `ZRAPH_##_Travel`
* Duplicate `/dmo/a_booking_d` as `ZRAPH_##_Booking`
* Duplicate `/dmo/a_bksuppl_d` as `ZRAPH_##_BookSup`


### 3. Create table ZRAPH_##_HOTEL

Above the table definition give the following metadata:  
Give the table the description: 'RAP HandsOn: Hotel Master Data'  
Define the following fields:

| Field name     | Kind of type         | Type                    | Is key | Nullable | Reference                                                         |
| -------------- | -------------------- | ----------------------- | ------ | -------- | ----------------------------------------------------------------- |
| CLIENT         | Predefined DDIC type | CLNT                    | yes    | no       |                                                                   |
| HOTEL_ID       | Data Element         | ZRAPH_##_HOTEL_ID       | yes    | no       |                                                                   |
| NAME           | Data Element         | ZRAPH_##_HOTEL_NAME     | no     | yes      |                                                                   |
| CITY           | Data Element         | /DMO/CITY               | no     | yes      |                                                                   |
| COUNTRY        | Data Element         | LAND1                   | no     | yes      |                                                                   |
  
[Solution](./solutions/ZRAPH_%23%23_HOTEL.txt)
