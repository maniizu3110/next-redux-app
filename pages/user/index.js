import firebase from "../../firebase/initFirebase";
import { useUser } from "../../firebase/useUser";
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
            update schedule
          </button>
          <button
            onClick={() =>
                //TODO：今は自分のcalenderしか連携していないのでidは適当。
                //本番環境ではユーザーIDに応じたスケジュールを返すようにする
              axios.put(`http://localhost:8080/api/v1/schedule/${3}`).then((res) => {
                console.log(res);
              })
            }
          >
            register schedule
          </button>
        </div>
      </div>
    );
  } else {
    return (
    <p>ログインしてください</p>
        )
  }
}

export default Index;
