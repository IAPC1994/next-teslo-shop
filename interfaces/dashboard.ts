
export interface DashboardSummaryResponse {
    numberOfOrders:           number;
    paidOrders:               number;
    numberOfClients:          number;
    numberOfProducts:         number;
    noPaidOrders:             number;
    productsWithNoInventory:  number;
    productsWithLowInventory: number;
}
