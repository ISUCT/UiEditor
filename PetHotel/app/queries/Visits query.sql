/**
 * Gets all visits for concrete owner.
 * @public
 * @author vv
 * @name VisitsQuery
 */ 
Select t1.visit_id, t1.pet_id, t1.fromdate
, t1.todate, t1.description, t1.ispaid 
From VISIT t1
, #PetsQuery q1