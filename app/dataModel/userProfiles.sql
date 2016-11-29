/**
 *
 * @author jskonst
 * @name userProfiles
 * @public 
 */ 
Select * 
From USERPROFILE t1
 Where  Upper(t1.surname) like Upper(:userName)