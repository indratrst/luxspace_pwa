import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Browse from "../components/Browse";
import Arrived from "../components/Arrived";
import Clients from "../components/Clients";
import AsideMenu from "../components/AsideMenu";
import Footer from "../components/Footer";
import Offline from "../components/Offline";
import Splash from "./Splash";

function Home({ cart }) {
  const [items, setItems] = useState([]);

  const [offlineStatus, setOfflineStatus] = useState(!navigator.onLine);

  const [isLoading, setIsLoading] = useState(true);

  function handleOfflineStatus() {
    setOfflineStatus(!navigator.onLine);
  }
  useEffect(
    function () {
      (async function () {
        const response = await fetch(
          "https://prod-qore-app.qorebase.io/8ySrll0jkMkSJVk/allItems/rows?limit=7&offset=0&$order=asc",
          {
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
              "x-api-key": process.env.REACT_APP_APIKEY,
            },
          }
        );
        const { nodes } = await response.json();
        setItems(nodes);

        const script = document.createElement("script");
        script.src = "/carousel.js";
        script.async = false;

        document.body.appendChild(script);
      })();
      handleOfflineStatus();
      window.addEventListener("online", handleOfflineStatus);
      window.addEventListener("offline", handleOfflineStatus);

      setTimeout(function () {
        setIsLoading(false);
      }, 1500);

      return function () {
        window.removeEventListener("online", handleOfflineStatus);
        window.removeEventListener("offline", handleOfflineStatus);
      };
    },
    [offlineStatus]
  );

  return (
    <>
      {isLoading === true ? (
        <Splash />
      ) : (
        <>
          {offlineStatus && <Offline />}
          <Header mode="light" cart={cart} />
          <Hero />
          <Browse />
          <Arrived items={items} />
          <Clients />
          <AsideMenu />
          <Footer />
        </>
      )}
    </>
  );
}

export default Home;
