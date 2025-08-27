module.exports.logEvent = (type, data={}) => {
  console.log(JSON.stringify({ type, ts: Date.now(), ...data }));
};
