# Table Types

### 1. Create a table type ZRAPH_##_TRAVEL_INFO_TAB

Use row type ZRAPH_##_TRAVEL_INFO.


### 2. Create a sorted table type ZRAPH_##_TRAVEL_INFO_STAB

Use row type ZRAPH_##_TRAVEL_INFO.  
The unique key components shall be TRAVEL_ID and AGENCY_ID


### 3. Create a sorted table type ZRAPH_##_TRAVEL_INFO_STAB2

Use row type ZRAPH_##_TRAVEL_INFO.  
The non-unique key components shall be TRAVEL_ID and AGENCY_ID.  
Additionally add a secondary non-unique sorted key named DAYS with description “Sorted by DAYAMOUNT” and Key Component DAYAMOUNT.