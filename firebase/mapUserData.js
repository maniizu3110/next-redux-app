export const mapUserData = (user) => {
  const { email, displayName,} = user;
  return {
    email:email,
    name: displayName,
  };
};
