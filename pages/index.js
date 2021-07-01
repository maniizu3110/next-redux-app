import { useDispatch } from "react-redux";
import Link from "next/link";
import firebase from "../firebase/initFirebase";
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
        <button
          variant="outline-secondary"
          style={{ width: "100px" }}
          onClick={() => dispatch("/redux_test")}
        >
          テストページへ移動a
        </button>
        <hr />
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button onClick={() => logout()} style={{ width: "100px" }}>
            Log Out
          </button>
          <a
            href="https://github.com/bjcarlson42/nextjs-with-firebase"
            target="_blank"
          >
            <button
              variant="outline-secondary"
              style={{ width: "100px" }}
              onClick={() => dispatch("/redux_test")}
            >
              テストページへ移動
            </button>
          </a>
        </div>
      </div>
    );
  } else
    return (
      <>
        <Link href="/show-redux-state">
          <a>Click to see current Redux State</a>
        </Link>
      </>
    );
};

export default Index;
