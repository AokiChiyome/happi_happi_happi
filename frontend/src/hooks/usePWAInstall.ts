import { useState, useEffect } from "react";

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // 1. Kiểm tra chế độ Standalone (App PWA đã cài và đang chạy)
    const checkStandalone = () => {
      const isStandaloneMedia = window.matchMedia("(display-mode: standalone)").matches;
      const isIOSStandalone = (window.navigator as any).standalone === true;
      const isAndroidApp = document.referrer.includes("android-app://");
      const hasStoredFlag = localStorage.getItem("happi_pwa_installed") === "true";

      const appActive = isStandaloneMedia || isIOSStandalone || isAndroidApp;
      setIsStandalone(appActive);
      setIsInstalled(appActive || hasStoredFlag);
    };

    checkStandalone();

    // 2. Nhận biết thiết bị Apple iOS (iPhone/iPad/iPod)
    const ua = window.navigator.userAgent.toLowerCase();
    const isAppleDevice = /iphone|ipad|ipod/.test(ua) && !(window as any).MSStream;
    setIsIOS(isAppleDevice);

    // 3. Lắng nghe sự kiện cài đặt trên Android/Chrome
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      localStorage.setItem("happi_pwa_installed", "true");
      setIsInstalled(true);
      setIsStandalone(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const promptInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        localStorage.setItem("happi_pwa_installed", "true");
        setIsInstalled(true);
        setDeferredPrompt(null);
        return true;
      }
    }
    return false;
  };

  return {
    isStandalone,
    isInstalled,
    isIOS,
    canInstall: Boolean(deferredPrompt) || isIOS,
    promptInstall,
  };
}
