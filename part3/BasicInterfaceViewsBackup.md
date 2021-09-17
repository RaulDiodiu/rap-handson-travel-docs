### Creation of basic interface views
The following existing database tables from the persistency layer described previously will now be used as a base for our CDS Base Views:

* /DMO/A_Travel_D
* /DMO/A_Booking_D
* /DMO/A_BkSuppl_D
* ZRAPH_##_RoomRsv

We now create a separate CDS view for each of those four database tables following these naming conventions as basic layer for data selection. Basically they do nothing more than selecting the data from the existing database tables while renaming some fields to be easy to understand (semantical field names). This comes in handy considering some century-old databases with cryptic, german or just too short field names as naming restrictions in CDS are looser. Later we will build our transactional CDS Interface Views on top of this (the prefix `I` is used for Interface Views): 

* Z##_I_TravelWD
* Z##_I_BookingWD
* Z##_I_BookingSupplementWD
* Z##_I_RoomReservationWD

> **Hint**: `WD` is the abbreviation for "with draft" in order to know that this artefacts is consumed by an draft enabled application.

Simply open the context menu of the ABAP Project and create a CDS Data Definition like this:
![alt](images/image3_2.png)

![alt](images/image3_3.png)

> **Hint**: Please use as template for the CDS View creation the `Define view entity` template in order to use the next generation CDS Views introduced starting with **SAP S/4HANA 2020**.

> **Hint**: By clicking Ctrl + Space within the CDS Editor you’ll get some options for context-sensitive code completion. Here you can use the option “Insert all elements (template)” to save a lot of time and avoid copying every column manually from the database table. 

In the CDS Views all fields, which are available in the database tables should be selected. Their key fields should be marked as key. One exception is the travel_price for the Travel instance – we won’t select this as we’ll instead calculate the total price of a Travel, its childs and grandchilds dynamically in a later chapter. For the amount and currency fields the annotations `@Semantics.currencyCode: true` and `@Semantics.amount.currencyCode: '<currency field name>'` should be used to enrich the CDS view with semantical information. 

Don’t forget to activate the new CDS views once they are finished and saved. Now let’s verify if our created CDS Views already access the database tables correctly. This can be easily achieved by either pressing `F8 (execute`) or running the data preview against our CDS view using the context menu (by right-clicking the CDS view in the Project Explorer).

![alt](images/image3_4.png)
#### Solution

- [DDLS_Z##_I_TravelWD](sources/Z_I_TravelWD.txt)
- [DDLS_Z##_I_BookingWD](sources/Z_I_BookingWD.txt)
- [DDLS_Z##_I_BookingSupplementWD](sources/Z_I_BookingSupplementWD.txt)
- [DDLS_Z##_I_RoomReservationWD](sources/Z_I_RoomReservationWD.txt)