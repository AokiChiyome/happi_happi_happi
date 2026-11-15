// Web Audio API Sound Generator for Chat & Notifications
class NotificationSound {
  private ctx: AudioContext | null = null;

  private init() {
    try {
      if (!this.ctx) {
        const AudioCtx =
          window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
    } catch (e) {}
  }

  // Facebook Messenger style charming two-tone pop chime
  playPop() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Tone 1: Gentle low-to-mid chime
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(587.33, now); // D5
      osc1.frequency.exponentialRampToValueAtTime(880, now + 0.09); // A5
      gain1.gain.setValueAtTime(0.18, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.2);

      // Tone 2: Cheerful bell finish
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(880, now + 0.07);
      osc2.frequency.exponentialRampToValueAtTime(1174.66, now + 0.2); // D6
      gain2.gain.setValueAtTime(0.16, now + 0.07);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.07);
      osc2.stop(now + 0.3);
    } catch (e) {}
  }
}

export const notificationSound = new NotificationSound();
