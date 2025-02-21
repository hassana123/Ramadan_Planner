import { useEffect, useState } from "react";

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setShowButton(true);
    });
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choice) => {
        if (choice.outcome === "accepted") {
          console.log("User accepted the install");
        }
        setShowButton(false);
      });
    }
  };

  return (
    showButton && (
      <button
        onClick={handleInstall}
        className="fixed bottom-5 right-5 bg-primary text-white px-4 py-2 rounded-lg shadow-lg hover:bg-secondary transition"
      >
        Install Ramadan Tracker
      </button>
    )
  );
};

export default InstallButton;
