import { useState } from "react";
import "./RegisterPlayer.scss";
import axios from "axios";

function RegisterPlayer() {
  const [publicUrl, setPublicUrl] = useState(null);
  const url = import.meta.env.VITE_API_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const file = formData.get("file");

    const response = await axios.post(`${url}/player/add/upload`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contentLength: file.size,
      }),
    });
  };

  return <div></div>;
}

export default RegisterPlayer;
