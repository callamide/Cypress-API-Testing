
describe('API Testing with Cypress', () => {
    it('should successfully make a POST request to obtain an authentication token', () => {
      cy.request({
        method: 'POST',
        url: 'https://restful-booker.herokuapp.com/auth',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          username: 'admin',
          password: 'password123'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('token');
      });
    });


    it('it should get list of bookings', () => {
        cy.request({
         method: 'GET',
            url: 'https://restful-booker.herokuapp.com/booking',
         }).then((response) => {
                // Assert the response status
                expect(response.status).to.eq(200);
            
                // Log the entire response body to the Cypress Test Runner's console
                cy.log(JSON.stringify(response.body));
            
                })
            
     });

     it('get booking by ID', () => {
        const id = 1666; // Replace with any valid booking ID
      
        cy.request({
          method: 'GET',
          url: `https://restful-booker.herokuapp.com/booking/${id}`,
        }).then((response) => {
          expect(response.status).to.eq(200);
          cy.log(JSON.stringify(response.body));
        })
       });

    it('get bookings by multiple IDs', () => {
    const bookingIds = [65, 19, 695, 1666]; // Replace with valid booking IDs
  
    bookingIds.forEach((id) => {
      cy.request({
        method: 'GET',
        url: `https://restful-booker.herokuapp.com/booking/${id}`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        cy.log(`Booking ID: ${id}`);
        cy.log(JSON.stringify(response.body));
      });
    });
  });  
 

  it('create a new booking', () => {
    cy.request({
    method: 'POST',
    url: 'https://restful-booker.herokuapp.com/booking',
    headers: {
        'Content-Type': 'application/json'
      },
      body: {
        "firstname" : "Olatunde",
    "lastname" : "Adekunle",
    "totalprice" : 1500,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2025-04-08",
        "checkout" : "2025-04-09"
    },
    "additionalneeds" : "Breakfast" }
    }).then((response) => {
        expect(response.status).to.eq(200);
        cy.log(JSON.stringify(response.body));
        console.log('Booking Response:', response.body); // makes the log more reader on browser console
  });

  });


  it('should update the booking details', () => {
    const bookid = 19;
    const token = 'ab1514119eda972'; // token
  
    cy.request({
      method: 'PATCH',
      url: `https://restful-booker.herokuapp.com/booking/${bookid}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `token=${token}` // Set the auth token properly
      },
      body: {
        firstname: "Samuel",
        lastname: "Michelle"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(JSON.stringify(response.body));
    });
  });
  


  


});
  