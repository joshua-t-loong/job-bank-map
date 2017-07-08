# Job Bank Map
The current Canadian Job Bank site allows people to search for job postings across the country in all different kinds of industries.
The public version of the site allows you to search by town or by an occupation, pulling up a list of postings. 
This is good when an individual has a very specific understanding of the type of job they want, or know exactly where they want to work.

However, with the current labour market being difficult to break into, many individuals, especially young people, are just looking 
for any kind of work that is within a good distance from their home. The best way for people to find this information is spatially.

Using the beta API ([found here](http://stage.lmi-explore-imt.ca/lmiws-api/job/jbws/ct)) that I found in the current Labour Market Information site, I've built an interactive map on top of Mapbox that 
allows people to look at the available jobs in their area. 

## Current Features
* Map of cities within the Job Bank database
* Listing of the number of jobs in a given area
* Link to the specific postings in that area

## Future Features
* Reverse geocoding to get town/city names in the popups
* Search for town/city names
* A preview of the most recent jobs posted

