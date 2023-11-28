export interface Template {
  templateName:string,
  templateDesc:string,
  templateImg:string,
  templateDetails:TemplateDetails

}

export interface TemplateDetails {
  pageName:string,
  questionDetails:QuestionDetails

}
export interface QuestionDetails {
  pageName:string,
  quest:string,
  section:string,
  responseType:string,
  required:boolean,
  date: boolean,
  time:boolean,
  multipleSelect:boolean,
  flaggedResponse:boolean,
  uploadImage:string,
  uploadfile:string,
  addLogic:string,
  manageSite:string,
  format:string,
  range:string,

}














