import { useEffect, useState } from "react";

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setShowButton(true);
    });
  }, []);
  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));

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
    <>
    
    {isIOS && (
        <div className="fixed bottom-4 right-4 bg-white p-4 rounded-xl shadow-lg text-black">
          <p>📱 To install:</p>
          <p>1️⃣ Tap <strong>Share</strong> (📤) in Safari</p>
          <p>2️⃣ Scroll down and select <strong>"Add to Home Screen"</strong></p>
          <p>3️⃣ Enjoy the Ramadan Quiz! 🎉</p>
        </div>
      )}
    </>
    
  );
};

export default InstallButton;
