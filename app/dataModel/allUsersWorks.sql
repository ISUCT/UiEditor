/**
 *
 * @author jskonst
 * @name allUsersWorks
 * @public 
 */ 
Select surname, email, t1.link
, uploaddate 
From works t1
 Inner Join userprofile t on t1.profile_id = t.userprofile_id
 Where :timeFrom <= t1.uploaddate
 and :timeTo >= t1.uploaddate
 and t1.published = 1