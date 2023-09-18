import axios from 'axios';
const AUTH_API_BASE_URL = "http://localhost:3002/api";
class membersService{
save (firstname,lastname,email,phone,level, image,qu1,qu2,qu3,status,entretien,resdate){
    const userData = new FormData();
    userData.append("firstname", firstname);
    userData.append("lastname", lastname);
    userData.append("email", email);
    userData.append("phone", phone);
    userData.append("level", level);
    userData.append("image", image);
    userData.append("qu1", qu1);
    userData.append("qu2", qu2);
    userData.append("qu3", qu3);
    userData.append("status", status);
    userData.append("entretien", entretien);
    userData.append("resdate", resdate);



    return axios.post(AUTH_API_BASE_URL +'/save', userData)
}
membersProfile(){
    return axios.get(AUTH_API_BASE_URL+'/membersProfile')} 

    getMemberProfile(id ) {
        return axios.get(AUTH_API_BASE_URL + `/memberProfile/${id}` ); }
    
    deleteMember (id){
                return axios.delete(AUTH_API_BASE_URL+`/member/${id}`)
            }
    update (id,member ){
              return axios.put(AUTH_API_BASE_URL+`/member/${id}`,member)}


}
export default new membersService();