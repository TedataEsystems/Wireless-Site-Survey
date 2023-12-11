export interface INoteEntity {
    id: number
    createdDate: string
    updatedDate: string
    isActive: boolean
    isDeleted: boolean
    createdBy: string
    updatedBy: string
    name: string
    attachedFile: string
    from: From
    fromId: number
    to: To
    toId: number
    users: Users
    userId: number
    survey: Survey
    surveyId: number
  }
  
  export interface From {
    id: number
    createdDate: string
    updatedDate: string
    isActive: boolean
    isDeleted: boolean
    createdBy: string
    updatedBy: string
    name: string
  }
  
  export interface To {
    id: number
    createdDate: string
    updatedDate: string
    isActive: boolean
    isDeleted: boolean
    createdBy: string
    updatedBy: string
    name: string
  }
  
  export interface Users {
    id: number
    userName: string
    normalizedUserName: string
    email: string
    normalizedEmail: string
    emailConfirmed: boolean
    passwordHash: string
    securityStamp: string
    concurrencyStamp: string
    phoneNumber: string
    phoneNumberConfirmed: boolean
    twoFactorEnabled: boolean
    lockoutEnd: string
    lockoutEnabled: boolean
    accessFailedCount: number
    type: Type
    typeId: number
    vendor: Vendor
    vendorId: number
  }
  
  export interface Type {
    id: number
    createdDate: string
    updatedDate: string
    isActive: boolean
    isDeleted: boolean
    createdBy: string
    updatedBy: string
    name: string
  }
  
  export interface Vendor {
    id: number
    createdDate: string
    updatedDate: string
    isActive: boolean
    isDeleted: boolean
    createdBy: string
    updatedBy: string
    name: string
  }
  
  export interface Survey {
    id: number
    createdDate: string
    updatedDate: string
    isActive: boolean
    isDeleted: boolean
    createdBy: string
    updatedBy: string
    customerName: string
    branchName: string
    branchAddress: string
    lat: string
    lang: string
    comment: string
    speedInternet: number
    speedInternetType: string
    speedVPN: number
    speedVPNType: string
    speedWifi: number
    speedWifiType: string
    priCount: number
    dateFinished: string
    dateSendToVendor: string
    localContactName: string
    localContactMobile1: string
    localContactMobile2: string
    localContactEmail: string
    user: User
    userId: number
    vendor: Vendor3
    vendorId: number
    status: Status
    statusId: number
    notes: string[]
    attachments: Attachment[]
    tempId: number
  }
  
  export interface User {
    id: number
    userName: string
    normalizedUserName: string
    email: string
    normalizedEmail: string
    emailConfirmed: boolean
    passwordHash: string
    securityStamp: string
    concurrencyStamp: string
    phoneNumber: string
    phoneNumberConfirmed: boolean
    twoFactorEnabled: boolean
    lockoutEnd: string
    lockoutEnabled: boolean
    accessFailedCount: number
    type: Type2
    typeId: number
    vendor: Vendor2
    vendorId: number
  }
  
  export interface Type2 {
    id: number
    createdDate: string
    updatedDate: string
    isActive: boolean
    isDeleted: boolean
    createdBy: string
    updatedBy: string
    name: string
  }
  
  export interface Vendor2 {
    id: number
    createdDate: string
    updatedDate: string
    isActive: boolean
    isDeleted: boolean
    createdBy: string
    updatedBy: string
    name: string
  }
  
  export interface Vendor3 {
    id: number
    createdDate: string
    updatedDate: string
    isActive: boolean
    isDeleted: boolean
    createdBy: string
    updatedBy: string
    name: string
  }
  
  export interface Status {
    id: number
    createdDate: string
    updatedDate: string
    isActive: boolean
    isDeleted: boolean
    createdBy: string
    updatedBy: string
    statusName: string
  }
  
  export interface Attachment {
    id: number
    createdDate: string
    updatedDate: string
    isActive: boolean
    isDeleted: boolean
    createdBy: string
    updatedBy: string
    attachedFileName: string
    attachedFileExtension: string
    attach: string
    name: string
    from: From2
    fromId: number
    to: To2
    toId: number
    users: Users2
    userId: number
    survey: string
    surveyId: number
  }
  
  export interface From2 {
    id: number
    createdDate: string
    updatedDate: string
    isActive: boolean
    isDeleted: boolean
    createdBy: string
    updatedBy: string
    name: string
  }
  
  export interface To2 {
    id: number
    createdDate: string
    updatedDate: string
    isActive: boolean
    isDeleted: boolean
    createdBy: string
    updatedBy: string
    name: string
  }
  
  export interface Users2 {
    id: number
    userName: string
    normalizedUserName: string
    email: string
    normalizedEmail: string
    emailConfirmed: boolean
    passwordHash: string
    securityStamp: string
    concurrencyStamp: string
    phoneNumber: string
    phoneNumberConfirmed: boolean
    twoFactorEnabled: boolean
    lockoutEnd: string
    lockoutEnabled: boolean
    accessFailedCount: number
    type: Type3
    typeId: number
    vendor: Vendor4
    vendorId: number
  }
  
  export interface Type3 {
    id: number
    createdDate: string
    updatedDate: string
    isActive: boolean
    isDeleted: boolean
    createdBy: string
    updatedBy: string
    name: string
  }
  
  export interface Vendor4 {
    id: number
    createdDate: string
    updatedDate: string
    isActive: boolean
    isDeleted: boolean
    createdBy: string
    updatedBy: string
    name: string
  }
  