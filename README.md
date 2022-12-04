# GeoGo Assignment Froned Repository.
Technology Stack :- React, Material UI, react-router-dom, font awesome.
Resusable components are made and used to follow the DRY principle. 
React-route-dom is used for the routeing.
User can Register and then can login.
A logged in user can only buy the events tickets.
User who is not logged in can only view the events , event details and the tickets available. Seats for the event cannot be booked if the user in not logged in.
All the admin protected tasks can be done by clicking on Dashboard button present on the top right.
Id for a event can be found by clicking on the view button of the event. Which can be used by admin to update and delete a event.
A Order can be cancelled by clicking on the can cancel button which can the particular order whci is available on the Your Order page. Your order can be visited by clicking on Order button present on top right.
A user will have to login before booking a order. 
Once the order is placed a Congratulations Email is sent on the registered Email.
All the Posters of the event are stored in Cloudinary and the URL of the posters is stored in the poster field in Event Schema.
