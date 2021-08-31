// import Raven from "raven-js";

function init() {
  // Raven.config(
  //   "https://9012570629b24bbca337ca52842b8892@o939361.ingest.sentry.io/5889306",
  //   {
  //     release: "1-0-0",
  //     environment: "developement-test",
  //   }
  // ).install();
}

function log(error) {
  console.error(error);
}

const all = {
  init,
  log,
};
export default all;
