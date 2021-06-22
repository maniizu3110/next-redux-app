import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { startClock } from "../src/timer/actions";
import Examples from "../components/examples";
//試験的にfirebaseでimportしたものたち
import firebase from "../firebase/initFirebase";
import WriteToCloudFirestore from "../components/cloudFireStore/write";
import ReadDataFromCloudFirestore from "../components/cloudFireStore/read";
import { useUser } from "../firebase/useUser";
import axios from "axios";

firebase();
const Index = () => {
  const { user, logout } = useUser();
  const dispatch = useDispatch();
  if (user) {
    return (
      <div>
        <p>{user.id}</p>
        <p>{user.email}</p>
        <p>{user.name}</p>
        <hr />
        <WriteToCloudFirestore />
        <ReadDataFromCloudFirestore />
        <hr />
        <hr />
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button onClick={() => logout()} style={{ width: "100px" }}>
            Log Out
          </button>
          <button
            onClick={() => axios.get("http://localhost:8080/api/v1/user").then(res=>{
              console.log(res)
            })}
          >
            test
          </button>
          <a
            href="https://github.com/bjcarlson42/nextjs-with-firebase"
            target="_blank"
          >
            <button variant="outline-secondary" style={{ width: "100px" }}>
              Code
            </button>
          </a>
        </div>
      </div>
    );
  } else
    return (
      <>
        <WriteToCloudFirestore />
        <ReadDataFromCloudFirestore />
        <Examples />
        <Link href="/show-redux-state">
          <a>Click to see current Redux State</a>
        </Link>
      </>
    );
};

export default Index;
