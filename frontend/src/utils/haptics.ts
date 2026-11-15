/**
 * Haptic Feedback Helper (Telegram & Native iOS/Android Feel)
 * Kích hoạt rung phản hồi xúc giác tinh tế trên thiết bị di động khi tương tác
 */

type HapticType = "light" | "medium" | "heavy" | "success" | "warning" | "selection";

export const triggerHaptic = (type: HapticType = "light") => {
  if (typeof window === "undefined" || !("vibrate" in navigator)) {
    return;
  }

  try {
    switch (type) {
      case "selection":
        navigator.vibrate(8);
        break;
      case "light":
        navigator.vibrate(12);
        break;
      case "medium":
        navigator.vibrate(22);
        break;
      case "heavy":
        navigator.vibrate(35);
        break;
      case "success":
        navigator.vibrate([15, 30, 25]);
        break;
      case "warning":
        navigator.vibrate([30, 20, 30]);
        break;
      default:
        navigator.vibrate(15);
    }
  } catch (e) {
    // Ignore environments where vibration is blocked or unsupported
  }
};
