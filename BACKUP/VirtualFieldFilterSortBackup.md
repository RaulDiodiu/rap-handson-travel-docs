### `virtualElementFilterBy` implementation
We want to have a date field on the selection screen that would filter the list page, using the 2 fields `startDate` and `endDate`.

**Steps to implement the logic**
- Open the travel projection view `Z##_C_TravelWDTP`, add the virtual element and annotations.
- Add the field to metadata extension and provide the ui annotations needed to display the field on list page.
- Create the class you added in `@ObjectModel.filter.transformedBy:'ABAP:'ABAP:Z##_KEY_DATE_TRAVELWD'`.
- Add the interface `IF_SADL_EXIT_FILTER_TRANSFORM`.
- Implement the method [`map_atom`](https://help.sap.com/viewer/fc4c71aa50014fd1b43721701471913d/202009.000/en-US/9019018679ea491cb55ce7ef66fb6ae4.html).: This method transforms filter conditions specified for the annotated view element to filter criteria of other view elements.
You can use [simple condition factory](https://help.sap.com/viewer/fc4c71aa50014fd1b43721701471913d/202009.000/en-US/b66836a9461544ceb145e607a4a39b70.html) for implementation.  

> **Remark**
There is a strange issue when implementing filtering or sorting, so in the case when we have an errors in binding or when navigating to the object page, please add the interface `IF_SADL_EXIT_CALC_ELEMENT_READ` and add the two methods with no implementation.

**Solution** [Z##_CL_Key_Date_TravelWD.txt](sources/Z_CL_Key_Date_TravelWD.txt).  


### `virtualElementSortedBy` implementation
When using the sorting functionality on our virtual element we want to sort the list based on : `AgencyID`.

**Steps to implement the logic**
- Open the travel projection view `Z##_C_TravelWDTP`, add the virtual element and annotations.
- Add the field to metadata extension and provide the ui annotations needed to display the field on list page.
- Reuse class `Z##_CL_DAYS_TO_FLIGHT_LISTWD` for sorting.
- Add the interface `IF_SADL_EXIT_SORT_TRANSFORM` to the class and implement the method `map_element`.

**Solution** [Z##_CL_Days_To_Flight_ListWD](sources/Z_CL_Days_To_Flight_ListWD_v2.txt).  