# CDS View Entities
  
For comfort you can give aliases to the data sources and the association itself.  
This is done with the key word "as".  
Associations should by convention start with an underscore.  
While this is not technically needed, you will find this technique being used in the solutions.  
Here is an example of what this can look like:  
  
```abap
define view entity ZCDS_##_SPFLI 
as select from spfli as flight
association[1..1] to scarr as _Carrier on _Carrier.carrid = flight.carrid
{
    key flight.carrid as CarrierId,
    key flight.connid as ConnectionId,
    _Carrier.carrname as CarrierName,

    _Carrier
}
```
  

### 1. Create CDS View Entity ZCDS_##_SPFLI
Use the DB table SPFLI as the primary source and use the template `Define View Entity`.  

To comply with the naming convention to have each first letter of a word capitalized and make some field names more readable, rename the following fields:
  
| Field                 | New name             | Is key | Reference                                         |
| --------------------- | -------------------- | ------ | ------------------------------------------------- |
| CARRID                | CarrierId            | yes    |                                                   |
| CONNID                | ConnectionId         | yes    |                                                   |
| COUNTRYFR             | CountryFrom          | no     |                                                   |
| CITYFROM              | CityFrom             | no     |                                                   |
| AIRPFROM              | AirportFrom          | no     |                                                   |
| COUNTRYTO             | CountryTo            | no     |                                                   |
| CITYTO                | CityTo               | no     |                                                   |
| AIRPTO                | AirportTo            | no     |                                                   |
| FLTIME                | FlightTime           | no     |                                                   |
| DEPTIME               | DepartureTime        | no     |                                                   |
| ARRTIME               | ArrivalTime          | no     |                                                   |
| DISTANCE              | DistanceAmount       | no     | @Semantics.quantity.unitOfMeasure: 'DistanceUnit' |
| DISTID                | DistanceUnit         | no     |                                                   |
| FLTYPE                | FlightType           | no     |                                                   |
| PERIOD                | Period               | no     |                                                   |
  
[Solution](./solutions/CDS1.txt)
  
### 2. Enhance the CDS View Entity ZCDS_##_SPFLI
Add an association to SCARR for the field CARRID.  
As connection use the field CARRID of both tables.  
The cardinality to the association should be set to `[1..1]` as we expect exactly one carrier for every flight (for both start and to).  
Include the fields CARRNAME of SCARR.  
These fields shall also comply with the naming convention to use camel case.

Add an association to SAIRPORT for both AirportFrom and AirportTo.  
As connection use the field airpfrom/airpto and id of both tables.  
The cardinality to the association should be set to `[1..1]` as we expect exactly one aiport for every flight (for both start and to).  
Include the fields NAME of SAIRPORT.  
These fields shall also comply with the naming convention to use camel case.
  
[Solution](./solutions/CDS2.txt)
  