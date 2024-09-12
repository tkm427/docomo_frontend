"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SplashScreen = () => {
  const [opacity, setOpacity] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Fade in
    const fadeInTimer = setTimeout(() => {
      setOpacity(1);
    }, 100);

    // Start fade out
    const fadeOutTimer = setTimeout(() => {
      setOpacity(0);
    }, 2500);

    // Navigate to login page
    const navigationTimer = setTimeout(() => {
      router.push("/login");
    }, 3500);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(navigationTimer);
    };
  }, [router]);

  return (
    <div
      style={{
        backgroundColor: "#FF0033",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "opacity 1s ease-in-out",
      }}
    >
      <div
        style={{
          opacity: opacity,
          transition: "opacity 1s ease-in-out",
        }}
      >
        <Image
          src="/logo_flat.svg"
          alt="Logo"
          width={743}
          height={208}
          priority
        />
      </div>
    </div>
  );
};

export default SplashScreen;
