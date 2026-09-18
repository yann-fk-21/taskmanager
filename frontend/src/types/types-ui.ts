export type ErrorForm = {
  status: boolean;
  message: {
    usernameMessage?: string;
    emailMessage?: string;
    passwordMessage?: string;
  };
};
