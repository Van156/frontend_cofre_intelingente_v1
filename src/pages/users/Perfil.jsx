import React from "react";
import { useUser } from "../../context/userContext";
const Perfil = () => {
  const { userData } = useUser();
  return <div>Perfil</div>;
};

export default Perfil;
