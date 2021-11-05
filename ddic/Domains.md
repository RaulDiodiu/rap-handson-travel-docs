# Domains

### 1. Create a domain ZRAPH_##_HOTEL_NAME

This domain should represent the name of a hotel.  
The name can be comprised of any characters and should at maximum be 40 characters.


### 2. Create a domain ZRAPH_##_HOTEL_ID

This domain should represent the identifier of a hotel.  
The ID shall be treated as character but must consist of numbers only.  
We want to use the first 2 places of this ID to encode a numeric country code.  
In each country we expect no more than 9.999 hotels.  
Example: 019999
Choose the smallest possible number of places for the length of the ID.


### 3. Create a domain ZRAPH_##_ROOM_RSV_ID

Use the built-in dictionary type NUMC with a length of 6.


### 4. Create a domain ZRAPH_##_ROOM_RSV_PRICE

This domain should represent the price of a reservation.


### 5. Create a domain ZRAPH_##_ROOM_TYPE

Use the built-in dictionary type CHAR with a length of 1.  
Add the following fixed values to it:

| Fixed Value | Description     |
| ----------- | --------------- |
| S           | Single          |
| D           | Double          |
| F           | Family          |
| E           | Executive Suite |
