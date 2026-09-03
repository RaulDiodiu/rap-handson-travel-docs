# Part 1 - Introduction
## Table of Contents
* [Previous: Installation Guide](../installation/Installation.md)
* [Previous: Keyboard Shortcuts](../installation/Shortcuts.md)
* **Current: 1. Introduction**
* [Next: 2. Creating the Database Tables ](../part2/README.md)

## Overall description and high-level architecture
In this course, we’ll create an SAP Fiori application with the help of a Virtual Data Model using ABAP CDS, behavior definitions and implementations for the transactional behavior, and OData via a service definition and binding for publishing our data from the back end.

The finished Fiori app will display travel information (one travel possibly consisting of several flight bookings and room reservations). The main screen will list all travels stored in the database. It also allows you to open an individual travel with its information shown on an object page and its associated bookings and room reservations listed as well. From there, you can navigate, for example, to the object page of an individual booking to see its data and associated booking supplements in detail.

The app will support transactional functionality (CRUD operations) using draft capabilities along with search and filtering. 

The following image should give you a high-level overview of the types of development objects involved in implementing a transactional app in the context of the ABAP RESTful Application Programming Model (RAP).

![(© SAP SE)](images/image1_1.png)

## Mockups
[^ Top of page](#)  
The following mock-ups should already provide a rough overview how our app should look like in the end. 
The starting screen (List Report) should list all travels and provide some functionality to search and filter for instances as well as creating and deleting travels and the functionality to accept or reject a travel. 

![List Report](images/image1_2.png)

The detailed view (Object Page) of a travel contains information about itself and lists the associated bookings and room reservations. Additionally, it provides an edit mode for the travel data. 

![alt](images/image1_3.png)

The detailed view (Object Page) of the bookings should provide their data (and booking supplements) while allowing users to edit that information as well. The same applies to the room reservations object page.

![alt](images/image1_4.png)

## Technical Setup
[^ Top of page](#)  
We will use the following database tables for the travel, booking, booking supplement, and room reservation instances. You’ll find the relevant fields below. The first three are one-to-one copies from the ABAP Flight Reference Scenario. Additionally, we have already created a new database table for storing the room reservations belonging to a specific travel. The other three tables will be created in [part2](../part2/README.md).
- **ZRAPH_##_Travel** - General Travel Data (and some administrative information)
- **ZRAPH_##_Booking** - Booked Flights for Travel instances
- **ZRAPH_##_BookSup** - Booking Supplements for Booking instances
- **ZRAPH_##_RoomRsv** - Room Reservations for Booking Supplement instances  
    
| Database Table       | Field Name               |
| -------------------- | ------------------------ |
| **ZRAPH_##_Travel**  | client **(key)**         |
|                      | travel_uuid **(key)**    |
|                      | travel_id                |
|                      | agency_id                |
|                      | customer_id              |
|                      | begin_date               |
|                      | end_date                 |
|                      | booking_fee              |
|                      | total_price              |
|                      | currency_code            |
|                      | description              |
|                      | local_created_by         |
|                      | local_created_at         |
|                      | local_last_changed_by    |
|                      | local_last_changed_at    |
|                      | last_changed_at          |
| **ZRAPH_##_Booking** | client **(key)**         |
|                      | booking_uuid **(key)**   |
|                      | parent_uuid              |
|                      | booking_id               | 
|                      | booking_date             | 
|                      | customer_id              | 
|                      | carrier_id               | 
|                      | connection_id            | 
|                      | flight_date              | 
|                      | flight_price             | 
|                      | currency_code            | 
|                      | booking_status           |
|                      | local_last_changed_at    |
| **ZRAPH_##_BookSup** | client **(key)**         |
|                      | booksuppl_uuid **(key)** |
|                      | root_uuid                |
|                      | parent_uuid              |
|                      | booking_supplement_id    | 
|                      | supplement_id            | 
|                      | price                    | 
|                      | currency_code            |
|                      | local_last_changed_at    |
| **ZRAPH_##_RoomRsv** | client **(key)**         |
|                      | roomrsv_uuid **(key)**   | 
|                      | parent_uuid              | 
|                      | roomrsv_id               | 
|                      | hotel_id                 | 
|                      | begin_date               | 
|                      | end_date                 |
|                      | room_type                |
|                      | roomrsv_price            |
|                      | currency_code            |
|                      | local_last_changed_at    |

As you can see in the diagram below, those tables also have associations to other instances in our scenario, such as Agency, Customer, Flight, or Hotel. For our own Virtual Data Model, we’ll concentrate on the database tables for the instances marked in green. These represent the transactional data. For the sake of simplicity, the remaining master data will be mostly reused by accessing existing CDS views to enrich our app with external master data.

![alt](images/image1_5.png)

With SAP S/4HANA 2020, additional supported scenarios within the ABAP RESTful Application Programming Model were introduced. The app created within this hands-on will be based on the managed/draft scenario. In comparison with the unmanaged scenario, where the developer would have to implement the basic CUD (create, update, and delete) operations, those operations are provided out of the box by the RAP framework in the managed scenario. Draft-enabled business objects persist the state of the transactional buffer after every transaction in a designated draft database table. This allows the end user to stop and continue working at any point in time, even with inconsistent data. For more detailed information about the draft concept, see [Draft](https://help.sap.com/viewer/fc4c71aa50014fd1b43721701471913d/202009.001/en-US/a81081f76c904b878443bcdaf7a4eb10.html).

## Next step
[^ Top of page](#)  
[2. Creating the Database Tables ](../part2/README.md)
