import axios from 'axios'

export const getRestaurants = (type) => {
  
	axios.get('http://localhost:8000/restaurants/')
	  .then(function (response) {
	    console.log(response);
	  })
	  .catch(function (error) {
	    console.log(error);
	  });

};

export const getRestaurant = (id) => {
  return products.filter((product, key) => product.id === id && product)[0] || {};
};