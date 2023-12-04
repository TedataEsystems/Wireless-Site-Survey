export interface IGraphDataJson {
    dailyGraphCreatedData: DailyGraphCreatedDaum[]
    dailyGraphCompletedData: DailyGraphCompletedDaum[]
    createdRequestsToday: number
    completedRequestsThisMonth: number
    completedRequestsToday: number
    createdRequestsThisMonth: number
    violatedPendingVendorRequests: number
  }
  
  export interface DailyGraphCreatedDaum {
    day: number
    count: number
  }
  
  export interface DailyGraphCompletedDaum {
    day: number
    count: number
  }
  