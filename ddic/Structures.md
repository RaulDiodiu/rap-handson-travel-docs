# Structures

### 1. Create a structure ZRAPH_##_TRAVEL_INFO

Define the following fields:

| Field name  | Kind of type         | Type             |
| ----------- | -------------------- | ---------------- |
| TRAVEL_ID   | Data Element         | /DMO/TRAVEL_ID   |
| AGENCY_ID   | Data Element         | /DMO/AGENCY_ID   |
| CUSTOMER_ID | Data Element         | /DMO/CUSTOMER_ID |
| BEGIN_DATE  | Data Element         | /DMO/BEGIN_DATE  |
| END_DATE    | Data Element         | /DMO/END_DATE    |
| DAYAMOUNT   | Predefined DDIC type | INT4             |
  
[Solution](./solutions/ZRAPH_%23%23_TRAVEL_INFO.txt)
  

### 2. Create a structure ZRAPH_##_TRAVELER_INFO

Define the following fields:

| Field name  | Kind of type         | Type                 |
| ----------- | -------------------- | -------------------- |
| FIRST_NAME  | Data Element         | /DMO/FIRST_NAME      |
| LAST_NAME   | Data Element         | /DMO/LAST_NAME       |
| TRAVEL_INFO | Structure            | ZRAPH_##_TRAVEL_INFO |
  
[Solution](./solutions/ZRAPH_%23%23_TRAVELER_INFO.txt)
  

### 3. Create a structure ZRAPH_##_TRAVELER_REF

Define the following fields:

| Field name  | Kind of type           | Type                 |
| ----------- | ---------------------- | -------------------- |
| FIRST_NAME  | Data Element           | /DMO/FIRST_NAME      |
| LAST_NAME   | Data Element           | /DMO/LAST_NAME       |
| TRAVEL_INFO | Reference to Structure | ZRAPH_##_TRAVEL_INFO |

  
[Solution](./solutions/ZRAPH_%23%23_TRAVELER_REF.txt)
  
