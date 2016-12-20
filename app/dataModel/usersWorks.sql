/**
 *
 * @author h
 * @name usersWorks
 * @public 
 */ 
Select * 
From works t1
 Inner Join UserProfile t on t.userprofile_id = t1.profileid
Where 