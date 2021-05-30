export const mapUserData = (user) => {
  const { uid, email, xa, displayName, photoUrl } = user;
  return {
    id: uid,
    email,
    //TODO:このtokenがサーバーで使えるか検証
    token: xa,
    name: displayName,
    profilePic: photoUrl,
  };
};
