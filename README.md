# Welcome to the Hands-On - ABAP RESTful Application Programming Model (RAP) - Scenario Managed/Draft

This repository offers solutions for the hands-on exercises available in the internal training on RAP provided by msg group.

## Hands-On Prerequisites

* Minimum system prerequisite **SAP S/4HANA 2020**
* User available on ABAP development system (backend / frontend)
* Eclipse + installed ABAP Development Tools (ADT) ([Eclipse 2021-03](https://www.eclipse.org/downloads/) or above is recommended)
* Basic knowledge of ABAP & ABAP CDS Views 
* User in SAP BTP with access to SAP Web IDE
* SAP BTP destination to ABAP development system (frontend) which is enabled for usage in SAP Web IDE

## Hands-On - List Report and Object Page - Scenario Managed/Draft

### Chapter 1
some text

#### Solution 1
This is a code snippet

<pre>
@AbapCatalog.viewEnhancementCategory: [#NONE]
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'RAP HandsOn: Room Reservation (Basic)'
@Metadata.ignorePropagatedAnnotations: true
@ObjectModel.usageType:{
    serviceQuality: #X,
    sizeCategory: #S,
    dataClass: #MIXED
}

@VDM.viewType: #BASIC

define view entity ZRAPH_I_RoomReservationWD
  as select from zraph_a_room_rsv
{
  key room_resvn_uuid       as RoomResvnUUID,
      parent_uuid           as TravelUUID,
      room_resvn_id         as RoomResvnID,
      hotel_id              as HotelID,
      begin_date            as BeginDate,
      end_date              as EndDate,
      room_type             as RoomType,
      @Semantics.amount.currencyCode: 'CurrencyCode'
      room_resvn_price      as RoomResvnPrice,
      currency_code         as CurrencyCode,
      local_last_changed_at as LocalLastChangedAt
}
</pre>

This is link to an image

![Screenshot](/images/image1.png)
#### Solution 2

### Chapter 2
some other text

...

## Hands-On - List Report and Object Page Extensions - Scenario Managed/Draft

### Chapter 1
some text

### Chapter 2
...

## Hands-On - RAP Generator & XSO Framework

### Chapter 1
...

### Chapter 2
...

## License
Copyright (c) 2021 msg group. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSES/Apache-2.0.txt) file.