import DaySchedule from "../../components/day_schedule";
import firebase from "../../firebase/initFirebase";
import { useUser } from "../../firebase/useUser";
import { useSelector } from "react-redux";
import { signInAction } from "../../src/user/actions";
import { useDispatch } from "react-redux";
import axios from "axios";
firebase();
const Index = () => {
  const dispatch = useDispatch();
  const storeUser = useSelector((state) => state.user);
  //TODO：条件分岐あるとエラー出るので一旦排除したが、パフォーマンス落ちるので入れる
  const { user, logout } = useUser();
  //TODO:render時に複数回if分の中が走っているので改善（3回回っている）
  if(!storeUser.id && user){
    axios
    .get("http://localhost:8080/api/v1/user/login", {
      params: { "name": `${user.name}`, "email": `${user.email}` },
    })
    .then((res) => {
      const data = res.data;
      console.log(data);
      //TODO：storeの値がページ遷移で初期化されている。。。
      dispatch(signInAction({
        isSignedIn:true,
        id: `${data.ID}`,
        name: data.name,
        email: data.email,
      }))
    });
  }

  if (storeUser) {
    return (
      <div>
        <p>{storeUser.id}</p>
        <p>{storeUser.email}</p>
        <p>{storeUser.name}</p>
        <hr />
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button
            onClick={() =>
              //TODO：今は自分のcalenderしか連携していないのでidは適当。
              //本番環境ではユーザーIDに応じたスケジュールを返すようにする
              axios
                .get(`http://localhost:8080/api/v1/schedule/${3}`)
                .then((res) => {
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
              axios
                .post(`http://localhost:8080/api/v1/schedule/${3}`)
                .then((res) => {
                  console.log(res);
                })
            }
          >
            register schedule
          </button>
          <button
            onClick={() => {
              //TODO：今は自分のcalenderしか連携していないのでidは適当。
              //本番環境ではユーザーIDに応じたスケジュールを返すようにする
              let updatedData;
              axios
                .get(`http://localhost:8080/api/v1/schedule/${3}`)
                .then((res) => {
                  updatedData = res.data[1];
                  axios
                    .put(`http://localhost:8080/api/v1/schedule/${3}`, {
                      ...updatedData,
                    })
                    .then((res) => {
                      console.log(res);
                    });
                });
              // axios.put(`http://localhost:8080/api/v1/schedule/${3}`).then((res) => {

              // })
            }}
          >
            update schedule
          </button>
          <button
            onClick={() => {
              //TODO：今は自分のcalenderしか連携していないのでidは適当。
              //本番環境ではユーザーIDに応じたスケジュールを返すようにする

              axios
                .get(`http://localhost:8080/api/v1/schedule/${3}`)
                .then((res) => {
                  let eventID = res.data[0].id;
                  console.log(eventID);
                  axios
                    .delete(`http://localhost:8080/api/v1/schedule/${3}`, {
                      params: { id: `${eventID}` },
                    })
                    .then((res) => {
                      console.log(res);
                    });
                });
            }}
          >
            delete schedule
          </button>
        </div>
        <DaySchedule />
      </div>
    );
  } else {
    return <p>ログインしてください</p>;
  }
};

export default Index;
