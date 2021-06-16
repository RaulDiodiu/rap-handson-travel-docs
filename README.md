# Welcome to the Hands-On - ABAP RESTful Application Programming Model (RAP) - Scenario Managed/Draft

This repository offers hands-on exercises on RAP provided by msg group.

## General
### Hands-On - Prerequisites

* Minimum system prerequisite **SAP S/4HANA 2020 FPS01**
* User available on ABAP development system (backend / frontend)
* Eclipse + installed ABAP Development Tools (ADT) ([Eclipse 2021-03](https://www.eclipse.org/downloads/) or above is recommended)
* Basic knowledge of ABAP & ABAP CDS Views 
* User in SAP Business Technology Platform (SAP BTP) with access to SAP Web IDE
* SAP BTP destination to ABAP development system (frontend) which is enabled for usage in SAP Web IDE
  
### SAP Netweaver
All created objects are implemented as local objects. The names to be used are listed within the corresponding chapters. For all objects, make sure, that you also provide the initials of your name as prefix. 

## "The App"
### Goals and Motivation
The main goal of this exercise is to show how software development with ABAP has changed within the past years. The exercise wants to highlight the future techniques and technologies within the **ABAP RESTful Application Programming Model** (you may also find the abbreviation **RAP**). 

Simplification and fast IT was the leading motivation for SAP in the last years – this brought several new functionalities and features. This HandsOn aims to make you familiar with those new technologies by build-ing your own app. When you finished this exercise, you have basic knowledge how a simple Fiori App can be created with the help of CDS Views (data retrieval and UI annotation), Behavior Definitions (transactional actions on data) and the resulting OData service (Service Binding).

### SAP Fiori transactional app (RAP scenario managed/draft)
#### 1. Introduction
Find more details in folder [part1](part1/README.md) of this Git repository.
#### 2. Creating the Database Table for Room Reservation
Find more details in folder [part2](part2/README.md) of this Git repository.
#### 3. Creating the Virtual Data Model (VDM) via ABAP CDS Views
Find more details in folder [part3](part3/README.md) of this Git repository.
#### 4. Adding Transactional Behavior
Find more details in folder [part4](part4/README.md) of this Git repository.
#### 5. Publishing the Business Service
Find more details in folder [part5](part5/README.md) of this Git repository.
#### 6. Creating the SAP Fiori List Report app
Find more details in folder [part6](part6/README.md) of this Git repository.
#### 7. Deploying your app
Find more details in folder [part7](part7/README.md) of this Git repository.
## License
Copyright (c) 2021 msg group. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSES/Apache-2.0.txt) file.