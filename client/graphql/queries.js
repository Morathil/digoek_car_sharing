import {
  gql
} from "@apollo/client"

export const GET_CARS = gql`
  query Cars {
    cars {
      doors,
      id
    }
  }  
`;

export const GET_AVAILABLE_CARS = gql`
  query CarsFiltered($location: String!, $availability: Boolean!) {
    carsFiltered(location: $location, availability: $availability) {
      id,
      doors,
      location,
      availability,
      seats,
      manufacturer,
      owner,
      pricePerDay
    }
  }  
`;