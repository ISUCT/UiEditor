/**
 * @name OwnersQuery
 * @public
 */ 
Select t1.owners_id, (t1.firstname || ' ' || t1.lastname) AS fullName, t1.address
, t1.city, t1.telephone, t1.email AS email
, t1.firstname, t1.lastname 
From OWNERS t1
 Where Upper(t1.firstname) Like Upper(:pattern) or Upper(t1.lastname) Like Upper(:pattern) or Upper(t1.address) Like Upper(:pattern) or Upper(t1.city) Like Upper(:pattern)