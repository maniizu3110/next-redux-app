import firebase from "../../firebase/initFirebase";
import { useUser } from "../../firebase/useUser";
import DaySchedule from "../../components/day_schedule"
import axios from "axios";

firebase()
const Index = () => {
  const { user, logout } = useUser();

  if (user) {
    return (
      <div>
        <p>{user.id}</p>
        <p>{user.email}</p>
        <p>{user.name}</p>
        <hr />
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button
            onClick={() =>
                //TODO：今は自分のcalenderしか連携していないのでidは適当。
                //本番環境ではユーザーIDに応じたスケジュールを返すようにする
              axios.get(`http://localhost:8080/api/v1/schedule/${3}`).then((res) => {
                console.log(res);
              })
            }
          >
            get schedule
          </button>
          <button
            onClick={() =>
                //TODO：今は自分のcalenderしか連携していないのでidは適当。
                //本番環境ではユーザーIDに応じたスケジュールを返すようにする
              axios.post(`http://localhost:8080/api/v1/schedule/${3}`).then((res) => {
                console.log(res);
              })
            }
          >
            register schedule
          </button>
          <button
            onClick={() =>{

              //TODO：今は自分のcalenderしか連携していないのでidは適当。
              //本番環境ではユーザーIDに応じたスケジュールを返すようにする
              let updatedData;
              axios.get(`http://localhost:8080/api/v1/schedule/${3}`).then(res =>{
                updatedData = res.data[1]
                axios.put(`http://localhost:8080/api/v1/schedule/${3}`, {
                    ...updatedData
                }).then(res=>{
                  console.log(res)
                })
              })
              // axios.put(`http://localhost:8080/api/v1/schedule/${3}`).then((res) => {
                
              // })
            }
          }
          >
            update schedule
          </button>
          <button
            onClick={() =>{
              //TODO：今は自分のcalenderしか連携していないのでidは適当。
              //本番環境ではユーザーIDに応じたスケジュールを返すようにする

              axios.get(`http://localhost:8080/api/v1/schedule/${3}`).then(res =>{
                let eventID = res.data[0].id
                console.log(eventID)
                axios.delete(`http://localhost:8080/api/v1/schedule/${3}`, {
                    params:{"id":`${eventID}`}
                }).then(res=>{
                  console.log(res)
                })
              })
            }
          }
          >
            delete schedule
          </button>
        </div>
        <DaySchedule/>
      </div>
    );
  } else {
    return (
    <p>ログインしてください</p>
        )
  }
}

export default Index;
