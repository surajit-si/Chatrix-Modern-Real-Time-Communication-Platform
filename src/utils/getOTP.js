const getOTP = () => {
  return Math.floor(99999 + Math.random() * 900000);
};
export default getOTP;
