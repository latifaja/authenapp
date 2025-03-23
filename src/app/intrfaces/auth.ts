export interface SignupPostData {
  fullName:string;
  email:string;
  password:string;  

}
export interface User extends SignupPostData{
  id:string;
}
