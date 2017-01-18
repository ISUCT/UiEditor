/**
 *
 * @author jskonst
 * @name works
 * @public 
 */ 
Select * 
From works t1
 Where :timeFrom <= t1.uploaddate
 and :timeTo >= t1.uploaddate
 and :user = t1.profile_id
 and :published = t1.published