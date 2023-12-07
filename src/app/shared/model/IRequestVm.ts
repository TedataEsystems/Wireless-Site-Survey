export interface IRequestVm {
    id: number
    customerName: string
    branchName: string
    branchAddress: any
    lat: any
    lang: any
    comment: any
    speedInternet: any
    speedInternetType: any
    speedWifi: any
    speedWifiType: any
    speedVpn: any
    speedVpnType: any
    priCount: any
    dateSendToVendor: any
    createdDate: string
    dateFinished: any
    statusId: any
    statusName: string
    status: any
    statusList: any
    userId: number
    userName: string
    user: any
    localContactName: string
    localContactMobile1: string
    localContactMobile2: string
    localContactEmail: string
    vendorId: number
    vendor: IVendor
    vendorsList: any
    attachmentList: any
    attachment: any
    note: any
    notes: any
    createdBy: any
    updatedDate: any
    updatedBy: any
  }
  
  export interface IVendor {
    name: string
    id: number
    createdDate: string
    updatedDate: string
    isActive: boolean
    isDeleted: boolean
    createdBy: string
    updatedBy: string
  }
  