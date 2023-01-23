export const BackendURL =
  process.env.NODE_ENV === "production"
    ? "https://full-stack-flow.onrender.com/"
    : "http://localhost:5000/";
