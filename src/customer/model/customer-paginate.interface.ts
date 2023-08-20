export interface ICustomerPaginate {
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  // data: ICustomer;
}