import {
  gql
} from "@apollo/client"

export const UPDATE_CAR = gql`
  mutation UpdateCar($id: String!, $availability: Boolean!) {
    updateCar(id: $id, availability: $availability) {
      id,
      manufacturer,
      owner,
      availability
    }
  }
`;

export const ADD_RENT = gql`
  mutation AddRent($carId: String!, $days: Int!, $accountId: String!, $price: Int!) {
    addRent(carId: $carId, days: $days, accountId: $accountId, price: $price) {
      carId,
      days,
      accountId,
      price
    }
  }
`;

export const CANCLE_RENT = gql`
  mutation CancelRent($id: String!) {
    cancelRent(id: $id) {
      carId,
      days,
      price,
      startedAt,
      canceled
    }
  }
`;
