import React from "react";

import Text from "../../common/Text";
import { useConnection } from "../../../hooks/useConnection";
import { useCookie } from "../../../hooks/useCookie";
import { useLobbyId } from "../../../hooks/useLobbyId";

const ConnectionStatus = ({
  error,
  loading,
  open,
}: {
  loading: boolean;
  open: boolean;
  error?: string;
}) => {
  return (
    <>
      Connection{" "}
      {error ? (
        <Text color="red">errored: {error}</Text>
      ) : (
        <Text color={open ? "#81BDA4" : "inherit"}>
          {loading && "loading"} {open ? "open" : "closed"}
        </Text>
      )}
    </>
  );
};

const Lobby = ({ open, lobbyId }: { open: boolean; lobbyId?: string }) => {
  if (!lobbyId || !open) {
    return null;
  }
  return (
    <>
      {` | Lobby `}
      <Text color="#FF917B">{lobbyId!}</Text>
    </>
  );
};

const Welcome = ({ open }: { open: boolean }) => {
  const [username] = useCookie("username");
  if (!open && !username) {
    return null;
  }
  return (
    <h3>
      Welcome back <Text color="#ac81fe">{username}</Text>
    </h3>
  );
};

const Header = () => {
  const [loading, open, error] = useConnection();
  const [lobbyId] = useLobbyId();
  return (
    <>
      <h1>Splendid</h1>
      <h3>
        <ConnectionStatus error={error} loading={loading} open={open} />
        <Lobby open={open} lobbyId={lobbyId} />
      </h3>
      <Welcome open={open} />
    </>
  );
};

export default Header;
