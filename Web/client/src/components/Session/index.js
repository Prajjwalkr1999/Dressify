import AuthUserContext from "./context";
import withAuthentication from "./withAuthentication";

const withauthprov = (Component) => (props) => (
  <AuthUserContext.Consumer>
    {(authUser) => <Component {...props} authUser={authUser} />}
  </AuthUserContext.Consumer>
);

export { AuthUserContext, withAuthentication, withauthprov };
