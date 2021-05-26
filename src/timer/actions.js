export const TICK = "TICK";

//ファイル分割によってサーバーサイドレンダリング機能失われたのでlastUpdateに値は入っていない
export const serverRenderClock = () => (dispatch) =>
  dispatch({
    type: TICK,
    payload: { light: false, ts: Date.now() },
  });

export const startClock = () => (dispatch) =>
  setInterval(() => {
    dispatch({ type: TICK, payload: { light: true, ts: Date.now() } });
  }, 1000);
