import { ViteReactSSG } from "vite-react-ssg";
import routes from "./routes";
import "./index.css";

export const createRoot = ViteReactSSG(
  { routes },
  ({ router, isClient }) => {
    // optional: runs once on both client and server
  },
);