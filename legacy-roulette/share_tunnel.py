import subprocess
import urllib.request
import webbrowser
import time
import os
import sys

def get_public_ip():
    try:
        req = urllib.request.Request('https://api.ipify.org', headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as response:
            return response.read().decode('utf-8').strip()
    except Exception:
        return "Không lấy được tự động (xem tại https://loca.lt/mytunnelpassword)"

def main():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    print("=" * 65)
    print("  💕 DANG KHOI TAO DUONG TRUYEN CHIA SE ONLINE 💕")
    print("=" * 65)
    print("Dang lay dia chi IP cong khai cua ban...")
    public_ip = get_public_ip()

    print(f"\n[+] Mat khau mo khoa (Tunnel Password/IP cua ban): \033[92m{public_ip}\033[0m")
    print("[+] Dang ket noi voi LocalTunnel de tao link https...\n")

    # Start local server if not already running on 5500
    server_process = subprocess.Popen([sys.executable, "server.py"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(1.5)

    try:
        # Run localtunnel via npx
        lt_process = subprocess.Popen(
            ["cmd.exe", "/c", "npx", "--yes", "localtunnel", "--port", "5500"],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            encoding='utf-8',
            errors='ignore'
        )

        tunnel_url = None
        for line in lt_process.stdout:
            if "your url is:" in line.lower():
                tunnel_url = line.strip().split("your url is:")[-1].strip()
                break

        if tunnel_url:
            print("=" * 65)
            print(f"  🎉 LINK WEB CUA BAN DA SAN SANG:")
            print(f"  👉 \033[96m{tunnel_url}\033[0m")
            print("=" * 65)
            print(f"\n📌 HUONG DAN GUI CHO NGUOI YEU:")
            print(f"1. Gui link tren cho nguoi ay qua Messenger / Zalo.")
            print(f"2. Neu man hinh yeu cau 'Tunnel Password', bao nguoi ay nhap:")
            print(f"   👉 \033[92m{public_ip}\033[0m  (va an 'Submit')")
            print(f"3. Nguoi ay co the truy cap bang bat ky Wifi hay 4G nao!")
            print(f"\n⚠️  Luu y: Giu cua so nay mo khi nguoi ay dang xem nhe.")
            print("Nhan Ctrl + C de dung chia se bat cu luc nao.")
            print("=" * 65)

            # Keep alive
            lt_process.wait()
        else:
            print("Khong the tao link LocalTunnel tu dong.")
            print("Hay thu dung Pinggy bang cach chay lenh sau trong terminal:")
            print("ssh -p 443 -R0:localhost:5500 a.pinggy.io")

    except KeyboardInterrupt:
        print("\nDa dung chia se. Hen gap lai! 💕")
    finally:
        server_process.terminate()

if __name__ == "__main__":
    main()
